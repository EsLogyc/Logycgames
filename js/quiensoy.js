// ================================================================
// ¿QUIÉN SOY? — con puntuación y banco de personajes curado
// ================================================================

// ================================================================
// BANCO DE PERSONAJES — todos con nombre propio, sin genéricos
// ================================================================
const BANCO_PERSONAJES_QUIENSOY = [
    // --- Superhéroes y villanos (cómic / anime) ---
    'Batman', 'Superman', 'Spider-Man', 'Iron Man', 'Hulk', 'Thor',
    'Capitán América', 'Wonder Woman', 'Flash', 'Aquaman', 'Viuda Negra',
    'Black Panther', 'Doctor Strange', 'Loki', 'Thanos', 'El Joker',
    'El Pingüino', 'Magneto', 'Deadpool', 'Wolverine',
    'Goku', 'Vegeta', 'Gohan', 'Bulma', 'Naruto', 'Sasuke', 'Sakura',
    'Kakashi', 'Luffy', 'Zoro', 'Nami', 'Sailor Moon',

    // --- Disney y Pixar ---
    'Mickey Mouse', 'Minnie Mouse', 'Pato Donald', 'Goofy', 'Pluto',
    'Blancanieves', 'La Cenicienta', 'Rapunzel', 'Aurora (La Bella Durmiente)',
    'Ariel (La Sirenita)', 'Elsa de Frozen', 'Anna de Frozen', 'Olaf',
    'Buzz Lightyear', 'Woody', 'Nemo', 'Dory', 'Simba', 'Nala', 'Timón',
    'Pumba', 'Aladino', 'Jasmine', 'El Genio de la Lámpara', 'Pinocho',
    'Peter Pan', 'Campanilla', 'Bambi', 'Dumbo', 'Mulan', 'Vaiana',
    'Mirabel de Encanto', 'Winnie the Pooh', 'Tigger', 'Stitch', 'Lilo',
    'WALL-E', 'Remy de Ratatouille', 'Mr. Increíble', 'Elastigirl',
    'Miguel de Coco',

    // --- Dibujos animados ---
    'Homer Simpson', 'Marge Simpson', 'Bart Simpson', 'Lisa Simpson',
    'Bob Esponja', 'Patricio Estrella', 'Calamardo', 'Pikachu',
    'Ash Ketchum', 'Bugs Bunny', 'Pato Lucas', 'Tom', 'Jerry', 'Popeye',
    'Scooby-Doo', 'Shaggy', 'Pedro Picapiedra', 'Pablo Mármol', 'He-Man',
    'Gru', 'Kevin de los Minions', 'Mafalda', 'Mortadelo', 'Filemón',
    'Zipi', 'Zape', 'Shin Chan', 'Doraemon', 'Nobita', 'Johnny Bravo',
    'Rick Sanchez', 'Morty Smith', 'Eric Cartman',

    // --- Cine y televisión ---
    'Darth Vader', 'Luke Skywalker', 'Yoda', 'Chewbacca', 'Han Solo',
    'Leia Organa', 'Obi-Wan Kenobi', 'Kylo Ren', 'Indiana Jones',
    'James Bond', 'Rocky Balboa', 'Terminator', 'Neo de Matrix', 'Morfeo',
    'Trinity de Matrix', 'Gandalf', 'Frodo Bolsón', 'Gollum', 'Aragorn',
    'Legolas', 'Jack Sparrow', 'Harry Potter', 'Hermione Granger',
    'Ron Weasley', 'Dumbledore', 'Voldemort', 'Hagrid', 'Severus Snape',
    'Draco Malfoy', 'Edward Manos de Tijeras', 'Drácula', 'Frankenstein',
    'El Hombre Lobo', 'La Momia', 'El Fantasma de la Ópera',
    'Sherlock Holmes', 'Hércules Poirot', 'Miss Marple', 'Walter White',
    'Jesse Pinkman', 'Eleven de Stranger Things', 'Sheldon Cooper',

    // --- Ficción y fantasía ---
    'Shrek', 'Fiona', 'Burro de Shrek', 'El Gato con Botas',
    'Alicia en el País de las Maravillas', 'El Sombrerero Loco',
    'La Reina de Corazones', 'El Grinch', 'Jack Skellington', 'E.T.',
    'R2-D2', 'C-3PO', 'BB-8', 'Godzilla', 'King Kong',

    // --- Personajes históricos ---
    'Cleopatra', 'Julio César', 'Napoleón Bonaparte', 'Leonardo da Vinci',
    'Miguel Ángel', 'Albert Einstein', 'Isaac Newton', 'Marie Curie',
    'Galileo Galilei', 'Mozart', 'Beethoven', 'Van Gogh', 'Frida Kahlo',
    'Picasso', 'Salvador Dalí', 'Cristóbal Colón', 'Marco Polo', 'Gandhi',
    'Nelson Mandela', 'Martin Luther King', 'Juana de Arco',
    'Isabel la Católica', 'Alejandro Magno', 'Ramsés II', 'Tutankamón',
    'Julio Verne', 'Miguel de Cervantes', 'William Shakespeare',

    // --- Literatura y cuentos ---
    'Don Quijote', 'Sancho Panza', 'Hamlet', 'Romeo', 'Julieta',
    'Robinson Crusoe', 'El Principito', 'Pippi Calzaslargas', 'Matilda',
    'Willy Wonka', 'Caperucita Roja', 'El Lobo Feroz', 'Ricitos de Oro',
    'Hansel', 'Gretel', 'El Soldadito de Plomo', 'La Ratita Presumida',
    'El Patito Feo', 'La Bella', 'La Bestia', 'Gastón', 'Alí Babá',
    'Simbad el Marino', 'Robin Hood', 'Tarzán', 'Jane', 'Mowgli', 'Baloo',
    'El Rey Arturo', 'Merlín',

    // --- Deportistas ---
    'Michael Jordan', 'Lionel Messi', 'Cristiano Ronaldo', 'Ronaldinho',
    'Pelé', 'Maradona', 'Rafa Nadal', 'Roger Federer', 'Serena Williams',
    'Usain Bolt', 'Michael Phelps', 'Kobe Bryant', 'LeBron James',
    'Fernando Alonso', 'Pau Gasol', 'Andrés Iniesta', 'Iker Casillas',
    'Zinedine Zidane', 'David Beckham',

    // --- Músicos y cantantes ---
    'Michael Jackson', 'Madonna', 'Freddie Mercury', 'Elvis Presley',
    'John Lennon', 'Paul McCartney', 'Bob Marley', 'David Bowie',
    'Lady Gaga', 'Beyoncé', 'Taylor Swift', 'Rosalía', 'Bad Bunny',
    'Shakira', 'Ricky Martin', 'Alejandro Sanz', 'Aitana', 'Karol G',

    // --- Streamers y youtubers ---
    'Ibai Llanos', 'El Rubius', 'AuronPlay', 'TheGrefg', 'Wismichu',
    'Vegetta777', 'Luzu', 'Mangel', 'Cristinini', 'Arigameplays',
    'Rivers', 'Ninja', 'PewDiePie', 'MrBeast'
];

