// ================================================================
// BANCO DE PREGUNTAS — TRIVIAL PERROS (30 preguntas, 11 razas)
// ================================================================
const PREGUNTAS_TRIVIAL_PERROS = [
    // --- Golden Retriever ---
    {
        pregunta: '¿Qué raza es esta?',
        imagen: 'img/perros/golden.jpg',
        opciones: ['Golden Retriever', 'Labrador', 'Setter Inglés', 'Spaniel'],
        correcta: 0
    },
    {
        pregunta: '¿Qué carácter suele tener el Golden Retriever?',
        imagen: 'img/perros/golden.jpg',
        opciones: ['Amigable y sociable', 'Muy territorial', 'Agresivo', 'Distante'],
        correcta: 0
    },
    {
        pregunta: '¿Qué tamaño tiene el Golden Retriever?',
        imagen: 'img/perros/golden.jpg',
        opciones: ['Grande', 'Pequeño', 'Gigante', 'Mini'],
        correcta: 0
    },

    // --- Chihuahua ---
    {
        pregunta: '¿Qué raza aparece en la foto?',
        imagen: 'img/perros/chihuahua.jpg',
        opciones: ['Chihuahua', 'Pinscher', 'Yorkshire Terrier', 'Pomerania'],
        correcta: 0
    },
    {
        pregunta: '¿Qué tamaño tiene el Chihuahua?',
        imagen: 'img/perros/chihuahua.jpg',
        opciones: ['Muy pequeño', 'Mediano', 'Grande', 'Gigante'],
        correcta: 0
    },
    {
        pregunta: '¿De qué país proviene el Chihuahua?',
        imagen: 'img/perros/chihuahua.jpg',
        opciones: ['México', 'España', 'Perú', 'Argentina'],
        correcta: 0
    },

    // --- Chow Chow ---
    {
        pregunta: '¿Qué antigüedad aproximada tiene la raza Chow Chow?',
        imagen: 'img/perros/chowchow.jpg',
        opciones: ['Más de 2.000 años', 'Menos de 100 años', 'Unos 300 años', 'Unos 50 años'],
        correcta: 0
    },
    {
        pregunta: '¿Qué carácter suele tener el Chow Chow?',
        imagen: 'img/perros/chowchow.jpg',
        opciones: ['Independiente', 'Muy hiperactivo', 'Extremadamente ruidoso', 'Agresivo por defecto'],
        correcta: 0
    },
    {
        pregunta: '¿De qué país proviene el Chow Chow?',
        imagen: 'img/perros/chowchow.jpg',
        opciones: ['China', 'Japón', 'Corea', 'Tailandia'],
        correcta: 0
    },

    // --- Border Collie ---
    {
        pregunta: '¿Qué raza es conocida por ser muy inteligente?',
        imagen: 'img/perros/bordercollie.jpg',
        opciones: ['Border Collie', 'Pastor Alemán', 'Beagle', 'Doberman'],
        correcta: 0
    },
    {
        pregunta: '¿Para qué se usa mucho el Border Collie?',
        imagen: 'img/perros/bordercollie.jpg',
        opciones: ['Pastoreo', 'Caza mayor', 'Tirar de trineos', 'Guardia militar'],
        correcta: 0
    },
    {
        pregunta: '¿Qué nivel de energía tiene el Border Collie?',
        imagen: 'img/perros/bordercollie.jpg',
        opciones: ['Muy alto', 'Bajo', 'Moderado', 'Nulo'],
        correcta: 0
    },

    // --- Dálmata ---
    {
        pregunta: '¿Qué raza es esta?',
        imagen: 'img/perros/dalmata.jpg',
        opciones: ['Dálmata', 'Pointer', 'Foxhound', 'Greyhound'],
        correcta: 0
    },
    {
        pregunta: '¿Qué característica física destaca del Dálmata?',
        imagen: 'img/perros/dalmata.jpg',
        opciones: ['Manchas negras', 'Orejas puntiagudas', 'Patas cortas', 'Cola rizada'],
        correcta: 0
    },
    {
        pregunta: '¿Qué trabajo realizaban los Dálmatas?',
        imagen: 'img/perros/dalmata.jpg',
        opciones: ['Acompañar carruajes', 'Buscar trufas', 'Cazar osos', 'Tirar de trineos'],
        correcta: 0
    },

    // --- San Bernardo ---
    {
        pregunta: '¿Qué raza es famosa por su gran tamaño?',
        imagen: 'img/perros/sanbernardo.jpg',
        opciones: ['San Bernardo', 'Mastín', 'Gran Danés', 'Terranova'],
        correcta: 0
    },
    {
        pregunta: '¿Para qué se utilizaba el San Bernardo?',
        imagen: 'img/perros/sanbernardo.jpg',
        opciones: ['Rescate en nieve', 'Caza menor', 'Pastoreo', 'Competición de velocidad'],
        correcta: 0
    },
    {
        pregunta: '¿Qué carácter suele tener el San Bernardo?',
        imagen: 'img/perros/sanbernardo.jpg',
        opciones: ['Calmado y paciente', 'Muy agresivo', 'Extremadamente nervioso', 'Difícil de entrenar'],
        correcta: 0
    },

    // --- Pastor Alemán ---
    {
        pregunta: '¿Qué raza es esta?',
        imagen: 'img/perros/pastoraleman.jpg',
        opciones: ['Pastor Alemán', 'Malinois', 'Husky Siberiano', 'Pastor Blanco'],
        correcta: 0
    },
    {
        pregunta: '¿Qué trabajo realiza mucho el Pastor Alemán?',
        imagen: 'img/perros/pastoraleman.jpg',
        opciones: ['Policía y rescate', 'Tirar de trineos', 'Caza mayor', 'Competición de belleza'],
        correcta: 0
    },
    {
        pregunta: '¿Qué nivel de inteligencia tiene el Pastor Alemán?',
        imagen: 'img/perros/pastoraleman.jpg',
        opciones: ['Muy alto', 'Bajo', 'Moderado', 'Nulo'],
        correcta: 0
    },

    // --- Husky ---
    {
        pregunta: '¿Qué raza es conocida por tirar de trineos?',
        imagen: 'img/perros/husky.jpg',
        opciones: ['Husky Siberiano', 'Malamute', 'Samoyedo', 'Pastor de Groenlandia'],
        correcta: 0
    },
    {
        pregunta: '¿Qué característica del pelaje ayuda al Husky a soportar el frío extremo?',
        imagen: 'img/perros/husky.jpg',
        opciones: ['Doble capa de pelo aislante', 'Ausencia total de pelo', 'Una sola capa fina', 'Pelo que cambia de color'],
        correcta: 0
    },
    {
        pregunta: '¿Qué nivel de energía tiene el Husky?',
        imagen: 'img/perros/husky.jpg',
        opciones: ['Muy alto', 'Bajo', 'Moderado', 'Nulo'],
        correcta: 0
    },

    // --- Pug ---
    {
        pregunta: '¿Qué raza es esta?',
        imagen: 'img/perros/pug.jpg',
        opciones: ['Pug', 'Bulldog Francés', 'Boston Terrier', 'Carlino'],
        correcta: 0
    },
    {
        pregunta: '¿Qué carácter suele tener el Pug?',
        imagen: 'img/perros/pug.jpg',
        opciones: ['Cariñoso y divertido', 'Muy agresivo', 'Extremadamente tímido', 'Independiente'],
        correcta: 0
    },
    {
        pregunta: '¿Qué tamaño tiene el Pug?',
        imagen: 'img/perros/pug.jpg',
        opciones: ['Pequeño', 'Mediano', 'Grande', 'Gigante'],
        correcta: 0
    },

    // --- Caniche ---
    {
        pregunta: '¿Qué raza es famosa por su elegancia?',
        imagen: 'img/perros/caniche.jpg',
        opciones: ['Caniche', 'Bichón Frisé', 'Shih Tzu', 'Pomerania'],
        correcta: 0
    },
    {
        pregunta: '¿Qué nivel de inteligencia tiene el Caniche?',
        imagen: 'img/perros/caniche.jpg',
        opciones: ['Muy alto', 'Bajo', 'Moderado', 'Nulo'],
        correcta: 0
    },
    {
        pregunta: '¿Qué tamaño puede tener el Caniche?',
        imagen: 'img/perros/caniche.jpg',
        opciones: ['Toy, mediano y grande', 'Solo grande', 'Solo mediano', 'Solo toy'],
        correcta: 0
    },

    // --- Teckel ---
    {
        pregunta: '¿Qué raza es esta?',
        imagen: 'img/perros/teckel.jpg',
        opciones: ['Teckel', 'Beagle', 'Corgi', 'Basset Hound'],
        correcta: 0
    },
    {
        pregunta: '¿Qué característica define al Teckel?',
        imagen: 'img/perros/teckel.jpg',
        opciones: ['Cuerpo alargado y patas cortas', 'Orejas puntiagudas', 'Cola muy larga', 'Hocico plano'],
        correcta: 0
    },
    {
        pregunta: '¿De qué país proviene el Teckel?',
        imagen: 'img/perros/teckel.jpg',
        opciones: ['Alemania', 'Francia', 'Italia', 'España'],
        correcta: 0
    }
];

