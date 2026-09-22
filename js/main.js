// ================================================================
// UTILIDADES DE RENDER Y LOG
// ================================================================
function mezclarOpcionesPregunta(preg) {
    const indices = preg.opciones.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    const opcionesMezcladas = indices.map(i => preg.opciones[i]);
    const nuevaCorrecta = indices.indexOf(preg.correcta);
    return { ...preg, opciones: opcionesMezcladas, correcta: nuevaCorrecta };
}

function renderVista(html) {
    document.getElementById('vista-juego').innerHTML = html;
}

function setTituloJuego(texto) {
    document.getElementById('titulo-juego-actual').textContent = texto;
}

function logEvento(texto) {
    const cont = document.getElementById('chat-mensajes');
    const div = document.createElement('div');
    let clase = 'msg sistema';
    if (texto.startsWith('✅')) clase += ' evento-acierto';
    else if (texto.startsWith('❌') || texto.startsWith('💀')) clase += ' evento-fallo';
    else if (texto.startsWith('🔓') || texto.startsWith('🏁') || texto.startsWith('🏆')) clase += ' evento-desbloqueo';
    div.className = clase;
    div.textContent = texto;
    cont.appendChild(div);
    cont.scrollTop = cont.scrollHeight;
}

// ================================================================
// COMPARTIR RESULTADO EN REDES / WHATSAPP
// ================================================================
function compartirResultado(texto) {
    const url = window.location.href;
    if (navigator.share) {
        navigator.share({ title: 'Minijuegos de fiesta', text: texto, url }).catch(() => { /* cancelado por el usuario, no pasa nada */ });
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(`${texto} ${url}`)
            .then(() => logEvento('📋 Resultado copiado. Pégalo donde quieras compartirlo.'))
            .catch(() => logEvento('⚠️ No se pudo copiar el resultado.'));
    } else {
        logEvento('⚠️ Compartir no está disponible en este navegador.');
    }
}

// ================================================================
// BIENVENIDA: PEDIR NOMBRE AL ENTRAR POR PRIMERA VEZ
// ================================================================
const BANCO_NOMBRES_ABSURDOS = [
    'Ustaquio', 'Anacleta', 'Herminia', 'Cirilo', 'Filomena', 'Segismundo', 'Petronila',
    'Bartolo', 'Eustaquia', 'Melquíades', 'Rosalinda', 'Casimiro', 'Encarnación', 'Wenceslao',
    'Trinidad', 'Hermenegildo', 'Dorotea', 'Ceferino', 'Baldomero', 'Genoveva', 'Aniceto',
    'Sinforosa', 'Prudencio', 'Escolástica', 'Teodulfo', 'Remedios', 'Fulgencio', 'Perpetua'
];

function obtenerNombreAbsurdo() {
    return BANCO_NOMBRES_ABSURDOS[Math.floor(Math.random() * BANCO_NOMBRES_ABSURDOS.length)];
}

function renderBienvenidaNombre() {
    const nombreActual = (cargarJugadoresGuardados() || [''])[0];

    renderVista(`
        <div class="pantalla-juego">
            <h2>👋 ¿Cómo te llamas?</h2>
            <p class="subtexto">Así te reconoceremos cada vez que entres en esta plataforma</p>
            <div class="tarjeta-central">
                <input type="text" id="input-nombre-bienvenida" class="input-personaje-secreto" placeholder="Tu nombre" maxlength="16" value="${nombreActual}" autocomplete="off" />
                <div style="margin-top:10px;">
                    <button class="btn-secundario" id="btn-nombre-absurdo">🎲 Nombre absurdo</button>
                </div>
                <button class="btn-principal" style="margin-top:16px;" id="btn-confirmar-nombre-bienvenida">Continuar</button>
            </div>
        </div>
    `);

    const input = document.getElementById('input-nombre-bienvenida');
    input.focus();
    document.getElementById('btn-nombre-absurdo').addEventListener('click', () => {
        input.value = obtenerNombreAbsurdo();
        input.focus();
    });
    const confirmar = () => {
        const nombre = input.value.trim();
        if (nombre.length < 2) {
            logEvento('⚠️ Escribe un nombre válido antes de continuar.');
            return;
        }
        const listaActual = cargarJugadoresGuardados() || [];
        listaActual[0] = nombre;
        guardarJugadoresGuardados(listaActual.length > 0 ? listaActual : [nombre]);
        aplicarPersonalizacionPanel();
        mostrarSelectorJuegos();
    };
    document.getElementById('btn-confirmar-nombre-bienvenida').addEventListener('click', confirmar);
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') confirmar();
    });
}

