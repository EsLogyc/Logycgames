// ================================================================
// RANKING — Retos superados + Aciertos totales
// Reutiliza `clienteSupabase` de chat.js
// ================================================================

const RANKING_TOP = 10;

// ----------------------------------------------------------------
// Arranque (lo llama main.js después de inicializarChat)
// ----------------------------------------------------------------
function inicializarRanking() {
    if (!clienteSupabase) {
        console.warn('⚠️ Ranking desactivado: Supabase no disponible.');
        return;
    }
    cargarRankings();
    suscribirseRankings();
    console.log('🏆 Ranking conectado.');
}

// ----------------------------------------------------------------
// Sumar puntos (se llaman desde los juegos)
// ----------------------------------------------------------------
async function sumarRetoSuperado() {
    if (!clienteSupabase) return;
    const jugador = (cargarJugadoresGuardados() || ['Anónimo'])[0];
    const { error } = await clienteSupabase.rpc('sumar_reto', { p_jugador: jugador });
    if (error) console.error('Error al sumar reto:', error);
}

async function sumarAciertos(cantidad = 1) {
    if (!clienteSupabase || cantidad <= 0) return;
    const jugador = (cargarJugadoresGuardados() || ['Anónimo'])[0];
    const { error } = await clienteSupabase.rpc('sumar_aciertos', {
        p_jugador: jugador,
        p_cantidad: cantidad
    });
    if (error) console.error('Error al sumar aciertos:', error);
}

// ----------------------------------------------------------------
// Cargar y renderizar
// ----------------------------------------------------------------
async function cargarRankings() {
    const { data, error } = await clienteSupabase
        .from('ranking')
        .select('*')
        .limit(200);

    if (error) {
        console.error('Error al cargar ranking:', error);
        return;
    }
    const filas = data || [];
    const topRetos = [...filas]
        .sort((a, b) => b.retos_superados - a.retos_superados)
        .slice(0, RANKING_TOP);
    const topAciertos = [...filas]
        .sort((a, b) => b.aciertos_totales - a.aciertos_totales)
        .slice(0, RANKING_TOP);

    renderRankings(topRetos, topAciertos);
    mostrarMisCifras(filas);
}

function suscribirseRankings() {
    clienteSupabase
        .channel('ranking-cambios')
        .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'ranking'
        }, () => {
            cargarRankings();
        })
        .subscribe(status => {
            if (status === 'SUBSCRIBED') console.log('📡 Suscrito al ranking en vivo.');
        });
}

// ----------------------------------------------------------------
// Render
// ----------------------------------------------------------------
function escaparHTML(texto) {
    return String(texto).replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

function pintarLista(id, filas, campo) {
    const el = document.getElementById(id);
    if (!el) return;
    if (!filas.length) {
        el.innerHTML = '<span class="vacio">Sin datos aún</span>';
        return;
    }
    el.innerHTML = filas.map((r, i) => `
        <div class="item">
            <span class="pos">${i + 1}</span>
            <span class="nombre">${escaparHTML(r.jugador)}</span>
            <span class="puntos">${r[campo]}</span>
        </div>
    `).join('');
}

function renderRankings(topRetos, topAciertos) {
    ['ranking-retos', 'ranking-retos-movil'].forEach(id =>
        pintarLista(id, topRetos, 'retos_superados')
    );
    ['ranking-aciertos', 'ranking-aciertos-movil'].forEach(id =>
        pintarLista(id, topAciertos, 'aciertos_totales')
    );
}

function mostrarMisCifras(filas) {
    const jugador = (cargarJugadoresGuardados() || ['Anónimo'])[0];
    const mio = filas.find(f => f.jugador === jugador);
    const retos = mio ? mio.retos_superados : 0;
    const aciertos = mio ? mio.aciertos_totales : 0;

    ['mis-retos', 'mis-retos-movil'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = `🏆 ${retos}`;
    });
    ['mis-aciertos', 'mis-aciertos-movil'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = `🎓 ${aciertos}`;
    });
}