// ================================================================
// AHORCADO EN EQUIPO — ESTADO Y FLUJO DEL JUEGO
// ================================================================
let partidaAhorcado = null;
const INTENTOS_MAX_AHORCADO = 6;
const ETAPAS_AHORCADO = ['😀', '😐', '😟', '😨', '😰', '😵', '💀'];
const ALFABETO = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

function crearPartidaAhorcado() {
    partidaAhorcado = {
        nombreQuienEscribe: '',
        palabraSecreta: '',
        letrasUsadas: [],
        fallos: 0,
        fase: 'configuracion'
    };
    renderConfiguracionAhorcado();
}

// ----------------------------------------------------------------
// FASE 1: QUIÉN ESCRIBE
// ----------------------------------------------------------------
function renderConfiguracionAhorcado() {
    setTituloJuego('Ahorcado — Preparando partida');
    actualizarPanelJugadores([], -1);

    renderVista(`
        <div class="pantalla-juego">
            <button class="btn-volver" id="btn-volver-selector-ah">← Volver a minijuegos</button>
            <h2>🎯 ¿Quién va a escribir la palabra?</h2>
            <p class="subtexto">El resto del grupo intentará adivinarla en equipo</p>
            <div class="tarjeta-central">
                <div class="fila-nombre">
                    <input type="text" id="input-nombre-escritor" placeholder="Nombre de quien escribe" maxlength="16" />
                </div>
                <button class="btn-principal" style="margin-top:14px;" id="btn-pasar-a-escribir">Pasarle el dispositivo</button>
            </div>
        </div>
    `);

    document.getElementById('btn-volver-selector-ah').onclick = mostrarSelectorJuegos;
    document.getElementById('btn-pasar-a-escribir').addEventListener('click', () => {
        const nombre = document.getElementById('input-nombre-escritor').value.trim() || 'El escritor';
        partidaAhorcado.nombreQuienEscribe = nombre;
        renderPaseParaEscribir();
    });
}

// ----------------------------------------------------------------
// FASE 2: ESCRIBIR LA PALABRA EN SECRETO
// ----------------------------------------------------------------
function renderPaseParaEscribir() {
    renderVista(`
        <div class="pantalla-juego">
            <h2>📱 Pasa el dispositivo</h2>
            <div class="tarjeta-central pase-dispositivo">
                <div class="icono-pase">🤫</div>
                <div class="nombre-jugador-grande">Entrégaselo a ${partidaAhorcado.nombreQuienEscribe}</div>
                <p class="subtexto" style="margin-top:8px;">Que nadie más mire la pantalla</p>
                <button class="btn-principal" style="margin-top:20px;" id="btn-escribir-palabra">Soy yo, quiero escribir la palabra</button>
            </div>
        </div>
    `);
    document.getElementById('btn-escribir-palabra').addEventListener('click', renderEntradaPalabra);
}

function renderEntradaPalabra() {
    renderVista(`
        <div class="pantalla-juego">
            <h2>✍️ Escribe la palabra secreta</h2>
            <p class="subtexto">Solo letras, sin espacios especiales raros. Nadie más debería estar mirando.</p>
            <div class="tarjeta-central">
                <input type="password" id="input-palabra-secreta" class="input-palabra-secreta" placeholder="••••••" maxlength="20" autocomplete="off" />
                <button class="btn-principal" style="margin-top:16px;" id="btn-confirmar-palabra">Confirmar y ocultar</button>
            </div>
        </div>
    `);

    const input = document.getElementById('input-palabra-secreta');
    input.focus();
    document.getElementById('btn-confirmar-palabra').addEventListener('click', () => {
        const palabra = input.value.trim().toUpperCase();
        if (palabra.length < 2) {
            logEvento('⚠️ Escribe una palabra válida antes de continuar.');
            return;
        }
        partidaAhorcado.palabraSecreta = palabra;
        partidaAhorcado.fase = 'adivinando';
        logEvento(`🎯 ${partidaAhorcado.nombreQuienEscribe} ha elegido una palabra de ${palabra.length} letras.`);
        renderAviso(() => renderJuegoAhorcado());
    });
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') document.getElementById('btn-confirmar-palabra').click();
    });
}

