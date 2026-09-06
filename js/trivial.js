// ================================================================
// BANCO DE PREGUNTAS — TRIVIAL STREAMERS (dificultad media)
// Datos verificados en fuentes públicas (Wikipedia y prensa especializada)
// ================================================================
const PREGUNTAS_TRIVIAL = [
    { pregunta: '¿En qué ciudad nació Ibai Llanos?', opciones: ['Bilbao', 'Madrid', 'Sevilla', 'Valencia'], correcta: 0 },
    { pregunta: '¿Qué evento de Ibai batió el récord histórico de espectadores simultáneos en Twitch en 2025?', opciones: ['La Velada del Año 5', 'Mundial de Desayunos', 'Kings League Final', 'Esland Awards'], correcta: 0 },
    { pregunta: '¿Qué streamer español sostuvo el récord de espectadores de Twitch en 2021 al revelar su skin de Fortnite?', opciones: ['AuronPlay', 'TheGrefg', 'El Rubius', 'Ibai Llanos'], correcta: 1 },
    { pregunta: 'La skin récord de TheGrefg en 2021 era de licencia oficial de...', opciones: ['Fortnite', 'Call of Duty', 'Minecraft', 'League of Legends'], correcta: 0 },
    { pregunta: '¿Cuál es el nombre real de El Rubius?', opciones: ['Rubén Doblas Gundersen', 'David Cánovas Martínez', 'Raúl Álvarez Genes', 'Samuel de Luque'], correcta: 0 },
    { pregunta: '¿En qué localidad malagueña nació El Rubius?', opciones: ['Mijas', 'Marbella', 'Fuengirola', 'Ronda'], correcta: 0 },
    { pregunta: '¿De qué país es originaria la madre de El Rubius?', opciones: ['Noruega', 'Suecia', 'Dinamarca', 'Finlandia'], correcta: 0 },
    { pregunta: '¿Cuál es el nombre real de AuronPlay?', opciones: ['Raúl Álvarez Genes', 'Rubén Doblas Gundersen', 'David Cánovas Martínez', 'Samuel de Luque'], correcta: 0 },
    { pregunta: '¿En qué ciudad catalana nació AuronPlay?', opciones: ['Badalona', 'Girona', 'Tarragona', 'Lleida'], correcta: 0 },
    { pregunta: '¿Junto a qué youtuber protagonizó AuronPlay un famoso vídeo de bromas telefónicas en 2016?', opciones: ['Wismichu', 'Vegetta777', 'Luzu', 'Mangel'], correcta: 0 },
    { pregunta: '¿Qué liga de fútbol amateur cofundó Ibai junto a Gerard Piqué?', opciones: ['Kings League', 'Superliga Streamer', 'Copa Ibai', 'Liga Twitch'], correcta: 0 },
    { pregunta: '¿En qué videojuego empezó Ibai su carrera como narrador en 2014?', opciones: ['League of Legends', 'Counter-Strike', 'Fortnite', 'Valorant'], correcta: 0 },
    { pregunta: '¿Cómo se llama el club de esports cofundado por Ibai?', opciones: ['KOI', 'G2 Esports', 'Team Heretics', 'MAD Lions'], correcta: 0 },
    { pregunta: 'El nombre real de TheGrefg es...', opciones: ['David Cánovas Martínez', 'Rubén Doblas Gundersen', 'Raúl Álvarez Genes', 'Ander Cortés'], correcta: 0 },
    { pregunta: '¿De qué región española es TheGrefg?', opciones: ['Murcia', 'Andalucía', 'Galicia', 'Aragón'], correcta: 0 },

    // --- Streamers latinoamericanos ---
    { pregunta: '¿De qué país es Westcol, líder del ranking de streamers hispanohablantes por horas vistas en 2026?', opciones: ['Colombia', 'México', 'Argentina', 'Perú'], correcta: 0 },
    { pregunta: 'La mayoría de los streamers latinoamericanos más vistos de 2026 transmiten principalmente en...', opciones: ['Kick', 'Twitch', 'YouTube', 'TikTok'], correcta: 0 },
    { pregunta: '¿De qué país es el streamer Spreen?', opciones: ['Argentina', 'Chile', 'Uruguay', 'Bolivia'], correcta: 0 },
    { pregunta: '¿Qué streamer argentino lideró las horas vistas en Kick en mayo de 2026?', opciones: ['Davoo Xeneize', 'LaCobraaa', 'Spreen', 'ElGlogloking'], correcta: 0 },
    { pregunta: '¿Cuál es el nombre real de la streamer mexicana Arigameplays?', opciones: ['Abril Abdamari Garza Alonso', 'Samantha Treviño Rivera', 'Cristina López Pérez', 'Ana Paula Rangel'], correcta: 0 },
    { pregunta: '¿En qué ciudad mexicana creció Arigameplays?', opciones: ['Monterrey', 'Guadalajara', 'Puebla', 'Tijuana'], correcta: 0 },
    { pregunta: '¿Con qué streamer colombiano se casó Arigameplays en 2019?', opciones: ['Juan Sebastián Guarnizo', 'Westcol', 'El Mariana', 'MrStivenTC'], correcta: 0 },
    { pregunta: '¿De qué nacionalidad es la streamer Rivers (Samantha Treviño Rivera)?', opciones: ['Mexicana', 'Colombiana', 'Argentina', 'Española'], correcta: 0 },
    { pregunta: '¿En qué provincia española nació la streamer Cristinini?', opciones: ['Tarragona', 'Valencia', 'Sevilla', 'Alicante'], correcta: 0 },
    { pregunta: 'Además de streamer, ¿qué otro papel ha ejercido Cristinini en televisión española?', opciones: ['Presentadora', 'Comentarista deportiva', 'Actriz de doblaje solo en cine', 'Cantante'], correcta: 0 }
];

