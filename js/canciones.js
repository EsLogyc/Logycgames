// ================================================================
// ADIVINA LA CANCIÓN — Juego de tararear
// ================================================================

let partidaCanciones = null;

// ----------------------------------------------------------------
// CREAR PARTIDA
// ----------------------------------------------------------------
function crearPartidaCanciones() {
    partidaCanciones = {
        jugadores: [],
        puntuaciones: {},
        turnoProtagonistaIndex: 0,
        cancionActual: null,
        rondasJugadas: 0,
        fase: 'configuracion'
    };
    renderConfiguracionCanciones();
}

// ----------------------------------------------------------------
// FASE 1: CONFIGURACIÓN
// ----------------------------------------------------------------
function renderConfiguracionCanciones() {
    setTituloJuego('Adivina la Canción — Configuración');
    if (partidaCanciones.jugadores.length === 0) {
        partidaCanciones.jugadores = cargarJugadoresGuardados() || ['Jugador 1', 'Jugador 2'];
    }

    const filas = partidaCanciones.jugadores.map((nombre, i) => `
        <div class="fila-nombre">
            <input type="text" value="${nombre}" data-idx="${i}" class="input-nombre-canciones" maxlength="16" />
            ${partidaCanciones.jugadores.length > 2 ? `<button class="quitar-jugador-canciones" data-idx="${i}">✕</button>` : ''}
        </div>
    `).join('');

    renderVista(`
        <div class="pantalla-juego">
            <button class="btn-volver" id="btn-volver-selector-canciones">← Volver a minijuegos</button>
            <h2>🎵 Adivina la Canción</h2>
            <p class="subtexto">Uno tararea, los demás adivinan. Sin decir el título ni la letra.</p>
            <div class="tarjeta-central">
                <div class="lista-nombres" id="lista-nombres-canciones">${filas}</div>
                <div style="margin-top:14px; display:flex; gap:10px; justify-content:center;">
                    <button class="btn-secundario" id="btn-add-jugador-canciones" ${partidaCanciones.jugadores.length >= 10 ? 'disabled' : ''}>+ Añadir jugador</button>
                </div>
                <p style="margin-top:14px; font-size:0.8rem; color:var(--text-secondary);">
                    🏆 Cada acierto suma 1 punto al que tararea.
                </p>
            </div>
            <button class="btn-principal" id="btn-empezar-canciones">Empezar partida</button>
        </div>
    `);

    document.getElementById('btn-volver-selector-canciones').onclick = mostrarSelectorJuegos;

    document.querySelectorAll('.input-nombre-canciones').forEach(input => {
        input.addEventListener('input', e => {
            const idx = parseInt(e.target.dataset.idx);
            partidaCanciones.jugadores[idx] = e.target.value || `Jugador ${idx + 1}`;
        });
    });
    document.querySelectorAll('.quitar-jugador-canciones').forEach(btn => {
        btn.addEventListener('click', e => {
            const idx = parseInt(e.target.dataset.idx);
            partidaCanciones.jugadores.splice(idx, 1);
            renderConfiguracionCanciones();
        });
    });
    document.getElementById('btn-add-jugador-canciones').addEventListener('click', () => {
        if (partidaCanciones.jugadores.length >= 10) return;
        partidaCanciones.jugadores.push(`Jugador ${partidaCanciones.jugadores.length + 1}`);
        renderConfiguracionCanciones();
    });

    document.getElementById('btn-empezar-canciones').addEventListener('click', () => {
        const nombresValidos = partidaCanciones.jugadores.filter(n => n.trim() !== '');
        if (nombresValidos.length < 2) {
            logEvento('⚠️ Necesitas al menos 2 jugadores para jugar.');
            return;
        }
        partidaCanciones.jugadores = nombresValidos;
        partidaCanciones.puntuaciones = {};
        nombresValidos.forEach(n => partidaCanciones.puntuaciones[n] = 0);
        partidaCanciones.turnoProtagonistaIndex = 0;
        guardarJugadoresGuardados(nombresValidos);
        logEvento(`🎵 Nueva partida de Adivina la Canción con ${nombresValidos.length} jugadores.`);
        actualizarPanelJugadores(partidaCanciones.jugadores, 0);
        renderAvisoAlejarseCantante();
    });
}

