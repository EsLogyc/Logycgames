// ================================================================
// ADIVINA EL CÓDIGO — con Reto del Día
//  🔷 = correcto y en su sitio
//  ▮  = correcto pero fuera de sitio
//  (vacío) = ningún número coincide
// ================================================================

let partidaCodigo = null;

// ----------------------------------------------------------------
// UTILIDADES DE SEMILLA (para el reto del día determinista)
// ----------------------------------------------------------------
function fechaHoyString() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${dia}`;
}

// Generador pseudoaleatorio determinista (mulberry32 simplificado)
function crearRandomConSemilla(semilla) {
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

// ----------------------------------------------------------------
// MENÚ DE ENTRADA (nuevo)
// ----------------------------------------------------------------
function crearMenuCodigo() {
    setTituloJuego('Adivina el Código');
    const fecha = fechaHoyString();
    const fechaBonita = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });

    renderVista(`
        <div class="pantalla-juego">
            <button class="btn-volver" id="btn-volver-menu-cod">← Volver a minijuegos</button>
            <h2>🔢 Adivina el Código</h2>
            <p class="subtexto">4 cifras sin repetir. Descubre el código único a partir de 5 pistas.</p>

            <div class="tarjeta-central tarjeta-reto-dia">
                <div class="icono-reto">🎯</div>
                <h3 style="font-size:1.1rem; font-weight:800; margin-bottom:4px;">Reto del Día</h3>
                <p class="subtexto" style="margin:0 0 6px;">${fechaBonita}</p>
                <p style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:14px;">
                    El mismo código para todo el mundo hoy. Si no entras, no pasa nada: mañana hay otro.
                </p>
                <button class="btn-principal" id="btn-reto-dia">Jugar el Reto del Día</button>
            </div>

            <div class="tarjeta-central">
                <div class="icono-reto">🎲</div>
                <h3 style="font-size:1rem; font-weight:800; margin-bottom:8px;">Código aleatorio</h3>
                <p style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:14px;">
                    Un código infinito para practicar todas las veces que quieras.
                </p>
                <button class="btn-secundario" id="btn-modo-aleatorio">Jugar modo libre</button>
            </div>
        </div>
    `);

    document.getElementById('btn-volver-menu-cod').onclick = mostrarSelectorJuegos;
    document.getElementById('btn-reto-dia').addEventListener('click', () => crearPartidaCodigo('dia'));
    document.getElementById('btn-modo-aleatorio').addEventListener('click', () => crearPartidaCodigo('aleatorio'));
}

// ----------------------------------------------------------------
// CREAR PARTIDA
// ----------------------------------------------------------------
function crearPartidaCodigo(modo = 'aleatorio') {
    const semilla = modo === 'dia'
        ? 'juegacos-codigo-' + fechaHoyString()
        : null;

    partidaCodigo = {
        modo: modo,
        semilla: semilla,
        codigoSecreto: [],
        filas: [],
        numerosTachados: new Set(),
        juegoTerminado: false,
        intentosUsados: 0
    };

    const rng = semilla ? crearRandomConSemilla(semilla) : Math.random;

    generarCodigo(rng);
    generarFilas(rng);
    renderTableroCodigo();
}

// ----------------------------------------------------------------
// GENERACIÓN DEL CÓDIGO Y LAS PISTAS
// ----------------------------------------------------------------
function generarCodigo(rng = Math.random) {
    const codigo = [];
    const usados = new Set();
    while (codigo.length < 4) {
        const n = Math.floor(rng() * 10);
        if (!usados.has(n)) {
            usados.add(n);
            codigo.push(n);
        }
    }
    partidaCodigo.codigoSecreto = codigo;
}

function evaluarIntentoCodigo(intento, solucion) {
    let exactos = 0;
    let presentes = 0;

    const tempSecreto = [...solucion];
    const tempIntento = [...intento];

    for (let i = 0; i < 4; i++) {
        if (tempIntento[i] === tempSecreto[i]) {
            exactos++;
            tempIntento[i] = null;
            tempSecreto[i] = null;
        }
    }
    for (let i = 0; i < 4; i++) {
        if (tempIntento[i] !== null) {
            const idx = tempSecreto.indexOf(tempIntento[i]);
            if (idx !== -1) {
                presentes++;
                tempSecreto[idx] = null;
            }
        }
    }

    const simbolos = [];
    for (let i = 0; i < exactos; i++) simbolos.push('🔷');
    for (let i = 0; i < presentes; i++) simbolos.push('▮');
    return barajarCodigo(simbolos);
}

function barajarCodigo(arr, rng = Math.random) {
    const copia = [...arr];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function generarFilas(rng = Math.random) {
    const MAX_INTENTOS = 300;

    for (let intentoGlobal = 0; intentoGlobal < MAX_INTENTOS; intentoGlobal++) {
        const codigoSecreto = partidaCodigo.codigoSecreto;
        const filas = [];
        const clavesVistas = new Set([codigoSecreto.join('')]);
        let fallo = false;

        for (let j = 0; j < 5; j++) {
            let intentoRow = null;
            for (let k = 0; k < 100; k++) {
                const candidato = barajarCodigo([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], rng).slice(0, 4);
                if (!clavesVistas.has(candidato.join(''))) {
                    intentoRow = candidato;
                    break;
                }
            }
            if (!intentoRow) { fallo = true; break; }

            clavesVistas.add(intentoRow.join(''));
            const simbolos = evaluarIntentoCodigo(intentoRow, codigoSecreto);
            filas.push({ numeros: intentoRow, simbolos });
        }

        if (fallo) continue;

        if (verificarSolucionUnicaCodigo(filas, codigoSecreto)) {
            partidaCodigo.filas = filas;
            return;
        }
        // Si no hay solución única, regeneramos el código
        generarCodigo(rng);
    }

    // Fallback de seguridad (no debería ocurrir)
    console.warn('No se encontró puzzle único; usando uno por defecto.');
    generarCodigo(rng);
    const codigoSecreto = partidaCodigo.codigoSecreto;
    const filas = [];
    for (let j = 0; j < 5; j++) {
        const intentoRow = barajarCodigo([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], rng).slice(0, 4);
        const simbolos = evaluarIntentoCodigo(intentoRow, codigoSecreto);
        filas.push({ numeros: intentoRow, simbolos });
    }
    partidaCodigo.filas = filas;
}

function verificarSolucionUnicaCodigo(filas, codigoSecreto) {
    const todasLasCombinaciones = [];

    function generarCombinaciones(actual, disponibles) {
        if (actual.length === 4) {
            todasLasCombinaciones.push([...actual]);
            return;
        }
        for (let i = 0; i < disponibles.length; i++) {
            const nuevo = [...actual, disponibles[i]];
            const restantes = [...disponibles.slice(0, i), ...disponibles.slice(i + 1)];
            generarCombinaciones(nuevo, restantes);
        }
    }
    generarCombinaciones([], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    let soluciones = 0;
    for (const combinacion of todasLasCombinaciones) {
        let cumpleTodas = true;
        for (const fila of filas) {
            const simbolos = evaluarIntentoCodigo(fila.numeros, combinacion);
            if (!compararSimbolosCodigo(simbolos, fila.simbolos)) {
                cumpleTodas = false;
                break;
            }
        }
        if (cumpleTodas) {
            soluciones++;
            if (soluciones > 1) return false;
        }
    }
    return soluciones === 1;
}

function compararSimbolosCodigo(s1, s2) {
    if (s1.length !== s2.length) return false;
    const a = [...s1].sort();
    const b = [...s2].sort();
    return a.every((v, i) => v === b[i]);
}

// ----------------------------------------------------------------
// RENDER DEL TABLERO
// ----------------------------------------------------------------
function renderTableroCodigo() {
    setTituloJuego('Adivina el Código');

    const filasHtml = partidaCodigo.filas.map((fila, idx) => {
        const numerosHtml = fila.numeros.map(num => {
            const tachado = partidaCodigo.numerosTachados.has(num);
            return `<span class="digito-codigo ${tachado ? 'tachado' : ''}" data-num="${num}">${num}</span>`;
        }).join('');
        const simStr = fila.simbolos.length > 0 ? fila.simbolos.join('') : '—';
        return `
            <div class="fila-pista">
                <div class="num-fila">${idx + 1}</div>
                <div class="combinacion">${numerosHtml}</div>
                <div class="pistas">${simStr}</div>
            </div>
        `;
    }).join('');

    const etiquetaModo = partidaCodigo.modo === 'dia'
        ? `<div class="etiqueta-reto-dia">🎯 Reto del Día · ${fechaHoyString().split('-').reverse().join('/')}</div>`
        : '';

    renderVista(`
        <div class="pantalla-juego">
            <button class="btn-volver" id="btn-volver-selector-codigo">← Volver</button>
            <h2>🔢 Adivina el Código</h2>
            ${etiquetaModo}
            <p class="subtexto">4 cifras sin repetir. 🔷 bien colocado · ▮ existe pero mal colocado · vacío, ninguno coincide.</p>

            <div class="tarjeta-central">
                <div class="tablero-codigo">${filasHtml}</div>
                <p class="subtexto" style="margin-top:14px;">✏️ Toca un número de las filas para tacharlo</p>
            </div>

            <div class="tarjeta-central">
                <p class="label-codigo">Escribe tu propuesta</p>
                <div class="casillas-codigo" id="casillas-codigo">
                    <input type="text" class="casilla-codigo" maxlength="1" inputmode="numeric" pattern="[0-9]*" data-idx="0" autocomplete="off" />
                    <input type="text" class="casilla-codigo" maxlength="1" inputmode="numeric" pattern="[0-9]*" data-idx="1" autocomplete="off" />
                    <input type="text" class="casilla-codigo" maxlength="1" inputmode="numeric" pattern="[0-9]*" data-idx="2" autocomplete="off" />
                    <input type="text" class="casilla-codigo" maxlength="1" inputmode="numeric" pattern="[0-9]*" data-idx="3" autocomplete="off" />
                </div>
                <div style="display:flex; justify-content:center; margin-top:14px;">
                    <button class="btn-principal" id="btn-comprobar-codigo">Comprobar</button>
                </div>
                <div id="mensaje-codigo" style="text-align:center; margin-top:12px; font-weight:700; min-height:22px;"></div>
            </div>
        </div>
    `);

    document.getElementById('btn-volver-selector-codigo').onclick = crearMenuCodigo;

    function toggleTachar(num) {
        if (partidaCodigo.juegoTerminado) return;
        if (partidaCodigo.numerosTachados.has(num)) partidaCodigo.numerosTachados.delete(num);
        else partidaCodigo.numerosTachados.add(num);

        document.querySelectorAll(
            `.digito-codigo[data-num="${num}"]`
        ).forEach(el => el.classList.toggle('tachado'));
    }

    document.querySelectorAll('.digito-codigo').forEach(el => {
        el.addEventListener('click', () => toggleTachar(parseInt(el.dataset.num)));
    });

    document.getElementById('btn-comprobar-codigo')
        .addEventListener('click', comprobarCodigoUsuario);

    inicializarCasillasCodigo();
}

function inicializarCasillasCodigo() {
    const casillas = Array.from(document.querySelectorAll('.casilla-codigo'));

    function refrescarClase() {
        casillas.forEach(c => c.classList.toggle('rellena', c.value.length > 0));
    }

    casillas.forEach((casilla, idx) => {
        casilla.addEventListener('input', () => {
            casilla.value = casilla.value.replace(/[^0-9]/g, '').slice(0, 1);
            if (casilla.value.length === 1 && idx < casillas.length - 1) {
                casillas[idx + 1].focus();
            }
            refrescarClase();
        });

        casilla.addEventListener('keydown', e => {
            if (e.key === 'Backspace' && !casilla.value && idx > 0) {
                casillas[idx - 1].focus();
                casillas[idx - 1].value = '';
                refrescarClase();
                e.preventDefault();
            } else if (e.key === 'ArrowLeft' && idx > 0) {
                casillas[idx - 1].focus();
            } else if (e.key === 'ArrowRight' && idx < casillas.length - 1) {
                casillas[idx + 1].focus();
            } else if (e.key === 'Enter') {
                comprobarCodigoUsuario();
            }
        });

        casilla.addEventListener('paste', e => {
            e.preventDefault();
            const texto = (e.clipboardData || window.clipboardData).getData('text');
            const digitos = texto.replace(/[^0-9]/g, '').slice(0, 4);
            digitos.split('').forEach((d, i) => {
                if (casillas[i]) casillas[i].value = d;
            });
            const foco = Math.min(digitos.length, casillas.length - 1);
            casillas[foco].focus();
            refrescarClase();
        });

        casilla.addEventListener('focus', () => casilla.select());
    });

    casillas[0].focus();
}

function mostrarMensajeCodigo(texto, clase) {
    const el = document.getElementById('mensaje-codigo');
    if (!el) return;
    el.textContent = texto;
    el.style.color = clase === 'acierto' ? '#3d8b63'
                    : clase === 'error'   ? '#c24747'
                    : 'var(--text-primary)';
}

function sacudirCasillasCodigo() {
    const cont = document.getElementById('casillas-codigo');
    if (!cont) return;
    cont.classList.add('shake');
    setTimeout(() => cont.classList.remove('shake'), 420);
}

function comprobarCodigoUsuario() {
    if (partidaCodigo.juegoTerminado) return;

    const casillas = Array.from(document.querySelectorAll('.casilla-codigo'));
    const valor = casillas.map(c => c.value).join('');

    if (valor.length !== 4 || !/^\d{4}$/.test(valor)) {
        mostrarMensajeCodigo('❌ Rellena las 4 casillas con dígitos.', 'error');
        sacudirCasillasCodigo();
        return;
    }
    const propuesta = valor.split('').map(x => parseInt(x));
    if (new Set(propuesta).size !== 4) {
        mostrarMensajeCodigo('❌ No puede haber cifras repetidas.', 'error');
        sacudirCasillasCodigo();
        return;
    }

    // Contar intento válido
    partidaCodigo.intentosUsados++;

    const esCorrecto = propuesta.every((d, i) => d === partidaCodigo.codigoSecreto[i]);

    if (esCorrecto) {
        partidaCodigo.juegoTerminado = true;
        casillas.forEach(c => c.disabled = true);
        document.getElementById('casillas-codigo').classList.add('acertado');
        mostrarMensajeCodigo('✅ ¡Código correcto!', 'acierto');

        const nombre = (cargarJugadoresGuardados() || ['Alguien'])[0];
        logEvento(`✅ ${nombre} ha descifrado el código en ${partidaCodigo.intentosUsados} intentos.`);
        registrarPartidaCompletada();
        sumarRetoSuperado();

        setTimeout(mostrarResultadoCodigo, 700);
    } else {
        mostrarMensajeCodigo('❌ No es correcto. Sigue deduciendo...', 'error');
        sacudirCasillasCodigo();
    }
}

// ----------------------------------------------------------------
// RESULTADO
// ----------------------------------------------------------------
function mostrarResultadoCodigo() {
    setTituloJuego('Adivina el Código — ¡Descifrado!');
    const codigo = partidaCodigo.codigoSecreto.join('');
    const esDia = partidaCodigo.modo === 'dia';
    const intentos = partidaCodigo.intentosUsados;

    const botonesEspeciales = esDia ? `
        <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:8px;">
            <button class="btn-secundario" id="btn-compartir-reto">📤 Compartir resultado</button>
            <button class="btn-secundario" id="btn-ver-menu-cod">Volver al menú</button>
        </div>
    ` : `
        <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
            <button class="btn-secundario" id="btn-compartir-codigo">📤 Compartir resultado</button>
            <button class="btn-secundario" id="btn-otro-codigo">Jugar otro código</button>
            <button class="btn-principal" id="btn-volver-menu-codigo">Volver al menú</button>
        </div>
    `;

    renderVista(`
        <div class="pantalla-juego">
            <div class="tarjeta-central">
                <div class="veredicto">🎉 ¡Código descifrado!</div>
                <p class="subtexto" style="margin-top:6px;">El código secreto era:</p>
                <div class="codigo-descifrado">${codigo}</div>
                ${esDia ? `<p style="margin-top:10px; font-weight:700; color:var(--gold-dark);">Lo has resuelto en ${intentos} ${intentos === 1 ? 'intento' : 'intentos'} 🎯</p>` : ''}
            </div>
            ${botonesEspeciales}
        </div>
    `);

    if (esDia) {
        document.getElementById('btn-compartir-reto').addEventListener('click', () => {
            const fecha = fechaHoyString().split('-').reverse().join('/');
            const texto = `🎯 Reto del Día de JuegaCos (${fecha})\n🔢 Adivina el Código resuelto en ${intentos} ${intentos === 1 ? 'intento' : 'intentos'}\n\n¿Puedes tú? 👉 `;
            compartirResultado(texto);
        });
        document.getElementById('btn-ver-menu-cod').addEventListener('click', crearMenuCodigo);
    } else {
        document.getElementById('btn-compartir-codigo').addEventListener('click', () => {
            compartirResultado(`🔢 ¡He descifrado el código secreto en Adivina el Código! ¿Te atreves tú?`);
        });
        document.getElementById('btn-otro-codigo').addEventListener('click', () => crearPartidaCodigo('aleatorio'));
        document.getElementById('btn-volver-menu-codigo').addEventListener('click', crearMenuCodigo);
    }
}