// ================================================================
// TRIVIAL — ESTADO Y FLUJO
// ================================================================
let partidaTrivial = null;
const NUM_PREGUNTAS_TRIVIAL = 10;

function crearPartidaTrivial() {
    partidaTrivial = {
        jugadores: [],
        puntuaciones: {},
        turnoIndex: 0,
        preguntaIndex: 0,
        preguntasOrden: [],
        fase: 'configuracion'
    };
    renderConfiguracionTrivial();
}

// ----------------------------------------------------------------
// FASE 1: CONFIGURACIÓN
// ----------------------------------------------------------------
function renderConfiguracionTrivial() {
    setTituloJuego('Trivial Streamers — Configuración');
    if (partidaTrivial.jugadores.length === 0) {
        partidaTrivial.jugadores = ['Jugador 1', 'Jugador 2'];
    }

    const filas = partidaTrivial.jugadores.map((nombre, i) => `
        <div class="fila-nombre">
            <input type="text" value="${nombre}" data-idx="${i}" class="input-nombre-trivial" maxlength="16" />
            ${partidaTrivial.jugadores.length > 2 ? `<button class="quitar-jugador-trivial" data-idx="${i}">✕</button>` : ''}
        </div>
    `).join('');

    renderVista(`
        <div class="pantalla-juego">
            <button class="btn-volver" id="btn-volver-selector-triv">← Volver a minijuegos</button>
            <h2>❓ Trivial Streamers</h2>
            <p class="subtexto">Preguntas de dificultad media sobre grandes streamers hispanos. Os turnáis para responder.</p>
            <div class="tarjeta-central">
                <div class="lista-nombres" id="lista-nombres-trivial">${filas}</div>
                <div style="margin-top:14px; display:flex; gap:10px; justify-content:center;">
                    <button class="btn-secundario" id="btn-add-jugador-trivial" ${partidaTrivial.jugadores.length >= 10 ? 'disabled' : ''}>+ Añadir jugador</button>
                </div>
            </div>
            <button class="btn-principal" id="btn-empezar-trivial">Empezar partida (${NUM_PREGUNTAS_TRIVIAL} preguntas)</button>
        </div>
    `);

    document.getElementById('btn-volver-selector-triv').onclick = mostrarSelectorJuegos;

    document.querySelectorAll('.input-nombre-trivial').forEach(input => {
        input.addEventListener('input', e => {
            const idx = parseInt(e.target.dataset.idx);
            partidaTrivial.jugadores[idx] = e.target.value || `Jugador ${idx + 1}`;
        });
    });
    document.querySelectorAll('.quitar-jugador-trivial').forEach(btn => {
        btn.addEventListener('click', e => {
            const idx = parseInt(e.target.dataset.idx);
            partidaTrivial.jugadores.splice(idx, 1);
            renderConfiguracionTrivial();
        });
    });
    document.getElementById('btn-add-jugador-trivial').addEventListener('click', () => {
        if (partidaTrivial.jugadores.length >= 10) return;
        partidaTrivial.jugadores.push(`Jugador ${partidaTrivial.jugadores.length + 1}`);
        renderConfiguracionTrivial();
    });

    document.getElementById('btn-empezar-trivial').addEventListener('click', () => {
        const nombresValidos = partidaTrivial.jugadores.filter(n => n.trim() !== '');
        if (nombresValidos.length < 2) {
            logEvento('⚠️ Necesitas al menos 2 jugadores para el Trivial.');
            return;
        }
        partidaTrivial.jugadores = nombresValidos;
        nombresValidos.forEach(n => partidaTrivial.puntuaciones[n] = 0);
        partidaTrivial.preguntasOrden = [...PREGUNTAS_TRIVIAL.keys()].sort(() => Math.random() - 0.5).slice(0, NUM_PREGUNTAS_TRIVIAL);
        partidaTrivial.preguntaIndex = 0;
        partidaTrivial.turnoIndex = 0;
        logEvento(`❓ Nuevo Trivial: ${nombresValidos.length} jugadores, ${NUM_PREGUNTAS_TRIVIAL} preguntas`);
        actualizarPanelJugadores(partidaTrivial.jugadores, 0);
        renderPreguntaTrivial();
    });
}

