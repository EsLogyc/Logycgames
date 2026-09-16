// ================================================================
// ROSCO DE CULTURA GENERAL — 26 DEFINICIONES (dificultad media)
// ================================================================
const ROSCO_PASAPALABRA = [
    { letra: 'A', tipo: 'empieza', enunciado: 'Instrumento musical de cuerda con forma triangular, típico de la música celta.', respuesta: 'Arpa' },
    { letra: 'B', tipo: 'empieza', enunciado: 'Mamífero marino de gran tamaño que respira por un espiráculo en la cabeza.', respuesta: 'Ballena' },
    { letra: 'C', tipo: 'empieza', enunciado: 'Órgano que bombea la sangre por todo el cuerpo.', respuesta: 'Corazón' },
    { letra: 'D', tipo: 'empieza', enunciado: 'Pieza cúbica con puntos que se lanza al azar en muchos juegos de mesa.', respuesta: 'Dado' },
    { letra: 'E', tipo: 'empieza', enunciado: 'Aparato que usan los médicos para escuchar los latidos del corazón.', respuesta: 'Estetoscopio' },
    { letra: 'F', tipo: 'empieza', enunciado: 'Instrumento musical de viento formado por un tubo con agujeros.', respuesta: 'Flauta' },
    { letra: 'G', tipo: 'empieza', enunciado: 'Ave de corral que pone huevos y apenas puede volar.', respuesta: 'Gallina' },
    { letra: 'H', tipo: 'empieza', enunciado: 'Planta aromática, como el perejil o el romero, usada para dar sabor a la comida.', respuesta: 'Hierba aromática' },
    { letra: 'I', tipo: 'empieza', enunciado: 'Subida generalizada y sostenida de los precios en una economía.', respuesta: 'Inflación' },
    { letra: 'J', tipo: 'empieza', enunciado: 'Animal africano de cuello larguísimo y manchas en la piel.', respuesta: 'Jirafa' },
    { letra: 'K', tipo: 'contiene', enunciado: 'Arte marcial japonesa que se practica descalzo, con kimono y cinturones de colores.', respuesta: 'Kárate' },
    { letra: 'L', tipo: 'empieza', enunciado: 'Satélite natural que gira alrededor de la Tierra y se ve de noche.', respuesta: 'Luna' },
    { letra: 'M', tipo: 'empieza', enunciado: 'Planeta del sistema solar conocido como "el planeta rojo".', respuesta: 'Marte' },
    { letra: 'N', tipo: 'empieza', enunciado: 'Fruto seco de cáscara dura muy típico en las fechas de Navidad.', respuesta: 'Nuez' },
    { letra: 'Ñ', tipo: 'contiene', enunciado: 'Fruta tropical con la piel llena de púas, dulce y jugosa por dentro.', respuesta: 'Piña' },
    { letra: 'O', tipo: 'empieza', enunciado: 'Instrumento musical de teclado muy utilizado en las iglesias.', respuesta: 'Órgano' },
    { letra: 'P', tipo: 'empieza', enunciado: 'Ave que no vuela, camina en grupo y vive en la Antártida.', respuesta: 'Pingüino' },
    { letra: 'Q', tipo: 'contiene', enunciado: 'Profesional que diseña planos y proyectos de edificios.', respuesta: 'Arquitecto' },
    { letra: 'R', tipo: 'empieza', enunciado: 'Anfibio verde que vive cerca del agua y se desplaza a saltos.', respuesta: 'Rana' },
    { letra: 'S', tipo: 'empieza', enunciado: 'Estrella que da luz y calor a la Tierra, centro de nuestro sistema solar.', respuesta: 'Sol' },
    { letra: 'T', tipo: 'empieza', enunciado: 'Aparato electrónico que se usa en casa para ver programas y películas.', respuesta: 'Televisor' },
    { letra: 'U', tipo: 'empieza', enunciado: 'Fruta pequeña y redonda que crece en racimos y se usa para hacer vino.', respuesta: 'Uva' },
    { letra: 'V', tipo: 'empieza', enunciado: 'Animal doméstico que da leche y muge, típico de las granjas.', respuesta: 'Vaca' },
    { letra: 'W', tipo: 'empieza', enunciado: 'Bebida alcohólica de origen escocés hecha de cereales destilados.', respuesta: 'Whisky' },
    { letra: 'X', tipo: 'contiene', enunciado: 'Tipo de radiación usada en medicina para hacer radiografías.', respuesta: 'Rayos X' },
    { letra: 'Y', tipo: 'empieza', enunciado: 'Alimento derivado de la leche fermentada, de textura cremosa.', respuesta: 'Yogur' },
    { letra: 'Z', tipo: 'empieza', enunciado: 'Recinto donde se exhiben animales de todo el mundo para el público.', respuesta: 'Zoológico' }
];

// ================================================================
// PASAPALABRA — ESTADO Y FLUJO (modo cooperativo)
// ================================================================
let partidaPasapalabra = null;
const TIEMPO_ROSCO_SEGUNDOS = 360;

