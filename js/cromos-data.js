// ================================================================
// ÁLBUM CANINO — Datos de las 20 razas
// ================================================================

const RAZAS_CROMOS = [
    {
        id: 'golden',
        nombre: 'Golden Retriever',
        origen: 'Escocia',
        tamano: 'Grande',
        peso: '25-34 kg',
        caracter: 'Cariñoso',
        frase: 'Fue el perro oficial de la Casa Blanca en los años 80.',
        adjetivos: ['cariñoso', 'juguetón', 'familiar'],
        apiBreed: 'retriever/golden'
    },
    {
        id: 'labrador',
        nombre: 'Labrador Retriever',
        origen: 'Canadá',
        tamano: 'Grande',
        peso: '25-36 kg',
        caracter: 'Juguetón',
        frase: 'Es la raza más popular del mundo desde hace 30 años.',
        adjetivos: ['tragón', 'juguetón', 'sociable'],
        apiBreed: 'labrador'
    },
    {
        id: 'pastor-aleman',
        nombre: 'Pastor Alemán',
        origen: 'Alemania',
        tamano: 'Grande',
        peso: '22-40 kg',
        caracter: 'Leal',
        frase: 'Es el perro policía por excelencia en medio mundo.',
        adjetivos: ['leal', 'valiente', 'guardián'],
        apiBreed: 'germanshepherd'
    },
    {
        id: 'husky',
        nombre: 'Husky Siberiano',
        origen: 'Siberia (Rusia)',
        tamano: 'Mediano',
        peso: '16-27 kg',
        caracter: 'Aventurero',
        frase: 'Sus ojos azules son tan famosos como su aullido.',
        adjetivos: ['aventurero', 'hablador', 'escapista'],
        apiBreed: 'husky'
    },
    {
        id: 'chihuahua',
        nombre: 'Chihuahua',
        origen: 'México',
        tamano: 'Pequeño',
        peso: '1,5-3 kg',
        caracter: 'Valiente',
        frase: 'Es la raza más pequeña del mundo.',
        adjetivos: ['quejica', 'valiente', 'tembloroso'],
        apiBreed: 'chihuahua'
    },
    {
        id: 'bulldog-frances',
        nombre: 'Bulldog Francés',
        origen: 'Francia',
        tamano: 'Pequeño',
        peso: '8-14 kg',
        caracter: 'Tranquilo',
        frase: 'Su cara arrugada es un imán para las fotos.',
        adjetivos: ['tranquilo', 'roncador', 'casero'],
        apiBreed: 'bulldog/french'
    },
    {
        id: 'border-collie',
        nombre: 'Border Collie',
        origen: 'Escocia',
        tamano: 'Mediano',
        peso: '14-20 kg',
        caracter: 'Inteligente',
        frase: 'Es considerado el perro más listo del mundo.',
        adjetivos: ['listo', 'incansable', 'trabajador'],
        apiBreed: 'collie/border'
    },
    {
        id: 'dalmata',
        nombre: 'Dálmata',
        origen: 'Croacia',
        tamano: 'Mediano',
        peso: '20-32 kg',
        caracter: 'Energético',
        frase: 'Sus manchas son únicas: no hay dos dálmatas iguales.',
        adjetivos: ['manchado', 'energético', 'deportista'],
        apiBreed: 'dalmatian'
    },
    {
        id: 'san-bernardo',
        nombre: 'San Bernardo',
        origen: 'Suiza',
        tamano: 'Gigante',
        peso: '60-120 kg',
        caracter: 'Paciente',
        frase: 'Salvaba a excursionistas perdidos en los Alpes con un barril de brandy.',
        adjetivos: ['gigante', 'tranquilo', 'rescatador'],
        apiBreed: 'stbernard'
    },
    {
        id: 'caniche',
        nombre: 'Caniche',
        origen: 'Alemania / Francia',
        tamano: 'Variable',
        peso: '5-30 kg',
        caracter: 'Elegante',
        frase: 'Aunque parezca de peluquería, es un excelente perro de agua.',
        adjetivos: ['elegante', 'listo', 'presumido'],
        apiBreed: 'poodle'
    },
    {
        id: 'teckel',
        nombre: 'Teckel',
        origen: 'Alemania',
        tamano: 'Pequeño',
        peso: '4-15 kg',
        caracter: 'Testarudo',
        frase: 'Su cuerpo alargado le servía para cazar tejones en madrigueras.',
        adjetivos: ['alargado', 'testarudo', 'ladrador'],
        apiBreed: 'dachshund'
    },
    {
        id: 'beagle',
        nombre: 'Beagle',
        origen: 'Inglaterra',
        tamano: 'Mediano',
        peso: '9-14 kg',
        caracter: 'Curioso',
        frase: 'Su olfato es tan bueno que trabaja en aeropuertos.',
        adjetivos: ['olfateador', 'curioso', 'glotón'],
        apiBreed: 'beagle'
    },
    {
        id: 'akita',
        nombre: 'Akita Inu',
        origen: 'Japón',
        tamano: 'Grande',
        peso: '30-50 kg',
        caracter: 'Fiel',
        frase: 'Hachiko, un Akita, esperó 9 años en una estación a su dueño fallecido.',
        adjetivos: ['fiel', 'noble', 'sereno'],
        apiBreed: 'akita'
    },
    {
        id: 'cocker',
        nombre: 'Cocker Spaniel',
        origen: 'Inglaterra',
        tamano: 'Mediano',
        peso: '12-15 kg',
        caracter: 'Alegre',
        frase: 'Sus orejas largas y peludas son su seña de identidad.',
        adjetivos: ['orejudo', 'alegre', 'mimoso'],
        apiBreed: 'spaniel/cocker'
    },
    {
        id: 'pomerania',
        nombre: 'Pomerania',
        origen: 'Alemania / Polonia',
        tamano: 'Pequeño',
        peso: '1,5-3,5 kg',
        caracter: 'Vivaz',
        frase: 'Parece un peluche con pilas: no para quieto.',
        adjetivos: ['peludo', 'vivaz', 'ladrador'],
        apiBreed: 'pomeranian'
    },
    {
        id: 'shih-tzu',
        nombre: 'Shih Tzu',
        origen: 'China',
        tamano: 'Pequeño',
        peso: '4-8 kg',
        caracter: 'Regio',
        frase: 'Era el perro favorito de los emperadores chinos.',
        adjetivos: ['regio', 'tranquilo', 'presumido'],
        apiBreed: 'shihtzu'
    },
    {
        id: 'yorkshire',
        nombre: 'Yorkshire Terrier',
        origen: 'Inglaterra',
        tamano: 'Pequeño',
        peso: '2-3 kg',
        caracter: 'Atrevido',
        frase: 'A pesar de su tamaño, se cree un perro grande.',
        adjetivos: ['atrevido', 'valiente', 'diminuto'],
        apiBreed: 'terrier/yorkshire'
    },
    {
        id: 'rottweiler',
        nombre: 'Rottweiler',
        origen: 'Alemania',
        tamano: 'Grande',
        peso: '35-60 kg',
        caracter: 'Fiel',
        frase: 'De aspecto temible, pero un trozo de pan con su familia.',
        adjetivos: ['fuerte', 'fiel', 'guardián'],
        apiBreed: 'rottweiler'
    },
    {
        id: 'pug',
        nombre: 'Pug',
        origen: 'China',
        tamano: 'Pequeño',
        peso: '6-8 kg',
        caracter: 'Gracioso',
        frase: 'Ronca tan fuerte que se le oye desde otra habitación.',
        adjetivos: ['roncador', 'gracioso', 'arrugado'],
        apiBreed: 'pug'
    },
    {
        id: 'corgi',
        nombre: 'Corgi',
        origen: 'Gales',
        tamano: 'Pequeño',
        peso: '10-14 kg',
        caracter: 'Activo',
        frase: 'Es el perro favorito de la reina Isabel II.',
        adjetivos: ['paticorto', 'activo', 'orejudo'],
        apiBreed: 'corgi/cardigan'
    }
];

