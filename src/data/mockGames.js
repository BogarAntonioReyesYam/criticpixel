export const mockGames = [
  {
    id: 12,
    title: "Grand Theft Auto VI",
    image: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=2070&auto=format&fit=crop",
    globalScore: 10,
    platforms: ["PS5", "Xbox Series X"],
    editions: [
      { 
        id: 'std', 
        name: 'Standard Edition', 
        price: '$1,899.00', 
        perks: [
          { title: 'Juego Base', description: 'Acceso completo a la historia de Lucía y Jason.' },
          { title: 'Bono de Reserva', description: 'Pack de dinero digital para el modo historia.' }
        ] 
      },
      { 
        id: 'dlx', 
        name: 'Deluxe Edition', 
        price: '$2,299.00', 
        perks: [
          { title: 'Juego Base', description: 'Acceso completo a la historia principal.' },
          { title: 'Pack de Ropa Vice', description: 'Conjuntos exclusivos inspirados en los años 80.' },
          { title: '500k GTA Online', description: 'Impulso económico inmediato para tu imperio criminal.' }
        ] 
      },
      { 
        id: 'ult', 
        name: 'Ultimate Edition', 
        price: '$2,799.00', 
        perks: [
          { title: 'Todo lo anterior', description: 'Incluye beneficios de las ediciones Standard y Deluxe.' },
          { title: 'Acceso anticipado', description: 'Juega 3 días antes del lanzamiento oficial.' },
          { title: 'Pase de Temporada', description: 'Acceso a los primeros 3 DLCs de historia planeados.' }
        ] 
      }
    ],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,899.00", availability: "PS5" },
      { store: "Microsoft Store", price: "$1,899.00", availability: "Xbox Series X" }
    ],
    breakdown: { jugabilidad: 10, gráficos: 10, historia: 10 },
    description: "La culminación de una década de espera. GTA VI no es solo un juego; es el simulador definitivo de la vida moderna y el crimen organizado.",
    about: "Grand Theft Auto VI viaja al estado de Leonida, hogar de las calles bañadas en neón de Vice City y más allá, en la evolución más grande y envolvente de la serie hasta la fecha. Con una narrativa centrada en el dúo de Lucia y Jason, el juego promete un realismo nunca antes visto en un mundo abierto.",
    specs: {
      desarrollador: "Rockstar North",
      editor: "Rockstar Games",
      genero: "Acción / Mundo Abierto",
      lanzamiento: "2025/2026",
      multijugador: "Sí (GTA Online 2)",
      clasificación: "M (17+)"
    },
    languages: [
      { lang: "Español (España)", interface: true, voices: true, subs: true },
      { lang: "Español (Latam)", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 1201, user: "Rockstar_Loyalist_99", text: "¡EL REY HA VUELTO! No puedo creer el nivel de detalle en cada rincón.", score: 10 },
      { id: 1202, user: "JuanitoGamer_MX", text: "Me la paso horas solo manejando y escuchando la radio.", score: 9.5 }
    ]
  },
  {
    id: 5,
    title: "Baldur's Gate 3",
    image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=2084&auto=format&fit=crop",
    globalScore: 9.9,
    platforms: ["PC", "PS5", "Xbox Series X"],
    editions: [
      { 
        id: 'std', 
        name: 'Standard Edition', 
        price: '$1,299.00', 
        perks: [
          { title: 'Juego Base', description: 'La experiencia completa de Baldur\'s Gate 3.' }
        ] 
      },
      { 
        id: 'dlx', 
        name: 'Digital Deluxe', 
        price: '$1,499.00', 
        perks: [
          { title: 'Pack de canciones', description: 'Nuevas melodías de bardo para tu viaje.' },
          { title: 'Pinturas de Rivellon', description: 'Cuadros exclusivos para tu campamento.' },
          { title: 'Bolsa de aventurero', description: 'Suministros adicionales de inicio.' }
        ] 
      }
    ],
    marketPrices: [
      { store: "Steam", price: "$1,299.00", availability: "PC" },
      { store: "PlayStation Store", price: "$1,449.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 10, gráficos: 9.4, historia: 10 },
    description: "Una obra maestra sin precedentes en el género del RPG. Larian Studios ha forjado una leyenda donde cada elección tuya resuena en la eternidad.",
    about: "Baldur's Gate 3 es un RPG de nueva generación, ambientado en el mundo de Dungeons & Dragons.",
    specs: {
      desarrollador: "Larian Studios",
      editor: "Larian Studios",
      genero: "RPG / Estrategia",
      lanzamiento: "2023",
      multijugador: "Cooperativo Online/Local",
      clasificación: "M (17+)"
    },
    languages: [
      { lang: "Español", interface: true, voices: false, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 501, user: "D&D_Master_Ultra", text: "La profundidad de las mecánicas es abrumadora.", score: 10 },
      { id: 502, user: "RTX_3090_Sweat", text: "La historia es de 10, pero necesita optimización.", score: 8.5 }
    ]
  },
  {
    id: 15,
    title: "The Witcher 4: Polaris",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.8,
    platforms: ["PC", "PS5", "Xbox Series X"],
    editions: [
      { 
        id: 'std', 
        name: 'Standard Edition', 
        price: '$1,399.00', 
        perks: [
          { title: 'Juego Base', description: 'Acceso a la nueva saga del brujo.' }
        ] 
      },
      { 
        id: 'ult', 
        name: 'Ursine Edition', 
        price: '$1,999.00', 
        perks: [
          { title: 'Juego Base', description: 'Historia completa en Polaris.' },
          { title: 'Expansión 1', description: 'Acceso inmediato al primer DLC cuando se lance.' },
          { title: 'Set de Armadura', description: 'Armadura exclusiva de la Escuela del Oso.' }
        ] 
      }
    ],
    marketPrices: [
      { store: "Steam", price: "$1,499.00", availability: "PC" },
      { store: "Epic Games", price: "$1,499.00", availability: "PC" }
    ],
    breakdown: { jugabilidad: 9.6, gráficos: 9.8, historia: 10 },
    description: "El inicio de una nueva era para los brujos. Polaris nos sumerge en una atmósfera gélida y despiadada.",
    about: "Polaris inicia una nueva trilogía épica de fantasía oscura de la mano de CD PROJEKT RED.",
    specs: {
      desarrollador: "CD Projekt RED",
      editor: "CD Projekt RED",
      genero: "RPG de Acción",
      lanzamiento: "2026",
      multijugador: "No",
      clasificación: "M (17+)"
    },
    languages: [
      { lang: "Español", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 1501, user: "Geralt_Enjoyer_Forever", text: "¡BRUTAL! La nueva escuela es fascinante.", score: 10 },
      { id: 1502, user: "MasterRace_Enthusiast", text: "Visualmente imbatible.", score: 9.0 }
    ]
  },
  {
    id: 1,
    title: "Elden Ring: Shadow of the Erdtree",
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2071&auto=format&fit=crop",
    globalScore: 9.8,
    platforms: ["PC", "PS5", "Xbox Series X"],
    editions: [
      { 
        id: 'std', 
        name: 'Standard Expansion', 
        price: '$859.00', 
        perks: [
          { title: 'Shadow of the Erdtree', description: 'Acceso a la expansión más grande de FromSoftware.' }
        ] 
      },
      { 
        id: 'pre', 
        name: 'Premium Bundle', 
        price: '$1,099.00', 
        perks: [
          { title: 'Expansión', description: 'Shadow of the Erdtree completo.' },
          { title: 'Libro de arte', description: 'Versión digital con bocetos exclusivos.' },
          { title: 'Banda sonora', description: 'Todos los temas épicos en alta fidelidad.' }
        ] 
      }
    ],
    marketPrices: [
      { store: "Steam", price: "$859.00", availability: "PC" },
      { store: "PlayStation Store", price: "$999.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 10, gráficos: 9.5, historia: 9.8 },
    description: "Miyazaki lo ha vuelto a hacer. Shadow of the Erdtree no es una expansión, es un monumento.",
    about: "La expansión presenta una historia completamente nueva ambientada en la Tierra de las Sombras.",
    specs: {
      desarrollador: "FromSoftware",
      editor: "Bandai Namco",
      genero: "Action RPG / Soulslike",
      lanzamiento: "2024",
      multijugador: "Cooperativo / Invasiones",
      clasificación: "M (17+)"
    },
    languages: [
      { lang: "Español", interface: true, voices: false, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 101, user: "SoulsBorne_Addict", text: "Los jefes son una pesadilla hermosa.", score: 10 },
      { id: 102, user: "Casual_Carlos", text: "Es muy difícil pero divertido.", score: 9.0 }
    ]
  },
  {
    id: 11,
    title: "Hades II",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.7,
    platforms: ["PC"],
    editions: [
      { 
        id: 'std', 
        name: 'Standard Edition', 
        price: '$549.00', 
        perks: [
          { title: 'Acceso Anticipado', description: 'Juega al juego base mientras se desarrolla.' },
          { title: 'Actualizaciones', description: 'Todos los parches de contenido futuros incluidos.' }
        ] 
      }
    ],
    marketPrices: [
      { store: "Steam", price: "$549.00", availability: "PC" },
      { store: "Epic Games", price: "$549.00", availability: "PC" }
    ],
    breakdown: { jugabilidad: 10, gráficos: 9.8, historia: 9.5 },
    description: "Melinoë toma la antorcha en esta secuela que perfecciona la fórmula de la perfección.",
    about: "Lucha más allá del Inframundo usando magia negra para enfrentarte al Titán del Tiempo.",
    specs: {
      desarrollador: "Supergiant Games",
      editor: "Supergiant Games",
      genero: "Roguelike",
      lanzamiento: "2024",
      multijugador: "No",
      clasificación: "T (Teen)"
    },
    languages: [
      { lang: "Español", interface: true, voices: false, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 1101, user: "Zagreus_Simp", text: "¡Larga vida a Melinoë!", score: 10 },
      { id: 1102, user: "IndieLover88", text: "Una partida más y ya...", score: 9.5 }
    ]
  },
  {
    id: 3,
    title: "The Legend of Zelda: Tears of the Kingdom",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.6,
    platforms: ["Switch"],
    editions: [
      { 
        id: 'std', 
        name: 'Standard Edition', 
        price: '$1,399.00', 
        perks: [
          { title: 'Cartucho Digital', description: 'Acceso completo al Hyrule del cielo y la tierra.' }
        ] 
      }
    ],
    marketPrices: [
      { store: "Nintendo eShop", price: "$1,399.00", availability: "Nintendo Switch" }
    ],
    breakdown: { jugabilidad: 10, gráficos: 8.5, historia: 9.0 },
    description: "La ingeniería hecha videojuego. Hyrule se expande hacia los cielos y las profundidades.",
    about: "En esta secuela de Breath of the Wild, decidirás tu propio camino.",
    specs: {
      desarrollador: "Nintendo EPD",
      editor: "Nintendo",
      genero: "Aventura / Mundo Abierto",
      lanzamiento: "2023",
      multijugador: "No",
      clasificación: "E10+ (Everyone 10+)"
    },
    languages: [
      { lang: "Español (Latam)", interface: true, voices: false, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 301, user: "Hylian_Architect", text: "Creatividad al límite.", score: 10 },
      { id: 302, user: "Gamer_Relajado", text: "Siempre hay algo nuevo.", score: 9.0 }
    ]
  },
  {
    id: 9,
    title: "Resident Evil 4 Remake",
    image: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.5,
    platforms: ["PC", "PS5", "Xbox Series X"],
    editions: [
      { 
        id: 'std', 
        name: 'Standard Edition', 
        price: '$799.00', 
        perks: [
          { title: 'Juego Base', description: 'La misión de rescate de Leon completa.' }
        ] 
      },
      { 
        id: 'dlx', 
        name: 'Deluxe Edition', 
        price: '$1,149.00', 
        perks: [
          { title: 'Pack de trajes', description: 'Trajes casuales y románticos para Leon y Ashley.' },
          { title: 'Armas Deluxe', description: 'Sentinel Nine y Skull Shaker incluidas.' },
          { title: 'Mapa de tesoros', description: 'Revela ubicaciones de objetos raros en el mapa.' }
        ] 
      }
    ],
    marketPrices: [
      { store: "Steam", price: "$799.00", availability: "PC" },
      { store: "PlayStation Store", price: "$1,149.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 9.8, gráficos: 9.6, historia: 9.0 },
    description: "Leon S. Kennedy regresa en el que es, posiblemente, el mejor remake de la historia.",
    about: "Leon S. Kennedy ha sido enviado a rescatar a la hija del presidente.",
    specs: {
      desarrollador: "Capcom",
      editor: "Capcom",
      genero: "Survival Horror",
      lanzamiento: "2023",
      multijugador: "No",
      clasificación: "M (17+)"
    },
    languages: [
      { lang: "Español", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 901, user: "RE_Veteran", text: "GOTY material.", score: 10 },
      { id: 902, user: "PC_Nerd", text: "Excelente remake.", score: 8.5 }
    ]
  },
  {
    id: 14,
    title: "Death Stranding 2: On The Beach",
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2071&auto=format&fit=crop",
    globalScore: 9.4,
    platforms: ["PS5"],
    editions: [
      { 
        id: 'std', 
        name: 'Standard Edition', 
        price: '$1,549.00', 
        perks: [
          { title: 'Juego Base', description: 'Acompaña a Sam en su nueva misión de conexión.' }
        ] 
      },
      { 
        id: 'dlx', 
        name: 'Digital Deluxe', 
        price: '$1,849.00', 
        perks: [
          { title: 'Trajes Dorados', description: 'Equipamiento estético exclusivo de lujo.' },
          { title: 'Avatar Ludens', description: 'Icono especial para tu perfil de PlayStation.' },
          { title: 'Gafas de sol', description: 'Accesorio cosmético in-game.' }
        ] 
      }
    ],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,549.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 8.9, gráficos: 10, historia: 10 },
    description: "Hideo Kojima nos invita a un nuevo viaje introspectivo y visualmente arrebatador.",
    about: "Sam Porter Bridges se embarca en un nuevo viaje para salvar a la humanidad.",
    specs: {
      desarrollador: "Kojima Productions",
      editor: "Sony Interactive Ent.",
      genero: "Acción / Exploración",
      lanzamiento: "2025",
      multijugador: "Social Asíncrono",
      clasificación: "M (17+)"
    },
    languages: [
      { lang: "Español", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 1401, user: "Kojima_Fan", text: "Arte puro.", score: 10 },
      { id: 1402, user: "Curioso", text: "Es hermoso.", score: 8.5 }
    ]
  },
  {
    id: 7,
    title: "Marvel's Spider-Man 2",
    image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=2080&auto=format&fit=crop",
    globalScore: 9.3,
    platforms: ["PS5"],
    editions: [
      { 
        id: 'std', 
        name: 'Standard Edition', 
        price: '$1,549.00', 
        perks: [
          { title: 'Juego Base', description: 'La historia completa de Peter y Miles.' }
        ] 
      },
      { 
        id: 'dlx', 
        name: 'Digital Deluxe', 
        price: '$1,799.00', 
        perks: [
          { title: '10 Trajes', description: '5 trajes únicos para Peter y 5 para Miles.' },
          { title: 'Modo Foto', description: 'Marcos y pegatinas adicionales.' },
          { title: 'Puntos de habilidad', description: '2 puntos extra de inicio.' }
        ] 
      }
    ],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,549.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 9.5, gráficos: 9.8, historia: 9.0 },
    description: "Dos Spider-Men, una amenaza colosal. La aventura definitiva del trepamuros.",
    about: "Explora la Nueva York de Marvel expandida.",
    specs: {
      desarrollador: "Insomniac Games",
      editor: "Sony Interactive Ent.",
      genero: "Acción / Aventura",
      lanzamiento: "2023",
      multijugador: "No",
      clasificación: "T (Teen)"
    },
    languages: [
      { lang: "Español (Latam)", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 701, user: "WebHead", text: "Un sueño hecho realidad.", score: 10 },
      { id: 702, user: "Gamer_24", text: "Súper divertido.", score: 9.5 }
    ]
  },
  {
    id: 8,
    title: "Cyberpunk 2077: Ultimate Edition",
    image: "https://images.unsplash.com/photo-1605898960710-90da34597473?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.2,
    platforms: ["PC", "PS5", "Xbox Series X"],
    editions: [
      { 
        id: 'std', 
        name: 'Juego Base', 
        price: '$899.00', 
        perks: [
          { title: 'Cyberpunk 2077', description: 'El juego base con todas las actualizaciones 2.0.' }
        ] 
      },
      { 
        id: 'ult', 
        name: 'Ultimate Edition', 
        price: '$1,299.00', 
        perks: [
          { title: 'Juego Base', description: 'Experiencia completa de Night City.' },
          { title: 'Phantom Liberty', description: 'Expansión masiva de thriller de espionaje.' }
        ] 
      }
    ],
    marketPrices: [
      { store: "Steam", price: "$1,299.00", availability: "PC" },
      { store: "Microsoft Store", price: "$1,299.00", availability: "Xbox Series X" }
    ],
    breakdown: { jugabilidad: 9.0, gráficos: 10, historia: 9.5 },
    description: "Night City finalmente brilla como siempre debió hacerlo. La redención total.",
    about: "Cyberpunk 2077 es un RPG de acción y aventura.",
    specs: {
      desarrollador: "CD Projekt RED",
      editor: "CD Projekt RED",
      genero: "RPG de Acción",
      lanzamiento: "2020/2023",
      multijugador: "No",
      clasificación: "M (17+)"
    },
    languages: [
      { lang: "Español", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 801, user: "V_Choomba", text: "¡Finalmente lo lograron!", score: 10 },
      { id: 802, user: "Optimization", text: "Path Tracing increíble.", score: 8.0 }
    ]
  },
  {
    id: 6,
    title: "Alan Wake 2",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1957&auto=format&fit=crop",
    globalScore: 8.9,
    platforms: ["PC", "PS5", "Xbox Series X"],
    editions: [
      { 
        id: 'std', 
        name: 'Standard Edition', 
        price: '$949.00', 
        perks: [
          { title: 'Juego Base', description: 'Investiga la oscuridad con Alan y Saga.' }
        ] 
      }
    ],
    marketPrices: [
      { store: "Epic Games", price: "$949.00", availability: "PC" },
      { store: "PlayStation Store", price: "$1,149.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 8.5, gráficos: 10, historia: 9.2 },
    description: "Una pesadilla lúcida donde la realidad y la ficción se entrelazan.",
    about: "Atrapado en una dimensión alternativa, Alan intenta escapar.",
    specs: {
      desarrollador: "Remedy Entertainment",
      editor: "Epic Games Publishing",
      genero: "Survival Horror / Misterio",
      lanzamiento: "2023",
      multijugador: "No",
      clasificación: "M (17+)"
    },
    languages: [
      { lang: "Español", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 601, user: "Remedy_Fan", text: "¡Arte!", score: 9.5 },
      { id: 602, user: "Tech_Watcher", text: "Muy avanzado visualmente.", score: 8.0 }
    ]
  },
  {
    id: 20,
    title: "The Day Before: Legacy",
    image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2070&auto=format&fit=crop",
    globalScore: 4.2,
    platforms: ["PC"],
    editions: [
      { 
        id: 'std', 
        name: 'Legacy Key', 
        price: '$1,999.00', 
        perks: [
          { title: 'Copia Inoperante', description: 'Un fragmento de historia sobre qué no hacer.' }
        ] 
      }
    ],
    marketPrices: [
      { store: "Keys Sites", price: "$1,999.00", availability: "PC" }
    ],
    breakdown: { jugabilidad: 2.0, gráficos: 5.0, historia: 1.0 },
    description: "Un monumento a las promesas vacías y al marketing engañoso.",
    about: "The Day Before era un MMO de supervivencia retirado de las tiendas.",
    specs: {
      desarrollador: "Fntastic",
      editor: "Mytona",
      genero: "Survival MMO",
      lanzamiento: "2023",
      multijugador: "Sí (Cerrado)",
      clasificación: "M (17+)"
    },
    languages: [
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 2001, user: "Survivor", text: "Estafa total.", score: 1 },
      { id: 2002, user: "Cynic", text: "Assets de tienda.", score: 3 }
    ]
  }
];