function renderAviso(callbackContinuar) {
    renderVista(`
        <div class="pantalla-juego">
            <h2>📱 Ahora pásalo al grupo</h2>
            <div class="tarjeta-central pase-dispositivo">
                <div class="icono-pase">👥</div>
                <p class="subtexto">Dejad el dispositivo en el centro. Todos podéis ver el tablero y decir letras en voz alta.</p>
                <button class="btn-principal" style="margin-top:16px;" id="btn-empezar-a-adivinar">Empezar a adivinar</button>
            </div>
        </div>
    `);
    document.getElementById('btn-empezar-a-adivinar').addEventListener('click', callbackContinuar);
}

// ----------------------------------------------------------------
// FASE 3: ADIVINAR EN EQUIPO
// ----------------------------------------------------------------
function renderJuegoAhorcado() {
    setTituloJuego('Ahorcado — Adivinando en equipo');
    const palabra = partidaAhorcado.palabraSecreta;
    const usadas = partidaAhorcado.letrasUsadas;

    const huecos = palabra.split('').map(letra => {
        if (letra === ' ') return `<div class="letra-hueco espacio"></div>`;
        return `<div class="letra-hueco">${usadas.includes(letra) ? letra : ''}</div>`;
    }).join('');

    const teclas = ALFABETO.map(letra => {
        let clase = '';
        if (usadas.includes(letra)) clase = palabra.includes(letra) ? 'acertada' : 'fallada';
        return `<button data-letra="${letra}" class="${clase}" ${usadas.includes(letra) ? 'disabled' : ''}>${letra}</button>`;
    }).join('');

    const perdidas = palabra.split('').every(l => l === ' ' || usadas.includes(l));
    const ganaron = perdidas;
    const perdieron = partidaAhorcado.fallos >= INTENTOS_MAX_AHORCADO;

    renderVista(`
        <div class="pantalla-juego">
            <h2>🎯 Adivinad la palabra</h2>
            <div class="tarjeta-central">
                <div class="dibujo-ahorcado">${ETAPAS_AHORCADO[Math.min(partidaAhorcado.fallos, ETAPAS_AHORCADO.length - 1)]}</div>
                <div class="intentos-restantes">Fallos: ${partidaAhorcado.fallos} / ${INTENTOS_MAX_AHORCADO}</div>
                <div class="palabra-oculta">${huecos}</div>
                ${!ganaron && !perdieron ? `<div class="teclado-ahorcado">${teclas}</div>` : ''}
                ${ganaron ? `<p style="color:var(--gold-dark); font-weight:700; margin-top:10px;">🎉 ¡Lo habéis adivinado!</p>` : ''}
                ${perdieron ? `<p style="color:#e05252; font-weight:700; margin-top:10px;">💀 Sin intentos. Era: ${palabra}</p>` : ''}
            </div>
            ${ganaron || perdieron ? `
                <div style="display:flex; gap:10px; justify-content:center;">
                    <button class="btn-secundario" id="btn-otra-ahorcado">Jugar otra palabra</button>
                    <button class="btn-principal" id="btn-volver-menu-ahorcado">Volver al menú</button>
                </div>
            ` : ''}
        </div>
    `);

    if (!ganaron && !perdieron) {
        document.querySelectorAll('.teclado-ahorcado button').forEach(btn => {
            btn.addEventListener('click', () => {
                const letra = btn.dataset.letra;
                if (partidaAhorcado.letrasUsadas.includes(letra)) return;
                partidaAhorcado.letrasUsadas.push(letra);
                if (!palabra.includes(letra)) partidaAhorcado.fallos++;
                renderJuegoAhorcado();
            });
        });
    }

    if (ganaron || perdieron) {
        if (!partidaAhorcado.registrada) {
            partidaAhorcado.registrada = true;
            logEvento(ganaron ? '✅ El equipo ha ganado la partida de Ahorcado' : '💀 El equipo ha perdido esta ronda de Ahorcado');
            registrarPartidaCompletada();
        }
        document.getElementById('btn-otra-ahorcado').addEventListener('click', crearPartidaAhorcado);
        document.getElementById('btn-volver-menu-ahorcado').addEventListener('click', mostrarSelectorJuegos);
    }
}