// ----------------------------------------------------------------
// HELPERS
// ----------------------------------------------------------------
function obtenerRazaPorId(id) {
    return RAZAS_CROMOS.find(r => r.id === id);
}

function barajarArray(arr) {
    const copia = [...arr];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

// Devuelve 4 opciones (1 correcta + 3 distractoras) mezcladas
function generarOpcionesRaza(razaCorrecta) {
    const otras = RAZAS_CROMOS.filter(r => r.id !== razaCorrecta.id);
    const distractoras = barajarArray(otras).slice(0, 3);
    const opciones = barajarArray([razaCorrecta, ...distractoras]);
    return opciones;
}

// Genera una pregunta aleatoria sobre una raza
// Tipos: 'foto' (60%) | 'adjetivo' (25%) | 'dato' (15%)
function generarPreguntaCromos(raza, tipoForzado = null) {
    let tipo = tipoForzado;
    if (!tipo) {
        const r = Math.random();
        if (r < 0.60) tipo = 'foto';
        else if (r < 0.85) tipo = 'adjetivo';
        else tipo = 'dato';
    }

    if (tipo === 'foto') {
        return {
            tipo: 'foto',
            raza: raza,
            pregunta: '¿Qué raza es la de la foto?',
            opciones: generarOpcionesRaza(raza)
        };
    }

    if (tipo === 'adjetivo') {
        const adj = raza.adjetivos[Math.floor(Math.random() * raza.adjetivos.length)];
        return {
            tipo: 'adjetivo',
            raza: raza,
            pregunta: `¿Qué raza es famosa por ser muy ${adj}?`,
            opciones: generarOpcionesRaza(raza)
        };
    }

    // tipo === 'dato'
    const campos = [
        { texto: `¿De qué país es originaria la raza ${raza.nombre}?`, valor: raza.origen },
        { texto: `¿Qué tamaño tiene la raza ${raza.nombre}?`, valor: raza.tamano },
        { texto: `¿Cuál es el carácter típico del ${raza.nombre}?`, valor: raza.caracter }
    ];
    const campo = campos[Math.floor(Math.random() * campos.length)];
    return {
        tipo: 'dato',
        raza: raza,
        pregunta: campo.texto,
        opciones: generarOpcionesRaza(raza)
    };
}