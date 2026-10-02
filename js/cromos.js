// ================================================================
// ÁLBUM CANINO — Juego + gestión del álbum (con subrazas)
// ================================================================

const NUM_PREGUNTAS_CROMOS = 10;
const CLAVE_UUID = 'juegacos_uuid';
const CLAVE_CODIGO = 'juegacos_codigo_respaldo';
const CLAVE_FOTOS_CACHE = 'juegacos_fotos_cache';

let partidaCromos = null;
let cromosDesbloqueados = new Set();
let jugadorCromos = { uuid: null, codigo: null };

// ----------------------------------------------------------------
// HELPERS
// ----------------------------------------------------------------
function totalCromosPosibles() {
    let total = RAZAS_CROMOS.length;
    RAZAS_CROMOS.forEach(r => {
        if (r.subrazas) total += r.subrazas.length;
    });
    return total;
}

// ----------------------------------------------------------------
// IDENTIDAD DEL JUGADOR
// ----------------------------------------------------------------
function generarUUID() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function generarCodigoRespaldo() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const bloques = [];
    for (let b = 0; b < 3; b++) {
        let bloque = '';
        for (let i = 0; i < 4; i++) {
            bloque += chars[Math.floor(Math.random() * chars.length)];
        }
        bloques.push(bloque);
    }
    return bloques.join('-');
}

async function inicializarJugadorCromos() {
    let uuid = localStorage.getItem(CLAVE_UUID);
    let codigo = localStorage.getItem(CLAVE_CODIGO);

    if (uuid && codigo) {
        jugadorCromos = { uuid, codigo };
        return;
    }

    uuid = generarUUID();
    codigo = generarCodigoRespaldo();
    localStorage.setItem(CLAVE_UUID, uuid);
    localStorage.setItem(CLAVE_CODIGO, codigo);
    jugadorCromos = { uuid, codigo };

    const nombre = (cargarJugadoresGuardados() || ['Anónimo'])[0];
    if (clienteSupabase) {
        await clienteSupabase.from('jugadores').insert({
            jugador_id: uuid,
            codigo_respaldo: codigo,
            nombre_actual: nombre
        }).then(({ error }) => {
            if (error && error.code !== '23505') console.error('Error al registrar jugador:', error);
        });
    }
}

// ----------------------------------------------------------------
// CARGAR CROMOS DESDE SUPABASE
// ----------------------------------------------------------------
async function cargarCromosDesbloqueados() {
    if (!clienteSupabase || !jugadorCromos.uuid) return new Set();

    const { data, error } = await clienteSupabase
        .from('cromos')
        .select('raza_id')
        .eq('jugador_id', jugadorCromos.uuid);

    if (error) {
        console.error('Error al cargar cromos:', error);
        return new Set();
    }
    cromosDesbloqueados = new Set((data || []).map(r => r.raza_id));
    return cromosDesbloqueados;
}

// ----------------------------------------------------------------
// DESBLOQUEAR (raza o subraza)
// ----------------------------------------------------------------
async function desbloquearCromo(idDesbloqueo) {
    if (cromosDesbloqueados.has(idDesbloqueo)) return false;

    cromosDesbloqueados.add(idDesbloqueo);
    actualizarContadorCromos();

    if (clienteSupabase && jugadorCromos.uuid) {
        const { error } = await clienteSupabase.from('cromos').insert({
            jugador_id: jugadorCromos.uuid,
            raza_id: idDesbloqueo
        });
        if (error && error.code !== '23505') {
            console.error('Error al desbloquear cromo:', error);
        }
    }
    return true;
}

// ----------------------------------------------------------------
// FOTOS (dog.ceo API + caché local + reintentos)
// ----------------------------------------------------------------
function cargarCacheFotos() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_FOTOS_CACHE) || '{}');
    } catch (e) { return {}; }
}

function guardarCacheFotos(cache) {
    try { localStorage.setItem(CLAVE_FOTOS_CACHE, JSON.stringify(cache)); } catch (e) { /* ignore */ }
}

async function obtenerFotoRaza(raza) {
    const cache = cargarCacheFotos();
    if (cache[raza.id]) return cache[raza.id];

    const url = `https://dog.ceo/api/breed/${raza.apiBreed}/images/random`;

    for (let intento = 0; intento < 3; intento++) {
        try {
            const resp = await fetch(url);
            if (resp.status === 429) {
                await new Promise(r => setTimeout(r, 1000 + intento * 1000));
                continue;
            }
            if (!resp.ok) continue;
            const data = await resp.json();
            if (data.status === 'success' && data.message) {
                cache[raza.id] = data.message;
                guardarCacheFotos(cache);
                return data.message;
            }
        } catch (e) {
            console.warn(`Intento ${intento + 1} fallido para ${raza.nombre}:`, e);
            await new Promise(r => setTimeout(r, 400));
        }
    }
    console.warn(`❌ No se pudo cargar foto de ${raza.nombre} (${raza.apiBreed})`);
    return null;
}