function obtenerPersonajeAleatorioQuienSoy() {
    return BANCO_PERSONAJES_QUIENSOY[Math.floor(Math.random() * BANCO_PERSONAJES_QUIENSOY.length)];
}

let partidaQuienSoy = null;

function crearPartidaQuienSoy() {
    partidaQuienSoy = {
        jugadores: [],
        puntuaciones: {},         // { nombre: puntos }
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
                <p style="margin-top:14px; font-size:0.8rem; color:var(--text-secondary);">
                    🏆 Cada acierto suma 1 punto al que lo adivina.
                </p>
            </div>
            <button class="btn-principal" id="btn-empezar-quiensoy">Empezar partida</button>
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
        // Inicializar puntuaciones a 0
        partidaQuienSoy.puntuaciones = {};
        nombresValidos.forEach(n => partidaQuienSoy.puntuaciones[n] = 0);
        partidaQuienSoy.turnoProtagonistaIndex = 0;
        guardarJugadoresGuardados(nombresValidos);
        logEvento(`🎭 Nueva partida de ¿Quién soy? con ${nombresValidos.length} jugadores.`);
        actualizarPanelJugadores(partidaQuienSoy.jugadores, 0);
        renderAvisoAlejarseProtagonista();
    });
}

// ----------------------------------------------------------------
// MARCADOR REUTILIZABLE
// ----------------------------------------------------------------
function renderMarcadorQuienSoy() {
    const puntuaciones = partidaQuienSoy.puntuaciones || {};
    const ordenados = Object.entries(puntuaciones).sort((a, b) => b[1] - a[1]);
    return `
        <div class="marcador-quiensoy">
            ${ordenados.map(([nombre, pts]) => {
                const esProtagonista = nombre === partidaQuienSoy.jugadores[partidaQuienSoy.turnoProtagonistaIndex];
                return `<span class="punto-jugador ${esProtagonista ? 'turno' : ''}">${nombre}: <strong>${pts}</strong></span>`;
            }).join('')}
        </div>
    `;
}

