// ================================================================
// IMPOSTOR DE PALABRA — ESTADO Y FLUJO DEL JUEGO
// ================================================================
let partidaImpostor = null;

function crearPartidaImpostor() {
    partidaImpostor = {
        jugadores: [],
        categoria: 'comida',
        palabraSecreta: '',
        impostorIndex: -1,
        fase: 'configuracion',
        jugadorActualIndex: 0,
        ordenPistas: [],
        turnoPistasIndex: 0,
        votos: {}
    };
    renderConfiguracionImpostor();
}

// ----------------------------------------------------------------
// FASE 1: CONFIGURACIÓN
// ----------------------------------------------------------------
function renderConfiguracionImpostor() {
    setTituloJuego('Impostor de palabra — Configuración');
    if (partidaImpostor.jugadores.length === 0) {
        partidaImpostor.jugadores = ['Jugador 1', 'Jugador 2', 'Jugador 3'];
    }

    const filasNombres = partidaImpostor.jugadores.map((nombre, i) => `
        <div class="fila-nombre">
            <input type="text" value="${nombre}" data-idx="${i}" class="input-nombre-jugador" maxlength="16" />
            ${partidaImpostor.jugadores.length > 3 ? `<button class="quitar-jugador" data-idx="${i}">✕</button>` : ''}
        </div>
    `).join('');

    const botonesCategoria = Object.entries(CATEGORIAS_IMPOSTOR).map(([id, cat]) => `
        <button data-cat="${id}" class="${partidaImpostor.categoria === id ? 'active' : ''}">${cat.nombre}</button>
    `).join('');

    renderVista(`
        <div class="pantalla-juego">
            <button class="btn-volver" id="btn-volver-selector">← Volver a minijuegos</button>
            <h2>🎭 Configurar partida</h2>
            <p class="subtexto">Añade entre 3 y 10 jugadores y elige una categoría</p>

            <div class="tarjeta-central">
                <div class="lista-nombres" id="lista-nombres">${filasNombres}</div>
                <div style="margin-top:14px; display:flex; gap:10px; justify-content:center;">
                    <button class="btn-secundario" id="btn-add-jugador" ${partidaImpostor.jugadores.length >= 10 ? 'disabled' : ''}>+ Añadir jugador</button>
                </div>
            </div>

            <div class="tarjeta-central">
                <div class="label" style="font-size:0.75rem; text-transform:uppercase; color:var(--text-secondary); font-weight:600; margin-bottom:10px;">Categoría de palabras</div>
                <div class="selector-categoria" id="selector-categoria">${botonesCategoria}</div>
            </div>

            <button class="btn-principal" id="btn-empezar-reparto">Empezar reparto de roles 🎲</button>
        </div>
    `);

    document.getElementById('btn-volver-selector').onclick = mostrarSelectorJuegos;

    document.querySelectorAll('.input-nombre-jugador').forEach(input => {
        input.addEventListener('input', e => {
            const idx = parseInt(e.target.dataset.idx);
            partidaImpostor.jugadores[idx] = e.target.value || `Jugador ${idx + 1}`;
        });
    });

    document.querySelectorAll('.quitar-jugador').forEach(btn => {
        btn.addEventListener('click', e => {
            const idx = parseInt(e.target.dataset.idx);
            partidaImpostor.jugadores.splice(idx, 1);
            renderConfiguracionImpostor();
        });
    });

    document.getElementById('btn-add-jugador').addEventListener('click', () => {
        if (partidaImpostor.jugadores.length >= 10) return;
        partidaImpostor.jugadores.push(`Jugador ${partidaImpostor.jugadores.length + 1}`);
        renderConfiguracionImpostor();
    });

    document.querySelectorAll('#selector-categoria button').forEach(btn => {
        btn.addEventListener('click', () => {
            partidaImpostor.categoria = btn.dataset.cat;
            renderConfiguracionImpostor();
        });
    });

    document.getElementById('btn-empezar-reparto').addEventListener('click', empezarRepartoImpostor);
}

function empezarRepartoImpostor() {
    const nombresValidos = partidaImpostor.jugadores.filter(n => n.trim() !== '');
    if (nombresValidos.length < 3) {
        logEvento('⚠️ Necesitas al menos 3 jugadores para empezar.');
        return;
    }
    partidaImpostor.jugadores = nombresValidos;
    partidaImpostor.palabraSecreta = obtenerPalabraAleatoria(partidaImpostor.categoria);
    partidaImpostor.impostorIndex = Math.floor(Math.random() * partidaImpostor.jugadores.length);
    partidaImpostor.jugadorActualIndex = 0;
    partidaImpostor.fase = 'reparto';

    logEvento(`🎭 Nueva partida: ${partidaImpostor.jugadores.length} jugadores, categoría "${CATEGORIAS_IMPOSTOR[partidaImpostor.categoria].nombre}"`);
    actualizarPanelJugadores(partidaImpostor.jugadores, -1);
    renderPaseTurno();
}

