// ================================================================
// TEST DEL NOMBRE DE FIESTA
// 5 preguntas aleatorias → sustantivo + adjetivo con género
// ================================================================

const PREGUNTAS_NOMBRE = [
    {
        emoji: '💩',
        texto: '¿Has hecho popo hoy?',
        opciones: [
            { texto: 'Sí', adjetivo: 'fresco' },
            { texto: 'No', adjetivo: 'estrenido' }
        ]
    },
    {
        emoji: '☕',
        texto: '¿Has tomado café hoy?',
        opciones: [
            { texto: 'Sí', adjetivo: 'chispeante' },
            { texto: 'No', adjetivo: 'adormilado' }
        ]
    },
    {
        emoji: '🤸',
        texto: '¿Eres capaz de chuparte el codo?',
        opciones: [
            { texto: 'Sí', adjetivo: 'flexible' },
            { texto: 'No', adjetivo: 'rigido' },
            { texto: 'Ni lo he intentado', adjetivo: 'curioso' }
        ]
    },
    {
        emoji: '🍕',
        texto: '¿Pizza o sushi?',
        opciones: [
            { texto: 'Pizza', adjetivo: 'italiano' },
            { texto: 'Sushi', adjetivo: 'japones' }
        ]
    },
    {
        emoji: '🐶',
        texto: '¿Perro o gato?',
        opciones: [
            { texto: 'Perro', adjetivo: 'leal' },
            { texto: 'Gato', adjetivo: 'independiente' }
        ]
    },
    {
        emoji: '🦉',
        texto: '¿Madrugador o nocturno?',
        opciones: [
            { texto: 'Madrugador', adjetivo: 'madrugador' },
            { texto: 'Nocturno', adjetivo: 'nocturno' }
        ]
    },
    {
        emoji: '😴',
        texto: '¿Cuántas horas has dormido?',
        opciones: [
            { texto: 'Pocas', adjetivo: 'somnoliento' },
            { texto: 'Normales', adjetivo: 'descansado' },
            { texto: 'Muchas', adjetivo: 'dormilon' }
        ]
    },
    {
        emoji: '🎮',
        texto: '¿Cuántas horas al día juegas?',
        opciones: [
            { texto: 'Poco', adjetivo: 'casual' },
            { texto: 'Medio', adjetivo: 'aficionado' },
            { texto: 'Mucho', adjetivo: 'hardcore' }
        ]
    },
    {
        emoji: '🎤',
        texto: '¿Cantas en la ducha?',
        opciones: [
            { texto: 'Sí', adjetivo: 'melodico' },
            { texto: 'No', adjetivo: 'silencioso' }
        ]
    },
    {
        emoji: '🎬',
        texto: '¿Has llorado con una película?',
        opciones: [
            { texto: 'Sí', adjetivo: 'sensible' },
            { texto: 'No', adjetivo: 'duro' }
        ]
    },
    {
        emoji: '🕺',
        texto: '¿Te gusta el reggaetón?',
        opciones: [
            { texto: 'Sí', adjetivo: 'fiestero' },
            { texto: 'No', adjetivo: 'alternativo' }
        ]
    },
    {
        emoji: '🍽️',
        texto: '¿Has comido algo que se cayó al suelo?',
        opciones: [
            { texto: 'Sí', adjetivo: 'valiente' },
            { texto: 'No', adjetivo: 'escrupuloso' }
        ]
    }
];

// Adjetivos con género: m = masculino, f = femenino
// Cuando m y f son iguales, el adjetivo es neutro.
const ADJETIVOS = {
    fresco:       { m: 'Fresco',       f: 'Fresca' },
    estrenido:    { m: 'Estreñido',    f: 'Estreñida' },
    chispeante:   { m: 'Chispeante',   f: 'Chispeante' },
    adormilado:   { m: 'Adormilado',   f: 'Adormilada' },
    flexible:     { m: 'Flexible',     f: 'Flexible' },
    rigido:       { m: 'Rígido',       f: 'Rígida' },
    curioso:      { m: 'Curioso',      f: 'Curiosa' },
    italiano:     { m: 'Italiano',     f: 'Italiana' },
    japones:      { m: 'Japonés',      f: 'Japonesa' },
    leal:         { m: 'Leal',         f: 'Leal' },
    independiente:{ m: 'Independiente',f: 'Independiente' },
    madrugador:   { m: 'Madrugador',   f: 'Madrugadora' },
    nocturno:     { m: 'Nocturno',     f: 'Nocturna' },
    somnoliento:  { m: 'Somnoliento',  f: 'Somnolienta' },
    descansado:   { m: 'Descansado',   f: 'Descansada' },
    dormilon:     { m: 'Dormilón',     f: 'Dormilona' },
    casual:       { m: 'Casual',       f: 'Casual' },
    aficionado:   { m: 'Aficionado',   f: 'Aficionada' },
    hardcore:     { m: 'Hardcore',     f: 'Hardcore' },
    melodico:     { m: 'Melódico',     f: 'Melódica' },
    silencioso:   { m: 'Silencioso',   f: 'Silenciosa' },
    sensible:     { m: 'Sensible',     f: 'Sensible' },
    duro:         { m: 'Duro',         f: 'Dura' },
    fiestero:     { m: 'Fiestero',     f: 'Fiestera' },
    alternativo:  { m: 'Alternativo',  f: 'Alternativa' },
    valiente:     { m: 'Valiente',     f: 'Valiente' },
    escrupuloso:  { m: 'Escrupuloso',  f: 'Escrupulosa' }
};

