// ================================================================
// ÁLBUM CANINO — Juego + gestión del álbum
// ================================================================

const NUM_PREGUNTAS_CROMOS = 10;
const CLAVE_UUID = 'juegacos_uuid';
const CLAVE_CODIGO = 'juegacos_codigo_respaldo';
const CLAVE_FOTOS_CACHE = 'juegacos_fotos_cache';

let partidaCromos = null;
let cromosDesbloqueados = new Set();
let jugadorCromos = { uuid: null, codigo: null };

// ----------------------------------------------------------------
// IDENTIDAD DEL JUGADOR (UUID + código respaldo)
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

    // Generar nuevos
    uuid = generarUUID();
    codigo = generarCodigoRespaldo();
    localStorage.setItem(CLAVE_UUID, uuid);
    localStorage.setItem(CLAVE_CODIGO, codigo);
    jugadorCromos = { uuid, codigo };

    // Registrar en Supabase (sin bloquear el flujo si falla)
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

async function desbloquearCromo(razaId) {
    if (cromosDesbloqueados.has(razaId)) return false;

    cromosDesbloqueados.add(razaId);
    actualizarContadorCromos();

    if (clienteSupabase && jugadorCromos.uuid) {
        const { error } = await clienteSupabase.from('cromos').insert({
            jugador_id: jugadorCromos.uuid,
            raza_id: razaId
        });
        if (error && error.code !== '23505') {
            console.error('Error al desbloquear cromo:', error);
        }
    }
    return true;
}

// ----------------------------------------------------------------
// FOTOS (dog.ceo API + caché local)
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

    try {
        const resp = await fetch(`https://dog.ceo/api/breed/${raza.apiBreed}/images/random`);
        const data = await resp.json();
        if (data.status === 'success' && data.message) {
            cache[raza.id] = data.message;
            guardarCacheFotos(cache);
            return data.message;
        }
    } catch (e) {
        console.warn('No se pudo cargar foto de', raza.nombre, e);
    }
    return null;
}

// ----------------------------------------------------------------
// MENÚ PRINCIPAL DEL JUEGO
// ----------------------------------------------------------------
async function crearPartidaCromos() {
    setTituloJuego('Álbum Canino');
    await inicializarJugadorCromos();
    await cargarCromosDesbloqueados();
    renderMenuCromos();
}