// ================================================================
// SELECTOR DE MINIJUEGOS (pantalla inicial)
// ================================================================
function mostrarSelectorJuegos() {
    setTituloJuego('Elige un minijuego');
    actualizarPanelJugadores([], -1);
    aplicarPersonalizacionPanel();

    const tarjetas = CATALOGO_JUEGOS.map(juego => `
        <div class="juego-card ${juego.disponible ? '' : 'proximamente'}" data-id="${juego.id}">
            <div class="icono">${juego.icono}</div>
            <h3>${juego.nombre}</h3>
            <p>${juego.descripcion}</p>
            ${!juego.disponible ? '<span class="badge-proximamente">Próximamente</span>' : ''}
        </div>
    `).join('');

    renderVista(`
        <div style="max-width: 900px; margin: 0 auto;">
            <div id="galeria-header" style="justify-content:flex-start; text-align:left; flex-direction:column; align-items:flex-start; gap:4px; margin-bottom:24px;">
                <h2 style="font-size:1.3rem;">🎉 ¿A qué jugamos?</h2>
                <span style="font-size:0.85rem; color:var(--text-secondary);">Pasad el dispositivo entre todos. Nada de cuentas, nada de internet.</span>
            </div>
            <div id="selector-juegos">${tarjetas}</div>
        </div>
    `);

    document.querySelectorAll('.juego-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            const juego = CATALOGO_JUEGOS.find(j => j.id === id);
            if (!juego.disponible) return;
            registrarUltimoJuego(juego.nombre);
            if (id === 'impostor') {
                crearPartidaImpostor();
            } else if (id === 'ahorcado') {
                crearPartidaAhorcado();
            } else if (id === 'trivial') {
                crearPartidaTrivial();
            } else if (id === 'pasapalabra') {
                crearPartidaPasapalabra();
            } else if (id === 'trivialperros') {
                crearPartidaTrivialPerros();
            } else if (id === 'quiensoy') {
                crearPartidaQuienSoy();
            } else if (id === 'codigo') {
                crearPartidaCodigo();
            }
        });
    });
}

// ================================================================
// PANEL IZQUIERDO: JUGADORES ACTIVOS
// ================================================================
function actualizarPanelJugadores(jugadores, turnoActualIdx) {
    const destinos = [
        document.getElementById('lista-jugadores-panel'),
        document.getElementById('lista-jugadores-panel-movil')
    ];
    destinos.forEach(el => {
        if (!el) return;
        if (jugadores.length === 0) {
            el.innerHTML = '<span class="vacio">Aún no hay partida activa</span>';
            return;
        }
        el.innerHTML = jugadores.map((nombre, i) =>
            `<span class="jugador-chip ${i === turnoActualIdx ? 'turno-actual' : ''}">${nombre}</span>`
        ).join('');
    });
}

// ================================================================
// LISTA DE JUGADORES COMPARTIDA ENTRE TODOS LOS JUEGOS
// ================================================================
const CLAVE_JUGADORES = 'fiesta_jugadores';

function cargarJugadoresGuardados() {
    try {
        const datos = localStorage.getItem(CLAVE_JUGADORES);
        if (datos) {
            const lista = JSON.parse(datos);
            if (Array.isArray(lista) && lista.length > 0) return lista;
        }
    } catch (e) { /* localStorage no disponible */ }
    return null;
}

function guardarJugadoresGuardados(lista) {
    try {
        const limpios = lista.map(n => n.trim()).filter(n => n !== '');
        if (limpios.length > 0) localStorage.setItem(CLAVE_JUGADORES, JSON.stringify(limpios));
    } catch (e) { /* almacenamiento no disponible, seguimos sin persistencia */ }
}

// ================================================================
// PERSONALIZACIÓN DEL PANEL: SALUDO Y ÚLTIMA PARTIDA
// ================================================================
const CLAVE_ULTIMO_JUEGO = 'fiesta_ultimo_juego';

function registrarUltimoJuego(nombreJuego) {
    try {
        localStorage.setItem(CLAVE_ULTIMO_JUEGO, JSON.stringify({ nombre: nombreJuego, fecha: Date.now() }));
    } catch (e) { /* almacenamiento no disponible */ }
}