// Sustantivos con género
const SUSTANTIVOS_NOMBRE = [
    { nombre: 'Ustaquio',     genero: 'm' },
    { nombre: 'Anacleta',     genero: 'f' },
    { nombre: 'Herminia',     genero: 'f' },
    { nombre: 'Cirilo',       genero: 'm' },
    { nombre: 'Filomena',     genero: 'f' },
    { nombre: 'Segismundo',   genero: 'm' },
    { nombre: 'Petronila',    genero: 'f' },
    { nombre: 'Bartolo',      genero: 'm' },
    { nombre: 'Eustaquia',    genero: 'f' },
    { nombre: 'Melquíades',   genero: 'm' },
    { nombre: 'Rosalinda',    genero: 'f' },
    { nombre: 'Casimiro',     genero: 'm' },
    { nombre: 'Encarnación',  genero: 'f' },
    { nombre: 'Wenceslao',    genero: 'm' },
    { nombre: 'Trinidad',     genero: 'f' },
    { nombre: 'Hermenegildo', genero: 'm' },
    { nombre: 'Dorotea',      genero: 'f' },
    { nombre: 'Ceferino',     genero: 'm' },
    { nombre: 'Baldomero',    genero: 'm' },
    { nombre: 'Genoveva',     genero: 'f' },
    { nombre: 'Aniceto',      genero: 'm' },
    { nombre: 'Sinforosa',    genero: 'f' },
    { nombre: 'Prudencio',    genero: 'm' },
    { nombre: 'Escolástica',  genero: 'f' },
    { nombre: 'Teodulfo',     genero: 'm' },
    { nombre: 'Remedios',     genero: 'f' },
    { nombre: 'Fulgencio',    genero: 'm' },
    { nombre: 'Perpetua',     genero: 'f' }
];

const NUM_PREGUNTAS_TEST = 5;

// Estado interno del test
let testNombreEstado = null;

// ----------------------------------------------------------------
// Entrada principal
// ----------------------------------------------------------------
function iniciarTestNombreFiesta() {
    testNombreEstado = {
        preguntasElegidas: barajarNombres(PREGUNTAS_NOMBRE).slice(0, NUM_PREGUNTAS_TEST),
        indiceActual: 0,
        adjetivosSumados: [],
        fase: 'intro'
    };
    renderIntroTestNombre();
}

// ----------------------------------------------------------------
// Pantalla de introducción
// ----------------------------------------------------------------
function renderIntroTestNombre() {
    setTituloJuego('Descubre tu nombre de fiesta');

    renderVista(`
        <div class="pantalla-juego">
            <div class="tarjeta-central tarjeta-intro-test">
                <div class="emoji-grande-test">🎉</div>
                <h2>¡Vamos a descubrir tu nombre de fiesta!</h2>
                <p class="subtexto" style="margin-top:10px;">
                    Responde ${NUM_PREGUNTAS_TEST} preguntas rápidas y te asignamos un nombre único.
                </p>
                <button class="btn-principal" style="margin-top:20px;" id="btn-empezar-test">
                    ¡Vamos allá!
                </button>
                <button class="btn-secundario" style="margin-top:10px;" id="btn-saltar-test">
                    Prefiero escribir mi nombre yo
                </button>
            </div>
        </div>
    `);

    document.getElementById('btn-empezar-test').addEventListener('click', () => {
        testNombreEstado.fase = 'preguntas';
        testNombreEstado.indiceActual = 0;
        renderPreguntaTestNombre();
    });
    document.getElementById('btn-saltar-test').addEventListener('click', renderEscribirNombrePropio);
}

