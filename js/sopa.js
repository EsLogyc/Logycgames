// ================================================================
// SOPA DE LETRAS
// ================================================================

const TAMANO_SOPA = 12;
const NUM_PALABRAS_SOPA = 8;

// ----------------------------------------------------------------
// BANCOS DE PALABRAS (edítalos libremente)
// ----------------------------------------------------------------
const PALABRAS_SOPA = {
    animales: {
        nombre: '🐾 Animales',
        palabras: ['PERRO', 'GATO', 'LEON', 'TIGRE', 'ELEFANTE', 'JIRAFA', 'MONO', 'LOBO', 'OSO', 'ZORRO', 'CONEJO', 'RATON', 'CABALLO', 'VACA', 'PATO', 'GALLO']
    },
    paises: {
        nombre: '🌍 Países',
        palabras: ['ESPAÑA', 'FRANCIA', 'ITALIA', 'ALEMANIA', 'PORTUGAL', 'MEXICO', 'BRASIL', 'CHINA', 'JAPON', 'INDIA', 'EGIPTO', 'CANADA', 'GRECIA', 'TURQUIA', 'RUSIA', 'PERU']
    },
    comidas: {
        nombre: '🍕 Comidas',
        palabras: ['PIZZA', 'PAELLA', 'TACOS', 'SUSHI', 'HAMBURGUESA', 'CROQUETAS', 'TORTILLA', 'LASANA', 'RAMEN', 'CHURROS', 'ENSALADA', 'PULPO', 'JAMON', 'QUESO', 'PAN', 'ACEITUNAS']
    },
    colores: {
        nombre: '🎨 Colores',
        palabras: ['ROJO', 'AZUL', 'VERDE', 'AMARILLO', 'NEGRO', 'BLANCO', 'ROSA', 'MORADO', 'NARANJA', 'GRIS', 'MARRON', 'TURQUESA', 'BEIGE', 'LILA', 'GRANATE', 'OCRE']
    },
    deportes: {
        nombre: '⚽ Deportes',
        palabras: ['FUTBOL', 'TENIS', 'BALONCESTO', 'NATACION', 'CICLISMO', 'GOLF', 'RUGBY', 'BOXEO', 'ATLETISMO', 'VOLEIBOL', 'SURF', 'ESQUI', 'PADEL', 'KARATE', 'JUDO', 'YOGA']
    },
    frutas: {
        nombre: '🍎 Frutas',
        palabras: ['MANZANA', 'PLATANO', 'NARANJA', 'FRESA', 'SANDIA', 'MELON', 'UVA', 'PERA', 'CEREZA', 'PIÑA', 'KIWI', 'MANGO', 'LIMON', 'HIGO', 'CIRUELA', 'MELOCOTON']
    }
};

let partidaSopa = null;

