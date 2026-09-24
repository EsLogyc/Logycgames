// ================================================================
// ¿QUIÉN SOY? — ESTADO Y FLUJO (100% libre, con banco opcional de apoyo)
// ================================================================

const BANCO_PERSONAJES_QUIENSOY = [
    // --- Superhéroes y villanos ---
    'Batman', 'Superman', 'Spider-Man', 'Iron Man', 'Hulk', 'Thor', 'Capitán América',
    'Wonder Woman', 'Flash', 'Aquaman', 'Viuda Negra', 'Black Panther',
    'Doctor Strange', 'Loki', 'Thanos', 'El Joker', 'El Pingüino', 'Magneto', 'Deadpool',
    'Wolverine', 'Goku', 'Vegeta', 'Naruto', 'Luffy', 'Sailor Moon', 'Un Power Ranger',

    // --- Disney y Pixar ---
    'Mickey Mouse', 'Pato Donald', 'Goofy', 'Blancanieves', 'La Cenicienta', 'Rapunzel',
    'La Bella Durmiente', 'La Sirenita', 'Elsa de Frozen', 'Anna de Frozen',
    'Olaf', 'Buzz Lightyear', 'Woody de Toy Story', 'Nemo', 'Dory', 'Simba', 'Timón',
    'Pumba', 'Aladino', 'Jasmine', 'El Genio de la Lámpara', 'Pinocho', 'Peter Pan',
    'Campanilla', 'Bambi', 'Dumbo', 'Mulan', 'Vaiana', 'Mirabel de Encanto',
    'Winnie the Pooh', 'Stitch', 'Wall-E', 'Remy de Ratatouille',
    'Bob Parr (Mr. Increíble)', 'Helen Parr (Elastigirl)', 'Miguel de Coco',

    // --- Dibujos animados clásicos ---
    'Homer Simpson', 'Marge Simpson', 'Bart Simpson', 'Lisa Simpson', 'Bob Esponja',
    'Patricio Estrella', 'Calamardo', 'Arenita', 'Don Cangrejo', 'Pikachu', 'Ash Ketchum',
    'Bugs Bunny', 'Pato Lucas', 'Tom', 'Jerry', 'Popeye', 'Scooby-Doo', 'Shaggy',
    'Pedro Picapiedra', 'Pablo Mármol', 'He-Man', 'Los Minions', 'Gru', 'Mafalda',
    'Mortadelo', 'Filemón', 'Zipi y Zape', 'Shin Chan', 'Doraemon', 'Nobita',
    'Las Supernenas', 'Johnny Bravo', 'Rick Sanchez', 'Morty Smith', 'Eric Cartman',

    // --- Cine y televisión ---
    'Darth Vader', 'Luke Skywalker', 'Yoda', 'Chewbacca', 'Han Solo', 'Leia Organa',
    'Obi-Wan Kenobi', 'Kylo Ren', 'Indiana Jones', 'James Bond', 'Rocky Balboa',
    'Terminator', 'Neo de Matrix', 'Morpheus', 'Gandalf', 'Frodo Bolsón',
    'Gollum', 'Aragorn', 'Legolas', 'Jack Sparrow', 'Harry Potter', 'Hermione Granger',
    'Ron Weasley', 'Dumbledore', 'Voldemort', 'Hagrid', 'Severus Snape', 'Draco Malfoy',
    'Edward Manos de Tijeras', 'Drácula', 'Frankenstein', 'El Hombre Lobo', 'La Momia',
    'El Fantasma de la Ópera', 'Sherlock Holmes', 'Hércules Poirot', 'Miss Marple',
    'Walter White', 'Jesse Pinkman', 'Eleven de Stranger Things',
    'Sheldon Cooper',

    // --- Ficción y fantasía ---
    'Shrek', 'Fiona', 'Burro de Shrek', 'El Gato con Botas',
    'Alicia en el País de las Maravillas', 'El Sombrerero Loco', 'La Reina de Corazones',
    'El Grinch', 'Jack Skellington', 'E.T.',
    'R2-D2', 'C-3PO', 'BB-8', 'Godzilla', 'King Kong', 'Una Tortuga Ninja',

    // --- Personajes históricos ---
    'Cleopatra', 'Julio César', 'Napoleón Bonaparte', 'Leonardo da Vinci', 'Miguel Ángel',
    'Albert Einstein', 'Isaac Newton', 'Marie Curie', 'Galileo Galilei', 'Mozart',
    'Beethoven', 'Van Gogh', 'Frida Kahlo', 'Picasso', 'Dalí', 'Cristóbal Colón',
    'Marco Polo', 'Gandhi', 'Nelson Mandela', 'Martin Luther King',
    'Juana de Arco', 'Isabel la Católica', 'Alejandro Magno', 'Ramsés II', 'Tutankamón',

    // --- Deportistas ---
    'Michael Jordan', 'Lionel Messi', 'Cristiano Ronaldo', 'Ronaldinho', 'Pelé',
    'Maradona', 'Rafa Nadal', 'Roger Federer', 'Serena Williams', 'Usain Bolt',
    'Michael Phelps', 'Kobe Bryant', 'LeBron James', 'Fernando Alonso',
    'Pau Gasol', 'Andrés Iniesta', 'Iker Casillas',

    // --- Músicos y cantantes ---
    'Michael Jackson', 'Madonna', 'Freddie Mercury', 'Elvis Presley', 'John Lennon',
    'Paul McCartney', 'Bob Marley', 'David Bowie', 'Lady Gaga', 'Beyoncé',
    'Taylor Swift', 'Rosalía', 'Bad Bunny', 'Shakira', 'Ricky Martin',
    'Alejandro Sanz', 'Aitana', 'Karol G',

    // --- Personajes famosos actuales ---
    'Ibai Llanos', 'El Rubius', 'AuronPlay', 'TheGrefg', 'Wismichu', 'Vegetta777',
    'Luzu', 'Mangel', 'Cristinini', 'Arigameplays', 'Rivers',

    // --- Cuentos y fantasía ---
    'Caperucita Roja', 'El Lobo Feroz', 'Un Cerdito de los Tres Cerditos',
    'Hansel y Gretel', 'El Soldadito de Plomo', 'La Ratita Presumida', 'El Patito Feo',
    'La Bella', 'La Bestia', 'Gastón', 'Alí Babá', 'Simbad el Marino', 'Robin Hood',
    'Tarzán', 'Jane', 'Mowgli',

    // --- Roles y arquetipos ---
    'Un profesor de matemáticas', 'Una profesora de inglés', 'Un bombero', 'Un policía',
    'Un médico', 'Una enfermera', 'Un astronauta', 'Un pirata', 'Un vampiro',
    'Un superhéroe inventado', 'Un extraterrestre', 'Un dinosaurio famoso',
    'Un futbolista muy conocido', 'Un cantante famoso', 'Un rey medieval',
    'Una bruja de cuento', 'Un mago', 'Un detective privado', 'Un vaquero del oeste',
    'Un ninja', 'Un samurái', 'Un robot', 'Un zombi', 'Un fantasma',
    'Un genio de la lámpara', 'Un duende', 'Un hada', 'Un dragón',
    'Un youtuber famoso', 'Un streamer', 'Un chef con estrella Michelin',
    'Un científico loco'
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
        guardarJugadoresGuardados(nombresValidos);
        partidaQuienSoy.turnoProtagonistaIndex = 0;
        logEvento(`🎭 Nueva partida de ¿Quién soy? con ${nombresValidos.length} jugadores.`);
        actualizarPanelJugadores(partidaQuienSoy.jugadores, 0);
        renderAvisoAlejarseProtagonista();
    });
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
// FASE 3 + 4 fusionadas: elegir el personaje Y mostrarlo al grupo
// ----------------------------------------------------------------
function renderEntradaPersonajeQuienSoy() {
    const protagonista = partidaQuienSoy.jugadores[partidaQuienSoy.turnoProtagonistaIndex];

    renderVista(`
        <div class="pantalla-juego">
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
// FASE 4: SE MUESTRA A TODOS MENOS AL PROTAGONISTA
// ----------------------------------------------------------------
function renderRevelarAlGrupo() {
    const protagonista = partidaQuienSoy.jugadores[partidaQuienSoy.turnoProtagonistaIndex];

    renderVista(`
        <div class="pantalla-juego">
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
            <h2>🎤 ${protagonista}, pregunta lo que quieras</h2>
            <div class="tarjeta-central">
                <p class="subtexto">Haz preguntas en voz alta que se respondan con sí o no. El grupo responde sin enseñarte la pantalla.</p>
            </div>
            <button class="btn-principal" id="btn-han-acertado">🎉 ¡Lo he adivinado!</button>
            <button class="btn-secundario" id="btn-me-rindo">🏳️ Me rindo (ver la respuesta)</button>
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
// FASE 6: RESULTADO Y SIGUIENTE RONDA
// ----------------------------------------------------------------
function mostrarResultadoRondaQuienSoy(acerto) {
    partidaQuienSoy.rondasJugadas++;
    const protagonista = partidaQuienSoy.jugadores[partidaQuienSoy.turnoProtagonistaIndex];

    if (acerto) {
        logEvento(`✅ ¡${protagonista} adivinó! El personaje era "${partidaQuienSoy.personajeActual}"`);
        registrarPartidaCompletada();
        sumarRetoSuperado();
    } else {
        logEvento(`🏳️ ${protagonista} se rindió. Era "${partidaQuienSoy.personajeActual}"`);
    }

    setTituloJuego('¿Quién soy? — Resultado');
    renderVista(`
        <div class="pantalla-juego">
            <div class="tarjeta-central">
                <div class="veredicto">${acerto ? '🎉 ¡Adivinado!' : '🏳️ Rendición'}</div>
                <p style="margin-top:8px;">${protagonista}, el personaje era:</p>
                <div class="personaje-nombre">${partidaQuienSoy.personajeActual}</div>
            </div>
            <button class="btn-principal" id="btn-siguiente-ronda-quiensoy">Siguiente protagonista →</button>
            <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
                <button class="btn-secundario" id="btn-terminar-quiensoy">Terminar partida</button>
            </div>
        </div>
    `);

    document.getElementById('btn-siguiente-ronda-quiensoy').addEventListener('click', () => {
        partidaQuienSoy.turnoProtagonistaIndex = (partidaQuienSoy.turnoProtagonistaIndex + 1) % partidaQuienSoy.jugadores.length;
        actualizarPanelJugadores(partidaQuienSoy.jugadores, partidaQuienSoy.turnoProtagonistaIndex);
        renderAvisoAlejarseProtagonista();
    });
    document.getElementById('btn-terminar-quiensoy').addEventListener('click', mostrarSelectorJuegos);
}