function fallbackFotoHTML(raza, clase = '') {
    const inicial = (raza.nombre || '?').charAt(0).toUpperCase();
    return `<div class="foto-fallback-letra ${clase}">${inicial}</div>`;
}

// ----------------------------------------------------------------
// MENÚ PRINCIPAL
// ----------------------------------------------------------------
async function crearPartidaCromos() {
    setTituloJuego('Álbum Canino');
    await inicializarJugadorCromos();
    await cargarCromosDesbloqueados();
    renderMenuCromos();
}

function renderMenuCromos() {
    const total = totalCromosPosibles();
    const conseguidos = cromosDesbloqueados.size;
    const pct = Math.round((conseguidos / total) * 100);

    renderVista(`
        <div class="pantalla-juego">
            <button class="btn-volver" id="btn-volver-menu-cromos">← Volver a minijuegos</button>
            <h2>🃏 Álbum Canino</h2>
            <p class="subtexto">Acierta preguntas sobre perros y desbloquea sus cartas coleccionables.</p>

            <div class="tarjeta-central tarjeta-album-resumen">
                <div class="icono-album">🐾</div>
                <div class="progreso-album">
                    <div class="progreso-album-texto">${conseguidos} / ${total} cromos conseguidos</div>
                    <div class="progreso-album-barra">
                        <div class="progreso-album-relleno" style="width:${pct}%"></div>
                    </div>
                </div>
            </div>
            <div style="display:flex; flex-direction:column; gap:10px;">
                <button class="btn-principal" id="btn-jugar-cromos">🎯 Jugar (${NUM_PREGUNTAS_CROMOS} preguntas)</button>
                <button class="btn-secundario" id="btn-ver-album-cromos">📖 Ver mi álbum</button>
                <button class="btn-secundario" id="btn-refrescar-fotos">🔄 Recargar fotos</button>
                <button class="btn-secundario" id="btn-codigo-respaldo">🔑 Mi código de respaldo</button>
            </div>
        </div>
    `);

    document.getElementById('btn-volver-menu-cromos').onclick = mostrarSelectorJuegos;
    document.getElementById('btn-jugar-cromos').addEventListener('click', iniciarPartidaCromos);
    document.getElementById('btn-ver-album-cromos').addEventListener('click', renderAlbumCompleto);
    document.getElementById('btn-codigo-respaldo').addEventListener('click', renderCodigoRespaldo);
    document.getElementById('btn-refrescar-fotos').addEventListener('click', async () => {
        if (!confirm('¿Borrar la caché de fotos y volver a descargarlas todas? Tardará un poco.')) return;
        try { localStorage.removeItem(CLAVE_FOTOS_CACHE); } catch (e) {}
        logEvento('🔄 Recargando fotos...');
        await renderAlbumCompleto();
    });
}

// ----------------------------------------------------------------
// PARTIDA
// ----------------------------------------------------------------
async function iniciarPartidaCromos() {
    const razasMezcladas = barajarArray(RAZAS_CROMOS).slice(0, NUM_PREGUNTAS_CROMOS);
    partidaCromos = {
        razas: razasMezcladas,
        indice: 0,
        aciertos: 0,
        cromosNuevos: [],
        preguntaActual: null
    };
    logEvento('🃏 Empieza una partida de Álbum Canino.');
    await renderPreguntaCromos();
}

