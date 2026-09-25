// ================================================================
// CATÁLOGO DE MINIJUEGOS DISPONIBLES
// ================================================================
const CATALOGO_JUEGOS = [
    { id: 'impostor', nombre: 'Impostor de palabra', icono: '🎭', descripcion: 'Todos tienen la misma palabra menos uno. Descubre quién miente.', disponible: true },
    { id: 'ahorcado', nombre: 'Ahorcado', icono: '🎯', descripcion: 'Escribe una palabra y que el resto la adivine letra a letra.', disponible: true },
    { id: 'trivial', nombre: 'Trivial de Streamers', icono: '❓', descripcion: 'Preguntas de gaming y cultura streamer por turnos.', disponible: true },
    { id: 'pasapalabra', nombre: 'Definiciones', icono: '🔤', descripcion: 'El rosco de siempre, en equipo y contrarreloj.', disponible: true },
    { id: 'trivialperros', nombre: 'Trivial de Perros', icono: '🐶', descripcion: 'Adivina razas de perros por su foto y sus características.', disponible: true },
    { id: 'quiensoy', nombre: '¿Quién soy?', icono: '🎭', descripcion: 'Piensa un personaje libre y que el otro lo adivine con preguntas de sí o no.', disponible: true },
    { id: 'codigo', nombre: 'Adivina el Código', icono: '🔢', descripcion: 'Puzzle de lógica de 4 cifras. Deduce el código único a partir de 5 pistas.', disponible: true },
    { id: 'cromos', nombre: 'Álbum Canino', icono: '🃏', descripcion: 'Acierta preguntas sobre perros y desbloquea cartas coleccionables.', disponible: true }
];

// ================================================================
// BANCO DE PALABRAS PARA EL IMPOSTOR
// ================================================================
const CATEGORIAS_IMPOSTOR = {
    comida: {
        nombre: '🍕 Comida',
        palabras: ['Paella', 'Sushi', 'Pizza', 'Tacos', 'Hamburguesa', 'Croquetas', 'Ramen', 'Tortilla de patata', 'Lasaña', 'Churros']
    },
    peliculas: {
        nombre: '🎬 Películas',
        palabras: ['Titanic', 'Jurassic Park', 'El Padrino', 'Matrix', 'Shrek', 'Gladiator', 'Frozen', 'Rocky', 'Avatar', 'Coco']
    },
    futbol: {
        nombre: '⚽ Fútbol',
        palabras: ['Penalti', 'Fuera de juego', 'Córner', 'Portero', 'Balón', 'Estadio', 'Árbitro', 'Tarjeta roja', 'Delantero', 'Mundial']
    },
    streamers: {
        nombre: '🎮 Streamers',
        palabras: ['Directo', 'Suscriptor', 'Donación', 'Chat', 'Bits', 'Emote', 'Clip', 'Raid', 'Moderador', 'Miniatura']
    }
};

function obtenerPalabraAleatoria(categoriaId) {
    const cat = CATEGORIAS_IMPOSTOR[categoriaId];
    const palabras = cat.palabras;
    return palabras[Math.floor(Math.random() * palabras.length)];
}