// ================================================================
// ROSCO DE CULTURA GENERAL — variantes aleatorias por letra
// Cada letra tiene 5 definiciones. Al iniciar partida se elige 1 al azar.
// Todas las respuestas son de UNA sola palabra y empiezan/contienen la letra.
// ================================================================
const ROSCO_PASAPALABRA = [
    {
        letra: 'A', tipo: 'empieza',
        variantes: [
            { enunciado: 'Instrumento musical de cuerda con forma triangular, típico de la música celta.', respuesta: 'Arpa' },
            { enunciado: 'Insecto volador que produce miel y vive en colmenas.', respuesta: 'Abeja' },
            { enunciado: 'Ave rapaz diurna de gran tamaño y vista muy aguda.', respuesta: 'Águila' },
            { enunciado: 'Mueble con puertas usado para guardar ropa.', respuesta: 'Armario' },
            { enunciado: 'Joya pequeña que se lleva en el dedo.', respuesta: 'Anillo' }
        ]
    },
    {
        letra: 'B', tipo: 'empieza',
        variantes: [
            { enunciado: 'Mamífero marino de gran tamaño que respira por un espiráculo.', respuesta: 'Ballena' },
            { enunciado: 'Vehículo de dos ruedas que se impulsa pedaleando.', respuesta: 'Bicicleta' },
            { enunciado: 'Instrumento musical de percusión formado por tambores y platillos.', respuesta: 'Batería' },
            { enunciado: 'Fruta tropical alargada de cáscara amarilla y pulpa dulce.', respuesta: 'Banana' },
            { enunciado: 'Utensilio con tubo de tinta que se usa para escribir.', respuesta: 'Bolígrafo' }
        ]
    },
    {
        letra: 'C', tipo: 'empieza',
        variantes: [
            { enunciado: 'Órgano muscular que bombea la sangre por todo el cuerpo.', respuesta: 'Corazón' },
            { enunciado: 'Animal equino usado para montar y tirar de carros.', respuesta: 'Caballo' },
            { enunciado: 'Bebida oscura y amarga que se prepara con granos tostados y molidos.', respuesta: 'Café' },
            { enunciado: 'Aparato con lente que sirve para hacer fotografías.', respuesta: 'Cámara' },
            { enunciado: 'Utensilio de cocina con hoja afilada que se usa para cortar.', respuesta: 'Cuchillo' }
        ]
    },
    {
        letra: 'D', tipo: 'empieza',
        variantes: [
            { enunciado: 'Pieza cúbica con puntos en las caras que se lanza al azar.', respuesta: 'Dado' },
            { enunciado: 'Sensación desagradable que se siente cuando algo duele.', respuesta: 'Dolor' },
            { enunciado: 'Profesional sanitario que diagnostica y trata enfermedades.', respuesta: 'Doctor' },
            { enunciado: 'Ser fantástico con alas y escamas que escupe fuego.', respuesta: 'Dragón' },
            { enunciado: 'Fruto dulce y alargado que crece en las palmeras del desierto.', respuesta: 'Dátil' }
        ]
    },
    {
        letra: 'E', tipo: 'empieza',
        variantes: [
            { enunciado: 'Instrumento médico que sirve para escuchar los latidos del corazón.', respuesta: 'Estetoscopio' },
            { enunciado: 'Lugar donde los niños van a aprender y estudiar.', respuesta: 'Escuela' },
            { enunciado: 'Mamífero pequeño cubierto de púas que se enrolla como una pelota.', respuesta: 'Erizo' },
            { enunciado: 'Objeto con superficie reflectante donde puedes verte.', respuesta: 'Espejo' },
            { enunciado: 'Mamífero terrestre de gran tamaño con trompa y colmillos.', respuesta: 'Elefante' }
        ]
    },
    {
        letra: 'F', tipo: 'empieza',
        variantes: [
            { enunciado: 'Instrumento musical de viento formado por un tubo con agujeros.', respuesta: 'Flauta' },
            { enunciado: 'Fuente de luz y calor que se produce al arder algo.', respuesta: 'Fuego' },
            { enunciado: 'Fruto rojo, pequeño y dulce con semillas diminutas en la superficie.', respuesta: 'Fresa' },
            { enunciado: 'Torre con una luz potente en la costa que guía a los barcos.', respuesta: 'Faro' },
            { enunciado: 'Mamífero marino de cuerpo redondeado y aletas cortas.', respuesta: 'Foca' }
        ]
    },
    {
        letra: 'G', tipo: 'empieza',
        variantes: [
            { enunciado: 'Ave de corral que pone huevos y apenas puede volar.', respuesta: 'Gallina' },
            { enunciado: 'Instrumento musical de seis cuerdas que se toca con los dedos.', respuesta: 'Guitarra' },
            { enunciado: 'Mamífero doméstico que maúlla y suele cazar ratones.', respuesta: 'Gato' },
            { enunciado: 'Prenda que cubre y protege la mano.', respuesta: 'Guante' },
            { enunciado: 'Prenda redonda que cubre la cabeza y da calor.', respuesta: 'Gorro' }
        ]
    },
    {
        letra: 'H', tipo: 'empieza',
        variantes: [
            { enunciado: 'Herramienta con hoja metálica y mango de madera usada para cortar leña.', respuesta: 'Hacha' },
            { enunciado: 'Herramienta curva con hoja dentada que se usa para segar hierba.', respuesta: 'Hoz' },
            { enunciado: 'Fruto dulce y pequeño con piel morada o verde y muchos granitos dentro.', respuesta: 'Higo' },
            { enunciado: 'Planta pequeña de tallo tierno que cubre los prados.', respuesta: 'Hierba' },
            { enunciado: 'Pieza dura del esqueleto de los vertebrados.', respuesta: 'Hueso' }
        ]
    },
    {
        letra: 'I', tipo: 'empieza',
        variantes: [
            { enunciado: 'Subida generalizada y sostenida de los precios en una economía.', respuesta: 'Inflación' },
            { enunciado: 'Edificio donde los fieles se reúnen para rezar.', respuesta: 'Iglesia' },
            { enunciado: 'Porción de tierra rodeada de agua por todas partes.', respuesta: 'Isla' },
            { enunciado: 'Capacidad mental de comprender, razonar y aprender.', respuesta: 'Inteligencia' },
            { enunciado: 'Lengua que se habla en Reino Unido y Estados Unidos.', respuesta: 'Inglés' }
        ]
    },
    {
        letra: 'J', tipo: 'empieza',
        variantes: [
            { enunciado: 'Animal africano de cuello muy largo y pelaje con manchas.', respuesta: 'Jirafa' },
            { enunciado: 'Persona que practica un deporte o un juego.', respuesta: 'Jugador' },
            { enunciado: 'Persona con autoridad para dictar sentencia en un tribunal.', respuesta: 'Juez' },
            { enunciado: 'Recipiente con asa que sirve para contener líquidos.', respuesta: 'Jarra' },
            { enunciado: 'Producto de limpieza que hace espuma al frotarlo con agua.', respuesta: 'Jabón' }
        ]
    },
    {
        letra: 'K', tipo: 'empieza',
        variantes: [
            { enunciado: 'Arte marcial japonés que se practica descalzo y con cinturones de colores.', respuesta: 'Kárate' },
            { enunciado: 'Mamífero australiano que vive en los árboles y come hojas de eucalipto.', respuesta: 'Koala' },
            { enunciado: 'Fruta pequeña de piel marrón y pelo, con pulpa verde y muchas semillas.', respuesta: 'Kiwi' },
            { enunciado: 'Prenda japonesa larga que se ciñe con una faja ancha.', respuesta: 'Kimono' },
            { enunciado: 'Embarcación pequeña y estrecha que se impulsa con una pala doble.', respuesta: 'Kayak' }
        ]
    },
    {
        letra: 'L', tipo: 'empieza',
        variantes: [
            { enunciado: 'Satélite natural que gira alrededor de la Tierra y se ve de noche.', respuesta: 'Luna' },
            { enunciado: 'Felino salvaje de gran tamaño con melena en los machos.', respuesta: 'León' },
            { enunciado: 'Utensilio que da luz y que suele estar sobre una mesa.', respuesta: 'Lámpara' },
            { enunciado: 'Fruto cítrico amarillo, pequeño y muy ácido.', respuesta: 'Limón' },
            { enunciado: 'Instrumento alargado con mina de grafito que se usa para escribir.', respuesta: 'Lápiz' }
        ]
    },
    {
        letra: 'M', tipo: 'empieza',
        variantes: [
            { enunciado: 'Planeta del sistema solar conocido como "el planeta rojo".', respuesta: 'Marte' },
            { enunciado: 'Insecto volador de color oscuro que suele posarse en la comida.', respuesta: 'Mosca' },
            { enunciado: 'Herramienta con cabeza de metal y mango que sirve para clavar clavos.', respuesta: 'Martillo' },
            { enunciado: 'Fruta tropical de piel amarilla o verde y hueso grande en el centro.', respuesta: 'Mango' },
            { enunciado: 'Teléfono portátil que se puede llevar a cualquier parte.', respuesta: 'Móvil' }
        ]
    },
    {
        letra: 'N', tipo: 'empieza',
        variantes: [
            { enunciado: 'Fruto seco de cáscara dura y forma redondeada, típico en Navidad.', respuesta: 'Nuez' },
            { enunciado: 'Agua congelada que cae del cielo en copos blancos.', respuesta: 'Nieve' },
            { enunciado: 'Persona que practica natación y se desplaza por el agua.', respuesta: 'Nadador' },
            { enunciado: 'Electrodoméstico que mantiene fríos los alimentos.', respuesta: 'Nevera' },
            { enunciado: 'Fruto cítrico redondo, de color anaranjado y jugoso.', respuesta: 'Naranja' }
        ]
    },
    {
        letra: 'Ñ', tipo: 'contiene',
        variantes: [
            { enunciado: 'Fruta tropical con la piel llena de púas y pulpa dulce por dentro.', respuesta: 'Piña' },
            { enunciado: 'Persona de corta edad, especialmente durante la infancia.', respuesta: 'Niño' },
            { enunciado: 'Sentimiento de afecto y ternura hacia alguien.', respuesta: 'Cariño' },
            { enunciado: 'Estado de descanso en el que se sueña.', respuesta: 'Sueño' },
            { enunciado: 'Animal arácnido de ocho patas que teje telas para cazar.', respuesta: 'Araña' }
        ]
    },
    {
        letra: 'O', tipo: 'empieza',
        variantes: [
            { enunciado: 'Instrumento musical de teclado y tubos, típico de las iglesias.', respuesta: 'Órgano' },
            { enunciado: 'Metal precioso y amarillo con el que se hacen joyas.', respuesta: 'Oro' },
            { enunciado: 'Animal doméstico que da lana y bala.', respuesta: 'Oveja' },
            { enunciado: 'Fruto pequeño y verde o negro del que se extrae el aceite.', respuesta: 'Oliva' },
            { enunciado: 'Estación del año en que caen las hojas de los árboles.', respuesta: 'Otoño' }
        ]
    },
    {
        letra: 'P', tipo: 'empieza',
        variantes: [
            { enunciado: 'Ave marina que no vuela, camina en grupo y vive en zonas frías.', respuesta: 'Pingüino' },
            { enunciado: 'Plato italiano redondo con tomate, queso y otros ingredientes encima.', respuesta: 'Pizza' },
            { enunciado: 'Mamífero doméstico que ladra y es conocido como el mejor amigo del hombre.', respuesta: 'Perro' },
            { enunciado: 'Instrumento musical de teclado con cuerdas percutidas por martillos.', respuesta: 'Piano' },
            { enunciado: 'Territorio con fronteras, gobierno y ciudadanía propios.', respuesta: 'País' }
        ]
    },
    {
        letra: 'Q', tipo: 'empieza',
        variantes: [
            { enunciado: 'Alimento sólido elaborado con leche cuajada y curada.', respuesta: 'Queso' },
            { enunciado: 'Ciencia que estudia la composición y las transformaciones de la materia.', respuesta: 'Química' },
            { enunciado: 'Sala de un hospital donde se realizan operaciones quirúrgicas.', respuesta: 'Quirófano' },
            { enunciado: 'Personaje literario de Cervantes que lucha contra molinos.', respuesta: 'Quijote' },
            { enunciado: 'Puesto pequeño en la calle donde se venden periódicos y revistas.', respuesta: 'Quiosco' }
        ]
    },
    {
        letra: 'R', tipo: 'empieza',
        variantes: [
            { enunciado: 'Anfibio verde que vive cerca del agua y se desplaza a saltos.', respuesta: 'Rana' },
            { enunciado: 'Aparato que emite ondas sonoras y permite escuchar emisoras.', respuesta: 'Radio' },
            { enunciado: 'Pequeño roedor de cola larga que suele vivir cerca de las casas.', respuesta: 'Ratón' },
            { enunciado: 'Camino o itinerario que se sigue para llegar a un lugar.', respuesta: 'Ruta' },
            { enunciado: 'Aparato que sirve para medir y consultar la hora.', respuesta: 'Reloj' }
        ]
    },
    {
        letra: 'S', tipo: 'empieza',
        variantes: [
            { enunciado: 'Estrella que da luz y calor a la Tierra, centro de nuestro sistema solar.', respuesta: 'Sol' },
            { enunciado: 'Mueble con respaldo que sirve para sentarse una persona.', respuesta: 'Silla' },
            { enunciado: 'Utensilio de cocina con fondo plano que se usa para freír.', respuesta: 'Sartén' },
            { enunciado: 'Sustancia blanca y cristalina que se usa para condimentar la comida.', respuesta: 'Sal' },
            { enunciado: 'Reptil alargado sin patas que se arrastra por el suelo.', respuesta: 'Serpiente' }
        ]
    },
    {
        letra: 'T', tipo: 'empieza',
        variantes: [
            { enunciado: 'Aparato electrónico que se usa en casa para ver programas y películas.', respuesta: 'Televisor' },
            { enunciado: 'Instrumento musical de viento, dorado y con tres pistones.', respuesta: 'Trompeta' },
            { enunciado: 'Reptil con caparazón duro que se mueve muy despacio.', respuesta: 'Tortuga' },
            { enunciado: 'Utensilio de mesa con púas que se usa para comer.', respuesta: 'Tenedor' },
            { enunciado: 'Fruto rojo y redondo, muy usado en ensaladas y salsas.', respuesta: 'Tomate' }
        ]
    },
    {
        letra: 'U', tipo: 'empieza',
        variantes: [
            { enunciado: 'Fruto pequeño y redondo que crece en racimos y sirve para hacer vino.', respuesta: 'Uva' },
            { enunciado: 'Institución donde se estudian carreras superiores y se investiga.', respuesta: 'Universidad' },
            { enunciado: 'Persona que utiliza un servicio, una aplicación o un producto.', respuesta: 'Usuario' },
            { enunciado: 'Parte dura y translúcida que crece en la punta de los dedos.', respuesta: 'Uña' },
            { enunciado: 'Conjunto de prendas iguales que visten los miembros de un grupo.', respuesta: 'Uniforme' }
        ]
    },
    {
        letra: 'V', tipo: 'empieza',
        variantes: [
            { enunciado: 'Animal doméstico que da leche, muge y vive en granjas.', respuesta: 'Vaca' },
            { enunciado: 'Instrumento musical de cuerda y arco, con cuatro cuerdas afinadas.', respuesta: 'Violín' },
            { enunciado: 'Recipiente cilíndrico, sin asa, que se usa para beber.', respuesta: 'Vaso' },
            { enunciado: 'Bebida alcohólica que se obtiene de la fermentación de la uva.', respuesta: 'Vino' },
            { enunciado: 'Prenda femenina de una sola pieza que cubre el cuerpo.', respuesta: 'Vestido' }
        ]
    },
    {
        letra: 'W', tipo: 'empieza',
        variantes: [
            { enunciado: 'Bebida alcohólica escocesa hecha con cereales destilados.', respuesta: 'Whisky' },
            { enunciado: 'Conexión inalámbrica a internet que no necesita cables.', respuesta: 'Wifi' },
            { enunciado: 'Deporte acuático que se practica sobre una tabla con vela.', respuesta: 'Windsurf' },
            { enunciado: 'Deporte de equipo que se juega en una piscina con una pelota.', respuesta: 'Waterpolo' },
            { enunciado: 'Película del oeste americano con vaqueros e indios.', respuesta: 'Western' }
        ]
    },
    {
        letra: 'X', tipo: 'empieza',
        variantes: [
            { enunciado: 'Instrumento de percusión formado por láminas de madera que se golpean con mazas.', respuesta: 'Xilófono' },
            { enunciado: 'Gas noble que brilla con luz azulada y se usa en faros de coche.', respuesta: 'Xenón' },
            { enunciado: 'Técnica de grabado sobre planchas de madera.', respuesta: 'Xilografía' },
            { enunciado: 'Técnica de reproducción de documentos mediante polvo y calor.', respuesta: 'Xerografía' },
            { enunciado: 'Persona que se dedica a grabar planchas de madera.', respuesta: 'Xilógrafo' }
        ]
    },
    {
        letra: 'Y', tipo: 'empieza',
        variantes: [
            { enunciado: 'Embarcación de recreo, lujosa, con motor o vela.', respuesta: 'Yate' },
            { enunciado: 'Alimento cremoso que se obtiene de la fermentación de la leche.', respuesta: 'Yogur' },
            { enunciado: 'Hembra del caballo.', respuesta: 'Yegua' },
            { enunciado: 'Juguete redondo con una cuerda que sube y baja por la mano.', respuesta: 'Yoyó' },
            { enunciado: 'Bloque de hierro donde se golpean los metales para darles forma.', respuesta: 'Yunque' }
        ]
    },
    {
        letra: 'Z', tipo: 'empieza',
        variantes: [
            { enunciado: 'Prenda que cubre y protege el pie.', respuesta: 'Zapato' },
            { enunciado: 'Recinto donde se exhiben animales de todo el mundo al público.', respuesta: 'Zoológico' },
            { enunciado: 'Hortaliza alargada de color naranja, rica en vitamina A.', respuesta: 'Zanahoria' },
            { enunciado: 'Bebida que se obtiene al exprimir frutas.', respuesta: 'Zumo' },
            { enunciado: 'Mamífero carnívoro de hocico alargado y cola peluda, muy astuto.', respuesta: 'Zorro' }
        ]
    }
];