async function renderPreguntaCromos() {
    const razas = partidaCromos.razas;
    const idx = partidaCromos.indice;

    if (idx >= razas.length) {
        renderResultadoCromos();
        return;
    }

    const raza = razas[idx];

    // Si la raza tiene subrazas pendientes, 50% de las veces preguntamos por subraza
    let tipoForzado = null;
    if (raza.subrazas && raza.subrazas.length > 0) {
        const pendientes = raza.subrazas.filter(s => !cromosDesbloqueados.has(s.id));
        if (pendientes.length > 0 && Math.random() < 0.5) {
            tipoForzado = 'subraza';
        }
    }

    const pregunta = generarPreguntaCromos(raza, tipoForzado, cromosDesbloqueados);
    partidaCromos.preguntaActual = pregunta;

    setTituloJuego(`Álbum Canino — ${idx + 1}/${razas.length}`);

    let contenidoFoto = '';
    if (pregunta.tipo === 'foto') {
        contenidoFoto = `<div class="foto-perro-cromos" id="foto-cromos"><div class="foto-perro-cargando">🐶</div></div>`;
    }

    const opcionesHtml = pregunta.opciones.map((op, i) => `
        <button class="opcion-cromos" data-idx="${i}">${op.nombre}</button>
    `).join('');

    renderVista(`
        <div class="pantalla-juego">
            <div class="progreso-cromos">
                <div class="progreso-cromos-texto">Pregunta ${idx + 1} de ${razas.length}</div>
                <div class="progreso-cromos-barra">
                    <div class="progreso-cromos-relleno" style="width:${(idx / razas.length) * 100}%"></div>
                </div>
            </div>

            <div class="tarjeta-central">
                ${contenidoFoto}
                <p class="pregunta-cromos">${pregunta.pregunta}</p>
                <div class="opciones-cromos" id="opciones-cromos">${opcionesHtml}</div>
                <div id="feedback-cromos" class="feedback-cromos"></div>
            </div>
        </div>
    `);

    if (pregunta.tipo === 'foto') {
        const foto = await obtenerFotoRaza(raza);
        const contFoto = document.getElementById('foto-cromos');
        if (contFoto) {
            contFoto.innerHTML = foto
                ? `<img src="${foto}" alt="${raza.nombre}" class="foto-perro-img" />`
                : fallbackFotoHTML(raza);
        }
    }

    document.querySelectorAll('.opcion-cromos').forEach(btn => {
        btn.addEventListener('click', () => {
            const idxElegido = parseInt(btn.dataset.idx);
            resolverPreguntaCromos(idxElegido, pregunta);
        });
    });
}

async function resolverPreguntaCromos(idxElegido, pregunta) {
    const opcionElegida = pregunta.opciones[idxElegido];

    const esSubraza = pregunta.tipo === 'subraza';
    const idCorrecto = esSubraza ? pregunta.subraza.id : pregunta.raza.id;
    const nombreCorrecto = esSubraza
        ? `${pregunta.raza.nombre} · ${pregunta.subraza.nombre}`
        : pregunta.raza.nombre;

    const esCorrecta = opcionElegida.id === idCorrecto;

    document.querySelectorAll('.opcion-cromos').forEach((btn, i) => {
        btn.style.pointerEvents = 'none';
        const op = pregunta.opciones[i];
        if (op.id === idCorrecto) btn.classList.add('correcta');
        else if (i === idxElegido) btn.classList.add('incorrecta');
    });

    const feedback = document.getElementById('feedback-cromos');

    if (esCorrecta) {
        partidaCromos.aciertos++;
        feedback.className = 'feedback-cromos acierto';
        feedback.textContent = '✅ ¡Correcto!';

        const esNueva = await desbloquearCromo(idCorrecto);
        if (esNueva) {
            partidaCromos.cromosNuevos.push({
                tipo: pregunta.tipo,
                raza: pregunta.raza,
                subraza: pregunta.subraza || null
            });
            feedback.textContent = '🎉 ¡Cromo nuevo desbloqueado!';
        }

        logEvento(`🃏 ${nombreCorrecto} ${esNueva ? 'desbloqueado' : 'acertado'}.`);
        sumarAciertos(1);
    } else {
        feedback.className = 'feedback-cromos fallo';
        feedback.textContent = `❌ Era: ${nombreCorrecto}`;
        logEvento(`❌ Fallo. Era ${nombreCorrecto}.`);
    }

    const ultimoNuevo = partidaCromos.cromosNuevos[partidaCromos.cromosNuevos.length - 1];
    if (esCorrecta && ultimoNuevo && ultimoNuevo.raza.id === pregunta.raza.id) {
        setTimeout(() => mostrarCartaDesbloqueada(pregunta.raza), 500);
    } else {
        setTimeout(() => {
            partidaCromos.indice++;
            renderPreguntaCromos();
        }, 1500);
    }
}

function mostrarCartaDesbloqueada(raza) {
    const foto = cargarCacheFotos()[raza.id] || '';
    renderVista(`
        <div class="pantalla-juego pantalla-carta">
            <h2>🎉 ¡Cromo desbloqueado!</h2>
            ${renderCartaHTML(raza, foto, true)}
            <button class="btn-principal" id="btn-continuar-carta">Continuar →</button>
        </div>
    `);
    document.getElementById('btn-continuar-carta').addEventListener('click', () => {
        partidaCromos.indice++;
        renderPreguntaCromos();
    });
}

