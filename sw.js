// ================================================================
// SERVICE WORKER — Fiesta
// v2: añadido ranking.js, cacheo individual tolerante a fallos
// ================================================================
const CACHE_NOMBRE = 'fiesta-cache-v2';

const ARCHIVOS_ESENCIALES = [
    './',
    './index.html',
    './manifest.json',
    './css/style.css',
    './js/juegos-data.js',
    './js/impostor.js',
    './js/ahorcado.js',
    './js/trivial.js',
    './js/pasapalabra.js',
    './js/trivialperros.js',
    './js/quiensoy.js',
    './js/codigo.js',
    './js/chat.js',
    './js/ranking.js',
    './js/main.js',
    './img/iconos/icono-192.png',
    './img/iconos/icono-512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NOMBRE).then(cache =>
            Promise.all(
                ARCHIVOS_ESENCIALES.map(url =>
                    cache.add(url).catch(err => {
                        console.warn('⚠️ No se pudo cachear:', url, err);
                    })
                )
            )
        )
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(nombres =>
                Promise.all(
                    nombres
                        .filter(n => n !== CACHE_NOMBRE)
                        .map(n => caches.delete(n))
                )
            )
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    const { request } = event;

    if (request.method !== 'GET') return;
    if (!request.url.startsWith(self.location.origin)) return;

    const esNavegacion = request.mode === 'navigate';

    event.respondWith(
        fetch(request)
            .then(respuesta => {
                if (respuesta && respuesta.status === 200 && respuesta.type === 'basic') {
                    const copia = respuesta.clone();
                    caches.open(CACHE_NOMBRE)
                        .then(cache => cache.put(request, copia))
                        .catch(() => {});
                }
                return respuesta;
            })
            .catch(async () => {
                const cacheado = await caches.match(request);
                if (cacheado) return cacheado;

                if (esNavegacion) {
                    const indexCacheado = await caches.match('./index.html');
                    if (indexCacheado) return indexCacheado;
                }

                return new Response('', { status: 503, statusText: 'Sin conexión' });
            })
    );
});