// ----------------------------------------------------------------
// FASE 2: EL PROTAGONISTA SE APARTA
// ----------------------------------------------------------------
function renderAvisoAlejarseProtagonista() {
    setTituloJuego('¿Quién soy? — Preparando ronda');
    const protagonista = partidaQuienSoy.jugadores[partidaQuienSoy.turnoProtagonistaIndex];
    const ronda = partidaQuienSoy.rondasJugadas + 1;

    renderVista(`
        <div class="pantalla-juego">
            ${renderMarcadorQuienSoy()}
            <h2>🙈 Que ${protagonista} no mire</h2>
            <div class="tarjeta-central pase-dispositivo">
                <div class="icono-pase">🙈</div>
                <p class="subtexto">${protagonista} es el protagonista de la ronda ${ronda}. Que se dé la vuelta o cierre los ojos mientras el grupo elige su personaje.</p>
                <button class="btn-principal" style="margin-top:16px;" id="btn-protagonista-listo">${protagonista} ya no mira → Continuar</button>
            </div>
        </div>
    `);

    document.getElementById('btn-protagonista-listo').addEventListener('click', renderEntradaPersonajeQuienSoy);
}

// ----------------------------------------------------------------
// FASE 3: ELEGIR EL PERSONAJE
// ----------------------------------------------------------------
function renderEntradaPersonajeQuienSoy() {
    const protagonista = partidaQuienSoy.jugadores[partidaQuienSoy.turnoProtagonistaIndex];

    renderVista(`
        <div class="pantalla-juego">
            ${renderMarcadorQuienSoy()}
            <h2>✍️ Elegid el personaje</h2>
            <p class="subtexto">${protagonista} no debe ver esto.</p>
            <div class="tarjeta-central">
                <input type="text" id="input-personaje-secreto" class="input-personaje-secreto"
                       placeholder="Escribid el personaje" autocomplete="off" />
                <div style="display:flex; gap:10px; justify-content:center; margin-top:10px; flex-wrap:wrap;">
                    <button class="btn-secundario" id="btn-personaje-aleatorio">🎲 Aleatorio</button>
                    <button class="btn-principal" id="btn-confirmar-personaje">Confirmar →</button>
                </div>
            </div>
        </div>
    `);

    const input = document.getElementById('input-personaje-secreto');
    input.focus();

    document.getElementById('btn-personaje-aleatorio').addEventListener('click', () => {
        input.value = obtenerPersonajeAleatorioQuienSoy();
        input.focus();
        input.select();
    });

    const confirmar = () => {
        const personaje = input.value.trim();
        if (personaje.length < 2) {
            logEvento('⚠️ Escribid un personaje válido antes de continuar.');
            return;
        }
        partidaQuienSoy.personajeActual = personaje;
        logEvento(`🎭 Personaje elegido para ${protagonista}.`);
        renderRevelarAlGrupo();
    };

    document.getElementById('btn-confirmar-personaje').addEventListener('click', confirmar);
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') confirmar();
    });
}

// ----------------------------------------------------------------
// FASE 4: MOSTRAR AL GRUPO
// ----------------------------------------------------------------
function renderRevelarAlGrupo() {
    const protagonista = partidaQuienSoy.jugadores[partidaQuienSoy.turnoProtagonistaIndex];

    renderVista(`
        <div class="pantalla-juego">
            ${renderMarcadorQuienSoy()}
            <h2>👀 Memorizadlo</h2>
            <div class="tarjeta-central tarjeta-personaje">
                <p class="subtexto">El personaje de ${protagonista} es:</p>
                <div class="personaje-nombre">${partidaQuienSoy.personajeActual}</div>
                <p class="subtexto">${protagonista} sigue sin mirar. Cuando todos lo tengáis claro, que vuelva.</p>
            </div>
            <button class="btn-principal" id="btn-que-vuelva">Ya lo sabemos → Que vuelva ${protagonista}</button>
        </div>
    `);

    document.getElementById('btn-que-vuelva').addEventListener('click', renderRondaPreguntasQuienSoy);
}