// ----------------------------------------------------------------
// FASE 2: REPARTO DE ROLES (pasa el dispositivo)
// ----------------------------------------------------------------
function renderPaseTurno() {
    setTituloJuego('Impostor de palabra — Repartiendo roles');
    const idx = partidaImpostor.jugadorActualIndex;
    const nombre = partidaImpostor.jugadores[idx];

    renderVista(`
        <div class="pantalla-juego">
            <h2>📱 Pasa el dispositivo</h2>
            <div class="tarjeta-central pase-dispositivo">
                <div class="icono-pase">🤫</div>
                <div class="nombre-jugador-grande">Entrégaselo a ${nombre}</div>
                <p class="subtexto" style="margin-top:8px;">Que nadie más mire la pantalla</p>
                <div style="margin-top:20px;">
                    <button class="btn-principal" id="btn-revelar-rol">Soy ${nombre}, mostrar mi rol</button>
                </div>
            </div>
        </div>
    `);

    document.getElementById('btn-revelar-rol').addEventListener('click', () => renderRolIndividual(idx));
}

function renderRolIndividual(idx) {
    const esImpostor = idx === partidaImpostor.impostorIndex;
    const nombre = partidaImpostor.jugadores[idx];

    renderVista(`
        <div class="pantalla-juego">
            <h2>${nombre}, este es tu rol</h2>
            <div class="tarjeta-central tarjeta-rol ${esImpostor ? 'impostor' : 'tripulante'}">
                ${esImpostor ? `
                    <div class="etiqueta-rol">Eres el impostor</div>
                    <div class="palabra-secreta">🎭 No conoces la palabra</div>
                    <p class="subtexto">Escucha las pistas de los demás e improvisa la tuya sin que te descubran</p>
                ` : `
                    <div class="etiqueta-rol">La palabra secreta es</div>
                    <div class="palabra-secreta">${partidaImpostor.palabraSecreta}</div>
                    <p class="subtexto">Da una pista sin decirla directamente. Cuidado con el impostor escuchando</p>
                `}
            </div>
            <button class="btn-principal" id="btn-listo-siguiente">Ya la he visto, siguiente jugador</button>
        </div>
    `);

    document.getElementById('btn-listo-siguiente').addEventListener('click', () => {
        partidaImpostor.jugadorActualIndex++;
        if (partidaImpostor.jugadorActualIndex >= partidaImpostor.jugadores.length) {
            iniciarFasePistas();
        } else {
            renderPaseTurno();
        }
    });
}

// ----------------------------------------------------------------
// FASE 3: PISTAS (fuera de la app, la web solo marca el orden)
// ----------------------------------------------------------------
function iniciarFasePistas() {
    partidaImpostor.fase = 'pistas';
    partidaImpostor.ordenPistas = [...partidaImpostor.jugadores.keys()].sort(() => Math.random() - 0.5);
    partidaImpostor.turnoPistasIndex = 0;
    logEvento('💬 Todos los roles repartidos. Empieza la ronda de pistas en voz alta.');
    renderFasePistas();
}

function renderFasePistas() {
    setTituloJuego('Impostor de palabra — Ronda de pistas');
    const orden = partidaImpostor.ordenPistas;
    const turnoActual = partidaImpostor.turnoPistasIndex;

    const chips = orden.map((jugadorIdx, i) => `
        <span class="chip-turno ${i < turnoActual ? 'completado' : ''}" style="${i === turnoActual ? 'background:var(--gold); color:#fff; font-weight:700;' : ''}">
            ${i + 1}. ${partidaImpostor.jugadores[jugadorIdx]}
        </span>
    `).join('');

    const terminoRonda = turnoActual >= orden.length;

    renderVista(`
        <div class="pantalla-juego">
            <h2>💬 Turno de pistas</h2>
            <p class="subtexto">Cada jugador dice una pista en voz alta cuando le toque. Solo tú controláis el orden aquí.</p>
            <div class="tarjeta-central">
                <div class="orden-turnos">${chips}</div>
                ${!terminoRonda ? `
                    <p style="margin-top:16px; font-weight:700; font-size:1.1rem;">Le toca a: ${partidaImpostor.jugadores[orden[turnoActual]]}</p>
                    <button class="btn-principal" style="margin-top:14px;" id="btn-siguiente-pista">Ha hablado, siguiente</button>
                ` : `
                    <p style="margin-top:16px; font-weight:700;">Ronda completa. ¿Suficientes pistas o otra ronda más?</p>
                `}
            </div>
            <div style="display:flex; gap:10px; justify-content:center;">
                ${terminoRonda ? `
                    <button class="btn-secundario" id="btn-otra-ronda">Otra ronda de pistas</button>
                    <button class="btn-principal" id="btn-ir-votacion">Ir a votación 🗳️</button>
                ` : ''}
            </div>
        </div>
    `);

    if (!terminoRonda) {
        document.getElementById('btn-siguiente-pista').addEventListener('click', () => {
            partidaImpostor.turnoPistasIndex++;
            renderFasePistas();
        });
    } else {
        document.getElementById('btn-otra-ronda').addEventListener('click', () => {
            partidaImpostor.turnoPistasIndex = 0;
            partidaImpostor.ordenPistas = [...partidaImpostor.jugadores.keys()].sort(() => Math.random() - 0.5);
            renderFasePistas();
        });
        document.getElementById('btn-ir-votacion').addEventListener('click', iniciarVotacion);
    }
}