// ----------------------------------------------------------------
// MARCADOR
// ----------------------------------------------------------------
function renderMarcadorCanciones() {
    const puntuaciones = partidaCanciones.puntuaciones || {};
    const ordenados = Object.entries(puntuaciones).sort((a, b) => b[1] - a[1]);
    return `
        <div class="marcador-quiensoy">
            ${ordenados.map(([nombre, pts]) => {
                const esCantante = nombre === partidaCanciones.jugadores[partidaCanciones.turnoProtagonistaIndex];
                return `<span class="punto-jugador ${esCantante ? 'turno' : ''}">${nombre}: <strong>${pts}</strong></span>`;
            }).join('')}
        </div>
    `;
}

// ----------------------------------------------------------------
// FASE 2: EL CANTANTE SE APARTA
// ----------------------------------------------------------------
function renderAvisoAlejarseCantante() {
    setTituloJuego('Adivina la Canción — Preparando ronda');
    const cantante = partidaCanciones.jugadores[partidaCanciones.turnoProtagonistaIndex];
    const ronda = partidaCanciones.rondasJugadas + 1;

    renderVista(`
        <div class="pantalla-juego">
            ${renderMarcadorCanciones()}
            <h2>🙈 Que ${cantante} no mire</h2>
            <div class="tarjeta-central pase-dispositivo">
                <div class="icono-pase">🙈</div>
                <p class="subtexto">${cantante} es quien tararea esta ronda ${ronda}. Que se dé la vuelta mientras los demás eligen la canción.</p>
                <button class="btn-principal" style="margin-top:16px;" id="btn-cantante-listo">${cantante} ya no mira → Continuar</button>
            </div>
        </div>
    `);

    document.getElementById('btn-cantante-listo').addEventListener('click', renderEntradaCancion);
}

// ----------------------------------------------------------------
// FASE 3: ELEGIR CANCIÓN
// ----------------------------------------------------------------
function renderEntradaCancion() {
    const cantante = partidaCanciones.jugadores[partidaCanciones.turnoProtagonistaIndex];

    renderVista(`
        <div class="pantalla-juego">
            ${renderMarcadorCanciones()}
            <h2>🎵 Elegid la canción</h2>
            <p class="subtexto">${cantante} no debe ver esto. Podéis escribirla o pedir una al azar.</p>
            <div class="tarjeta-central">
                <input type="text" id="input-cancion-secreta" class="input-personaje-secreto"
                       placeholder="Título de la canción" autocomplete="off" />
                <div style="display:flex; gap:10px; justify-content:center; margin-top:10px; flex-wrap:wrap;">
                    <button class="btn-secundario" id="btn-cancion-aleatoria">🎲 Aleatoria</button>
                    <button class="btn-principal" id="btn-confirmar-cancion">Confirmar →</button>
                </div>
            </div>
        </div>
    `);

    const input = document.getElementById('input-cancion-secreta');
    input.focus();

    document.getElementById('btn-cancion-aleatoria').addEventListener('click', () => {
        const cancion = obtenerCancionAleatoria();
        input.value = cancion.titulo;
        partidaCanciones.cancionActual = cancion;
        input.focus();
        input.select();
    });

    const confirmar = () => {
        const texto = input.value.trim();
        if (texto.length < 2) {
            logEvento('⚠️ Escribid una canción válida antes de continuar.');
            return;
        }
        if (!partidaCanciones.cancionActual || partidaCanciones.cancionActual.titulo !== texto) {
            partidaCanciones.cancionActual = {
                titulo: texto,
                artista: null,
                anio: null,
                categoria: null,
                pelicula: null
            };
        }
        logEvento(`🎵 Canción elegida para ${cantante}.`);
        renderRevelarCancionAlGrupo();
    };

    document.getElementById('btn-confirmar-cancion').addEventListener('click', confirmar);
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') confirmar();
    });
}