function crearPartidaPasapalabra() {
    partidaPasapalabra = {
        estados: ROSCO_PASAPALABRA.map(() => 'pendiente'), // pendiente | acierto | fallo | pasada
        indiceActivo: -1,
        tiempoRestante: TIEMPO_ROSCO_SEGUNDOS,
        temporizadorId: null,
        fase: 'intro'
    };
    renderIntroPasapalabra();
}

// ----------------------------------------------------------------
// FASE 1: INTRODUCCIÓN
// ----------------------------------------------------------------
function renderIntroPasapalabra() {
    setTituloJuego('Pasapalabra — Rosco cooperativo');
    actualizarPanelJugadores([], -1);

    renderVista(`
        <div class="pantalla-juego">
            <button class="btn-volver" id="btn-volver-selector-pp">← Volver a minijuegos</button>
            <h2>🔤 Pasapalabra</h2>
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
    logEvento('🔤 Empieza el rosco del Pasapalabra en equipo.');
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
    const letras = ROSCO_PASAPALABRA.map((item, i) => {
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
    const item = ROSCO_PASAPALABRA[idx];
    const prefijo = item.tipo === 'empieza' ? `Empieza por la ${item.letra}` : `Contiene la ${item.letra}`;

    renderVista(`
        <div class="pantalla-juego">
            <div class="temporizador-rosco urgente" id="temporizador-rosco">${formatearTiempo(partidaPasapalabra.tiempoRestante)}</div>
            <div class="tarjeta-central tarjeta-clave">
                <div class="letra-grande">${item.letra}</div>
                <p style="text-align:center; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.5px; color:var(--text-secondary); margin-bottom:10px;">${prefijo}</p>
                <p class="enunciado">${item.enunciado}</p>
                <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
                    <button class="btn-principal" id="btn-revelar-respuesta">Revelar respuesta</button>
                    <button class="btn-secundario" id="btn-pasapalabra-antes">⏭️ Pasapalabra</button>
                </div>
            </div>
        </div>
    `);

    partidaPasapalabra.temporizadorId = partidaPasapalabra.temporizadorId || setInterval(tickTemporizadorRosco, 1000);

    document.getElementById('btn-pasapalabra-antes').addEventListener('click', () => {
        marcarLetra(idx, 'pasada');
    });

    document.getElementById('btn-revelar-respuesta').addEventListener('click', () => {
        renderVista(`
            <div class="pantalla-juego">
                <div class="temporizador-rosco urgente" id="temporizador-rosco">${formatearTiempo(partidaPasapalabra.tiempoRestante)}</div>
                <div class="tarjeta-central tarjeta-clave">
                    <div class="letra-grande">${item.letra}</div>
                    <p class="enunciado">${item.enunciado}</p>
                    <div class="respuesta-revelada">${item.respuesta}</div>
                    <div style="display:flex; gap:10px; justify-content:center; margin-top:16px; flex-wrap:wrap;">
                        <button class="btn-principal" id="btn-marcar-acierto">✅ Acertado</button>
                        <button class="btn-secundario" id="btn-marcar-fallo">❌ Fallado</button>
                        <button class="btn-secundario" id="btn-marcar-pasada">⏭️ Pasapalabra</button>
                    </div>
                </div>
            </div>
        `);

        document.getElementById('btn-marcar-acierto').addEventListener('click', () => marcarLetra(idx, 'acierto'));
        document.getElementById('btn-marcar-fallo').addEventListener('click', () => marcarLetra(idx, 'fallo'));
        document.getElementById('btn-marcar-pasada').addEventListener('click', () => marcarLetra(idx, 'pasada'));
    });
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

// ----------------------------------------------------------------
// FASE 3: RESULTADO FINAL
// ----------------------------------------------------------------
function finalizarRosco() {
    if (partidaPasapalabra.temporizadorId) clearInterval(partidaPasapalabra.temporizadorId);
    partidaPasapalabra.fase = 'resultado';

    const aciertos = partidaPasapalabra.estados.filter(e => e === 'acierto').length;
    const fallos = partidaPasapalabra.estados.filter(e => e === 'fallo').length;
    const sinResponder = partidaPasapalabra.estados.filter(e => e === 'pendiente' || e === 'pasada').length;
    const roscoCompleto = aciertos === ROSCO_PASAPALABRA.length;

    setTituloJuego('Pasapalabra — Resultado');
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
            <div style="display:flex; gap:10px; justify-content:center;">
                <button class="btn-secundario" id="btn-otro-rosco">Jugar otro rosco</button>
                <button class="btn-principal" id="btn-volver-menu-pp">Volver al menú</button>
            </div>
        </div>
    `);

    logEvento(`🏁 Pasapalabra terminado: ${aciertos} aciertos, ${fallos} fallos.`);
    registrarPartidaCompletada();

    document.getElementById('btn-otro-rosco').addEventListener('click', crearPartidaPasapalabra);
    document.getElementById('btn-volver-menu-pp').addEventListener('click', mostrarSelectorJuegos);
}