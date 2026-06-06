export const mockGames = [
  {
    id: 12,
    title: "Grand Theft Auto VI",
    image: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=2070&auto=format&fit=crop",
    globalScore: 10,
    platforms: ["PS5", "Xbox Series X"],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,899.00", availability: "PS5" },
      { store: "Microsoft Store", price: "$1,899.00", availability: "Xbox Series X" }
    ],
    breakdown: { jugabilidad: 10, gráficos: 10, historia: 10 },
    description: "La culminación de una década de espera. GTA VI no es solo un juego; es el simulador definitivo de la vida moderna y el crimen organizado. Un despliegue técnico que redefine lo que creíamos posible en hardware actual. Una oda épica al exceso y la libertad absoluta en las calles bañadas por el neón de Vice City.",
    reviews: [
      { id: 1201, user: "Rockstar_Loyalist_99", text: "¡EL REY HA VUELTO! No puedo creer el nivel de detalle en cada rincón. ¡Es simplemente perfecto, 10 años de espera valieron cada segundo!", score: 10 },
      { id: 1202, user: "JuanitoGamer_MX", text: "Me la paso horas solo manejando y escuchando la radio. La diversión es pura y la ciudad se siente viva.", score: 9.5 }
    ]
  },
  {
    id: 5,
    title: "Baldur's Gate 3",
    image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=2084&auto=format&fit=crop",
    globalScore: 9.9,
    platforms: ["PC", "PS5", "Xbox Series X"],
    marketPrices: [
      { store: "Steam", price: "$1,299.00", availability: "PC" },
      { store: "PlayStation Store", price: "$1,449.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 10, gráficos: 9.4, historia: 10 },
    description: "Una obra maestra sin precedentes en el género del RPG. Larian Studios ha forjado una leyenda donde cada elección tuya resuena en la eternidad. Es la libertad absoluta hecha código, una narrativa tan densa y ramificada que hará que olvides la realidad. Simplemente, la perfección del rol clásico modernizado.",
    reviews: [
      { id: 501, user: "D&D_Master_Ultra", text: "La profundidad de las mecánicas es abrumadora. Finalmente un juego que respeta la inteligencia del jugador. Imprescindible.", score: 10 },
      { id: 502, user: "RTX_3090_Sweat", text: "La historia es de 10, pero en el Acto 3 los FPS caen de 120 a 45 en ciudades densas. Necesita un parche de optimización urgente para PC de gama alta.", score: 8.5 }
    ]
  },
  {
    id: 15,
    title: "The Witcher 4: Polaris",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.8,
    platforms: ["PC", "PS5", "Xbox Series X"],
    marketPrices: [
      { store: "Steam", price: "$1,499.00", availability: "PC" },
      { store: "Epic Games", price: "$1,499.00", availability: "PC" }
    ],
    breakdown: { jugabilidad: 9.6, gráficos: 9.8, historia: 10 },
    description: "El inicio de una nueva era para los brujos. Polaris nos sumerge en una atmósfera gélida y despiadada con un despliegue visual en Unreal Engine 5 que quita el aliento. CD Projekt RED recupera su corona narrativa entregando una historia que te atrapará desde el primer contrato. Una carta de amor a la fantasía oscura.",
    reviews: [
      { id: 1501, user: "Geralt_Enjoyer_Forever", text: "¡BRUTAL! No creí que pudieran superar a Wild Hunt, pero la nueva escuela del lince es fascinante. ¡Pura magia!", score: 10 },
      { id: 1502, user: "MasterRace_Enthusiast", text: "Visualmente imbatible, aunque el Ray Tracing Overdrive todavía pone de rodillas a mi 5090. Esperaba más estabilidad en el lanzamiento.", score: 9.0 }
    ]
  },
  {
    id: 1,
    title: "Elden Ring: Shadow of the Erdtree",
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2071&auto=format&fit=crop",
    globalScore: 9.8,
    platforms: ["PC", "PS5", "Xbox Series X"],
    marketPrices: [
      { store: "Steam", price: "$859.00", availability: "PC" },
      { store: "PlayStation Store", price: "$999.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 10, gráficos: 9.5, historia: 9.8 },
    description: "Miyazaki lo ha vuelto a hacer. Shadow of the Erdtree no es una expansión, es un monumento al diseño de niveles y a la dificultad gratificante. Una odisea oscura en la Tierra de las Sombras que expande el lore de Elden Ring de formas inimaginables. Prepárate para morir, aprender y finalmente, triunfar de forma épica.",
    reviews: [
      { id: 101, user: "SoulsBorne_Addict", text: "Mejor que muchos juegos completos. Los jefes son una pesadilla hermosa. 10/10.", score: 10 },
      { id: 102, user: "Casual_Carlos", text: "Es muy difícil, pero la sensación de explorar este mundo nuevo es increíblemente divertida. ¡Lo logré vencer!", score: 9.0 }
    ]
  },
  {
    id: 11,
    title: "Hades II",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.7,
    platforms: ["PC"],
    marketPrices: [
      { store: "Steam", price: "$549.00", availability: "PC" },
      { store: "Epic Games", price: "$549.00", availability: "PC" }
    ],
    breakdown: { jugabilidad: 10, gráficos: 9.8, historia: 9.5 },
    description: "Melinoë toma la antorcha en esta secuela que perfecciona la fórmula de la perfección. Supergiant Games demuestra que se puede hacer un roguelike con alma, estilo y una adicción infinita. Cada 'run' es una danza de hechizos y narrativa que te mantendrá despierto hasta el amanecer. Una joya divina en todos sus apartados.",
    reviews: [
      { id: 1101, user: "Zagreus_Simp", text: "¡Dios mío, la dirección de arte es de otro mundo! Supera al primero en todo. ¡Larga vida a Melinoë!", score: 10 },
      { id: 1102, user: "IndieLover88", text: "Diversión pura desde el minuto uno. No puedo dejar de jugar 'una partida más'.", score: 9.5 }
    ]
  },
  {
    id: 3,
    title: "The Legend of Zelda: Tears of the Kingdom",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.6,
    platforms: ["Switch"],
    marketPrices: [
      { store: "Nintendo eShop", price: "$1,399.00", availability: "Nintendo Switch" },
      { store: "Amazon MX", price: "$1,199.00", availability: "Físico" }
    ],
    breakdown: { jugabilidad: 10, gráficos: 8.5, historia: 9.0 },
    description: "La ingeniería hecha videojuego. Hyrule se expande hacia los cielos y las profundidades en una aventura que desafía las leyes de la física y la imaginación. Tears of the Kingdom es un patio de recreo infinito donde tu creatividad es la única herramienta necesaria para salvar un reino. Una experiencia mágica y transformadora.",
    reviews: [
      { id: 301, user: "Hylian_Architect", text: "¡Las mecánicas de construcción son revolucionarias! He pasado 50 horas solo haciendo vehículos locos. ¡Obra maestra!", score: 10 },
      { id: 302, user: "Gamer_Relajado", text: "Me encanta perderme en el mapa. Siempre hay algo nuevo que descubrir y es muy entretenido.", score: 9.0 }
    ]
  },
  {
    id: 9,
    title: "Resident Evil 4 Remake",
    image: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.5,
    platforms: ["PC", "PS5", "Xbox Series X"],
    marketPrices: [
      { store: "Steam", price: "$799.00", availability: "PC" },
      { store: "PlayStation Store", price: "$1,149.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 9.8, gráficos: 9.6, historia: 9.0 },
    description: "Leon S. Kennedy regresa en el que es, posiblemente, el mejor remake de la historia. Capcom ha logrado equilibrar la nostalgia con la modernidad, entregando una experiencia de acción y terror que te mantendrá al borde del asiento. Cada disparo se siente real, cada sombra es un peligro. Un clásico redefinido para una nueva generación.",
    reviews: [
      { id: 901, user: "Resident_Evil_Veteran", text: "¡Increíble! Han respetado la esencia y mejorado todo lo que se podía mejorar. ¡GOTY material!", score: 10 },
      { id: 902, user: "PC_Performance_Nerd", text: "Excelente remake, pero el Denuvo y algunos problemas de stuttering al inicio empañan un poco la versión de PC. Aun así, juegazo.", score: 8.5 }
    ]
  },
  {
    id: 14,
    title: "Death Stranding 2: On The Beach",
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2071&auto=format&fit=crop",
    globalScore: 9.4,
    platforms: ["PS5"],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,549.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 8.9, gráficos: 10, historia: 10 },
    description: "Hideo Kojima nos invita a un nuevo viaje introspectivo y visualmente arrebatador. On The Beach eleva la narrativa cinematográfica a niveles nunca vistos en el medio. Es extraño, es hermoso y es profundamente conmovedor. Una experiencia que solo Kojima podría imaginar y que te dejará reflexionando mucho después de los créditos.",
    reviews: [
      { id: 1401, user: "Kojima_Is_God", text: "Nadie entiende su genio. Es arte puro, cine interactivo en su máxima expresión. ¡Brillante!", score: 10 },
      { id: 1402, user: "Curioso_Gamer", text: "No entiendo la mitad de lo que pasa, pero los paisajes son tan bonitos y la música tan buena que no puedo dejarlo.", score: 8.5 }
    ]
  },
  {
    id: 7,
    title: "Marvel's Spider-Man 2",
    image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=2080&auto=format&fit=crop",
    globalScore: 9.3,
    platforms: ["PS5"],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,549.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 9.5, gráficos: 9.8, historia: 9.0 },
    description: "Dos Spider-Men, una amenaza colosal. Insomniac Games entrega la aventura definitiva del trepamuros con un balanceo veloz y un combate coreografiado a la perfección. Nueva York nunca se vio tan detallada ni se sintió tan peligrosa. Una historia emocional sobre la responsabilidad y el peso de ser un héroe. ¡Simplemente espectacular!",
    reviews: [
      { id: 701, user: "WebHead_Fanatic", text: "¡El mejor juego de superhéroes! Jugar con Peter y Miles es un sueño hecho realidad. ¡10 absoluto!", score: 10 },
      { id: 702, user: "Pura_Diversion_24", text: "Súper divertido, la acción no para nunca. Me encanta cómo se siente volar por la ciudad.", score: 9.5 }
    ]
  },
  {
    id: 8,
    title: "Cyberpunk 2077: Ultimate Edition",
    image: "https://images.unsplash.com/photo-1605898960710-90da34597473?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.2,
    platforms: ["PC", "PS5", "Xbox Series X"],
    marketPrices: [
      { store: "Steam", price: "$1,299.00", availability: "PC" },
      { store: "Microsoft Store", price: "$1,299.00", availability: "Xbox Series X" }
    ],
    breakdown: { jugabilidad: 9.0, gráficos: 10, historia: 9.5 },
    description: "Night City finalmente brilla como siempre debió hacerlo. La Ultimate Edition es la redención total de una visión distópica fascinante. Con Phantom Liberty, la narrativa alcanza picos de thriller de espionaje magistrales. Sumérgete en el cromo, el neón y la decadencia de una metrópolis que te devorará vivo si no eres lo suficientemente rápido.",
    reviews: [
      { id: 801, user: "Choomba_V", text: "¡Finalmente es el juego que nos prometieron! La expansión es mejor que el juego base. ¡Increíble!", score: 10 },
      { id: 802, user: "Optimization_Police", text: "El Path Tracing es increíble, pero necesitas una central eléctrica para correrlo a 60fps. Fuera de eso, la ciudad es asombrosa.", score: 8.0 }
    ]
  },
  {
    id: 6,
    title: "Alan Wake 2",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1957&auto=format&fit=crop",
    globalScore: 8.9,
    platforms: ["PC", "PS5", "Xbox Series X"],
    marketPrices: [
      { store: "Epic Games", price: "$949.00", availability: "PC" },
      { store: "PlayStation Store", price: "$1,149.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 8.5, gráficos: 10, historia: 9.2 },
    description: "Una pesadilla lúcida donde la realidad y la ficción se entrelazan de forma aterradora. Remedy ha creado un thriller psicológico que desafía las convenciones del medio, usando el apartado visual más vanguardista hasta la fecha. Acompaña a Alan y Saga en un descenso a la locura que te mantendrá cuestionando cada sombra. Un viaje inolvidable.",
    reviews: [
      { id: 601, user: "Remedy_Scholar", text: "Una narrativa compleja y fascinante. Visualmente es lo más avanzado que existe hoy. ¡Arte!", score: 9.5 },
      { id: 602, user: "FrameRate_Watcher", text: "La carga técnica es altísima. Si no tienes una tarjeta con Mesh Shaders, ni lo intentes. Pero la historia vale la pena.", score: 8.0 }
    ]
  },
  {
    id: 20,
    title: "The Day Before: Legacy",
    image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2070&auto=format&fit=crop",
    globalScore: 4.2,
    platforms: ["PC"],
    marketPrices: [
      { store: "Steam (Removed)", price: "$0.00", availability: "Abandonware" },
      { store: "Keys Sites", price: "$1,999.00", availability: "PC" }
    ],
    breakdown: { jugabilidad: 2.0, gráficos: 5.0, historia: 1.0 },
    description: "Un monumento a las promesas vacías y al marketing engañoso. 'The Day Before' es más un experimento sociológico sobre el hype que un videojuego funcional. Entre bugs que rompen la realidad y mecánicas inexistentes, este título es la guía definitiva de cómo NO lanzar un juego. Una experiencia tan vacía como sus servidores.",
    reviews: [
      { id: 2001, user: "Scam_Survivor", text: "¡CUIDADO! Es una estafa total, no hay nada de lo que prometieron en los trailers. Dinero a la basura.", score: 1 },
      { id: 2002, user: "MasterRace_Cynic", text: "Los assets son de tienda, la optimización es un chiste y el gameplay es aburrido. El peor 'lanzamiento' de la década.", score: 3 }
    ]
  }
];