// ----------------------------------------------------------------
// FASE 4: REVELAR AL GRUPO
// ----------------------------------------------------------------
function renderRevelarCancionAlGrupo() {
    const cantante = partidaCanciones.jugadores[partidaCanciones.turnoProtagonistaIndex];
    const c = partidaCanciones.cancionActual;

    const bloqueInfo = [];
    if (c.pelicula) bloqueInfo.push(`<div class="info-linea"><span class="info-label">🎬 Película:</span> ${c.pelicula}</div>`);
    if (c.artista) bloqueInfo.push(`<div class="info-linea"><span class="info-label">🎤 Artista:</span> ${c.artista}</div>`);
    if (c.anio) bloqueInfo.push(`<div class="info-linea"><span class="info-label">📅 Año:</span> ${formatearAnio(c.anio)}</div>`);
    if (c.categoria) bloqueInfo.push(`<div class="info-linea"><span class="info-label">🎼 Estilo:</span> ${c.categoria}</div>`);

    renderVista(`
        <div class="pantalla-juego">
            ${renderMarcadorCanciones()}
            <h2>👀 Memorizadla</h2>
            <div class="tarjeta-central tarjeta-personaje">
                <p class="subtexto">La canción de ${cantante} es:</p>
                <div class="personaje-nombre">${c.titulo}</div>
                ${bloqueInfo.length ? `<div class="tarjeta-info-quiensoy">${bloqueInfo.join('')}</div>` : ''}
                <p class="subtexto" style="margin-top:10px;">Cuando todos lo tengáis claro, que vuelva ${cantante}.</p>
            </div>
            <button class="btn-principal" id="btn-que-vuelva-cantante">Ya lo sabemos → Que vuelva ${cantante}</button>
        </div>
    `);

    document.getElementById('btn-que-vuelva-cantante').addEventListener('click', renderRondaTarareo);
}

// ----------------------------------------------------------------
// FASE 5: RONDA DE TARAREO
// ----------------------------------------------------------------
function renderRondaTarareo() {
    setTituloJuego('Adivina la Canción — Tararea');
    const cantante = partidaCanciones.jugadores[partidaCanciones.turnoProtagonistaIndex];
    const c = partidaCanciones.cancionActual;

    renderVista(`
        <div class="pantalla-juego">
            ${renderMarcadorCanciones()}
            <h2>🎤 ${cantante}, ¡a tararear!</h2>
            <div class="tarjeta-central">
                <p class="subtexto">Tararea la canción sin decir el título ni la letra. Los demás tienen que adivinarla.</p>
                <div class="cancion-recordatorio">${c.titulo}</div>
                <p style="margin-top:8px; font-size:0.75rem; color:var(--text-secondary);">
                    (Solo la ves tú. Los demás no deben mirar la pantalla.)
                </p>
            </div>
            <button class="btn-principal" id="btn-han-acertado-cancion">🎉 ¡La han adivinado!</button>
            <button class="btn-secundario" id="btn-me-rindo-cancion">🏳️ Nadie la adivina</button>
        </div>
    `);

    document.getElementById('btn-han-acertado-cancion').addEventListener('click', () => {
        mostrarResultadoCancion(true);
    });
    document.getElementById('btn-me-rindo-cancion').addEventListener('click', () => {
        mostrarResultadoCancion(false);
    });
}