function formatearFechaRelativa(timestamp) {
    const ahora = Date.now();
    const diffMs = ahora - timestamp;
    const diffMin = Math.floor(diffMs / 60000);
    const diffHoras = Math.floor(diffMin / 60);
    const diffDias = Math.floor(diffHoras / 24);

    if (diffMin < 5) return 'hace un momento';
    if (diffMin < 60) return `hace ${diffMin} min`;
    if (diffHoras < 24) return `hace ${diffHoras}h`;
    if (diffDias === 1) return 'ayer';
    if (diffDias < 7) return `hace ${diffDias} días`;
    return new Date(timestamp).toLocaleDateString('es-ES');
}

function aplicarPersonalizacionPanel() {
    const jugadoresGuardados = cargarJugadoresGuardados();
    const nombreEl = document.getElementById('nombre-sesion');
    const nombreMovilEl = document.getElementById('nombre-sesion-movil');
    const saludo = jugadoresGuardados ? `¡Hola, ${jugadoresGuardados[0]}!` : 'Sesión de fiesta';
    if (nombreEl) nombreEl.textContent = saludo;
    if (nombreMovilEl) nombreMovilEl.textContent = saludo;
    const usuarioEl = document.getElementById('nombre-usuario');
    if (usuarioEl) {
        usuarioEl.textContent = jugadoresGuardados ? `👤 ${jugadoresGuardados[0]}` : '👤 Anfitrión';
    }

    const bloqueUltimo = document.getElementById('bloque-ultimo-juego');
    const textoUltimo = document.getElementById('texto-ultimo-juego');
    if (bloqueUltimo && textoUltimo) {
        try {
            const datos = localStorage.getItem(CLAVE_ULTIMO_JUEGO);
            if (datos) {
                const { nombre, fecha } = JSON.parse(datos);
                textoUltimo.textContent = `${nombre} · ${formatearFechaRelativa(fecha)}`;
                bloqueUltimo.style.display = 'block';
            }
        } catch (e) { /* sin datos, se queda oculto */ }
    }
}

// ================================================================
// SISTEMA DE PROGRESIÓN (localStorage)
// ================================================================
const CLAVE_PROGRESO = 'fiesta_progreso';
const META_PARTIDAS = 10;

function cargarProgreso() {
    try {
        const datos = localStorage.getItem(CLAVE_PROGRESO);
        if (datos) return JSON.parse(datos);
    } catch (e) { /* localStorage no disponible */ }
    return { partidasJugadas: 0, partidasGanadas: 0, mejorasDesbloqueadas: [] };
}

function guardarProgreso(progreso) {
    try {
        localStorage.setItem(CLAVE_PROGRESO, JSON.stringify(progreso));
    } catch (e) { /* almacenamiento no disponible, seguimos sin persistencia */ }
}

function registrarPartidaCompletada() {
    const progreso = cargarProgreso();
    if (typeof progreso.partidasGanadas !== 'number') progreso.partidasGanadas = 0;
    progreso.partidasJugadas++;

    const yaDesbloqueada = progreso.mejorasDesbloqueadas.includes(progreso.partidasJugadas);
    if (!yaDesbloqueada && progreso.partidasJugadas <= META_PARTIDAS) {
        progreso.mejorasDesbloqueadas.push(progreso.partidasJugadas);
        logEvento(`🔓 ¡Nueva mejora desbloqueada! (partida ${progreso.partidasJugadas}/${META_PARTIDAS})`);
    }

    guardarProgreso(progreso);
    aplicarProgresoUI(progreso);
}

// Solo se llama desde los juegos que tienen un desenlace claro de "victoria"
// (Adivina el Código, Ahorcado en equipo, Impostor cuando descubren al impostor).
// Los juegos de puntuación (Trivial, Definiciones) no suman aquí porque no
// tienen un "ganar/perder" binario tan claro.
function registrarVictoria() {
    const progreso = cargarProgreso();
    if (typeof progreso.partidasGanadas !== 'number') progreso.partidasGanadas = 0;
    progreso.partidasGanadas++;
    guardarProgreso(progreso);
    aplicarProgresoUI(progreso);
}