// ================================================================
// CONFIGURACIÓN
// ================================================================
let partidaTrivialPerros = null;
const NUM_PREGUNTAS_TRIVIAL_PERROS = 10; // SOLO 10 POR RONDA

function crearPartidaTrivialPerros() {
    partidaTrivialPerros = {
        jugadores: [],
        puntuaciones: {},
        turnoIndex: 0,
        preguntaIndex: 0,
        preguntasOrden: [],
        fase: 'configuracion'
    };
    renderConfiguracionTrivialPerros();
}

// ================================================================
// FASE 1 — CONFIGURACIÓN
// ================================================================
function renderConfiguracionTrivialPerros() {
    setTituloJuego('Trivial de Perros — Configuración');

    if (partidaTrivialPerros.jugadores.length === 0) {
        partidaTrivialPerros.jugadores = cargarJugadoresGuardados() || ['Jugador 1', 'Jugador 2'];
    }

    const filas = partidaTrivialPerros.jugadores.map((nombre, i) => `
        <div class="fila-nombre">
            <input type="text" value="${nombre}" data-idx="${i}" class="input-nombre-trivial" maxlength="16" />
            ${partidaTrivialPerros.jugadores.length > 1 ? `<button class="quitar-jugador-trivial-perros" data-idx="${i}">✕</button>` : ''}
        </div>
    `).join('');

    renderVista(`
        <div class="pantalla-juego">
            <button class="btn-volver" id="btn-volver-selector-triv-perros">← Volver a minijuegos</button>
            <h2>🐶 Trivial de Perros</h2>
            <p class="subtexto">Preguntas con fotos de razas de perros. Os turnáis para responder.</p>

            <div class="tarjeta-central">
                <div class="lista-nombres" id="lista-nombres-trivial-perros">${filas}</div>

                <div style="margin-top:14px; display:flex; gap:10px; justify-content:center;">
                    <button class="btn-secundario" id="btn-add-jugador-trivial-perros" ${partidaTrivialPerros.jugadores.length >= 10 ? 'disabled' : ''}>+ Añadir jugador</button>
                </div>
            </div>

            <button class="btn-principal" id="btn-empezar-trivial-perros">
                Empezar partida (${NUM_PREGUNTAS_TRIVIAL_PERROS} preguntas)
            </button>
        </div>
    `);

    document.getElementById('btn-volver-selector-triv-perros').onclick = mostrarSelectorJuegos;

    document.querySelectorAll('.input-nombre-trivial').forEach(input => {
        input.addEventListener('input', e => {
            const idx = parseInt(e.target.dataset.idx);
            partidaTrivialPerros.jugadores[idx] = e.target.value || `Jugador ${idx + 1}`;
        });
    });

    document.querySelectorAll('.quitar-jugador-trivial-perros').forEach(btn => {
        btn.addEventListener('click', e => {
            const idx = parseInt(e.target.dataset.idx);
            partidaTrivialPerros.jugadores.splice(idx, 1);
            renderConfiguracionTrivialPerros();
        });
    });

    document.getElementById('btn-add-jugador-trivial-perros').addEventListener('click', () => {
        if (partidaTrivialPerros.jugadores.length >= 10) return;
        partidaTrivialPerros.jugadores.push(`Jugador ${partidaTrivialPerros.jugadores.length + 1}`);
        renderConfiguracionTrivialPerros();
    });

    document.getElementById('btn-empezar-trivial-perros').addEventListener('click', () => {
        const nombresValidos = partidaTrivialPerros.jugadores.filter(n => n.trim() !== '');
        if (nombresValidos.length < 1) {
            logEvento('⚠️ Escribe al menos un nombre de jugador.');
            return;
        }

        partidaTrivialPerros.jugadores = nombresValidos;
        guardarJugadoresGuardados(nombresValidos);
        nombresValidos.forEach(n => partidaTrivialPerros.puntuaciones[n] = 0);

        partidaTrivialPerros.preguntasOrden = [...PREGUNTAS_TRIVIAL_PERROS.keys()]
            .sort(() => Math.random() - 0.5)
            .slice(0, NUM_PREGUNTAS_TRIVIAL_PERROS);

        partidaTrivialPerros.preguntaIndex = 0;
        partidaTrivialPerros.turnoIndex = 0;

        logEvento(`🐶 Nuevo Trivial de Perros: ${nombresValidos.length} jugadores, ${NUM_PREGUNTAS_TRIVIAL_PERROS} preguntas`);
        actualizarPanelJugadores(partidaTrivialPerros.jugadores, 0);
        renderPreguntaTrivialPerros();
    });
}