// ----------------------------------------------------------------
// FASE 2: PREGUNTAS POR TURNOS
// ----------------------------------------------------------------
function renderPreguntaTrivial() {
    setTituloJuego(`Trivial Streamers — Pregunta ${partidaTrivial.preguntaIndex + 1}/${NUM_PREGUNTAS_TRIVIAL}`);
    const jugadorActual = partidaTrivial.jugadores[partidaTrivial.turnoIndex];
    const preg = PREGUNTAS_TRIVIAL[partidaTrivial.preguntasOrden[partidaTrivial.preguntaIndex]];

    actualizarPanelJugadores(partidaTrivial.jugadores, partidaTrivial.turnoIndex);

    const opciones = preg.opciones.map((op, i) => `
        <div class="opcion-voto" data-idx="${i}">${op}</div>
    `).join('');

    renderVista(`
        <div class="pantalla-juego">
            <h2>Turno de ${jugadorActual}</h2>
            <div class="tarjeta-central">
                <p style="font-weight:700; font-size:1.05rem; margin-bottom:16px;">${preg.pregunta}</p>
                <div class="lista-votacion" id="opciones-trivial">${opciones}</div>
            </div>
        </div>
    `);

    document.querySelectorAll('#opciones-trivial .opcion-voto').forEach(el => {
        el.addEventListener('click', () => {
            const idxElegido = parseInt(el.dataset.idx);
            resolverRespuestaTrivial(idxElegido, preg, jugadorActual);
        });
    });
}

function resolverRespuestaTrivial(idxElegido, preg, jugadorActual) {
    const acierto = idxElegido === preg.correcta;
    if (acierto) {
        partidaTrivial.puntuaciones[jugadorActual]++;
        logEvento(`✅ ${jugadorActual} acierta: ${preg.opciones[preg.correcta]}`);
    } else {
        logEvento(`❌ ${jugadorActual} falla. Era: ${preg.opciones[preg.correcta]}`);
    }

    document.querySelectorAll('#opciones-trivial .opcion-voto').forEach((el, i) => {
        el.style.pointerEvents = 'none';
        if (i === preg.correcta) el.classList.add('seleccionado');
    });

    setTimeout(() => {
        partidaTrivial.preguntaIndex++;
        partidaTrivial.turnoIndex = (partidaTrivial.turnoIndex + 1) % partidaTrivial.jugadores.length;
        if (partidaTrivial.preguntaIndex >= NUM_PREGUNTAS_TRIVIAL) {
            mostrarResultadoTrivial();
        } else {
            renderPreguntaTrivial();
        }
    }, 1200);
}

// ----------------------------------------------------------------
// FASE 3: RESULTADO FINAL
// ----------------------------------------------------------------
function mostrarResultadoTrivial() {
    setTituloJuego('Trivial Streamers — Resultado');
    const ranking = Object.entries(partidaTrivial.puntuaciones).sort((a, b) => b[1] - a[1]);
    const ganador = ranking[0];

    const filasRanking = ranking.map(([nombre, puntos], i) => `
        <div class="ranking .item" style="display:flex; justify-content:space-between; padding:6px 0; ${i === 0 ? 'font-weight:800; color:var(--gold-dark);' : ''}">
            <span>${i + 1}. ${nombre}</span><span>${puntos} pts</span>
        </div>
    `).join('');

    renderVista(`
        <div class="pantalla-juego">
            <div class="tarjeta-central">
                <div class="veredicto">🏆 ¡${ganador[0]} gana el Trivial!</div>
                <div style="margin-top:14px; text-align:left; max-width:280px; margin-left:auto; margin-right:auto;">${filasRanking}</div>
            </div>
            <div style="display:flex; gap:10px; justify-content:center;">
                <button class="btn-secundario" id="btn-otra-trivial">Jugar otra ronda</button>
                <button class="btn-principal" id="btn-volver-menu-trivial">Volver al menú</button>
            </div>
        </div>
    `);

    logEvento(`🏁 Trivial terminado. Gana ${ganador[0]} con ${ganador[1]} puntos.`);
    registrarPartidaCompletada();

    document.getElementById('btn-otra-trivial').addEventListener('click', () => {
        const jugadoresAnteriores = partidaTrivial.jugadores;
        crearPartidaTrivial();
        partidaTrivial.jugadores = jugadoresAnteriores;
        renderConfiguracionTrivial();
    });
    document.getElementById('btn-volver-menu-trivial').addEventListener('click', mostrarSelectorJuegos);
}