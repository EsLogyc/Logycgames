// ================================================================
// PASAPALABRA — ESTADO Y FLUJO (modo cooperativo)
// (los datos están en rosco-data.js)
// ================================================================
let partidaPasapalabra = null;
const TIEMPO_ROSCO_SEGUNDOS = 360;

function crearPartidaPasapalabra() {
    // Elegir una variante aleatoria de cada letra para esta sesión
    const letrasSesion = ROSCO_PASAPALABRA.map(item => {
        const variante = item.variantes[Math.floor(Math.random() * item.variantes.length)];
        return {
            letra: item.letra,
            tipo: item.tipo,
            enunciado: variante.enunciado,
            respuesta: variante.respuesta
        };
    });

    partidaPasapalabra = {
        estados: letrasSesion.map(() => 'pendiente'),
        indiceActivo: -1,
        tiempoRestante: TIEMPO_ROSCO_SEGUNDOS,
        temporizadorId: null,
        fase: 'intro',
        letrasSesion: letrasSesion
    };
    renderIntroPasapalabra();
}

// ----------------------------------------------------------------
// FASE 1: INTRODUCCIÓN
// ----------------------------------------------------------------
function renderIntroPasapalabra() {
    setTituloJuego('Definiciones — Rosco cooperativo');
    actualizarPanelJugadores([], -1);

    renderVista(`
        <div class="pantalla-juego">
            <button class="btn-volver" id="btn-volver-selector-pp">← Volver a minijuegos</button>
            <h2>🔤 Definiciones</h2>
            <p class="subtexto">Todo el grupo juega en equipo contra el mismo rosco. Alguien lee las definiciones en voz alta y decidís juntos si acertáis.</p>
            <div class="tarjeta-central">
                <p style="margin-bottom:10px;">⏱️ Tenéis <strong>${TIEMPO_ROSCO_SEGUNDOS / 60} minutos</strong> para completar las 26 letras.</p>
                <p style="color:var(--text-secondary); font-size:0.85rem;">Tocad una letra para ver su definición, discutid la respuesta, revelad la solución y marcad si acertasteis. Podéis dejar letras difíciles para el final con "Pasapalabra".</p>
            </div>
            <button class="btn-principal" id="btn-empezar-rosco">Empezar rosco 🎬</button>
        </div>
    `);

    document.getElementById('btn-volver-selector-pp').onclick = mostrarSelectorJuegos;
    document.getElementById('btn-empezar-rosco').addEventListener('click', empezarRosco);
}

// ----------------------------------------------------------------
// FASE 2: ROSCO EN JUEGO
// ----------------------------------------------------------------
function empezarRosco() {
    partidaPasapalabra.fase = 'jugando';
    logEvento('🔤 Empieza el rosco de Definiciones en equipo.');
    partidaPasapalabra.temporizadorId = setInterval(tickTemporizadorRosco, 1000);
    renderRoscoGrid();
}

function tickTemporizadorRosco() {
    partidaPasapalabra.tiempoRestante--;
    if (partidaPasapalabra.tiempoRestante <= 0) {
        clearInterval(partidaPasapalabra.temporizadorId);
        partidaPasapalabra.tiempoRestante = 0;
        finalizarRosco();
        return;
    }
    const el = document.getElementById('temporizador-rosco');
    if (el) {
        el.textContent = formatearTiempo(partidaPasapalabra.tiempoRestante);
        el.classList.toggle('urgente', partidaPasapalabra.tiempoRestante <= 30);
    }
}

function formatearTiempo(segundos) {
    const m = Math.floor(segundos / 60);
    const s = segundos % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
}