// ================================================================
// FASE 2 — PREGUNTAS POR TURNOS
// ================================================================
function renderPreguntaTrivialPerros() {
    setTituloJuego(`Trivial de Perros — Pregunta ${partidaTrivialPerros.preguntaIndex + 1}/${NUM_PREGUNTAS_TRIVIAL_PERROS}`);

    const jugadorActual = partidaTrivialPerros.jugadores[partidaTrivialPerros.turnoIndex];
    const pregOriginal = PREGUNTAS_TRIVIAL_PERROS[partidaTrivialPerros.preguntasOrden[partidaTrivialPerros.preguntaIndex]];
    const preg = mezclarOpcionesPregunta(pregOriginal);

    actualizarPanelJugadores(partidaTrivialPerros.jugadores, partidaTrivialPerros.turnoIndex);

    const opciones = preg.opciones.map((op, i) => `
        <div class="opcion-voto" data-idx="${i}">${op}</div>
    `).join('');

    renderVista(`
        <div class="pantalla-juego">
            <h2>Turno de ${jugadorActual}</h2>

            <div class="tarjeta-central">
                ${preg.imagen
                    ? `<img src="${preg.imagen}" class="foto-perro-triv" alt="Foto de la raza a identificar" onerror="this.outerHTML='<div class=&quot;foto-perro-fallback&quot;>🐶</div>'" />`
                    : `<div class="foto-perro-fallback">🐶</div>`
                }

                <p style="font-weight:700; font-size:1.05rem; margin-bottom:16px;">
                    ${preg.pregunta}
                </p>

                <div class="lista-votacion" id="opciones-trivial-perros">${opciones}</div>
                <div id="feedback-trivial-perros"></div>
            </div>
        </div>
    `);

    document.querySelectorAll('#opciones-trivial-perros .opcion-voto').forEach(el => {
        el.addEventListener('click', () => {
            const idxElegido = parseInt(el.dataset.idx);
            resolverRespuestaTrivialPerros(idxElegido, preg, jugadorActual);
        });
    });
}