// ----------------------------------------------------------------
// FASE 4: VOTACIÓN (pasando el dispositivo también)
// ----------------------------------------------------------------
function iniciarVotacion() {
    partidaImpostor.fase = 'votacion';
    partidaImpostor.jugadorActualIndex = 0;
    partidaImpostor.votos = {};
    logEvento('🗳️ Empieza la votación secreta.');
    renderPaseVotacion();
}

function renderPaseVotacion() {
    setTituloJuego('Impostor de palabra — Votación');
    const idx = partidaImpostor.jugadorActualIndex;
    const nombre = partidaImpostor.jugadores[idx];

    renderVista(`
        <div class="pantalla-juego">
            <h2>🗳️ Turno de votar</h2>
            <div class="tarjeta-central pase-dispositivo">
                <div class="icono-pase">🤫</div>
                <div class="nombre-jugador-grande">Entrégaselo a ${nombre}</div>
                <p class="subtexto" style="margin-top:8px;">Vota en secreto quién crees que es el impostor</p>
                <button class="btn-principal" style="margin-top:20px;" id="btn-ver-opciones">Soy ${nombre}, quiero votar</button>
            </div>
        </div>
    `);

    document.getElementById('btn-ver-opciones').addEventListener('click', () => renderOpcionesVoto(idx, nombre));
}

function renderOpcionesVoto(idxVotante, nombreVotante) {
    const opciones = partidaImpostor.jugadores.map((nombre, i) => `
        <div class="opcion-voto" data-idx="${i}">${nombre} ${i === idxVotante ? '(tú)' : ''}</div>
    `).join('');

    renderVista(`
        <div class="pantalla-juego">
            <h2>${nombreVotante}, ¿quién es el impostor?</h2>
            <div class="tarjeta-central">
                <div class="lista-votacion" id="lista-votacion">${opciones}</div>
            </div>
        </div>
    `);

    document.querySelectorAll('.opcion-voto').forEach(el => {
        el.addEventListener('click', () => {
            const votadoIdx = parseInt(el.dataset.idx);
            partidaImpostor.votos[idxVotante] = votadoIdx;
            partidaImpostor.jugadorActualIndex++;
            if (partidaImpostor.jugadorActualIndex >= partidaImpostor.jugadores.length) {
                mostrarResultadoImpostor();
            } else {
                renderPaseVotacion();
            }
        });
    });
}

// ----------------------------------------------------------------
// FASE 5: RESULTADO
// ----------------------------------------------------------------
function mostrarResultadoImpostor() {
    partidaImpostor.fase = 'resultado';

    const conteo = {};
    Object.values(partidaImpostor.votos).forEach(idx => {
        conteo[idx] = (conteo[idx] || 0) + 1;
    });
    let masVotadoIdx = -1;
    let maxVotos = -1;
    Object.entries(conteo).forEach(([idx, votos]) => {
        if (votos > maxVotos) { maxVotos = votos; masVotadoIdx = parseInt(idx); }
    });

    const acertaron = masVotadoIdx === partidaImpostor.impostorIndex;
    const nombreImpostor = partidaImpostor.jugadores[partidaImpostor.impostorIndex];
    const nombreMasVotado = partidaImpostor.jugadores[masVotadoIdx];

    setTituloJuego('Impostor de palabra — Resultado');
    renderVista(`
        <div class="pantalla-juego resultado-final ${acertaron ? 'gano-tripulantes' : 'gano-impostor'}">
            <div class="tarjeta-central">
                <div class="veredicto">${acertaron ? '✅ ¡Descubierto!' : '🎭 ¡El impostor escapa!'}</div>
                <p style="margin-bottom:6px;">El más votado fue <strong>${nombreMasVotado}</strong></p>
                <p style="margin-bottom:6px;">El impostor real era <strong>${nombreImpostor}</strong></p>
                <p style="color:var(--text-secondary); font-size:0.85rem; margin-top:10px;">La palabra secreta era: <strong>${partidaImpostor.palabraSecreta}</strong></p>
            </div>
            <div style="display:flex; gap:10px; justify-content:center;">
                <button class="btn-secundario" id="btn-otra-partida">Jugar otra partida</button>
                <button class="btn-principal" id="btn-volver-menu">Volver al menú</button>
            </div>
        </div>
    `);

    logEvento(`🏁 Partida terminada. ${acertaron ? 'Ganaron los tripulantes' : 'Ganó el impostor'} (era ${nombreImpostor})`);
    registrarPartidaCompletada();

    document.getElementById('btn-otra-partida').addEventListener('click', () => {
        const jugadoresAnteriores = partidaImpostor.jugadores;
        const categoriaAnterior = partidaImpostor.categoria;
        crearPartidaImpostor();
        partidaImpostor.jugadores = jugadoresAnteriores;
        partidaImpostor.categoria = categoriaAnterior;
        renderConfiguracionImpostor();
    });
    document.getElementById('btn-volver-menu').addEventListener('click', mostrarSelectorJuegos);
}