function renderRoscoGrid() {
    const letras = partidaPasapalabra.letrasSesion.map((item, i) => {
        const estado = partidaPasapalabra.estados[i];
        return `<div class="letra-rosco ${estado !== 'pendiente' ? estado : ''}" data-idx="${i}">${item.letra}</div>`;
    }).join('');

    const aciertos = partidaPasapalabra.estados.filter(e => e === 'acierto').length;
    const fallos = partidaPasapalabra.estados.filter(e => e === 'fallo').length;
    const pendientes = partidaPasapalabra.estados.filter(e => e === 'pendiente' || e === 'pasada').length;

    renderVista(`
        <div class="pantalla-juego">
            <div class="temporizador-rosco" id="temporizador-rosco">${formatearTiempo(partidaPasapalabra.tiempoRestante)}</div>
            <div class="marcador-rosco">
                <span>✅ <strong>${aciertos}</strong></span>
                <span>❌ <strong>${fallos}</strong></span>
                <span>⏳ <strong>${pendientes}</strong></span>
            </div>
            <div class="rosco-grid">${letras}</div>
            <p class="subtexto">Tocad cualquier letra pendiente para ver su definición</p>
        </div>
    `);

    document.querySelectorAll('.letra-rosco:not(.acierto):not(.fallo)').forEach(el => {
        el.addEventListener('click', () => {
            const idx = parseInt(el.dataset.idx);
            partidaPasapalabra.indiceActivo = idx;
            renderClaveActiva();
        });
    });
}

function renderClaveActiva() {
    const idx = partidaPasapalabra.indiceActivo;
    const item = partidaPasapalabra.letrasSesion[idx];
    const prefijo = item.tipo === 'empieza' ? `Empieza por la ${item.letra}` : `Contiene la ${item.letra}`;

    renderVista(`
        <div class="pantalla-juego">
            <div class="temporizador-rosco urgente" id="temporizador-rosco">${formatearTiempo(partidaPasapalabra.tiempoRestante)}</div>
            <div class="tarjeta-central tarjeta-clave">
                <div class="letra-grande">${item.letra}</div>
                <p style="text-align:center; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.5px; color:var(--text-secondary); margin-bottom:10px;">${prefijo}</p>
                <p class="enunciado">${item.enunciado}</p>

                <div class="zona-escribir-respuesta">
                    <input type="text" id="input-respuesta-rosco" class="input-respuesta-rosco"
                           placeholder="Escribe tu respuesta..." maxlength="30" autocomplete="off" />
                    <button class="btn-principal" id="btn-comprobar-respuesta">Comprobar</button>
                    <div id="feedback-respuesta-rosco" class="feedback-respuesta-rosco"></div>
                </div>

                <p class="subtexto" style="margin: 8px 0 4px; font-size:0.78rem;">⚠️ Tienes 1 solo intento por letra</p>

                <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
                    <button class="btn-secundario" id="btn-ver-rosco">📋 Ver rosco</button>
                    <button class="btn-secundario" id="btn-siguiente-letra">⏭️ Siguiente (sin contestar)</button>
                </div>
            </div>
        </div>
    `);

    partidaPasapalabra.temporizadorId = partidaPasapalabra.temporizadorId || setInterval(tickTemporizadorRosco, 1000);

    document.getElementById('btn-ver-rosco').addEventListener('click', renderRoscoGrid);
    document.getElementById('btn-siguiente-letra').addEventListener('click', irSiguienteLetraPendiente);

    const inputRespuesta = document.getElementById('input-respuesta-rosco');
    const btnComprobar = document.getElementById('btn-comprobar-respuesta');
    const feedbackRespuesta = document.getElementById('feedback-respuesta-rosco');

    const comprobar = () => {
        const escrita = inputRespuesta.value.trim();
        if (!escrita) return;

        const normalizada = normalizarRespuesta(escrita);
        const correcta = normalizarRespuesta(item.respuesta);

        inputRespuesta.disabled = true;
        btnComprobar.disabled = true;

        if (normalizada === correcta) {
            feedbackRespuesta.textContent = '✅ ¡Correcto!';
            feedbackRespuesta.className = 'feedback-respuesta-rosco acierto';
            partidaPasapalabra.estados[idx] = 'acierto';
            logEvento(`✅ Definiciones: "${item.respuesta}" acertada.`);
        } else {
            feedbackRespuesta.textContent = `❌ Fallaste. Era: "${item.respuesta}"`;
            feedbackRespuesta.className = 'feedback-respuesta-rosco fallo';
            partidaPasapalabra.estados[idx] = 'fallo';
            logEvento(`❌ Definiciones: "${item.respuesta}" fallada.`);
        }

        setTimeout(irSiguienteLetraPendiente, 1500);
    };

    btnComprobar.addEventListener('click', comprobar);
    inputRespuesta.addEventListener('keydown', e => {
        if (e.key === 'Enter') { e.preventDefault(); comprobar(); }
    });
    inputRespuesta.focus();
}