// ----------------------------------------------------------------
// FASE 5: RONDA DE PREGUNTAS
// ----------------------------------------------------------------
function renderRondaPreguntasQuienSoy() {
    setTituloJuego('¿Quién soy? — Ronda de preguntas');
    const protagonista = partidaQuienSoy.jugadores[partidaQuienSoy.turnoProtagonistaIndex];

    renderVista(`
        <div class="pantalla-juego">
            ${renderMarcadorQuienSoy()}
            <h2>🎤 ${protagonista}, pregunta lo que quieras</h2>
            <div class="tarjeta-central">
                <p class="subtexto">Haz preguntas en voz alta que se respondan con sí o no. El grupo responde sin enseñarte la pantalla.</p>
            </div>
            <button class="btn-principal" id="btn-han-acertado">🎉 ¡Lo he adivinado!</button>
            <button class="btn-secundario" id="btn-me-rindo">🏳️ Me rindo</button>
        </div>
    `);

    document.getElementById('btn-han-acertado').addEventListener('click', () => {
        mostrarResultadoRondaQuienSoy(true);
    });
    document.getElementById('btn-me-rindo').addEventListener('click', () => {
        mostrarResultadoRondaQuienSoy(false);
    });
}

// ----------------------------------------------------------------
// FASE 6: RESULTADO DE LA RONDA Y SIGUIENTE
// ----------------------------------------------------------------
function mostrarResultadoRondaQuienSoy(acerto) {
    partidaQuienSoy.rondasJugadas++;
    const protagonista = partidaQuienSoy.jugadores[partidaQuienSoy.turnoProtagonistaIndex];

    if (acerto) {
        // Sumar punto al protagonista
        partidaQuienSoy.puntuaciones[protagonista] = (partidaQuienSoy.puntuaciones[protagonista] || 0) + 1;
        logEvento(`✅ ¡${protagonista} adivinó "${partidaQuienSoy.personajeActual}"! +1 punto.`);
        registrarPartidaCompletada();
        sumarRetoSuperado();
    } else {
        logEvento(`🏳️ ${protagonista} se rindió. Era "${partidaQuienSoy.personajeActual}".`);
    }

    setTituloJuego('¿Quién soy? — Resultado');
    renderVista(`
        <div class="pantalla-juego">
            ${renderMarcadorQuienSoy()}
            <div class="tarjeta-central">
                <div class="veredicto">${acerto ? '🎉 ¡Adivinado!' : '🏳️ Rendición'}</div>
                <p style="margin-top:8px;">${protagonista}, el personaje era:</p>
                <div class="personaje-nombre">${partidaQuienSoy.personajeActual}</div>
                ${acerto ? `<p style="margin-top:12px; color:var(--success-dark); font-weight:700;">+1 punto para ${protagonista}</p>` : ''}
            </div>
            <button class="btn-principal" id="btn-siguiente-ronda-quiensoy">Siguiente protagonista →</button>
            <button class="btn-secundario" id="btn-terminar-quiensoy">Ver marcador final</button>
        </div>
    `);

    document.getElementById('btn-siguiente-ronda-quiensoy').addEventListener('click', () => {
        partidaQuienSoy.turnoProtagonistaIndex = (partidaQuienSoy.turnoProtagonistaIndex + 1) % partidaQuienSoy.jugadores.length;
        actualizarPanelJugadores(partidaQuienSoy.jugadores, partidaQuienSoy.turnoProtagonistaIndex);
        renderAvisoAlejarseProtagonista();
    });
    document.getElementById('btn-terminar-quiensoy').addEventListener('click', renderMarcadorFinalQuienSoy);
}

// ----------------------------------------------------------------
// FASE 7: MARCADOR FINAL
// ----------------------------------------------------------------
function renderMarcadorFinalQuienSoy() {
    setTituloJuego('¿Quién soy? — Marcador final');
    const ordenados = Object.entries(partidaQuienSoy.puntuaciones).sort((a, b) => b[1] - a[1]);
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
                <button class="btn-secundario" id="btn-compartir-quiensoy">📤 Compartir</button>
                <button class="btn-secundario" id="btn-otra-quiensoy">Jugar otra partida</button>
                <button class="btn-principal" id="btn-volver-menu-quiensoy">Volver al menú</button>
            </div>
        </div>
    `);

    document.getElementById('btn-compartir-quiensoy').addEventListener('click', () => {
        const resumen = ordenados.map(([n, p]) => `${n}: ${p}`).join(' · ');
        compartirResultado(`🎭 ¿Quién soy? — ${resumen}`);
    });
    document.getElementById('btn-otra-quiensoy').addEventListener('click', () => {
        const jugadoresAnteriores = partidaQuienSoy.jugadores;
        crearPartidaQuienSoy();
        partidaQuienSoy.jugadores = jugadoresAnteriores;
        partidaQuienSoy.puntuaciones = {};
        jugadoresAnteriores.forEach(n => partidaQuienSoy.puntuaciones[n] = 0);
        renderConfiguracionQuienSoy();
    });
    document.getElementById('btn-volver-menu-quiensoy').addEventListener('click', mostrarSelectorJuegos);
}