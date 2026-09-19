// ================================================================
// ¿QUIÉN SOY? — ESTADO Y FLUJO (100% libre, con banco opcional de apoyo)
// ================================================================

// ================================================================
// BANCO DE PERSONAJES ALEATORIOS (por si no se os ocurre nada)
// ================================================================
const BANCO_PERSONAJES_QUIENSOY = [
    'Harry Potter', 'Shrek', 'Batman', 'Cleopatra', 'Albert Einstein', 'Mario Bros', 'Blancanieves',
    'Sherlock Holmes', 'Frida Kahlo', 'Spider-Man', 'Elsa de Frozen', 'Pikachu', 'Don Quijote',
    'Napoleón Bonaparte', 'Wonder Woman', 'Gandalf', 'La Sirenita', 'Charlie Chaplin', 'Buzz Lightyear',
    'Cristóbal Colón', 'Homer Simpson', 'Drácula', 'Rapunzel', 'Iron Man', 'Leonardo da Vinci',
    'Winnie the Pooh', 'Frankenstein', 'Aladino', 'Michael Jackson', 'SpongeBob', 'Julio César',
    'La Cenicienta', 'El Joker', 'Pocahontas', 'Sonic', 'Marilyn Monroe', 'El Grinch', 'Thor',
    'Mafalda', 'Peter Pan', 'Darth Vader', 'Hermione Granger', 'Van Gogh', 'Yoda', 'La Bella Durmiente',
    'Popeye', 'Mozart', 'Woody de Toy Story', 'Hulk', 'Pinocho', 'Beethoven', 'Bob Esponja',
    'El Papá Noel', 'Pedro Picapiedra', 'Michael Jordan', 'La Reina de Corazones', 'Robin Hood',
    'Tarzán', 'Los Minions', 'El Ratoncito Pérez', 'La Mujer Maravilla',
    'Un profesor de matemáticas', 'Un bombero', 'Un astronauta', 'Un pirata', 'Un vampiro',
    'Un superhéroe inventado', 'Un extraterrestre', 'Un dinosaurio famoso', 'Un futbolista muy conocido',
    'Un cantante famoso', 'Un rey medieval', 'Una bruja de cuento', 'Un mago', 'Un detective privado',
    'Un vaquero del oeste', 'Un ninja', 'Un robot', 'Un zombi', 'Un fantasma', 'Un genio de la lámpara',
    'Tu profesor favorito del colegio', 'Un influencer inventado'
];

function obtenerPersonajeAleatorioQuienSoy() {
    return BANCO_PERSONAJES_QUIENSOY[Math.floor(Math.random() * BANCO_PERSONAJES_QUIENSOY.length)];
}

let partidaQuienSoy = null;

function crearPartidaQuienSoy() {
    partidaQuienSoy = {
        jugadores: [],
        turnoProtagonistaIndex: 0,
        personajeActual: '',
        rondasJugadas: 0,
        fase: 'configuracion'
    };
    renderConfiguracionQuienSoy();
}

