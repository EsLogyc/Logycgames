// ================================================================
// ROSCO DE CULTURA GENERAL — Banco de definiciones
// Cada letra tiene 15 variantes. Al iniciar partida se elige 1 al azar.
// Las letras K, W, X, Ñ son de tipo "contiene" (la letra va dentro).
// ================================================================
const ROSCO_PASAPALABRA = [
    {
        letra: 'A', tipo: 'empieza',
        variantes: [
            { enunciado: 'Instrumento musical de cuerda con forma triangular, típico de la música celta.', respuesta: 'Arpa' },
            { enunciado: 'Insecto volador que produce miel y vive en colmenas.', respuesta: 'Abeja' },
            { enunciado: 'Ave rapaz diurna de gran tamaño y vista muy aguda.', respuesta: 'Águila' },
            { enunciado: 'Mueble con puertas usado para guardar ropa.', respuesta: 'Armario' },
            { enunciado: 'Anillo pequeño que se lleva en el dedo.', respuesta: 'Anillo' },
            { enunciado: 'Fruto seco de cáscara dura y forma ovalada, muy usado en repostería.', respuesta: 'Almendra' },
            { enunciado: 'Vehículo aéreo con alas y motores que vuela por el cielo.', respuesta: 'Avión' },
            { enunciado: 'Material granular que cubre las playas y los desiertos.', respuesta: 'Arena' },
            { enunciado: 'Planta de tronco leñoso con ramas y hojas que da sombra.', respuesta: 'Árbol' },
            { enunciado: 'Sustancia dulce y blanca que endulza los alimentos.', respuesta: 'Azúcar' },
            { enunciado: 'Líquido transparente, sin color ni sabor, esencial para la vida.', respuesta: 'Agua' },
            { enunciado: 'Persona con quien tienes una relación de afecto y confianza.', respuesta: 'Amigo' },
            { enunciado: 'Cereal blanco que es ingrediente base de la paella.', respuesta: 'Arroz' },
            { enunciado: 'Prenda de vestir con mangas que protege del frío.', respuesta: 'Abrigo' },
            { enunciado: 'Utensilio fino y puntiagudo que sirve para coser.', respuesta: 'Aguja' }
        ]
    },
    {
        letra: 'B', tipo: 'empieza',
        variantes: [
            { enunciado: 'Mamífero marino de gran tamaño que respira por un espiráculo.', respuesta: 'Ballena' },
            { enunciado: 'Vehículo de dos ruedas que se impulsa pedaleando.', respuesta: 'Bicicleta' },
            { enunciado: 'Instrumento musical de percusión formado por tambores y platillos.', respuesta: 'Batería' },
            { enunciado: 'Fruta tropical alargada de cáscara amarilla y pulpa dulce.', respuesta: 'Banana' },
            { enunciado: 'Utensilio con tubo de tinta que se usa para escribir.', respuesta: 'Bolígrafo' },
            { enunciado: 'Recipiente de cuello estrecho que sirve para guardar líquidos.', respuesta: 'Botella' },
            { enunciado: 'Mujer con poderes mágicos que aparece en los cuentos.', respuesta: 'Bruja' },
            { enunciado: 'Embarcación que navega por el mar impulsada por velas o motor.', respuesta: 'Barco' },
            { enunciado: 'Mueble alargado donde se sientan varias personas a la vez.', respuesta: 'Banco' },
            { enunciado: 'Persona recién nacida o de muy corta edad.', respuesta: 'Bebé' },
            { enunciado: 'Lugar donde se guardan y se prestan libros al público.', respuesta: 'Biblioteca' },
            { enunciado: 'Dispositivo de cristal que produce luz cuando pasa electricidad.', respuesta: 'Bombilla' },
            { enunciado: 'Terreno extenso cubierto de árboles y vegetación.', respuesta: 'Bosque' },
            { enunciado: 'Pieza pequeña que sirve para abrochar una prenda.', respuesta: 'Botón' },
            { enunciado: 'Prenda larga de lana que se enrolla alrededor del cuello.', respuesta: 'Bufanda' }
        ]
    },
    {
        letra: 'C', tipo: 'empieza',
        variantes: [
            { enunciado: 'Órgano muscular que bombea la sangre por todo el cuerpo.', respuesta: 'Corazón' },
            { enunciado: 'Animal equino usado para montar y tirar de carros.', respuesta: 'Caballo' },
            { enunciado: 'Bebida oscura y amarga que se prepara con granos tostados y molidos.', respuesta: 'Café' },
            { enunciado: 'Aparato con lente que sirve para hacer fotografías.', respuesta: 'Cámara' },
            { enunciado: 'Utensilio de cocina con hoja afilada que se usa para cortar.', respuesta: 'Cuchillo' },
            { enunciado: 'Edificio donde vive una familia o varias.', respuesta: 'Casa' },
            { enunciado: 'Vehículo de cuatro ruedas con motor que circula por carretera.', respuesta: 'Coche' },
            { enunciado: 'Espacio azul que se ve sobre nosotros y donde están las nubes.', respuesta: 'Cielo' },
            { enunciado: 'Núcleo urbano grande con muchos edificios y calles.', respuesta: 'Ciudad' },
            { enunciado: 'Prenda que cubre el pie y se lleva dentro del zapato.', respuesta: 'Calcetín' },
            { enunciado: 'Prenda de vestir con botones y mangas que cubre el torso.', respuesta: 'Camisa' },
            { enunciado: 'Edificio fortificado medieval con torres y murallas.', respuesta: 'Castillo' },
            { enunciado: 'Juguete ligero que vuela con el viento sujeto por un hilo.', respuesta: 'Cometa' },
            { enunciado: 'Conjunto de hojas de papel unidas para escribir en ellas.', respuesta: 'Cuaderno' },
            { enunciado: 'Utensilio con cerdas que sirve para limpiar o peinar.', respuesta: 'Cepillo' }
        ]
    },
    {
        letra: 'D', tipo: 'empieza',
        variantes: [
            { enunciado: 'Pieza cúbica con puntos en las caras que se lanza al azar.', respuesta: 'Dado' },
            { enunciado: 'Sensación desagradable que se siente cuando algo duele.', respuesta: 'Dolor' },
            { enunciado: 'Profesional sanitario que diagnostica y trata enfermedades.', respuesta: 'Doctor' },
            { enunciado: 'Ser fantástico con alas y escamas que escupe fuego.', respuesta: 'Dragón' },
            { enunciado: 'Fruto dulce y alargado que crece en las palmeras del desierto.', respuesta: 'Dátil' },
            { enunciado: 'Mamífero marino muy inteligente que salta y hace acrobacias.', respuesta: 'Delfín' },
            { enunciado: 'Piedra preciosa transparente y muy dura, la más valorada.', respuesta: 'Diamante' },
            { enunciado: 'Libro que recoge palabras y sus significados ordenados.', respuesta: 'Diccionario' },
            { enunciado: 'Pieza dura dentro de la boca que sirve para masticar.', respuesta: 'Diente' },
            { enunciado: 'Juego de mesa con fichas rectangulares que se emparejan.', respuesta: 'Dominó' },
            { enunciado: 'Aparato que arroja agua en forma de lluvia para lavarse.', respuesta: 'Ducha' },
            { enunciado: 'Sabor agradable y suave como el del azúcar o la miel.', respuesta: 'Dulce' },
            { enunciado: 'Región árida y arenosa donde apenas llueve y hay poca vegetación.', respuesta: 'Desierto' },
            { enunciado: 'Reptil prehistórico gigante que se extinguió hace millones de años.', respuesta: 'Dinosaurio' },
            { enunciado: 'Utensilio pequeño que protege el dedo al coser.', respuesta: 'Dedal' }
        ]
    },
    {
        letra: 'E', tipo: 'empieza',
        variantes: [
            { enunciado: 'Instrumento médico que sirve para escuchar los latidos del corazón.', respuesta: 'Estetoscopio' },
            { enunciado: 'Lugar donde los niños van a aprender y estudiar.', respuesta: 'Escuela' },
            { enunciado: 'Mamífero pequeño cubierto de púas que se enrolla como una pelota.', respuesta: 'Erizo' },
            { enunciado: 'Objeto con superficie reflectante donde puedes verte.', respuesta: 'Espejo' },
            { enunciado: 'Mamífero terrestre de gran tamaño con trompa y colmillos.', respuesta: 'Elefante' },
            { enunciado: 'Cuerpo celeste que brilla en el cielo nocturno.', respuesta: 'Estrella' },
            { enunciado: 'Arma blanca con hoja larga y afilada, típica de los caballeros.', respuesta: 'Espada' },
            { enunciado: 'Utensilio con cerdas largas que sirve para barrer el suelo.', respuesta: 'Escoba' },
            { enunciado: 'Conjunto de soldados organizados para la guerra.', respuesta: 'Ejército' },
            { enunciado: 'Plato frío de verduras cortadas y aliñadas.', respuesta: 'Ensalada' },
            { enunciado: 'Serie de peldaños que sirve para subir o bajar entre pisos.', respuesta: 'Escalera' },
            { enunciado: 'Arma defensiva que protege el cuerpo del guerrero.', respuesta: 'Escudo' },
            { enunciado: 'Objeto blando y poroso que absorbe agua.', respuesta: 'Esponja' },
            { enunciado: 'Conjunto de huesos que sostiene el cuerpo humano.', respuesta: 'Esqueleto' },
            { enunciado: 'Vitrina de una tienda donde se muestran los productos.', respuesta: 'Escaparate' }
        ]
    },
    {
        letra: 'F', tipo: 'empieza',
        variantes: [
            { enunciado: 'Instrumento musical de viento formado por un tubo con agujeros.', respuesta: 'Flauta' },
            { enunciado: 'Fuente de luz y calor que se produce al arder algo.', respuesta: 'Fuego' },
            { enunciado: 'Fruto rojo, pequeño y dulce con semillas diminutas en la superficie.', respuesta: 'Fresa' },
            { enunciado: 'Torre con una luz potente en la costa que guía a los barcos.', respuesta: 'Faro' },
            { enunciado: 'Mamífero marino de cuerpo redondeado y aletas cortas.', respuesta: 'Foca' },
            { enunciado: 'Deporte de equipo que se juega con un balón entre dos porterías.', respuesta: 'Fútbol' },
            { enunciado: 'Imagen capturada con una cámara.', respuesta: 'Fotografía' },
            { enunciado: 'Ser imaginario de los cuentos, transparente y flotante.', respuesta: 'Fantasma' },
            { enunciado: 'Establecimiento donde se venden medicamentos.', respuesta: 'Farmacia' },
            { enunciado: 'Estado de ánimo en el que se siente alegría y bienestar.', respuesta: 'Felicidad' },
            { enunciado: 'Construcción por la que brota agua, decorativa o pública.', respuesta: 'Fuente' },
            { enunciado: 'Línea que separa dos países o territorios.', respuesta: 'Frontera' },
            { enunciado: 'Recipiente pequeño de cristal con tapa que guarda sustancias.', respuesta: 'Frasco' },
            { enunciado: 'Reunión de personas para celebrar algo con alegría.', respuesta: 'Fiesta' },
            { enunciado: 'Construcción militar grande y protegida con murallas.', respuesta: 'Fortaleza' }
        ]
    },
    {
        letra: 'G', tipo: 'empieza',
        variantes: [
            { enunciado: 'Ave de corral que pone huevos y apenas puede volar.', respuesta: 'Gallina' },
            { enunciado: 'Instrumento musical de seis cuerdas que se toca con los dedos.', respuesta: 'Guitarra' },
            { enunciado: 'Mamífero doméstico que maúlla y suele cazar ratones.', respuesta: 'Gato' },
            { enunciado: 'Prenda que cubre y protege la mano.', respuesta: 'Guante' },
            { enunciado: 'Prenda redonda que cubre la cabeza y da calor.', respuesta: 'Gorro' },
            { enunciado: 'Planta alta con una flor grande y amarilla que gira hacia el sol.', respuesta: 'Girasol' },
            { enunciado: 'Objeto con dos cristales que ayuda a ver mejor.', respuesta: 'Gafas' },
            { enunciado: 'Conjunto enorme de estrellas, planetas y polvo cósmico.', respuesta: 'Galaxia' },
            { enunciado: 'Ave marina blanca y gris que vive en las costas.', respuesta: 'Gaviota' },
            { enunciado: 'Cada uno de los dos hermanos nacidos en el mismo parto.', respuesta: 'Gemelo' },
            { enunciado: 'Ciencia que estudia la Tierra y sus paisajes.', respuesta: 'Geografía' },
            { enunciado: 'Ser enorme y muy alto, típico de los cuentos.', respuesta: 'Gigante' },
            { enunciado: 'Lugar donde se hace ejercicio físico.', respuesta: 'Gimnasio' },
            { enunciado: 'Mamífero primate grande y fuerte que vive en África.', respuesta: 'Gorila' },
            { enunciado: 'Enfermedad viral que causa fiebre y malestar general.', respuesta: 'Gripe' }
        ]
    },
    {
        letra: 'H', tipo: 'empieza',
        variantes: [
            { enunciado: 'Herramienta con hoja metálica y mango de madera usada para cortar leña.', respuesta: 'Hacha' },
            { enunciado: 'Herramienta curva con hoja dentada que se usa para segar hierba.', respuesta: 'Hoz' },
            { enunciado: 'Fruto dulce y pequeño con piel morada o verde y muchos granitos dentro.', respuesta: 'Higo' },
            { enunciado: 'Planta pequeña de tallo tierno que cubre los prados.', respuesta: 'Hierba' },
            { enunciado: 'Pieza dura del esqueleto de los vertebrados.', respuesta: 'Hueso' },
            { enunciado: 'Postre frío y dulce que se toma sobre todo en verano.', respuesta: 'Helado' },
            { enunciado: 'Persona con quien compartes padre o madre.', respuesta: 'Hermano' },
            { enunciado: 'Persona valiente que realiza hazañas admirables.', respuesta: 'Héroe' },
            { enunciado: 'Cuerpo ovalado que ponen las aves y del que nace el pollo.', respuesta: 'Huevo' },
            { enunciado: 'Nube de gas y partículas que sube cuando algo arde.', respuesta: 'Humo' },
            { enunciado: 'Edificio donde se atiende a los enfermos.', respuesta: 'Hospital' },
            { enunciado: 'Establecimiento donde se alojan los viajeros.', respuesta: 'Hotel' },
            { enunciado: 'Insecto pequeño que vive en colonias y trabaja en grupo.', respuesta: 'Hormiga' },
            { enunciado: 'Gas ligero que hace volar los globos.', respuesta: 'Helio' },
            { enunciado: 'Mamífero africano grande que vive en ríos y lagos.', respuesta: 'Hipopótamo' }
        ]
    },
    {
        letra: 'I', tipo: 'empieza',
        variantes: [
            { enunciado: 'Subida generalizada y sostenida de los precios en una economía.', respuesta: 'Inflación' },
            { enunciado: 'Edificio donde los fieles se reúnen para rezar.', respuesta: 'Iglesia' },
            { enunciado: 'Porción de tierra rodeada de agua por todas partes.', respuesta: 'Isla' },
            { enunciado: 'Capacidad mental de comprender, razonar y aprender.', respuesta: 'Inteligencia' },
            { enunciado: 'Lengua que se habla en Reino Unido y Estados Unidos.', respuesta: 'Inglés' },
            { enunciado: 'Objeto que atrae al hierro y a otros metales.', respuesta: 'Imán' },
            { enunciado: 'Conjunto de territorios gobernados por un emperador.', respuesta: 'Imperio' },
            { enunciado: 'Fuego grande que destruye lo que encuentra a su paso.', respuesta: 'Incendio' },
            { enunciado: 'Conjunto de actividades que transforman materias primas en productos.', respuesta: 'Industria' },
            { enunciado: 'Periodo de la vida desde el nacimiento hasta la adolescencia.', respuesta: 'Infancia' },
            { enunciado: 'Animal pequeño de seis patas y cuerpo dividido en partes.', respuesta: 'Insecto' },
            { enunciado: 'Estación más fría del año.', respuesta: 'Invierno' },
            { enunciado: 'Medicamento que se introduce en el cuerpo con una aguja.', respuesta: 'Inyección' },
            { enunciado: 'Representación visual de algo o de alguien.', respuesta: 'Imagen' },
            { enunciado: 'Mensaje con el que se pide a alguien que asista a un evento.', respuesta: 'Invitación' }
        ]
    },
    {
        letra: 'J', tipo: 'empieza',
        variantes: [
            { enunciado: 'Animal africano de cuello muy largo y pelaje con manchas.', respuesta: 'Jirafa' },
            { enunciado: 'Persona que practica un deporte o un juego.', respuesta: 'Jugador' },
            { enunciado: 'Persona con autoridad para dictar sentencia en un tribunal.', respuesta: 'Juez' },
            { enunciado: 'Recipiente con asa que sirve para contener líquidos.', respuesta: 'Jarra' },
            { enunciado: 'Producto de limpieza que hace espuma al frotarlo con agua.', respuesta: 'Jabón' },
            { enunciado: 'Terreno con plantas y flores junto a una casa.', respuesta: 'Jardín' },
            { enunciado: 'Caja con barrotes donde se encierran animales.', respuesta: 'Jaula' },
            { enunciado: 'Persona que dirige un equipo o una empresa.', respuesta: 'Jefe' },
            { enunciado: 'Persona que monta a caballo.', respuesta: 'Jinete' },
            { enunciado: 'Periodo de tiempo que dura un día de trabajo.', respuesta: 'Jornada' },
            { enunciado: 'Objeto precioso hecho con metales y piedras.', respuesta: 'Joya' },
            { enunciado: 'Actividad recreativa con reglas que divierte a quien la practica.', respuesta: 'Juego' },
            { enunciado: 'Cuarto día de la semana.', respuesta: 'Jueves' },
            { enunciado: 'Etapa de la vida en la que se deja de trabajar.', respuesta: 'Jubilación' },
            { enunciado: 'Objeto con el que juegan los niños.', respuesta: 'Juguete' }
        ]
    },
    {
        letra: 'K', tipo: 'contiene',
        variantes: [
            { enunciado: 'Arte marcial japonés que se practica descalzo y con cinturones de colores.', respuesta: 'Kárate' },
            { enunciado: 'Mamífero australiano que vive en los árboles y come hojas de eucalipto.', respuesta: 'Koala' },
            { enunciado: 'Fruta pequeña de piel marrón y pelo, con pulpa verde y muchas semillas.', respuesta: 'Kiwi' },
            { enunciado: 'Prenda japonesa larga que se ciñe con una faja ancha.', respuesta: 'Kimono' },
            { enunciado: 'Embarcación pequeña y estrecha que se impulsa con una pala doble.', respuesta: 'Kayak' },
            { enunciado: 'Prenda de baño de dos piezas que usan las mujeres en la playa.', respuesta: 'Bikini' },
            { enunciado: 'Puesto pequeño en la calle donde se venden periódicos y revistas.', respuesta: 'Kiosco' },
            { enunciado: 'Sede del gobierno ruso, situada en Moscú.', respuesta: 'Kremlin' },
            { enunciado: 'Juego de paciencia con muchas piezas pequeñas que se encajan.', respuesta: 'Puzzle' },
            { enunciado: 'Pincho de carne asada de origen turco que se sirve en pan.', respuesta: 'Kebab' },
            { enunciado: 'Persona que se dedica a las artes marciales y a la defensa personal.', respuesta: 'Karateca' },
            { enunciado: 'Bebida alcohólica escocesa hecha con cereales destilados.', respuesta: 'Whisky' },
            { enunciado: 'Fruto del cafeto que se tuesta y se muele para hacer café.', respuesta: 'Café' },
            { enunciado: 'Piloto de barcos vikingos, experto en la navegación del norte.', respuesta: 'Vikingo' },
            { enunciado: 'Prenda impermeable con capucha que se usa para la lluvia.', respuesta: 'Anorak' }
        ]
    },
    {
        letra: 'L', tipo: 'empieza',
        variantes: [
            { enunciado: 'Satélite natural que gira alrededor de la Tierra y se ve de noche.', respuesta: 'Luna' },
            { enunciado: 'Felino salvaje de gran tamaño con melena en los machos.', respuesta: 'León' },
            { enunciado: 'Utensilio que da luz y que suele estar sobre una mesa.', respuesta: 'Lámpara' },
            { enunciado: 'Fruto cítrico amarillo, pequeño y muy ácido.', respuesta: 'Limón' },
            { enunciado: 'Instrumento alargado con mina de grafito que se usa para escribir.', respuesta: 'Lápiz' },
            { enunciado: 'Ave rapaz nocturna de ojos grandes y vuelo silencioso.', respuesta: 'Lechuza' },
            { enunciado: 'Cuerpo celeste que brilla en el cielo por la noche.', respuesta: 'Lucero' },
            { enunciado: 'Objeto que se coloca en la puerta para cerrarla con llave.', respuesta: 'Llave' },
            { enunciado: 'Recipiente de barro o metal donde se guisan alimentos.', respuesta: 'Lata' },
            { enunciado: 'Prenda de punto que se pone en la cabeza para dar calor.', respuesta: 'Lana' },
            { enunciado: 'Comestible resbaladizo que se usa como cebo para pescar.', respuesta: 'Lombriz' },
            { enunciado: 'Persona que vende y prepara libros en su establecimiento.', respuesta: 'Librero' },
            { enunciado: 'Roca dura y compacta que se usa para construir o pavimentar.', respuesta: 'Losa' },
            { enunciado: 'Tira de tela que se usa para limpiar o secar.', respuesta: 'Lienzo' },
            { enunciado: 'Animal doméstico del que se obtiene lana y carne.', respuesta: 'Lana' }
        ]
    },
        {
        letra: 'M', tipo: 'empieza',
        variantes: [
            { enunciado: 'Planeta del sistema solar conocido como "el planeta rojo".', respuesta: 'Marte' },
            { enunciado: 'Insecto volador de color oscuro que suele posarse en la comida.', respuesta: 'Mosca' },
            { enunciado: 'Herramienta con cabeza de metal y mango que sirve para clavar clavos.', respuesta: 'Martillo' },
            { enunciado: 'Fruta tropical de piel amarilla o verde y hueso grande en el centro.', respuesta: 'Mango' },
            { enunciado: 'Teléfono portátil que se puede llevar a cualquier parte.', respuesta: 'Móvil' },
            { enunciado: 'Animal doméstico que maúlla y suele cazar ratones.', respuesta: 'Michi' },
            { enunciado: 'Sustancia líquida dulce que producen las abejas.', respuesta: 'Miel' },
            { enunciado: 'Instrumento de cuerda pequeña que se toca pulsando las cuerdas.', respuesta: 'Mandolina' },
            { enunciado: 'Fenómeno atmosférico que produce chispas y truenos.', respuesta: 'Meteoro' },
            { enunciado: 'Prenda que se usa en las manos cuando hace frío.', respuesta: 'Mitón' },
            { enunciado: 'Recipiente para guardar dinero o llevar la compra.', respuesta: 'Monedero' },
            { enunciado: 'Ser fantástico con poderes mágicos y sombrero puntiagudo.', respuesta: 'Mago' },
            { enunciado: 'Insecto saltarín de color verde que vive en el campo.', respuesta: 'Mantis' },
            { enunciado: 'Utensilio de cocina para mezclar y batir alimentos.', respuesta: 'Molde' },
            { enunciado: 'Trastorno del ánimo que se caracteriza por tristeza persistente.', respuesta: 'Melancolía' }
        ]
    },
    {
        letra: 'N', tipo: 'empieza',
        variantes: [
            { enunciado: 'Fruto seco de cáscara dura y forma redondeada, típico en Navidad.', respuesta: 'Nuez' },
            { enunciado: 'Agua congelada que cae del cielo en copos blancos.', respuesta: 'Nieve' },
            { enunciado: 'Persona que practica natación y se desplaza por el agua.', respuesta: 'Nadador' },
            { enunciado: 'Electrodoméstico que mantiene fríos los alimentos.', respuesta: 'Nevera' },
            { enunciado: 'Fruto cítrico redondo, de color anaranjado y jugoso.', respuesta: 'Naranja' },
            { enunciado: 'Cúmulo de vapor de agua que flota en el cielo.', respuesta: 'Nube' },
            { enunciado: 'Parte del cuerpo por donde respiramos y olemos.', respuesta: 'Nariz' },
            { enunciado: 'Persona recién nacida o de muy corta edad.', respuesta: 'Niño' },
            { enunciado: 'Fruto seco y comestible de forma alargada y cáscara rugosa.', respuesta: 'Níspero' },
            { enunciado: 'Cifra que representa la ausencia de cantidad.', respuesta: 'Nada' },
            { enunciado: 'Instrumento que se usa para tomar apuntes y escribir rápido.', respuesta: 'Nota' },
            { enunciado: 'Piso o planta de un edificio, contando desde abajo.', respuesta: 'Nivel' },
            { enunciado: 'Ropa que se pone en el cuello para abrigarse.', respuesta: 'Nudo' },
            { enunciado: 'Persona que cuida a los enfermos en un hospital.', respuesta: 'Nodriza' },
            { enunciado: 'Cualidad de una cosa que es agradable y produce placer.', respuesta: 'Nobleza' }
        ]
    },
    {
        letra: 'Ñ', tipo: 'contiene',
        variantes: [
            { enunciado: 'Fruta tropical con la piel llena de púas y pulpa dulce por dentro.', respuesta: 'Piña' },
            { enunciado: 'Persona de corta edad, especialmente durante la infancia.', respuesta: 'Niño' },
            { enunciado: 'Sentimiento de afecto y ternura hacia alguien.', respuesta: 'Cariño' },
            { enunciado: 'Estado de descanso en el que se sueña.', respuesta: 'Sueño' },
            { enunciado: 'Animal arácnido de ocho patas que teje telas para cazar.', respuesta: 'Araña' },
            { enunciado: 'Juguete de trapo o plástico con forma de persona.', respuesta: 'Muñeca' },
            { enunciado: 'Elevación natural del terreno, más baja que una montaña.', respuesta: 'Colina' },
            { enunciado: 'Terreno elevado y rocoso de gran altura.', respuesta: 'Montaña' },
            { enunciado: 'Recipiente grande donde se sumerge el cuerpo para lavarse.', respuesta: 'Bañera' },
            { enunciado: 'Prenda de tela que se usa para sonarse o limpiarse.', respuesta: 'Pañuelo' },
            { enunciado: 'País de Europa con capital en Madrid.', respuesta: 'España' },
            { enunciado: 'Estación del año en que caen las hojas y las temperaturas bajan.', respuesta: 'Otoño' },
            { enunciado: 'Ave zancuda blanca y negra que anida en campanarios.', respuesta: 'Cigüeña' },
            { enunciado: 'Parte de la mano cerrada con la que se puede golpear.', respuesta: 'Puño' },
            { enunciado: 'Marca o aviso que se da con la mano para indicar algo.', respuesta: 'Señal' }
        ]
    },
    {
        letra: 'O', tipo: 'empieza',
        variantes: [
            { enunciado: 'Instrumento musical de teclado y tubos, típico de las iglesias.', respuesta: 'Órgano' },
            { enunciado: 'Metal precioso y amarillo con el que se hacen joyas.', respuesta: 'Oro' },
            { enunciado: 'Animal doméstico que da lana y bala.', respuesta: 'Oveja' },
            { enunciado: 'Fruto pequeño y verde o negro del que se extrae el aceite.', respuesta: 'Oliva' },
            { enunciado: 'Estación del año en que caen las hojas de los árboles.', respuesta: 'Otoño' },
            { enunciado: 'Órgano de la vista que sirve para ver el mundo.', respuesta: 'Ojo' },
            { enunciado: 'Ola gigante producida por un terremoto en el fondo del mar.', respuesta: 'Oleaje' },
            { enunciado: 'Persona que trabaja y cobra por su trabajo.', respuesta: 'Obrero' },
            { enunciado: 'Sensación que se percibe a través de la nariz.', respuesta: 'Olor' },
            { enunciado: 'Conjunto de personas que van en una excursión o desfile.', respuesta: 'Orquesta' },
            { enunciado: 'Ave rapaz que caza de noche y gira la cabeza casi entera.', respuesta: 'Ornitología' },
            { enunciado: 'Persona que presta un servicio y recibe dinero por ello.', respuesta: 'Oficio' },
            { enunciado: 'Terreno llano, sin montañas ni colinas.', respuesta: 'Otero' },
            { enunciado: 'Molusco marino con concha alargada y carne comestible.', respuesta: 'Ostra' },
            { enunciado: 'Vehículo grande que transporta viajeros por la ciudad.', respuesta: 'Ómnibus' }
        ]
    },
    {
        letra: 'P', tipo: 'empieza',
        variantes: [
            { enunciado: 'Ave marina que no vuela, camina en grupo y vive en zonas frías.', respuesta: 'Pingüino' },
            { enunciado: 'Plato italiano redondo con tomate, queso y otros ingredientes encima.', respuesta: 'Pizza' },
            { enunciado: 'Mamífero doméstico que ladra y es conocido como el mejor amigo del hombre.', respuesta: 'Perro' },
            { enunciado: 'Instrumento musical de teclado con cuerdas percutidas por martillos.', respuesta: 'Piano' },
            { enunciado: 'Territorio con fronteras, gobierno y ciudadanía propios.', respuesta: 'País' },
            { enunciado: 'Fruta redonda con hueso en el centro, piel fina y pulpa dulce.', respuesta: 'Pera' },
            { enunciado: 'Ave marina de plumaje blanco y negro que no vuela.', respuesta: 'Pardela' },
            { enunciado: 'Pelota pequeña y blanca que se usa en el tenis de mesa.', respuesta: 'Pelota' },
            { enunciado: 'Utensilio de escritura con punta de fieltro o fibra.', respuesta: 'Pluma' },
            { enunciado: 'Ser fantástico con poderes mágicos que aparece en cuentos.', respuesta: 'Pirata' },
            { enunciado: 'Persona que captura peces como oficio o afición.', respuesta: 'Pescador' },
            { enunciado: 'Postre dulce que se hace con harina, huevo y azúcar.', respuesta: 'Pastel' },
            { enunciado: 'Prenda de vestir que cubre las piernas hasta los tobillos.', respuesta: 'Pantalón' },
            { enunciado: 'Material duro y blanco que se usa para hacer esculturas.', respuesta: 'Piedra' },
            { enunciado: 'Recipiente con asa que se usa para hervir agua.', respuesta: 'Pava' }
        ]
    },
    {
        letra: 'Q', tipo: 'empieza',
        variantes: [
            { enunciado: 'Alimento sólido elaborado con leche cuajada y curada.', respuesta: 'Queso' },
            { enunciado: 'Ciencia que estudia la composición y las transformaciones de la materia.', respuesta: 'Química' },
            { enunciado: 'Sala de un hospital donde se realizan operaciones quirúrgicas.', respuesta: 'Quirófano' },
            { enunciado: 'Personaje literario de Cervantes que lucha contra molinos.', respuesta: 'Quijote' },
            { enunciado: 'Puesto pequeño en la calle donde se venden periódicos y revistas.', respuesta: 'Quiosco' },
            { enunciado: 'Unidad de peso equivalente a cien kilogramos.', respuesta: 'Quintal' },
            { enunciado: 'Persona que se dedica profesionalmente a la química.', respuesta: 'Químico' },
            { enunciado: 'Grupo mínimo de personas necesarias para tomar una decisión.', respuesta: 'Quorum' },
            { enunciado: 'Proyecto o idea fantástica que parece imposible de realizar.', respuesta: 'Quimera' },
            { enunciado: 'Sensación de escozor o picor en la piel.', respuesta: 'Quemazón' },
            { enunciado: 'Número formado por cinco centenas exactas.', respuesta: 'Quinientos' },
            { enunciado: 'Bolsa cerrada que se forma en los tejidos del cuerpo.', respuesta: 'Quiste' },
            { enunciado: 'Acción de excluir a alguien del grupo al que pertenece.', respuesta: 'Quimera' },
            { enunciado: 'Postre dulce elaborado con leche cuajada y azúcar.', respuesta: 'Quesada' },
            { enunciado: 'Establecimiento donde se venden productos farmacéuticos.', respuesta: 'Química' }
        ]
    },
    {
        letra: 'R', tipo: 'empieza',
        variantes: [
            { enunciado: 'Anfibio verde que vive cerca del agua y se desplaza a saltos.', respuesta: 'Rana' },
            { enunciado: 'Aparato que emite ondas sonoras y permite escuchar emisoras.', respuesta: 'Radio' },
            { enunciado: 'Pequeño roedor de cola larga que suele vivir cerca de las casas.', respuesta: 'Ratón' },
            { enunciado: 'Camino o itinerario que se sigue para llegar a un lugar.', respuesta: 'Ruta' },
            { enunciado: 'Aparato que sirve para medir y consultar la hora.', respuesta: 'Reloj' },
            { enunciado: 'Fenómeno luminoso que aparece en el cielo tras la lluvia.', respuesta: 'Arcoíris' },
            { enunciado: 'Rey de la selva, felino de gran tamaño con melena.', respuesta: 'Rey' },
            { enunciado: 'Prenda que cubre el cuerpo entero y se pone sobre la ropa.', respuesta: 'Rebeca' },
            { enunciado: 'Ciencia que estudia las leyes del universo y la materia.', respuesta: 'Relatividad' },
            { enunciado: 'Instrumento musical de cuerda que se toca con las manos.', respuesta: 'Rabel' },
            { enunciado: 'Ave cantora de plumaje colorido que vive en jardines.', respuesta: 'Ruiseñor' },
            { enunciado: 'Cada una de las partes en que se divide una obra de teatro.', respuesta: 'Retablo' },
            { enunciado: 'Objeto que se usa para medir distancias o trazar líneas.', respuesta: 'Regla' },
            { enunciado: 'Fruta pequeña y roja que se usa para decorar postres.', respuesta: 'Frambuesa' },
            { enunciado: 'Pequeño mamífero roedor que se usa en experimentos de laboratorio.', respuesta: 'Rata' }
        ]
    },
    {
        letra: 'S', tipo: 'empieza',
        variantes: [
            { enunciado: 'Estrella que da luz y calor a la Tierra, centro de nuestro sistema solar.', respuesta: 'Sol' },
            { enunciado: 'Mueble con respaldo que sirve para sentarse una persona.', respuesta: 'Silla' },
            { enunciado: 'Utensilio de cocina con fondo plano que se usa para freír.', respuesta: 'Sartén' },
            { enunciado: 'Sustancia blanca y cristalina que se usa para condimentar la comida.', respuesta: 'Sal' },
            { enunciado: 'Reptil alargado sin patas que se arrastra por el suelo.', respuesta: 'Serpiente' },
            { enunciado: 'Prenda de tela que cubre la parte inferior del cuerpo.', respuesta: 'Saya' },
            { enunciado: 'Acción de emitir sonidos con la boca al hablar.', respuesta: 'Sonido' },
            { enunciado: 'Bebida gaseosa con sabor dulce y muchas burbujas.', respuesta: 'Sidra' },
            { enunciado: 'Animal doméstico que da leche y vive en granjas.', respuesta: 'Sirena' },
            { enunciado: 'Lugar donde se guardan las cosas y se pueden encontrar.', respuesta: 'Sótano' },
            { enunciado: 'Persona que no come carne por respeto a los animales.', respuesta: 'Sensato' },
            { enunciado: 'Mueble donde se guardan y se ordenan libros.', respuesta: 'Sofá' },
            { enunciado: 'Prenda de abrigo larga que se pone sobre la ropa.', respuesta: 'Sobretodo' },
            { enunciado: 'Fruto rojo y dulce con hueso pequeño en el centro.', respuesta: 'Sandía' },
            { enunciado: 'Sustancia líquida que se obtiene al exprimir una fruta.', respuesta: 'Sirope' }
        ]
    },
    {
        letra: 'T', tipo: 'empieza',
        variantes: [
            { enunciado: 'Aparato electrónico que se usa en casa para ver programas y películas.', respuesta: 'Televisor' },
            { enunciado: 'Instrumento musical de viento, dorado y con tres pistones.', respuesta: 'Trompeta' },
            { enunciado: 'Reptil con caparazón duro que se mueve muy despacio.', respuesta: 'Tortuga' },
            { enunciado: 'Utensilio de mesa con púas que se usa para comer.', respuesta: 'Tenedor' },
            { enunciado: 'Fruto rojo y redondo, muy usado en ensaladas y salsas.', respuesta: 'Tomate' },
            { enunciado: 'Bebida caliente que se prepara con hojas de una planta.', respuesta: 'Té' },
            { enunciado: 'Animal doméstico que da leche y vive en el campo.', respuesta: 'Ternero' },
            { enunciado: 'Acción de pintar o escribir en una superficie.', respuesta: 'Trazar' },
            { enunciado: 'Prenda de tela que se usa para cubrir una cama.', respuesta: 'Toalla' },
            { enunciado: 'Cada una de las partes de un todo dividido.', respuesta: 'Tajada' },
            { enunciado: 'Persona que se dedica a la venta ambulante.', respuesta: 'Tendero' },
            { enunciado: 'Mueble donde se guardan y se ordenan las cosas.', respuesta: 'Tocador' },
            { enunciado: 'Fruto seco que se obtiene de la planta del mismo nombre.', respuesta: 'Trufa' },
            { enunciado: 'Estación del año en que empieza a hacer más calor.', respuesta: 'Templado' },
            { enunciado: 'Estación del año en que caen las hojas y hace más frío.', respuesta: 'Temporal' }
        ]
    },
    {
        letra: 'U', tipo: 'empieza',
        variantes: [
            { enunciado: 'Fruto pequeño y redondo que crece en racimos y sirve para hacer vino.', respuesta: 'Uva' },
            { enunciado: 'Institución donde se estudian carreras superiores y se investiga.', respuesta: 'Universidad' },
            { enunciado: 'Persona que utiliza un servicio, una aplicación o un producto.', respuesta: 'Usuario' },
            { enunciado: 'Parte dura y translúcida que crece en la punta de los dedos.', respuesta: 'Uña' },
            { enunciado: 'Conjunto de prendas iguales que visten los miembros de un grupo.', respuesta: 'Uniforme' },
            { enunciado: 'Estado en el que dos cosas están juntas o pegadas.', respuesta: 'Unión' },
            { enunciado: 'Objeto que sirve para llevar cosas de un sitio a otro.', respuesta: 'Útil' },
            { enunciado: 'Fruto tropical parecido a la pera, con espinas en la cáscara.', respuesta: 'Uchuva' },
            { enunciado: 'Persona que trabaja en una oficina.', respuesta: 'Oficinista' },
            { enunciado: 'Único ser vivo, sin compañeros de su especie.', respuesta: 'Único' },
            { enunciado: 'Acción de hacer que algo sea uno solo.', respuesta: 'Unificar' },
            { enunciado: 'Persona que tiene mucho dinero y bienes.', respuesta: 'Ufano' },
            { enunciado: 'Expresión que se usa para manifestar alegría.', respuesta: 'Uf' },
            { enunciado: 'Fruto parecido a la uva pero más alargado.', respuesta: 'Uvilla' },
            { enunciado: 'Persona que se dedica a la venta de productos.', respuesta: 'Ulular' }
        ]
    },
    {
        letra: 'V', tipo: 'empieza',
        variantes: [
            { enunciado: 'Animal doméstico que da leche, muge y vive en granjas.', respuesta: 'Vaca' },
            { enunciado: 'Instrumento musical de cuerda y arco, con cuatro cuerdas afinadas.', respuesta: 'Violín' },
            { enunciado: 'Recipiente cilíndrico, sin asa, que se usa para beber.', respuesta: 'Vaso' },
            { enunciado: 'Bebida alcohólica que se obtiene de la fermentación de la uva.', respuesta: 'Vino' },
            { enunciado: 'Prenda femenina de una sola pieza que cubre el cuerpo.', respuesta: 'Vestido' },
            { enunciado: 'Prenda de abrigo larga que se pone sobre el traje.', respuesta: 'Vestimenta' },
            { enunciado: 'Vehículo grande con motor que se usa para viajar.', respuesta: 'Vagón' },
            { enunciado: 'Objeto que sirve para tapar la cara o proteger del sol.', respuesta: 'Visera' },
            { enunciado: 'Ser mitológico parecido a un murciélago que chupa sangre.', respuesta: 'Vampiro' },
            { enunciado: 'Velocidad máxima a la que se puede ir por una carretera.', respuesta: 'Velocidad' },
            { enunciado: 'Órgano del cuerpo donde circula la sangre.', respuesta: 'Vena' },
            { enunciado: 'Prenda de abrigo que cubre el torso y los brazos.', respuesta: 'Vestimenta' },
            { enunciado: 'Instrumento para medir el tiempo atmosférico.', respuesta: 'Veleta' },
            { enunciado: 'Barco pequeño de recreo con motor o vela.', respuesta: 'Velero' },
            { enunciado: 'Animal ovino que produce lana y carne.', respuesta: 'Vellón' }
        ]
    },
    {
        letra: 'W', tipo: 'contiene',
        variantes: [
            { enunciado: 'Bebida alcohólica escocesa hecha con cereales destilados.', respuesta: 'Whisky' },
            { enunciado: 'Conexión inalámbrica a internet que no necesita cables.', respuesta: 'Wifi' },
            { enunciado: 'Deporte acuático que se practica sobre una tabla con vela.', respuesta: 'Windsurf' },
            { enunciado: 'Deporte de equipo que se juega en una piscina con una pelota.', respuesta: 'Waterpolo' },
            { enunciado: 'Película del oeste americano con vaqueros e indios.', respuesta: 'Western' },
            { enunciado: 'Prenda de vestir vaquera que cubre las piernas.', respuesta: 'Wrangler' },
            { enunciado: 'Red social de microblogging con mensajes cortos.', respuesta: 'Twitter' },
            { enunciado: 'Deporte de nieve que se practica con una tabla.', respuesta: 'Snowboard' },
            { enunciado: 'Vehículo todoterreno de gran tamaño.', respuesta: 'Wagon' },
            { enunciado: 'Programa informático que se usa para procesar textos.', respuesta: 'Software' }
        ]
    },
    {
        letra: 'X', tipo: 'contiene',
        variantes: [
            { enunciado: 'Instrumento de percusión formado por láminas de madera que se golpean con mazas.', respuesta: 'Xilófono' },
            { enunciado: 'Gas noble que brilla con luz azulada y se usa en faros de coche.', respuesta: 'Xenón' },
            { enunciado: 'Técnica de grabado sobre planchas de madera.', respuesta: 'Xilografía' },
            { enunciado: 'Técnica de reproducción de documentos mediante polvo y calor.', respuesta: 'Xerografía' },
            { enunciado: 'Persona que se dedica a grabar planchas de madera.', respuesta: 'Xilógrafo' },
            { enunciado: 'Sustancia que se usa para limpiar y desinfectar heridas.', respuesta: 'Antiséptico' },
            { enunciado: 'Conjunto de personas y bienes que se separan de una comunidad.', respuesta: 'Exilio' },
            { enunciado: 'Acción de expulsar a alguien de un lugar.', respuesta: 'Expulsión' },
            { enunciado: 'Aparato que sirve para ampliar imágenes pequeñas.', respuesta: 'Extensor' },
            { enunciado: 'Cualidad de algo que es muy grande o importante.', respuesta: 'Excelente' }
        ]
    },
    {
        letra: 'Y', tipo: 'empieza',
        variantes: [
            { enunciado: 'Embarcación de recreo, lujosa, con motor o vela.', respuesta: 'Yate' },
            { enunciado: 'Alimento cremoso que se obtiene de la fermentación de la leche.', respuesta: 'Yogur' },
            { enunciado: 'Hembra del caballo.', respuesta: 'Yegua' },
            { enunciado: 'Juguete redondo con una cuerda que sube y baja por la mano.', respuesta: 'Yoyó' },
            { enunciado: 'Bloque de hierro donde se golpean los metales para darles forma.', respuesta: 'Yunque' },
            { enunciado: 'Planta tropical que se usa para hacer tejidos y cuerdas.', respuesta: 'Yute' },
            { enunciado: 'Parte amarilla del huevo, rica en nutrientes.', respuesta: 'Yema' },
            { enunciado: 'Terreno elevado y seco donde apenas crece vegetación.', respuesta: 'Yermo' },
            { enunciado: 'Nombre con el que se conoce al caballo blanco.', respuesta: 'Yeguada' },
            { enunciado: 'Acción de unir dos cosas.', respuesta: 'Yuxtaponer' }
        ]
    },
    {
        letra: 'Z', tipo: 'empieza',
        variantes: [
            { enunciado: 'Prenda que cubre y protege el pie.', respuesta: 'Zapato' },
            { enunciado: 'Recinto donde se exhiben animales de todo el mundo al público.', respuesta: 'Zoológico' },
            { enunciado: 'Hortaliza alargada de color naranja, rica en vitamina A.', respuesta: 'Zanahoria' },
            { enunciado: 'Bebida que se obtiene al exprimir frutas.', respuesta: 'Zumo' },
            { enunciado: 'Mamífero carnívoro de hocico alargado y cola peluda, muy astuto.', respuesta: 'Zorro' },
            { enunciado: 'Insecto volador que zumba y puede picar.', respuesta: 'Zancudo' },
            { enunciado: 'Calzado ligero que se pone en el pie dentro de casa.', respuesta: 'Zapatilla' },
            { enunciado: 'Fruto seco que crece en racimos y se come tostado.', respuesta: 'Zarzamora' },
            { enunciado: 'Persona que practica la navegación a vela.', respuesta: 'Zarpar' },
            { enunciado: 'Terreno pantanoso cubierto de agua estancada.', respuesta: 'Zanja' }
        ]
    }
];