function renderMenuCromos() {
    const total = RAZAS_CROMOS.length;
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
                    <div class="progreso-album-texto">${conseguidos} / ${total} razas conseguidas</div>
                    <div class="progreso-album-barra">
                        <div class="progreso-album-relleno" style="width:${pct}%"></div>
                    </div>
                </div>
            </div>

            <div style="display:flex; flex-direction:column; gap:10px;">
                <button class="btn-principal" id="btn-jugar-cromos">🎯 Jugar (${NUM_PREGUNTAS_CROMOS} preguntas)</button>
                <button class="btn-secundario" id="btn-ver-album-cromos">📖 Ver mi álbum</button>
                <button class="btn-secundario" id="btn-codigo-respaldo">🔑 Mi código de respaldo</button>
            </div>
        </div>
    `);

    document.getElementById('btn-volver-menu-cromos').onclick = mostrarSelectorJuegos;
    document.getElementById('btn-jugar-cromos').addEventListener('click', iniciarPartidaCromos);
    document.getElementById('btn-ver-album-cromos').addEventListener('click', renderAlbumCompleto);
    document.getElementById('btn-codigo-respaldo').addEventListener('click', renderCodigoRespaldo);
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
    const pregunta = generarPreguntaCromos(raza);
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

    // Cargar foto si es tipo 'foto'
    if (pregunta.tipo === 'foto') {
        const foto = await obtenerFotoRaza(raza);
        const contFoto = document.getElementById('foto-cromos');
        if (contFoto) {
            if (foto) {
                contFoto.innerHTML = `<img src="${foto}" alt="${raza.nombre}" class="foto-perro-img" />`;
            } else {
                contFoto.innerHTML = `<div class="foto-perro-fallback">🐶</div>`;
            }
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
    const esCorrecta = opcionElegida.id === pregunta.raza.id;

    document.querySelectorAll('.opcion-cromos').forEach((btn, i) => {
        btn.style.pointerEvents = 'none';
        const op = pregunta.opciones[i];
        if (op.id === pregunta.raza.id) btn.classList.add('correcta');
        else if (i === idxElegido) btn.classList.add('incorrecta');
    });

    const feedback = document.getElementById('feedback-cromos');
    if (esCorrecta) {
        partidaCromos.aciertos++;
        feedback.className = 'feedback-cromos acierto';
        feedback.textContent = '✅ ¡Correcto!';

        // ¿Desbloqueamos la carta?
        const esNueva = await desbloquearCromo(pregunta.raza.id);
        if (esNueva) {
            partidaCromos.cromosNuevos.push(pregunta.raza);
            feedback.textContent = '🎉 ¡Carta nueva desbloqueada!';
        }

        logEvento(`🃏 ${pregunta.raza.nombre} ${esNueva ? 'desbloqueado' : 'acertado'}.`);
        sumarAciertos(1);
    } else {
        feedback.className = 'feedback-cromos fallo';
        feedback.textContent = `❌ Era: ${pregunta.raza.nombre}`;
        logEvento(`❌ Fallo. Era ${pregunta.raza.nombre}.`);
    }

    // Si es carta nueva, mostrar la carta entera con animación
    if (esCorrecta && partidaCromos.cromosNuevos.includes(pregunta.raza)) {
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
            <h2>🎉 ¡Carta desbloqueada!</h2>
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
    return `
        <div class="carta-cromos${claseAnim}">
            <div class="carta-foto">
                ${foto
                    ? `<img src="${foto}" alt="${raza.nombre}" />`
                    : `<div class="carta-foto-fallback">🐶</div>`}
            </div>
            <div class="carta-nombre">${raza.nombre}</div>
            <div class="carta-datos">
                <div>🌍 <span>Origen:</span> ${raza.origen}</div>
                <div>📏 <span>Tamaño:</span> ${raza.tamano}</div>
                <div>⚖️ <span>Peso:</span> ${raza.peso}</div>
                <div>❤️ <span>Carácter:</span> ${raza.caracter}</div>
            </div>
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
                    ? `<p style="margin-top:12px; font-weight:700; color:var(--gold-dark);">✨ ¡${nuevos} ${nuevos === 1 ? 'carta nueva' : 'cartas nuevas'}!</p>`
                    : `<p style="margin-top:12px; color:var(--text-secondary);">No has desbloqueado cartas nuevas esta vez.</p>`}
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
    const total = RAZAS_CROMOS.length;
    const conseguidos = cromosDesbloqueados.size;

    // Cargamos fotos de las conseguidas (en paralelo, sin bloquear)
    const fotosCache = cargarCacheFotos();
    const promesasFotos = RAZAS_CROMOS
        .filter(r => cromosDesbloqueados.has(r.id) && !fotosCache[r.id])
        .map(r => obtenerFotoRaza(r));
    if (promesasFotos.length > 0) {
        await Promise.all(promesasFotos);
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
            <p class="subtexto" style="margin-bottom:16px;">${conseguidos} de ${total} razas conseguidas</p>
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

        // Cambiamos la identidad local
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
// CONTADOR MINI (para el panel izquierdo)
// ----------------------------------------------------------------
function actualizarContadorCromos() {
    const el = document.getElementById('contador-cromos-panel');
    if (!el) return;
    el.textContent = `${cromosDesbloqueados.size} / ${RAZAS_CROMOS.length}`;
}

async function inicializarContadorCromos() {
    await inicializarJugadorCromos();
    await cargarCromosDesbloqueados();
    actualizarContadorCromos();
}