// ----------------------------------------------------------------
// FASE 1: CONFIGURACIÓN
// ----------------------------------------------------------------
function renderConfiguracionQuienSoy() {
    setTituloJuego('¿Quién soy? — Configuración');
    if (partidaQuienSoy.jugadores.length === 0) {
        partidaQuienSoy.jugadores = cargarJugadoresGuardados() || ['Jugador 1', 'Jugador 2'];
    }

    const filas = partidaQuienSoy.jugadores.map((nombre, i) => `
        <div class="fila-nombre">
            <input type="text" value="${nombre}" data-idx="${i}" class="input-nombre-quiensoy" maxlength="16" />
            ${partidaQuienSoy.jugadores.length > 2 ? `<button class="quitar-jugador-quiensoy" data-idx="${i}">✕</button>` : ''}
        </div>
    `).join('');

    renderVista(`
        <div class="pantalla-juego">
            <button class="btn-volver" id="btn-volver-selector-qs">← Volver a minijuegos</button>
            <h2>🎭 ¿Quién soy?</h2>
            <p class="subtexto">Todos ven el personaje excepto el protagonista de la ronda, que debe adivinarlo haciendo preguntas de sí o no.</p>
            <div class="tarjeta-central">
                <div class="lista-nombres" id="lista-nombres-quiensoy">${filas}</div>
                <div style="margin-top:14px; display:flex; gap:10px; justify-content:center;">
                    <button class="btn-secundario" id="btn-add-jugador-quiensoy" ${partidaQuienSoy.jugadores.length >= 10 ? 'disabled' : ''}>+ Añadir jugador</button>
                </div>
            </div>
            <button class="btn-principal" id="btn-empezar-quiensoy">Empezar</button>
        </div>
    `);

    document.getElementById('btn-volver-selector-qs').onclick = mostrarSelectorJuegos;

    document.querySelectorAll('.input-nombre-quiensoy').forEach(input => {
        input.addEventListener('input', e => {
            const idx = parseInt(e.target.dataset.idx);
            partidaQuienSoy.jugadores[idx] = e.target.value || `Jugador ${idx + 1}`;
        });
    });
    document.querySelectorAll('.quitar-jugador-quiensoy').forEach(btn => {
        btn.addEventListener('click', e => {
            const idx = parseInt(e.target.dataset.idx);
            partidaQuienSoy.jugadores.splice(idx, 1);
            renderConfiguracionQuienSoy();
        });
    });
    document.getElementById('btn-add-jugador-quiensoy').addEventListener('click', () => {
        if (partidaQuienSoy.jugadores.length >= 10) return;
        partidaQuienSoy.jugadores.push(`Jugador ${partidaQuienSoy.jugadores.length + 1}`);
        renderConfiguracionQuienSoy();
    });

    document.getElementById('btn-empezar-quiensoy').addEventListener('click', () => {
        const nombresValidos = partidaQuienSoy.jugadores.filter(n => n.trim() !== '');
        if (nombresValidos.length < 2) {
            logEvento('⚠️ Necesitas al menos 2 jugadores para jugar.');
            return;
        }
        partidaQuienSoy.jugadores = nombresValidos;
        guardarJugadoresGuardados(nombresValidos);
        partidaQuienSoy.turnoProtagonistaIndex = 0;
        logEvento(`🎭 Nueva partida de ¿Quién soy? con ${nombresValidos.length} jugadores.`);
        actualizarPanelJugadores(partidaQuienSoy.jugadores, 0);
        renderAvisoAlejarseProtagonista();
    });
}

// ----------------------------------------------------------------
// FASE 2: EL PROTAGONISTA SE APARTA (no debe ver la pantalla)
// ----------------------------------------------------------------
function renderAvisoAlejarseProtagonista() {
    setTituloJuego('¿Quién soy? — Preparando ronda');
    const protagonista = partidaQuienSoy.jugadores[partidaQuienSoy.turnoProtagonistaIndex];

    renderVista(`
        <div class="pantalla-juego">
            <h2>🙈 Que ${protagonista} no mire la pantalla</h2>
            <div class="tarjeta-central pase-dispositivo">
                <div class="icono-pase">🙈</div>
                <p class="subtexto">${protagonista} es el protagonista de esta ronda: tiene que apartarse, cerrar los ojos o darse la vuelta. El resto del grupo va a elegir su personaje.</p>
                <button class="btn-principal" style="margin-top:16px;" id="btn-protagonista-listo">${protagonista} ya no mira, continuar</button>
            </div>
        </div>
    `);

    document.getElementById('btn-protagonista-listo').addEventListener('click', renderEntradaPersonajeQuienSoy);
}

// ----------------------------------------------------------------
// FASE 3: EL RESTO DEL GRUPO ELIGE EL PERSONAJE
// ----------------------------------------------------------------
function renderEntradaPersonajeQuienSoy() {
    const protagonista = partidaQuienSoy.jugadores[partidaQuienSoy.turnoProtagonistaIndex];

    renderVista(`
        <div class="pantalla-juego">
            <h2>✍️ El resto del grupo elige el personaje</h2>
            <p class="subtexto">Puede ser real, de ficción, un famoso, un dibujo animado... lo que se os ocurra. ${protagonista} no debe ver esto.</p>
            <div class="tarjeta-central">
                <input type="text" id="input-personaje-secreto" class="input-personaje-secreto" placeholder="Escribid el personaje" autocomplete="off" />
                <div style="margin-top:10px;">
                    <button class="btn-secundario" id="btn-personaje-aleatorio">🎲 Ponnos uno aleatorio</button>
                </div>
                <button class="btn-principal" style="margin-top:16px;" id="btn-confirmar-personaje">Confirmar y mostrarlo al grupo</button>
            </div>
        </div>
    `);

    const input = document.getElementById('input-personaje-secreto');
    input.focus();
    document.getElementById('btn-personaje-aleatorio').addEventListener('click', () => {
        input.value = obtenerPersonajeAleatorioQuienSoy();
        input.focus();
    });
    document.getElementById('btn-confirmar-personaje').addEventListener('click', () => {
        const personaje = input.value.trim();
        if (personaje.length < 2) {
            logEvento('⚠️ Escribid un personaje válido antes de continuar.');
            return;
        }
        partidaQuienSoy.personajeActual = personaje;
        logEvento(`🎭 Personaje elegido para ${protagonista}.`);
        renderRevelarAlGrupo();
    });
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') document.getElementById('btn-confirmar-personaje').click();
    });
}