function resolverRespuestaTrivialPerros(idxElegido, preg, jugadorActual) {
    const acierto = idxElegido === preg.correcta;

    if (acierto) {
        partidaTrivialPerros.puntuaciones[jugadorActual]++;
        logEvento(`🐾 ${jugadorActual} acierta: ${preg.opciones[preg.correcta]}`);
        sumarAciertos(1);
    } else {
        logEvento(`❌ ${jugadorActual} falla. Era: ${preg.opciones[preg.correcta]}`);
    }

    document.querySelectorAll('#opciones-trivial-perros .opcion-voto').forEach((el, i) => {
        el.style.pointerEvents = 'none';
        if (i === preg.correcta) el.classList.add('correcta');
        else if (i === idxElegido) el.classList.add('incorrecta');
    });

    const feedback = document.getElementById('feedback-trivial-perros');
    if (feedback) {
        feedback.className = `feedback-respuesta ${acierto ? 'acierto' : 'fallo'}`;
        feedback.textContent = acierto ? '✅ ¡Correcto!' : `❌ Fallo. Era: ${preg.opciones[preg.correcta]}`;
    }

    setTimeout(() => {
        partidaTrivialPerros.preguntaIndex++;
        partidaTrivialPerros.turnoIndex = (partidaTrivialPerros.turnoIndex + 1) % partidaTrivialPerros.jugadores.length;

        if (partidaTrivialPerros.preguntaIndex >= NUM_PREGUNTAS_TRIVIAL_PERROS) {
            mostrarResultadoTrivialPerros();
        } else {
            renderPreguntaTrivialPerros();
        }
    }, 1800);
}

