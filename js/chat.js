// ================================================================
// CHAT EN DIRECTO CON SUPABASE REALTIME
// Sala única global: 'principal'
// ================================================================

const SUPABASE_URL = 'https://fponsxnvrynnshekiptw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_SuIyRpLsI6yXyYvGfHs34Q_iWDjoOq2';
const SALA_CHAT = 'principal';
const LIMITE_MENSAJES_INICIALES = 50;

let clienteSupabase = null;
let canalChat = null;

// ----------------------------------------------------------------
// Arranque del chat (lo llama main.js)
// ----------------------------------------------------------------
function inicializarChat() {
    if (typeof supabase === 'undefined') {
        console.warn('⚠️ SDK de Supabase no cargado; el chat en directo está desactivado.');
        return;
    }
    clienteSupabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    cargarMensajesIniciales();
    suscribirMensajesNuevos();
    enlazarInputChat();
    enlazarInputChatFlotante();
    console.log('💬 Chat en directo conectado a Supabase.');
}

// ----------------------------------------------------------------
// Envío centralizado (lo usan el input normal y el flotante)
// ----------------------------------------------------------------
async function enviarMensajeChat(texto) {
    if (!texto) return;
    const usuario = (cargarJugadoresGuardados() || ['Anónimo'])[0];
    const { error } = await clienteSupabase
        .from('mensajes')
        .insert({ sala: SALA_CHAT, usuario, texto });

    if (error) {
        console.error('Error al enviar mensaje:', error);
        logEvento('⚠️ No se pudo enviar el mensaje.');
    }
}

// ----------------------------------------------------------------
// Input del panel (escritorio y móvil con panel abierto)
// ----------------------------------------------------------------
function enlazarInputChat() {
    const input = document.getElementById('chat-input-texto');
    const btn = document.getElementById('chat-input-enviar');
    if (!input || !btn) return;

    const enviar = () => {
        const texto = input.value.trim();
        if (!texto) return;
        input.value = '';
        enviarMensajeChat(texto);
    };

    btn.addEventListener('click', enviar);
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') { e.preventDefault(); enviar(); }
    });
}

// ----------------------------------------------------------------
// Barra flotante móvil + abrir panel completo
// ----------------------------------------------------------------
function enlazarInputChatFlotante() {
    const input = document.getElementById('chat-flotante-input');
    const btn = document.getElementById('chat-flotante-enviar');
    const expandir = document.getElementById('chat-flotante-expandir');
    const panel = document.getElementById('columna-derecha');
    const overlay = document.getElementById('right-panel-overlay');

    if (input && btn) {
        const enviar = () => {
            const texto = input.value.trim();
            if (!texto) return;
            input.value = '';
            enviarMensajeChat(texto);
        };
        btn.addEventListener('click', enviar);
        input.addEventListener('keydown', e => {
            if (e.key === 'Enter') { e.preventDefault(); enviar(); }
        });
    }

    if (expandir && panel && overlay) {
        expandir.addEventListener('click', () => {
            panel.classList.add('open-movil');
            overlay.classList.add('open');
            const cont = document.getElementById('chat-mensajes');
            if (cont) setTimeout(() => cont.scrollTop = cont.scrollHeight, 300);
        });
    }

    if (overlay && panel) {
        overlay.addEventListener('click', () => {
            panel.classList.remove('open-movil');
            overlay.classList.remove('open');
        });
    }
}

// ----------------------------------------------------------------
// Cargar los últimos mensajes al entrar
// ----------------------------------------------------------------
async function cargarMensajesIniciales() {
    const { data, error } = await clienteSupabase
        .from('mensajes')
        .select('*')
        .eq('sala', SALA_CHAT)
        .order('creado_en', { ascending: true })
        .limit(LIMITE_MENSAJES_INICIALES);

    if (error) {
        console.error('Error al cargar mensajes:', error);
        return;
    }
    if (!data || data.length === 0) return;

    const cont = document.getElementById('chat-mensajes');
    if (cont) {
        const sep = document.createElement('div');
        sep.className = 'msg sistema';
        sep.textContent = '— Mensajes anteriores —';
        cont.appendChild(sep);
    }

    data.forEach(renderMensajeChat);
}

// ----------------------------------------------------------------
// Suscribirse a mensajes nuevos en tiempo real
// ----------------------------------------------------------------
function suscribirMensajesNuevos() {
    canalChat = clienteSupabase
        .channel('sala-' + SALA_CHAT)
        .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'mensajes',
            filter: `sala=eq.${SALA_CHAT}`
        }, payload => {
            renderMensajeChat(payload.new);
        })
        .subscribe(status => {
            if (status === 'SUBSCRIBED') console.log('📡 Suscrito al chat en tiempo real.');
            if (status === 'CHANNEL_ERROR') console.error('❌ Error en el canal de chat.');
        });
}

// ----------------------------------------------------------------
// Pintar un mensaje en el panel derecho
// ----------------------------------------------------------------
function renderMensajeChat(msg) {
    const cont = document.getElementById('chat-mensajes');
    if (!cont) return;

    const usuarioActual = (cargarJugadoresGuardados() || ['Anónimo'])[0];
    const esPropio = msg.usuario === usuarioActual;

    const div = document.createElement('div');
    div.className = 'msg ' + (esPropio ? 'usuario' : 'ia');

    const nombre = document.createElement('span');
    nombre.className = 'nombre';
    nombre.textContent = esPropio ? 'Tú' : msg.usuario;

    const texto = document.createElement('span');
    texto.textContent = msg.texto;

    div.appendChild(nombre);
    div.appendChild(document.createElement('br'));
    div.appendChild(texto);
    cont.appendChild(div);
    cont.scrollTop = cont.scrollHeight;
}