function normalizarRespuesta(texto) {
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // quita tildes
        .replace(/[^a-z0-9ñ]/g, '')      // quita espacios, guiones, símbolos
        .trim();
}

function marcarLetra(idx, resultado) {
    partidaPasapalabra.estados[idx] = resultado;

    const quedanPendientes = partidaPasapalabra.estados.some(e => e === 'pendiente' || e === 'pasada');
    if (!quedanPendientes) {
        finalizarRosco();
        return;
    }
    renderRoscoGrid();
}

function irSiguienteLetraPendiente() {
    const estados = partidaPasapalabra.estados;
    const idxActual = partidaPasapalabra.indiceActivo;
    const total = estados.length;

    // ¿Hay otras letras sin resolver distintas de la actual?
    let hayOtras = false;
    for (let i = 0; i < total; i++) {
        if (i !== idxActual && estados[i] !== 'acierto' && estados[i] !== 'fallo') {
            hayOtras = true;
            break;
        }
    }

    if (!hayOtras) {
        // Si la actual sigue sin resolver, quedarse en ella (no finalizar aún)
        if (estados[idxActual] !== 'acierto' && estados[idxActual] !== 'fallo') {
            renderClaveActiva();
            return;
        }
        // Todas resueltas: fin del rosco
        finalizarRosco();
        return;
    }

    // Ir a la siguiente letra sin resolver
    for (let i = 1; i <= total; i++) {
        const siguiente = (idxActual + i) % total;
        if (estados[siguiente] !== 'acierto' && estados[siguiente] !== 'fallo') {
            partidaPasapalabra.indiceActivo = siguiente;
            renderClaveActiva();
            return;
        }
    }
}


// ----------------------------------------------------------------
// FASE 3: RESULTADO FINAL
// ----------------------------------------------------------------
function finalizarRosco() {
    if (partidaPasapalabra.temporizadorId) clearInterval(partidaPasapalabra.temporizadorId);
    partidaPasapalabra.fase = 'resultado';

    const aciertos = partidaPasapalabra.estados.filter(e => e === 'acierto').length;
    const fallos = partidaPasapalabra.estados.filter(e => e === 'fallo').length;
    const sinResponder = partidaPasapalabra.estados.filter(e => e === 'pendiente' || e === 'pasada').length;
    const roscoCompleto = aciertos === partidaPasapalabra.letrasSesion.length;

    setTituloJuego('Definiciones — Resultado');
    renderVista(`
        <div class="pantalla-juego">
            <div class="tarjeta-central">
                <div class="veredicto">${roscoCompleto ? '🎉 ¡Rosco perfecto!' : '🔤 Rosco terminado'}</div>
                <div class="marcador-rosco" style="margin-top:10px;">
                    <span>✅ <strong>${aciertos}</strong></span>
                    <span>❌ <strong>${fallos}</strong></span>
                    <span>⏳ <strong>${sinResponder}</strong></span>
                </div>
            </div>
            <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
                <button class="btn-secundario" id="btn-compartir-rosco">📤 Compartir resultado</button>
                <button class="btn-secundario" id="btn-otro-rosco">Jugar otro rosco</button>
                <button class="btn-principal" id="btn-volver-menu-pp">Volver al menú</button>
            </div>
        </div>
    `);

    logEvento(`🏁 Definiciones terminado: ${aciertos} aciertos, ${fallos} fallos, ${sinResponder} sin contestar.`);
    registrarPartidaCompletada();
    if (aciertos > 0) sumarAciertos(aciertos);

    document.getElementById('btn-compartir-rosco').addEventListener('click', () => {
        compartirResultado(`🔤 ¡${aciertos}/${partidaPasapalabra.letrasSesion.length} en Definiciones${roscoCompleto ? ', rosco perfecto!' : '!'} ¿Te atreves a superarlo?`);
    });
    document.getElementById('btn-otro-rosco').addEventListener('click', crearPartidaPasapalabra);
    document.getElementById('btn-volver-menu-pp').addEventListener('click', mostrarSelectorJuegos);
}