// ----------------------------------------------------------------
// RENDER DE UNA CARTA
// ----------------------------------------------------------------
function renderCartaHTML(raza, foto, animar = false) {
    const claseAnim = animar ? ' carta-animada' : '';

    let bloqueSubrazas = '';
    if (raza.subrazas && raza.subrazas.length > 0) {
        const total = raza.subrazas.length;
        const conseguidas = raza.subrazas.filter(s => cromosDesbloqueados.has(s.id)).length;

        const chipsHtml = raza.subrazas.map(s => {
            const ok = cromosDesbloqueados.has(s.id);
            return `
                <div class="subraza-chip ${ok ? 'conseguida' : ''}" title="${s.pista || ''}">
                    <span class="subraza-emoji">${s.emoji}</span>
                    <span class="subraza-nombre">${s.nombre}</span>
                    ${ok ? '' : '<span class="subraza-candado">🔒</span>'}
                </div>
            `;
        }).join('');

        bloqueSubrazas = `
            <div class="subrazas-bloque">
                <div class="subrazas-titulo">Subrazas · ${conseguidas}/${total}</div>
                <div class="subrazas-lista">${chipsHtml}</div>
            </div>
        `;
    }

    return `
        <div class="carta-cromos${claseAnim}">
            <div class="carta-foto">
                ${foto
                    ? `<img src="${foto}" alt="${raza.nombre}" />`
                    : fallbackFotoHTML(raza, 'en-carta')}
            </div>
            <div class="carta-nombre">${raza.nombre}</div>
            <div class="carta-datos">
                <div>🌍 <span>Origen:</span> ${raza.origen}</div>
                <div>📏 <span>Tamaño:</span> ${raza.tamano}</div>
                <div>⚖️ <span>Peso:</span> ${raza.peso}</div>
                <div>❤️ <span>Carácter:</span> ${raza.caracter}</div>
            </div>
            ${bloqueSubrazas}
            <div class="carta-frase">🐾 "${raza.frase}"</div>
        </div>
    `;
}

// ----------------------------------------------------------------
// RESULTADO FINAL
// ----------------------------------------------------------------
function renderResultadoCromos() {
    setTituloJuego('Álbum Canino — Resultado');
    const aciertos = partidaCromos.aciertos;
    const total = partidaCromos.razas.length;
    const nuevos = partidaCromos.cromosNuevos.length;

    registrarPartidaCompletada();
    if (aciertos >= total / 2) sumarRetoSuperado();

    renderVista(`
        <div class="pantalla-juego">
            <div class="tarjeta-central">
                <div class="veredicto">🎯 ${aciertos}/${total} correctas</div>
                ${nuevos > 0
                    ? `<p style="margin-top:12px; font-weight:700; color:var(--gold-dark);">✨ ¡${nuevos} ${nuevos === 1 ? 'cromo nuevo' : 'cromos nuevos'}!</p>`
                    : `<p style="margin-top:12px; color:var(--text-secondary);">No has desbloqueado cromos nuevos esta vez.</p>`}
            </div>
            <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
                <button class="btn-secundario" id="btn-ver-album-resultado">📖 Ver álbum</button>
                <button class="btn-secundario" id="btn-otra-cromos">Jugar otra vez</button>
                <button class="btn-principal" id="btn-volver-menu-cromos-resultado">Volver al menú</button>
            </div>
        </div>
    `);

    document.getElementById('btn-ver-album-resultado').addEventListener('click', renderAlbumCompleto);
    document.getElementById('btn-otra-cromos').addEventListener('click', iniciarPartidaCromos);
    document.getElementById('btn-volver-menu-cromos-resultado').addEventListener('click', renderMenuCromos);
}