// ----------------------------------------------------------------
// UTILIDADES
// ----------------------------------------------------------------
function fechaHoySopa() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${dia}`;
}

function crearRandomSopa(semilla) {
    if (!semilla) return Math.random;
    let h = 0;
    for (let i = 0; i < semilla.length; i++) {
        h = Math.imul(31, h) + semilla.charCodeAt(i) | 0;
    }
    return function () {
        h = Math.imul(h ^ (h >>> 15), h | 1);
        h ^= h + Math.imul(h ^ (h >>> 7), h | 61);
        return ((h ^ (h >>> 14)) >>> 0) / 4294967296;
    };
}

function barajarSopa(arr, rng = Math.random) {
    const copia = [...arr];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function formatearTiempoSopa(ms) {
    const total = Math.floor(ms / 1000);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// ----------------------------------------------------------------
// GENERACIÓN DEL PUZZLE
// ----------------------------------------------------------------
function generarSopa(categoriaId, rng) {
    const cat = PALABRAS_SOPA[categoriaId];
    const candidatas = cat.palabras.filter(p => p.length <= TAMANO_SOPA - 2);
    const elegidas = barajarSopa(candidatas, rng).slice(0, NUM_PALABRAS_SOPA);

    const grid = Array.from({ length: TAMANO_SOPA }, () => Array(TAMANO_SOPA).fill(''));
    const colocadas = [];

    const direcciones = [
        { dr: 0, dc: 1 },    // →
        { dr: 1, dc: 0 },    // ↓
        { dr: 1, dc: 1 },    // ↘
        { dr: 1, dc: -1 }    // ↙
    ];

    for (const palabra of elegidas) {
        let colocada = false;
        for (let intento = 0; intento < 300 && !colocada; intento++) {
            const dir = direcciones[Math.floor(rng() * direcciones.length)];
            const invertida = rng() < 0.3;
            const letras = invertida ? [...palabra].reverse() : [...palabra];

            const r0 = Math.floor(rng() * TAMANO_SOPA);
            const c0 = Math.floor(rng() * TAMANO_SOPA);
            const rFin = r0 + dir.dr * (letras.length - 1);
            const cFin = c0 + dir.dc * (letras.length - 1);

            if (rFin < 0 || rFin >= TAMANO_SOPA || cFin < 0 || cFin >= TAMANO_SOPA) continue;

            let cabe = true;
            const celdas = [];
            for (let k = 0; k < letras.length; k++) {
                const r = r0 + dir.dr * k;
                const c = c0 + dir.dc * k;
                if (grid[r][c] !== '' && grid[r][c] !== letras[k]) {
                    cabe = false;
                    break;
                }
                celdas.push({ row: r, col: c });
            }
            if (!cabe) continue;

            for (let k = 0; k < letras.length; k++) {
                grid[celdas[k].row][celdas[k].col] = letras[k];
            }
            colocadas.push({ palabra, celdas });
            colocada = true;
        }
    }

    const abecedario = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
    for (let r = 0; r < TAMANO_SOPA; r++) {
        for (let c = 0; c < TAMANO_SOPA; c++) {
            if (grid[r][c] === '') {
                grid[r][c] = abecedario[Math.floor(rng() * abecedario.length)];
            }
        }
    }

    return { grid, colocadas };
}

// ----------------------------------------------------------------
// MENÚ PRINCIPAL
// ----------------------------------------------------------------
function crearMenuSopa() {
    setTituloJuego('Sopa de Letras');
    const fecha = fechaHoySopa();
    const fechaBonita = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });

    // Categoría del día (determinista)
    const catClaves = Object.keys(PALABRAS_SOPA);
    const rngDia = crearRandomSopa('juegacos-sopa-' + fecha);
    const catDelDia = catClaves[Math.floor(rngDia() * catClaves.length)];
    const catNombre = PALABRAS_SOPA[catDelDia].nombre;

    renderVista(`
        <div class="pantalla-juego">
            <button class="btn-volver" id="btn-volver-menu-sopa">← Volver a minijuegos</button>
            <h2>🔎 Sopa de Letras</h2>
            <p class="subtexto">Encuentra las 8 palabras escondidas en la cuadrícula.</p>

            <div class="tarjeta-central tarjeta-reto-dia">
                <div class="icono-reto">🎯</div>
                <h3 style="font-size:1.1rem; font-weight:800; margin-bottom:4px;">Reto del Día</h3>
                <p class="subtexto" style="margin:0 0 6px;">${fechaBonita}</p>
                <p style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:14px;">
                    Categoría: <strong>${catNombre}</strong> · La misma sopa para todo el mundo hoy.
                </p>
                <button class="btn-principal" id="btn-reto-sopa">Jugar el Reto del Día</button>
            </div>

            <div class="tarjeta-central">
                <div class="icono-reto">🎲</div>
                <h3 style="font-size:1rem; font-weight:800; margin-bottom:8px;">Sopa aleatoria</h3>
                <p style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:14px;">
                    Una sopa nueva con categoría aleatoria cada vez.
                </p>
                <button class="btn-secundario" id="btn-modo-aleatorio-sopa">Jugar sopa aleatoria</button>
            </div>
        </div>
    `);

    document.getElementById('btn-volver-menu-sopa').onclick = mostrarSelectorJuegos;
    document.getElementById('btn-reto-sopa').addEventListener('click', () => crearPartidaSopa('dia'));
    document.getElementById('btn-modo-aleatorio-sopa').addEventListener('click', () => crearPartidaSopa('aleatorio'));
}

// ----------------------------------------------------------------
// CREAR PARTIDA
// ----------------------------------------------------------------
function crearPartidaSopa(modo = 'aleatorio') {
    if (partidaSopa && partidaSopa.temporizadorId) {
        clearInterval(partidaSopa.temporizadorId);
    }

    const catClaves = Object.keys(PALABRAS_SOPA);
    let categoriaId, rng;

    if (modo === 'dia') {
        const semilla = 'juegacos-sopa-' + fechaHoySopa();
        rng = crearRandomSopa(semilla);
        categoriaId = catClaves[Math.floor(rng() * catClaves.length)];
    } else {
        rng = Math.random;
        categoriaId = catClaves[Math.floor(Math.random() * catClaves.length)];
    }

    const { grid, colocadas } = generarSopa(categoriaId, rng);

    partidaSopa = {
        modo,
        categoriaId,
        grid,
        colocadas,
        encontradas: new Set(),
        seleccion: { inicio: null, fin: null },
        tiempoInicio: Date.now(),
        temporizadorId: null,
        juegoTerminado: false
    };

    renderSopaPartida();
    iniciarTemporizadorSopa();
    logEvento(`🔎 Nueva sopa de letras: ${PALABRAS_SOPA[categoriaId].nombre}`);
}

// ----------------------------------------------------------------
// RENDER DE LA PARTIDA
// ----------------------------------------------------------------
function renderSopaPartida() {
    setTituloJuego('Sopa de Letras');

    const cat = PALABRAS_SOPA[partidaSopa.categoriaId];

    // Grid
    let gridHtml = '';
    for (let r = 0; r < TAMANO_SOPA; r++) {
        for (let c = 0; c < TAMANO_SOPA; c++) {
            const letra = partidaSopa.grid[r][c];
            gridHtml += `<div class="sopa-celda" data-row="${r}" data-col="${c}">${letra}</div>`;
        }
    }

    // Palabras
    const palabrasHtml = partidaSopa.colocadas.map(col => {
        const encontrada = partidaSopa.encontradas.has(col.palabra);
        return `<span class="sopa-palabra ${encontrada ? 'encontrada' : ''}" data-palabra="${col.palabra}">${col.palabra}</span>`;
    }).join('');

    const etiquetaModo = partidaSopa.modo === 'dia'
        ? `<div class="etiqueta-reto-dia">🎯 Reto del Día · ${fechaHoySopa().split('-').reverse().join('/')}</div>`
        : '';

    renderVista(`
        <div class="pantalla-juego pantalla-sopa">
            <button class="btn-volver" id="btn-volver-menu-sopa">← Volver</button>
            <h2>🔎 Sopa de Letras</h2>
            ${etiquetaModo}

            <div class="sopa-header">
                <div class="sopa-timer" id="sopa-timer">⏱️ 00:00</div>
                <div class="sopa-contador" id="sopa-contador">${partidaSopa.encontradas.size} / ${partidaSopa.colocadas.length}</div>
            </div>

            <div class="tarjeta-central">
                <p class="sopa-categoria">${cat.nombre}</p>
                <div class="sopa-grid" id="sopa-grid">${gridHtml}</div>
                <p class="subtexto" style="margin-top:14px;">Toca la primera y la última letra de la palabra</p>
            </div>

            <div class="tarjeta-central">
                <p class="sopa-palabras-label">Palabras a encontrar</p>
                <div class="sopa-palabras" id="sopa-palabras">${palabrasHtml}</div>
            </div>
        </div>
    `);

    document.getElementById('btn-volver-menu-sopa').onclick = () => {
        if (partidaSopa.temporizadorId) clearInterval(partidaSopa.temporizadorId);
        crearMenuSopa();
    };

    document.querySelectorAll('.sopa-celda').forEach(el => {
        el.addEventListener('click', () => manejarClickCeldaSopa(el));
    });

    // Actualizar tiempo inicial
    actualizarTimerSopa();
}

// ----------------------------------------------------------------
// TEMPORIZADOR
// ----------------------------------------------------------------
function iniciarTemporizadorSopa() {
    if (partidaSopa.temporizadorId) clearInterval(partidaSopa.temporizadorId);
    partidaSopa.temporizadorId = setInterval(tickTemporizadorSopa, 1000);
}

function tickTemporizadorSopa() {
    if (!partidaSopa || !document.getElementById('sopa-grid')) {
        if (partidaSopa && partidaSopa.temporizadorId) {
            clearInterval(partidaSopa.temporizadorId);
        }
        return;
    }
    actualizarTimerSopa();
}

function actualizarTimerSopa() {
    const el = document.getElementById('sopa-timer');
    if (!el || !partidaSopa) return;
    const ms = Date.now() - partidaSopa.tiempoInicio;
    el.textContent = `⏱️ ${formatearTiempoSopa(ms)}`;
}

// ----------------------------------------------------------------
// SELECCIÓN DE PALABRAS
// ----------------------------------------------------------------
function manejarClickCeldaSopa(el) {
    if (partidaSopa.juegoTerminado) return;
    if (el.classList.contains('encontrada')) return;

    const row = parseInt(el.dataset.row);
    const col = parseInt(el.dataset.col);

    const sel = partidaSopa.seleccion;

    // Limpiar cualquier selección previa visual
    document.querySelectorAll('.sopa-celda.seleccion').forEach(c => c.classList.remove('seleccion'));

    if (!sel.inicio) {
        // Primera selección
        sel.inicio = { row, col };
        el.classList.add('seleccion');
        return;
    }

    // Misma casilla → deshacer
    if (sel.inicio.row === row && sel.inicio.col === col) {
        sel.inicio = null;
        return;
    }

    const dr = row - sel.inicio.row;
    const dc = col - sel.inicio.col;

    // ¿Están alineados?
    const alineados = dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc);

    if (!alineados) {
        // No alineados: empezar de nuevo desde esta casilla
        sel.inicio = { row, col };
        el.classList.add('seleccion');
        return;
    }

    // Extraer celdas entre inicio y fin
    const pasoR = Math.sign(dr);
    const pasoC = Math.sign(dc);
    const longitud = Math.max(Math.abs(dr), Math.abs(dc)) + 1;

    const celdas = [];
    let letras = '';
    for (let k = 0; k < longitud; k++) {
        const r = sel.inicio.row + pasoR * k;
        const c = sel.inicio.col + pasoC * k;
        celdas.push({ row: r, col: c });
        letras += partidaSopa.grid[r][c];
    }

    const invertida = [...letras].reverse().join('');

    // Buscar coincidencia
    let palabraEncontrada = null;
    for (const col of partidaSopa.colocadas) {
        if (partidaSopa.encontradas.has(col.palabra)) continue;
        if (col.palabra === letras || col.palabra === invertida) {
            palabraEncontrada = col.palabra;
            break;
        }
    }

    if (palabraEncontrada) {
        // ¡Encontrada!
        partidaSopa.encontradas.add(palabraEncontrada);
        celdas.forEach(c => {
            const celda = document.querySelector(`.sopa-celda[data-row="${c.row}"][data-col="${c.col}"]`);
            if (celda) celda.classList.add('encontrada');
        });
        // Actualizar lista
        const chip = document.querySelector(`.sopa-palabra[data-palabra="${palabraEncontrada}"]`);
        if (chip) chip.classList.add('encontrada');
        // Contador
        const cont = document.getElementById('sopa-contador');
        if (cont) cont.textContent = `${partidaSopa.encontradas.size} / ${partidaSopa.colocadas.length}`;

        logEvento(`✅ Encontrada: ${palabraEncontrada}`);

        // ¿Fin?
        if (partidaSopa.encontradas.size === partidaSopa.colocadas.length) {
            finalizarSopa();
        }
    } else {
        // Fallo visual
        celdas.forEach(c => {
            const celda = document.querySelector(`.sopa-celda[data-row="${c.row}"][data-col="${c.col}"]`);
            if (celda) {
                celda.classList.add('seleccion-fallida');
                setTimeout(() => celda.classList.remove('seleccion-fallida'), 400);
            }
        });
    }

    sel.inicio = null;
}

// ----------------------------------------------------------------
// FIN DE PARTIDA
// ----------------------------------------------------------------
function finalizarSopa() {
    if (partidaSopa.temporizadorId) clearInterval(partidaSopa.temporizadorId);
    partidaSopa.juegoTerminado = true;

    const ms = Date.now() - partidaSopa.tiempoInicio;
    const tiempo = formatearTiempoSopa(ms);
    const esDia = partidaSopa.modo === 'dia';

    registrarPartidaCompletada();
    sumarRetoSuperado();

    logEvento(`🏁 Sopa completada en ${tiempo}.`);

    setTituloJuego('Sopa de Letras — ¡Completada!');

    const botones = esDia ? `
        <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
            <button class="btn-secundario" id="btn-compartir-sopa">📤 Compartir resultado</button>
            <button class="btn-secundario" id="btn-volver-menu-sopa-final">Volver al menú</button>
        </div>
    ` : `
        <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
            <button class="btn-secundario" id="btn-compartir-sopa">📤 Compartir resultado</button>
            <button class="btn-secundario" id="btn-otra-sopa">Jugar otra sopa</button>
            <button class="btn-principal" id="btn-volver-menu-sopa-final">Volver al menú</button>
        </div>
    `;

    renderVista(`
        <div class="pantalla-juego">
            <div class="tarjeta-central">
                <div class="veredicto">🎉 ¡Sopa completada!</div>
                <p class="subtexto" style="margin-top:8px;">Categoría: ${PALABRAS_SOPA[partidaSopa.categoriaId].nombre}</p>
                <div class="codigo-descifrado" style="font-size:2rem; letter-spacing:2px;">${tiempo}</div>
                <p style="margin-top:6px; color:var(--text-secondary); font-size:0.85rem;">Tiempo total</p>
            </div>
            ${botones}
        </div>
    `);

    document.getElementById('btn-compartir-sopa').addEventListener('click', () => {
        compartirResultado(`🔎 ¡He resuelto la sopa de letras en ${tiempo}! ¿Te atreves tú?`);
    });

    const btnOtra = document.getElementById('btn-otra-sopa');
    if (btnOtra) btnOtra.addEventListener('click', () => crearPartidaSopa('aleatorio'));

    document.getElementById('btn-volver-menu-sopa-final').addEventListener('click', crearMenuSopa);
}