// ================================================================
// FASE 3 — RESULTADO FINAL
// ================================================================
function mostrarResultadoTrivialPerros() {
    setTituloJuego('Trivial de Perros — Resultado');

    const ranking = Object.entries(partidaTrivialPerros.puntuaciones)
        .sort((a, b) => b[1] - a[1]);

    const ganador = ranking[0];
    const esSolitario = partidaTrivialPerros.jugadores.length === 1;

    const filasRanking = ranking.map(([nombre, puntos], i) => `
        <div class="ranking item"
             style="display:flex; justify-content:space-between; padding:6px 0;
             ${i === 0 ? 'font-weight:800; color:var(--gold-dark);' : ''}">
            <span>${i + 1}. ${nombre}</span>
            <span>${puntos} pts</span>
        </div>
    `).join('');

    renderVista(`
        <div class="pantalla-juego">
            <div class="tarjeta-central">
                <div class="veredicto">${esSolitario ? `🎯 ¡${ganador[1]} puntos de ${NUM_PREGUNTAS_TRIVIAL_PERROS}!` : `🏆 ¡${ganador[0]} gana el Trivial de Perros!`}</div>

                <div style="margin-top:14px; text-align:left; max-width:280px; margin-left:auto; margin-right:auto;">
                    ${filasRanking}
                </div>
            </div>

            <div style="display:flex; gap:10px; justify-content:center; margin-top:20px; flex-wrap:wrap;">
                <button class="btn-secundario" id="btn-compartir-trivial-perros">📤 Compartir resultado</button>
                <button class="btn-secundario" id="btn-otra-trivial-perros">Jugar otra ronda</button>
                <button class="btn-principal" id="btn-volver-menu-trivial-perros">Volver al menú</button>
            </div>
        </div>
    `);

    logEvento(esSolitario
        ? `🏁 Trivial de Perros terminado. ${ganador[1]}/${NUM_PREGUNTAS_TRIVIAL_PERROS} puntos.`
        : `🏁 Trivial de Perros terminado. Gana ${ganador[0]} con ${ganador[1]} puntos.`);
    registrarPartidaCompletada();

    document.getElementById('btn-compartir-trivial-perros').addEventListener('click', () => {
        compartirResultado(esSolitario
            ? `🐶 ¡Saqué ${ganador[1]}/${NUM_PREGUNTAS_TRIVIAL_PERROS} en el Trivial de Perros! ¿Te atreves a superarlo?`
            : `🐶 ¡${ganador[0]} ganó el Trivial de Perros con ${ganador[1]} puntos! ¿Te atreves a superarlo?`);
    });

    // Botón: jugar otra ronda
    document.getElementById('btn-otra-trivial-perros').addEventListener('click', () => {
        const jugadoresAnteriores = partidaTrivialPerros.jugadores;
        crearPartidaTrivialPerros();
        partidaTrivialPerros.jugadores = jugadoresAnteriores;
        renderConfiguracionTrivialPerros();
    });

    // Botón: volver al menú
    document.getElementById('btn-volver-menu-trivial-perros').addEventListener('click', mostrarSelectorJuegos);
}