// ----------------------------------------------------------------
// Pantalla de cada pregunta
// ----------------------------------------------------------------
function renderPreguntaTestNombre() {
    const { preguntasElegidas, indiceActual } = testNombreEstado;
    const pregunta = preguntasElegidas[indiceActual];
    const progreso = ((indiceActual) / NUM_PREGUNTAS_TEST) * 100;

    const botonesOpciones = pregunta.opciones.map((op, i) => `
        <button class="btn-opcion-test" data-idx="${i}">
            ${op.texto}
        </button>
    `).join('');

    renderVista(`
        <div class="pantalla-juego">
            <div class="progreso-test">
                <div class="progreso-test-texto">
                    Pregunta ${indiceActual + 1} de ${NUM_PREGUNTAS_TEST}
                </div>
                <div class="progreso-test-barra">
                    <div class="progreso-test-relleno" style="width:${progreso}%"></div>
                </div>
            </div>
            <div class="tarjeta-central tarjeta-pregunta-test">
                <div class="emoji-grande-test">${pregunta.emoji}</div>
                <p class="texto-pregunta-test">${pregunta.texto}</p>
                <div class="opciones-test">${botonesOpciones}</div>
            </div>
        </div>
    `);

    document.querySelectorAll('.btn-opcion-test').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.idx);
            const adjetivoElegido = pregunta.opciones[idx].adjetivo;
            testNombreEstado.adjetivosSumados.push(adjetivoElegido);
            testNombreEstado.indiceActual++;

            if (testNombreEstado.indiceActual >= NUM_PREGUNTAS_TEST) {
                calcularYMostrarNombreFiesta();
            } else {
                renderPreguntaTestNombre();
            }
        });
    });
}

// ----------------------------------------------------------------
// Calcular y mostrar el nombre final
// ----------------------------------------------------------------
function calcularYMostrarNombreFiesta() {
    const adjetivoKey = elegirAdjetivoGanador(testNombreEstado.adjetivosSumados);
    const sustantivo = SUSTANTIVOS_NOMBRE[Math.floor(Math.random() * SUSTANTIVOS_NOMBRE.length)];
    const adjetivoFinal = ADJETIVOS[adjetivoKey][sustantivo.genero];

    testNombreEstado.adjetivoKey = adjetivoKey;
    testNombreEstado.sustantivo = sustantivo;

    const nombreCompleto = `${sustantivo.nombre} ${adjetivoFinal}`;
    testNombreEstado.nombreCompleto = nombreCompleto;

    setTituloJuego('Tu nombre de fiesta');
    renderVista(`
        <div class="pantalla-juego">
            <div class="tarjeta-central tarjeta-resultado-test">
                <p class="subtexto" style="margin-bottom:8px;">🎉 Tu nombre de fiesta es:</p>
                <div class="nombre-final-test">${nombreCompleto}</div>
                <div class="botones-resultado-test">
                    <button class="btn-principal" id="btn-aceptar-nombre">
                        ¡Me lo quedo!
                    </button>
                    <button class="btn-secundario" id="btn-otro-nombre">
                        🎲 Probar otro
                    </button>
                    <button class="btn-secundario" id="btn-escribir-propio-final">
                        ✏️ Escribir mi nombre
                    </button>
                </div>
            </div>
        </div>
    `);

    document.getElementById('btn-aceptar-nombre').addEventListener('click', () => {
        guardarNombreFiestaYContinuar(nombreCompleto);
    });

    document.getElementById('btn-otro-nombre').addEventListener('click', () => {
        // Mismo test, nueva tirada de sustantivo y adjetivo
        const nuevoSustantivo = SUSTANTIVOS_NOMBRE[Math.floor(Math.random() * SUSTANTIVOS_NOMBRE.length)];
        const nuevoAdjetivo = ADJETIVOS[adjetivoKey][nuevoSustantivo.genero];
        const nuevoNombre = `${nuevoSustantivo.nombre} ${nuevoAdjetivo}`;
        testNombreEstado.nombreCompleto = nuevoNombre;
        testNombreEstado.sustantivo = nuevoSustantivo;
        // Repintar la misma pantalla con el nuevo nombre
        renderVista(`
            <div class="pantalla-juego">
                <div class="tarjeta-central tarjeta-resultado-test">
                    <p class="subtexto" style="margin-bottom:8px;">🎉 Tu nombre de fiesta es:</p>
                    <div class="nombre-final-test">${nuevoNombre}</div>
                    <div class="botones-resultado-test">
                        <button class="btn-principal" id="btn-aceptar-nombre">
                            ¡Me lo quedo!
                        </button>
                        <button class="btn-secundario" id="btn-otro-nombre">
                            🎲 Probar otro
                        </button>
                        <button class="btn-secundario" id="btn-escribir-propio-final">
                            ✏️ Escribir mi nombre
                        </button>
                    </div>
                </div>
            </div>
        `);
        document.getElementById('btn-aceptar-nombre').addEventListener('click', () => {
            guardarNombreFiestaYContinuar(nuevoNombre);
        });
        document.getElementById('btn-otro-nombre').addEventListener('click', () => {
            document.getElementById('btn-otro-nombre').click(); // recursivo
        });
        document.getElementById('btn-escribir-propio-final').addEventListener('click', renderEscribirNombrePropio);
    });

    document.getElementById('btn-escribir-propio-final').addEventListener('click', renderEscribirNombrePropio);
}