// ================================================================
// PASAPALABRA — ESTADO Y FLUJO (modo cooperativo)
// ================================================================
let partidaPasapalabra = null;
const TIEMPO_ROSCO_SEGUNDOS = 360;

function crearPartidaPasapalabra() {
    // Elegir una variante aleatoria de cada letra para esta sesión
    const letrasSesion = ROSCO_PASAPALABRA.map(item => {
        const variante = item.variantes[Math.floor(Math.random() * item.variantes.length)];
        return {
            letra: item.letra,
            tipo: item.tipo,
            enunciado: variante.enunciado,
            respuesta: variante.respuesta
        };
    });

    partidaPasapalabra = {
        estados: letrasSesion.map(() => 'pendiente'),
        indiceActivo: -1,
        tiempoRestante: TIEMPO_ROSCO_SEGUNDOS,
        temporizadorId: null,
        fase: 'intro',
        letrasSesion: letrasSesion
    };
    renderIntroPasapalabra();
}

// ----------------------------------------------------------------
// FASE 1: INTRODUCCIÓN
// ----------------------------------------------------------------
function renderIntroPasapalabra() {
    setTituloJuego('Definiciones — Rosco cooperativo');
    actualizarPanelJugadores([], -1);

    renderVista(`
        <div class="pantalla-juego">
            <button class="btn-volver" id="btn-volver-selector-pp">← Volver a minijuegos</button>
            <h2>🔤 Definiciones</h2>
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
    logEvento('🔤 Empieza el rosco de Definiciones en equipo.');
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
    const letras = partidaPasapalabra.letrasSesion.map((item, i) => {
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
    const item = partidaPasapalabra.letrasSesion[idx];
    const prefijo = item.tipo === 'empieza' ? `Empieza por la ${item.letra}` : `Contiene la ${item.letra}`;

    renderVista(`
        <div class="pantalla-juego">
            <div class="temporizador-rosco urgente" id="temporizador-rosco">${formatearTiempo(partidaPasapalabra.tiempoRestante)}</div>
            <div class="tarjeta-central tarjeta-clave">
                <div class="letra-grande">${item.letra}</div>
                <p style="text-align:center; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.5px; color:var(--text-secondary); margin-bottom:10px;">${prefijo}</p>
                <p class="enunciado">${item.enunciado}</p>

                <div class="zona-escribir-respuesta">
                    <input type="text" id="input-respuesta-rosco" class="input-respuesta-rosco"
                           placeholder="Escribe tu respuesta..." maxlength="30" autocomplete="off" />
                    <button class="btn-principal" id="btn-comprobar-respuesta">Comprobar</button>
                    <div id="feedback-respuesta-rosco" class="feedback-respuesta-rosco"></div>
                </div>

                <p class="subtexto" style="margin: 8px 0 4px; font-size:0.78rem;">⚠️ Tienes 1 solo intento por letra</p>

                <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
                    <button class="btn-secundario" id="btn-ver-rosco">📋 Ver rosco</button>
                    <button class="btn-secundario" id="btn-siguiente-letra">⏭️ Siguiente (sin contestar)</button>
                </div>
            </div>
        </div>
    `);

    partidaPasapalabra.temporizadorId = partidaPasapalabra.temporizadorId || setInterval(tickTemporizadorRosco, 1000);

    document.getElementById('btn-ver-rosco').addEventListener('click', renderRoscoGrid);
    document.getElementById('btn-siguiente-letra').addEventListener('click', irSiguienteLetraPendiente);

    const inputRespuesta = document.getElementById('input-respuesta-rosco');
    const btnComprobar = document.getElementById('btn-comprobar-respuesta');
    const feedbackRespuesta = document.getElementById('feedback-respuesta-rosco');

    const comprobar = () => {
        const escrita = inputRespuesta.value.trim();
        if (!escrita) return;

        const normalizada = normalizarRespuesta(escrita);
        const correcta = normalizarRespuesta(item.respuesta);

        inputRespuesta.disabled = true;
        btnComprobar.disabled = true;

        if (normalizada === correcta) {
            feedbackRespuesta.textContent = '✅ ¡Correcto!';
            feedbackRespuesta.className = 'feedback-respuesta-rosco acierto';
            partidaPasapalabra.estados[idx] = 'acierto';
            logEvento(`✅ Definiciones: "${item.respuesta}" acertada.`);
        } else {
            feedbackRespuesta.textContent = `❌ Fallaste. Era: "${item.respuesta}"`;
            feedbackRespuesta.className = 'feedback-respuesta-rosco fallo';
            partidaPasapalabra.estados[idx] = 'fallo';
            logEvento(`❌ Definiciones: "${item.respuesta}" fallada.`);
        }

        setTimeout(irSiguienteLetraPendiente, 1500);
    };

    btnComprobar.addEventListener('click', comprobar);
    inputRespuesta.addEventListener('keydown', e => {
        if (e.key === 'Enter') { e.preventDefault(); comprobar(); }
    });
    inputRespuesta.focus();
}

function normalizarRespuesta(texto) {
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // quita tildes
        .replace(/[^a-z0-9ñ]/g, '')      // quita espacios, guiones, símbolos
        .trim();
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

function irSiguienteLetraPendiente() {
    const estados = partidaPasapalabra.estados;
    const idxActual = partidaPasapalabra.indiceActivo;
    const total = estados.length;

    // ¿Hay otras letras sin resolver distintas de la actual?
    let hayOtras = false;
    for (let i = 0; i < total; i++) {
        if (i !== idxActual && estados[i] !== 'acierto' && estados[i] !== 'fallo') {
            hayOtras = true;
            break;
        }
    }

    if (!hayOtras) {
        // Si la actual sigue sin resolver, quedarse en ella (no finalizar aún)
        if (estados[idxActual] !== 'acierto' && estados[idxActual] !== 'fallo') {
            renderClaveActiva();
            return;
        }
        // Todas resueltas: fin del rosco
        finalizarRosco();
        return;
    }

    // Ir a la siguiente letra sin resolver
    for (let i = 1; i <= total; i++) {
        const siguiente = (idxActual + i) % total;
        if (estados[siguiente] !== 'acierto' && estados[siguiente] !== 'fallo') {
            partidaPasapalabra.indiceActivo = siguiente;
            renderClaveActiva();
            return;
        }
    }
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
    const roscoCompleto = aciertos === partidaPasapalabra.letrasSesion.length;

    setTituloJuego('Definiciones — Resultado');
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
            <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
                <button class="btn-secundario" id="btn-compartir-rosco">📤 Compartir resultado</button>
                <button class="btn-secundario" id="btn-otro-rosco">Jugar otro rosco</button>
                <button class="btn-principal" id="btn-volver-menu-pp">Volver al menú</button>
            </div>
        </div>
    `);

    logEvento(`🏁 Definiciones terminado: ${aciertos} aciertos, ${fallos} fallos, ${sinResponder} sin contestar.`);
    registrarPartidaCompletada();
    if (aciertos > 0) sumarAciertos(aciertos);

    document.getElementById('btn-compartir-rosco').addEventListener('click', () => {
        compartirResultado(`🔤 ¡${aciertos}/${partidaPasapalabra.letrasSesion.length} en Definiciones${roscoCompleto ? ', rosco perfecto!' : '!'} ¿Te atreves a superarlo?`);
    });
    document.getElementById('btn-otro-rosco').addEventListener('click', crearPartidaPasapalabra);
    document.getElementById('btn-volver-menu-pp').addEventListener('click', mostrarSelectorJuegos);
}