// ----------------------------------------------------------------
// FASE 6: RESULTADO
// ----------------------------------------------------------------
function mostrarResultadoCancion(acierto) {
    partidaCanciones.rondasJugadas++;
    const cantante = partidaCanciones.jugadores[partidaCanciones.turnoProtagonistaIndex];
    const c = partidaCanciones.cancionActual;

    if (acierto) {
        partidaCanciones.puntuaciones[cantante] = (partidaCanciones.puntuaciones[cantante] || 0) + 1;
        logEvento(`✅ ¡${cantante} consiguió que adivinaran "${c.titulo}"! +1 punto.`);
        registrarPartidaCompletada();
        sumarRetoSuperado();
    } else {
        logEvento(`🏳️ Nadie adivinó "${c.titulo}".`);
    }

    setTituloJuego('Adivina la Canción — Resultado');
    renderVista(`
        <div class="pantalla-juego">
            ${renderMarcadorCanciones()}
            <div class="tarjeta-central">
                <div class="veredicto">${acierto ? '🎉 ¡Adivinada!' : '🏳️ Nadie la pilló'}</div>
                <p style="margin-top:8px;">La canción era:</p>
                <div class="personaje-nombre">${c.titulo}</div>
                ${c.artista ? `<p style="margin-top:6px; font-size:0.85rem; color:var(--text-secondary);">de ${c.artista}</p>` : ''}
                ${acierto ? `<p style="margin-top:12px; color:var(--success-dark); font-weight:700;">+1 punto para ${cantante}</p>` : ''}
            </div>
            <button class="btn-principal" id="btn-siguiente-ronda-cancion">Siguiente cantante →</button>
            <button class="btn-secundario" id="btn-terminar-cancion">Ver marcador final</button>
        </div>
    `);

    document.getElementById('btn-siguiente-ronda-cancion').addEventListener('click', () => {
        partidaCanciones.turnoProtagonistaIndex = (partidaCanciones.turnoProtagonistaIndex + 1) % partidaCanciones.jugadores.length;
        actualizarPanelJugadores(partidaCanciones.jugadores, partidaCanciones.turnoProtagonistaIndex);
        renderAvisoAlejarseCantante();
    });
    document.getElementById('btn-terminar-cancion').addEventListener('click', renderMarcadorFinalCanciones);
}

// ----------------------------------------------------------------
// FASE 7: MARCADOR FINAL
// ----------------------------------------------------------------
function renderMarcadorFinalCanciones() {
    setTituloJuego('Adivina la Canción — Marcador final');
    const ordenados = Object.entries(partidaCanciones.puntuaciones).sort((a, b) => b[1] - a[1]);
    const maxPuntos = ordenados[0] ? ordenados[0][1] : 0;

    const filas = ordenados.map(([nombre, pts], i) => {
        const esGanador = pts === maxPuntos && maxPuntos > 0;
        return `<div class="item" style="display:flex; justify-content:space-between; padding:8px 0; ${esGanador ? 'font-weight:800; color:var(--gold-dark);' : ''}">
            <span>${i + 1}. ${nombre}</span>
            <span>${pts} ${pts === 1 ? 'punto' : 'puntos'} ${esGanador ? '🏆' : ''}</span>
        </div>`;
    }).join('');

    renderVista(`
        <div class="pantalla-juego">
            <div class="tarjeta-central">
                <div class="veredicto">🏆 Marcador final</div>
                <div style="margin-top:14px; text-align:left; max-width:280px; margin-left:auto; margin-right:auto;">
                    ${filas}
                </div>
            </div>
            <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
                <button class="btn-secundario" id="btn-compartir-cancion">📤 Compartir</button>
                <button class="btn-secundario" id="btn-otra-cancion">Jugar otra partida</button>
                <button class="btn-principal" id="btn-volver-menu-cancion">Volver al menú</button>
            </div>
        </div>
    `);

    document.getElementById('btn-compartir-cancion').addEventListener('click', () => {
        const resumen = ordenados.map(([n, p]) => `${n}: ${p}`).join(' · ');
        compartirResultado(`🎵 Adivina la Canción — ${resumen}`);
    });
    document.getElementById('btn-otra-cancion').addEventListener('click', () => {
        const jugadoresAnteriores = partidaCanciones.jugadores;
        crearPartidaCanciones();
        partidaCanciones.jugadores = jugadoresAnteriores;
        partidaCanciones.puntuaciones = {};
        jugadoresAnteriores.forEach(n => partidaCanciones.puntuaciones[n] = 0);
        renderConfiguracionCanciones();
    });
    document.getElementById('btn-volver-menu-cancion').addEventListener('click', mostrarSelectorJuegos);
}