// ----------------------------------------------------------------
// Pantalla: escribir el nombre a mano
// ----------------------------------------------------------------
function renderEscribirNombrePropio() {
    const actual = (cargarJugadoresGuardados() || [''])[0];

    setTituloJuego('Elige tu nombre');
    renderVista(`
        <div class="pantalla-juego">
            <div class="tarjeta-central">
                <h2>✏️ Escribe tu nombre</h2>
                <p class="subtexto" style="margin-top:8px;">Como quieras que te vean tus amigos</p>
                <input type="text" id="input-nombre-propio" class="input-personaje-secreto"
                       placeholder="Tu nombre" maxlength="16" value="${actual}" autocomplete="off" style="margin-top:16px;" />
                <div class="botones-resultado-test">
                    <button class="btn-principal" id="btn-confirmar-nombre-propio">Continuar</button>
                    <button class="btn-secundario" id="btn-volver-test">🎲 Hacer el test</button>
                </div>
            </div>
        </div>
    `);

    const input = document.getElementById('input-nombre-propio');
    input.focus();
    const confirmar = () => {
        const nombre = input.value.trim();
        if (nombre.length < 2) {
            logEvento('⚠️ Escribe un nombre válido antes de continuar.');
            return;
        }
        guardarNombreFiestaYContinuar(nombre);
    };
    document.getElementById('btn-confirmar-nombre-propio').addEventListener('click', confirmar);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') confirmar(); });
    document.getElementById('btn-volver-test').addEventListener('click', iniciarTestNombreFiesta);
}

// ----------------------------------------------------------------
// Guardar el nombre y continuar
// ----------------------------------------------------------------
function guardarNombreFiestaYContinuar(nombre) {
    const listaActual = cargarJugadoresGuardados() || [];
    listaActual[0] = nombre;
    guardarJugadoresGuardados(listaActual.length > 0 ? listaActual : [nombre]);

    aplicarPersonalizacionPanel();
    if (typeof mostrarMisCifras === 'function') {
        // Refrescar el ranking personal si ya se ha cargado
        clienteSupabase && cargarRankings && cargarRankings();
    }
    logEvento(`🎉 ¡Bienvenido, ${nombre}!`);
    mostrarSelectorJuegos();
}

// ----------------------------------------------------------------
// Menú para cambiar nombre (al pulsar el nombre en la cabecera)
// ----------------------------------------------------------------
function abrirMenuNombre() {
    const jugadores = cargarJugadoresGuardados();
    if (!jugadores || jugadores.length === 0) {
        iniciarTestNombreFiesta();
        return;
    }

    const nombreActual = jugadores[0];
    setTituloJuego('Tu nombre');
    renderVista(`
        <div class="pantalla-juego">
            <div class="tarjeta-central">
                <h2>👤 ${nombreActual}</h2>
                <p class="subtexto" style="margin-top:8px;">¿Qué quieres hacer?</p>
                <div class="botones-resultado-test">
                    <button class="btn-principal" id="btn-hacer-test-otra-vez">🎲 Hacer el test otra vez</button>
                    <button class="btn-secundario" id="btn-cambiar-nombre-mano">✏️ Escribir otro nombre</button>
                    <button class="btn-secundario" id="btn-volver-menu-nombre">← Volver</button>
                </div>
            </div>
        </div>
    `);

    document.getElementById('btn-hacer-test-otra-vez').addEventListener('click', iniciarTestNombreFiesta);
    document.getElementById('btn-cambiar-nombre-mano').addEventListener('click', renderEscribirNombrePropio);
    document.getElementById('btn-volver-menu-nombre').addEventListener('click', mostrarSelectorJuegos);
}

// ----------------------------------------------------------------
// Utilidades
// ----------------------------------------------------------------
function elegirAdjetivoGanador(listaAdjetivos) {
    // Contar repeticiones
    const cuenta = {};
    listaAdjetivos.forEach(a => { cuenta[a] = (cuenta[a] || 0) + 1; });

    // Encontrar el máximo
    const max = Math.max(...Object.values(cuenta));
    const ganadores = Object.keys(cuenta).filter(a => cuenta[a] === max);

    // Si hay empate, elegir uno al azar
    return ganadores[Math.floor(Math.random() * ganadores.length)];
}

function barajarNombres(arr) {
    const copia = [...arr];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}