// ----------------------------------------------------------------
// FASE 4: SE MUESTRA A TODOS MENOS AL PROTAGONISTA
// ----------------------------------------------------------------
function renderRevelarAlGrupo() {
    const protagonista = partidaQuienSoy.jugadores[partidaQuienSoy.turnoProtagonistaIndex];

    renderVista(`
        <div class="pantalla-juego">
            <h2>👀 Que todo el grupo lo memorice</h2>
            <div class="tarjeta-central tarjeta-personaje">
                <p class="subtexto">El personaje de ${protagonista} es:</p>
                <div class="personaje-nombre">${partidaQuienSoy.personajeActual}</div>
                <p class="subtexto">${protagonista} sigue sin mirar. Cuando todos lo tengáis claro, que vuelva a la partida.</p>
            </div>
            <button class="btn-principal" id="btn-que-vuelva">Ya lo sabemos, que vuelva ${protagonista}</button>
        </div>
    `);

    document.getElementById('btn-que-vuelva').addEventListener('click', renderRondaPreguntasQuienSoy);
}

// ----------------------------------------------------------------
// FASE 5: RONDA DE PREGUNTAS (el grupo responde de memoria)
// ----------------------------------------------------------------
function renderRondaPreguntasQuienSoy() {
    setTituloJuego('¿Quién soy? — Ronda de preguntas');
    const protagonista = partidaQuienSoy.jugadores[partidaQuienSoy.turnoProtagonistaIndex];

    renderVista(`
        <div class="pantalla-juego">
            <h2>🎤 ${protagonista}, pregunta lo que quieras</h2>
            <div class="tarjeta-central">
                <p class="subtexto">Haz preguntas en voz alta que se respondan con sí o no. El resto del grupo responde de memoria, sin enseñarte la pantalla.</p>
            </div>
            <button class="btn-principal" id="btn-han-acertado">🎉 ¡Lo he adivinado!</button>
        </div>
    `);

    document.getElementById('btn-han-acertado').addEventListener('click', mostrarResultadoRondaQuienSoy);
}

// ----------------------------------------------------------------
// FASE 6: RESULTADO DE LA RONDA Y SIGUIENTE TURNO
// ----------------------------------------------------------------
function mostrarResultadoRondaQuienSoy() {
    partidaQuienSoy.rondasJugadas++;
    logEvento(`✅ ¡Adivinado! El personaje era "${partidaQuienSoy.personajeActual}"`);
    registrarPartidaCompletada();

    setTituloJuego('¿Quién soy? — ¡Adivinado!');
    renderVista(`
        <div class="pantalla-juego">
            <div class="tarjeta-central">
                <div class="veredicto">🎉 ¡Correcto!</div>
                <p>Era: <strong>${partidaQuienSoy.personajeActual}</strong></p>
            </div>
            <div style="display:flex; gap:10px; justify-content:center;">
                <button class="btn-secundario" id="btn-cambiar-turno-quiensoy">Cambiar de protagonista</button>
                <button class="btn-principal" id="btn-volver-menu-quiensoy">Volver al menú</button>
            </div>
        </div>
    `);

    document.getElementById('btn-cambiar-turno-quiensoy').addEventListener('click', () => {
        partidaQuienSoy.turnoProtagonistaIndex = (partidaQuienSoy.turnoProtagonistaIndex + 1) % partidaQuienSoy.jugadores.length;
        renderAvisoAlejarseProtagonista();
    });
    document.getElementById('btn-volver-menu-quiensoy').addEventListener('click', mostrarSelectorJuegos);
}