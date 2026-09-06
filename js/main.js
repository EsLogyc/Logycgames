// ================================================================
// UTILIDADES DE RENDER Y LOG
// ================================================================
function renderVista(html) {
    document.getElementById('vista-juego').innerHTML = html;
}

function setTituloJuego(texto) {
    document.getElementById('titulo-juego-actual').textContent = texto;
}

function logEvento(texto) {
    const cont = document.getElementById('chat-mensajes');
    const div = document.createElement('div');
    div.className = 'msg sistema';
    div.textContent = texto;
    cont.appendChild(div);
    cont.scrollTop = cont.scrollHeight;
}

// ================================================================
// SELECTOR DE MINIJUEGOS (pantalla inicial)
// ================================================================
function mostrarSelectorJuegos() {
    setTituloJuego('Elige un minijuego');
    actualizarPanelJugadores([], -1);

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
// SISTEMA DE PROGRESIÓN (localStorage)
// ================================================================
const CLAVE_PROGRESO = 'fiesta_progreso';
const META_PARTIDAS = 10;

function cargarProgreso() {
    try {
        const datos = localStorage.getItem(CLAVE_PROGRESO);
        if (datos) return JSON.parse(datos);
    } catch (e) { /* localStorage no disponible */ }
    return { partidasJugadas: 0, mejorasDesbloqueadas: [] };
}

function guardarProgreso(progreso) {
    try {
        localStorage.setItem(CLAVE_PROGRESO, JSON.stringify(progreso));
    } catch (e) { /* almacenamiento no disponible, seguimos sin persistencia */ }
}

function registrarPartidaCompletada() {
    const progreso = cargarProgreso();
    progreso.partidasJugadas++;

    const yaDesbloqueada = progreso.mejorasDesbloqueadas.includes(progreso.partidasJugadas);
    if (!yaDesbloqueada && progreso.partidasJugadas <= META_PARTIDAS) {
        progreso.mejorasDesbloqueadas.push(progreso.partidasJugadas);
        logEvento(`🔓 ¡Nueva mejora desbloqueada! (partida ${progreso.partidasJugadas}/${META_PARTIDAS})`);
    }

    guardarProgreso(progreso);
    aplicarProgresoUI(progreso);
}

function aplicarProgresoUI(progreso) {
    const pct = Math.min(100, Math.round((progreso.partidasJugadas / META_PARTIDAS) * 100));

    ['barra-progreso', 'barra-progreso-movil'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.width = pct + '%';
    });
    ['detalle-progreso', 'detalle-progreso-movil'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = `${progreso.partidasJugadas} / ${META_PARTIDAS} partidas`;
    });
    ['detalle-porcentaje', 'detalle-porcentaje-movil'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = pct + '%';
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
    columnaIzquierda.classList.toggle('hidden-left');
    this.classList.toggle('panel-oculto', columnaIzquierda.classList.contains('hidden-left'));
});

toggleChatBtn.addEventListener('click', function () {
    columnaDerecha.classList.toggle('hidden-chat');
    this.classList.toggle('chat-oculto', columnaDerecha.classList.contains('hidden-chat'));
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
mostrarSelectorJuegos();
console.log('🎉 Plataforma de minijuegos — cargada');
