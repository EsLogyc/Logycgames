// ================================================================
// ADIVINA EL CÓDIGO — puzzle de lógica de 4 cifras, en solitario
//  🔷 = correcto y en su sitio
//  ▮  = correcto pero fuera de sitio
//  (vacío) = ningún número coincide
// ================================================================

let partidaCodigo = null;

// Las 5.040 combinaciones posibles de 4 cifras sin repetir, calculadas
// UNA sola vez al cargar el archivo (antes se recalculaban en cada
// intento de generar un puzzle, un trabajo repetido e innecesario).
const TODAS_LAS_COMBINACIONES_CODIGO = (function generarTodasLasCombinaciones() {
    const combinaciones = [];
    function generar(actual, disponibles) {
        if (actual.length === 4) {
            combinaciones.push([...actual]);
            return;
        }
        for (let i = 0; i < disponibles.length; i++) {
            const nuevo = [...actual, disponibles[i]];
            const restantes = [...disponibles.slice(0, i), ...disponibles.slice(i + 1)];
            generar(nuevo, restantes);
        }
    }
    generar([], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    return combinaciones;
})();

function crearPartidaCodigo() {
    partidaCodigo = {
        codigoSecreto: [],
        filas: [],
        numerosTachados: new Set(),
        juegoTerminado: false
    };
    generarCodigo();
    generarFilas();
    renderTableroCodigo();
}

// ----------------------------------------------------------------
// GENERACIÓN DEL CÓDIGO Y LAS PISTAS
// ----------------------------------------------------------------
function generarCodigo() {
    const codigo = [];
    const usados = new Set();
    while (codigo.length < 4) {
        const n = Math.floor(Math.random() * 10);
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

function barajarCodigo(arr) {
    const copia = [...arr];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

// IMPORTANTE: aquí está la corrección clave. Cada fila se genera con un
// orden fijo (candidato) y se evalúa EN ESE MISMO ORDEN, sin volver a
// barajar los números después de calcular las pistas. Reordenar tras
// evaluar era justo el fallo que hacía que la solución real no encajara
// con las pistas mostradas.
function generarFilas() {
    const MAX_INTENTOS = 300;

    for (let intentoGlobal = 0; intentoGlobal < MAX_INTENTOS; intentoGlobal++) {
        const codigoSecreto = partidaCodigo.codigoSecreto;
        const filas = [];
        const clavesVistas = new Set([codigoSecreto.join('')]);
        let fallo = false;

        for (let j = 0; j < 5; j++) {
            let intentoRow = null;
            for (let k = 0; k < 100; k++) {
                const candidato = barajarCodigo([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4);
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
        generarCodigo();
    }

    // Fallback de seguridad (no debería ocurrir prácticamente nunca)
    const codigoSecreto = partidaCodigo.codigoSecreto;
    const filas = [];
    for (let j = 0; j < 5; j++) {
        const intentoRow = barajarCodigo([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4);
        const simbolos = evaluarIntentoCodigo(intentoRow, codigoSecreto);
        filas.push({ numeros: intentoRow, simbolos });
    }
    partidaCodigo.filas = filas;
}

function verificarSolucionUnicaCodigo(filas, codigoSecreto) {
    let soluciones = 0;
    for (const combinacion of TODAS_LAS_COMBINACIONES_CODIGO) {
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

    const tecladoHtml = Array.from({ length: 10 }, (_, i) => i).map(n => {
        const tachado = partidaCodigo.numerosTachados.has(n);
        return `<div class="tecla-tachar ${tachado ? 'tachado' : ''}" data-num="${n}">${n}</div>`;
    }).join('');

    renderVista(`
        <div class="pantalla-juego">
            <button class="btn-volver" id="btn-volver-selector-codigo">← Volver a minijuegos</button>
            <h2>🔢 Adivina el Código</h2>
            <p class="subtexto">4 cifras sin repetir. 🔷 bien colocado · ▮ existe pero mal colocado · vacío, ninguno coincide. Solo hay una solución posible con estas 5 pistas.</p>

            <div class="tarjeta-central">
                <div class="tablero-codigo">${filasHtml}</div>
                <p class="subtexto" style="margin-top:14px;">✏️ Toca un número (en las filas o abajo) para tacharlo cuando lo descartes</p>
                <div class="teclado-tachar" id="teclado-tachar-codigo">${tecladoHtml}</div>
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

    document.getElementById('btn-volver-selector-codigo').onclick = mostrarSelectorJuegos;

    function toggleTachar(num) {
        if (partidaCodigo.juegoTerminado) return;
        if (partidaCodigo.numerosTachados.has(num)) partidaCodigo.numerosTachados.delete(num);
        else partidaCodigo.numerosTachados.add(num);

        document.querySelectorAll(
            `.digito-codigo[data-num="${num}"], .tecla-tachar[data-num="${num}"]`
        ).forEach(el => el.classList.toggle('tachado'));
    }

    document.querySelectorAll('.digito-codigo, .tecla-tachar').forEach(el => {
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

    const esCorrecto = propuesta.every((d, i) => d === partidaCodigo.codigoSecreto[i]);

    if (esCorrecto) {
        partidaCodigo.juegoTerminado = true;
        casillas.forEach(c => c.disabled = true);
        document.getElementById('casillas-codigo').classList.add('acertado');
        mostrarMensajeCodigo('✅ ¡Código correcto!', 'acierto');

        const nombre = (cargarJugadoresGuardados() || ['Alguien'])[0];
        logEvento(`✅ ${nombre} ha descifrado el código: ${partidaCodigo.codigoSecreto.join('')}`);
        registrarPartidaCompletada();
        registrarVictoria();

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

    renderVista(`
        <div class="pantalla-juego">
            <div class="tarjeta-central">
                <div class="veredicto">🎉 ¡Código descifrado!</div>
                <p class="subtexto" style="margin-top:6px;">El código secreto era:</p>
                <div class="codigo-descifrado">${codigo}</div>
            </div>
            <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
                <button class="btn-secundario" id="btn-compartir-codigo">📤 Compartir resultado</button>
                <button class="btn-secundario" id="btn-otro-codigo">Jugar otro código</button>
                <button class="btn-principal" id="btn-volver-menu-codigo">Volver al menú</button>
            </div>
        </div>
    `);

    document.getElementById('btn-compartir-codigo').addEventListener('click', () => {
        compartirResultado(`🔢 ¡He descifrado el código secreto en Adivina el Código! ¿Te atreves tú?`);
    });
    document.getElementById('btn-otro-codigo').addEventListener('click', crearPartidaCodigo);
    document.getElementById('btn-volver-menu-codigo').addEventListener('click', mostrarSelectorJuegos);
}