function aplicarProgresoUI(progreso) {
    const pct = Math.min(100, Math.round((progreso.partidasJugadas / META_PARTIDAS) * 100));
    const ganadas = progreso.partidasGanadas || 0;

    ['avatar-anillo', 'avatar-anillo-movil'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.setProperty('--pct', pct);
    });
    const emojiAvatar = progreso.partidasJugadas === 0 ? '🎉'
        : progreso.partidasJugadas < 4 ? '🥳'
        : progreso.partidasJugadas < 8 ? '🎊'
        : '🏆';
    ['avatar-inner', 'avatar-inner-movil'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = emojiAvatar;
    });
    ['detalle-progreso', 'detalle-progreso-movil'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = `🎮 ${progreso.partidasJugadas} jugadas`;
    });
    ['detalle-porcentaje', 'detalle-porcentaje-movil'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = `🏆 ${ganadas} ganadas`;
    });

    const rangoTexto = progreso.partidasJugadas === 0 ? '🔰 Recién empezada'
        : progreso.partidasJugadas < META_PARTIDAS ? '🎉 Sesión en marcha'
        : '🏆 Sesión al máximo';
    ['rango-sesion', 'rango-sesion-movil'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = rangoTexto;
    });

    const listaDesbloqueos = document.getElementById('lista-desbloqueos');
    if (listaDesbloqueos) {
        if (progreso.mejorasDesbloqueadas.length === 0) {
            listaDesbloqueos.innerHTML = '<span class="vacio">Completa tu primera partida para desbloquear algo</span>';
        } else {
            const ultimas = progreso.mejorasDesbloqueadas.slice(-3).reverse();
            listaDesbloqueos.innerHTML = ultimas.map(n =>
                `<div class="item">Mejora nº ${n} desbloqueada</div>`
            ).join('');
        }
    }

    document.body.classList.remove('nivel-1', 'nivel-2', 'nivel-3');
    if (progreso.partidasJugadas >= 1) document.body.classList.add('nivel-1');
    if (progreso.partidasJugadas >= 4) document.body.classList.add('nivel-2');
    if (progreso.partidasJugadas >= 8) document.body.classList.add('nivel-3');
}

// ================================================================
// PANELES LATERALES (mostrar/ocultar, igual que antes)
// ================================================================
const columnaIzquierda = document.getElementById('columna-izquierda');
const columnaDerecha = document.getElementById('columna-derecha');
const toggleLeftBtn = document.getElementById('toggle-left-btn');
const toggleChatBtn = document.getElementById('toggle-chat-btn');
const menuToggle = document.getElementById('menu-toggle');
const mobilePanel = document.getElementById('mobile-left-panel');
const panelOverlay = document.getElementById('panel-overlay');
const cerrarPanelMovil = document.getElementById('cerrar-panel-movil');

toggleLeftBtn.addEventListener('click', function () {
    const esMovil = window.matchMedia('(max-width: 820px)').matches;

    if (esMovil) {
        // En móvil: abrimos el panel lateral izquierdo
        mobilePanel.classList.toggle('open');
        panelOverlay.classList.toggle('open');
    } else {
        // En escritorio: comportamiento clásico
        columnaIzquierda.classList.toggle('hidden-left');
        this.classList.toggle('panel-oculto', columnaIzquierda.classList.contains('hidden-left'));
    }
});

toggleChatBtn.addEventListener('click', function () {
    const esMovil = window.matchMedia('(max-width: 820px)').matches;

    if (esMovil) {
        const overlay = document.getElementById('right-panel-overlay');
        const abierto = columnaDerecha.classList.toggle('open-movil');
        overlay.classList.toggle('open', abierto);
        if (abierto) {
            const cont = document.getElementById('chat-mensajes');
            if (cont) setTimeout(() => cont.scrollTop = cont.scrollHeight, 300);
        }
    } else {
        columnaDerecha.classList.toggle('hidden-chat');
        this.classList.toggle('chat-oculto', columnaDerecha.classList.contains('hidden-chat'));
    }
});

menuToggle.addEventListener('click', function () {
    mobilePanel.classList.toggle('open');
    panelOverlay.classList.toggle('open');
});

function cerrarPanelMovilFn() {
    mobilePanel.classList.remove('open');
    panelOverlay.classList.remove('open');
}
cerrarPanelMovil.addEventListener('click', cerrarPanelMovilFn);
panelOverlay.addEventListener('click', cerrarPanelMovilFn);

// ================================================================
// INICIO
// ================================================================
aplicarProgresoUI(cargarProgreso());
aplicarPersonalizacionPanel();
if (cargarJugadoresGuardados()) {
    mostrarSelectorJuegos();
} else {
    iniciarTestNombreFiesta();
}

document.getElementById('nombre-usuario').style.cursor = 'pointer';
document.getElementById('nombre-usuario').title = 'Toca para cambiar tu nombre';
document.getElementById('nombre-usuario').addEventListener('click', abrirMenuNombre);
console.log('🎉 Plataforma de minijuegos — cargada');

// 👇 Conectar el chat en directo con Supabase
inicializarChat();
inicializarRanking();