// ----------------------------------------------------------------
// ÁLBUM COMPLETO
// ----------------------------------------------------------------
async function renderAlbumCompleto() {
    await cargarCromosDesbloqueados();
    const total = totalCromosPosibles();
    const conseguidos = cromosDesbloqueados.size;

    const fotosCache = cargarCacheFotos();
    const razasSinFoto = RAZAS_CROMOS.filter(
        r => cromosDesbloqueados.has(r.id) && !fotosCache[r.id]
    );
    for (const r of razasSinFoto) {
        await obtenerFotoRaza(r);
        await new Promise(res => setTimeout(res, 300));
    }

    const cacheActualizado = cargarCacheFotos();

    const cartasHtml = RAZAS_CROMOS.map(raza => {
        const conseguida = cromosDesbloqueados.has(raza.id);
        const foto = cacheActualizado[raza.id] || '';
        if (conseguida) {
            return renderCartaHTML(raza, foto, false);
        }
        return `
            <div class="carta-cromos carta-bloqueada">
                <div class="carta-foto">
                    <div class="carta-foto-fallback">?</div>
                </div>
                <div class="carta-nombre">¿?</div>
                <div class="carta-datos">
                    <div>🌍 <span>Origen:</span> ???</div>
                    <div>📏 <span>Tamaño:</span> ???</div>
                    <div>⚖️ <span>Peso:</span> ???</div>
                    <div>❤️ <span>Carácter:</span> ???</div>
                </div>
                <div class="carta-frase">🔒 Aún no desbloqueada</div>
            </div>
        `;
    }).join('');

    setTituloJuego('Álbum Canino — Mi colección');
    renderVista(`
        <div class="pantalla-juego pantalla-album">
            <button class="btn-volver" id="btn-volver-menu-album">← Volver</button>
            <h2>📖 Mi álbum</h2>
            <p class="subtexto" style="margin-bottom:16px;">${conseguidos} de ${total} cromos conseguidos</p>
            <div class="album-grid">${cartasHtml}</div>
        </div>
    `);

    document.getElementById('btn-volver-menu-album').addEventListener('click', renderMenuCromos);
}

// ----------------------------------------------------------------
// CÓDIGO DE RESPALDO
// ----------------------------------------------------------------
function renderCodigoRespaldo() {
    setTituloJuego('Álbum Canino — Código de respaldo');

    renderVista(`
        <div class="pantalla-juego">
            <button class="btn-volver" id="btn-volver-menu-codigo">← Volver</button>
            <h2>🔑 Tu código de respaldo</h2>
            <p class="subtexto">Guárdalo para recuperar tu álbum en otro dispositivo.</p>
            <div class="tarjeta-central">
                <div class="codigo-respaldo" id="codigo-respaldo-texto">${jugadorCromos.codigo}</div>
                <button class="btn-secundario" id="btn-copiar-codigo" style="margin-top:10px;">📋 Copiar código</button>
            </div>
            <div class="tarjeta-central">
                <p class="subtexto" style="margin-bottom:10px;">¿Tienes un código de otro dispositivo?</p>
                <input type="text" id="input-recuperar-codigo" class="input-personaje-secreto"
                       placeholder="XXXX-XXXX-XXXX" maxlength="14" autocomplete="off"
                       style="text-transform:uppercase; letter-spacing:2px;" />
                <button class="btn-principal" style="margin-top:12px;" id="btn-recuperar-codigo">Recuperar álbum</button>
                <div id="feedback-recuperar" style="margin-top:10px; min-height:20px; font-weight:700;"></div>
            </div>
        </div>
    `);

    document.getElementById('btn-volver-menu-codigo').addEventListener('click', renderMenuCromos);

    document.getElementById('btn-copiar-codigo').addEventListener('click', () => {
        navigator.clipboard.writeText(jugadorCromos.codigo)
            .then(() => logEvento('📋 Código copiado.'))
            .catch(() => logEvento('⚠️ No se pudo copiar.'));
    });

    document.getElementById('btn-recuperar-codigo').addEventListener('click', async () => {
        const codigo = document.getElementById('input-recuperar-codigo').value.trim().toUpperCase();
        const feedback = document.getElementById('feedback-recuperar');
        if (!codigo) return;

        feedback.textContent = '⏳ Buscando...';
        feedback.style.color = 'var(--text-secondary)';

        const { data, error } = await clienteSupabase
            .from('jugadores')
            .select('jugador_id')
            .eq('codigo_respaldo', codigo)
            .single();

        if (error || !data) {
            feedback.textContent = '❌ Código no encontrado.';
            feedback.style.color = 'var(--danger-dark)';
            return;
        }

        localStorage.setItem(CLAVE_UUID, data.jugador_id);
        localStorage.setItem(CLAVE_CODIGO, codigo);
        jugadorCromos = { uuid: data.jugador_id, codigo };
        await cargarCromosDesbloqueados();

        feedback.textContent = '✅ ¡Álbum recuperado!';
        feedback.style.color = 'var(--success-dark)';
        logEvento('🔑 Álbum recuperado con código.');
        setTimeout(renderAlbumCompleto, 1200);
    });
}

// ----------------------------------------------------------------
// CONTADOR MINI (escritorio y móvil)
// ----------------------------------------------------------------
function actualizarContadorCromos() {
    const total = totalCromosPosibles();
    ['contador-cromos-panel', 'contador-cromos-panel-movil'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = `${cromosDesbloqueados.size} / ${total}`;
    });
}

async function inicializarContadorCromos() {
    await inicializarJugadorCromos();
    await cargarCromosDesbloqueados();
    actualizarContadorCromos();
}