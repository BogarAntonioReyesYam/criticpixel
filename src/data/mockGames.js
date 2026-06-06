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
    about: "Grand Theft Auto VI viaja al estado de Leonida, hogar de las calles bañadas en neón de Vice City y más allá, en la evolución más grande y envolvente de la serie hasta la fecha.",
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
      { lang: "Inglés", interface: true, voices: true, subs: true },
      { lang: "Francés", interface: true, voices: true, subs: true },
      { lang: "Alemán", interface: true, voices: true, subs: true },
      { lang: "Italiano", interface: true, voices: true, subs: true },
      { lang: "Portugués (Brasil)", interface: true, voices: true, subs: true },
      { lang: "Japonés", interface: true, voices: true, subs: true },
      { lang: "Coreano", interface: true, voices: false, subs: true },
      { lang: "Chino simplificado", interface: true, voices: false, subs: true },
      { lang: "Chino tradicional", interface: true, voices: false, subs: true },
      { lang: "Ruso", interface: true, voices: false, subs: true },
      { lang: "Polaco", interface: true, voices: false, subs: true }
    ],
    reviews: [
      { id: 1201, user: "Rockstar_Loyalist_99", text: "¡EL REY HA VUELTO!", score: 10 },
      { id: 1202, user: "JuanitoGamer_MX", text: "La ciudad se siente viva.", score: 9.5 }
    ]
  },
  {
    id: 5,
    title: "Baldur's Gate 3",
    image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=2084&auto=format&fit=crop",
    globalScore: 9.9,
    platforms: ["PC", "PS5", "Xbox Series X"],
    editions: [
      { id: 'std', name: 'Standard Edition', price: '$1,299.00', perks: [{ title: 'Juego Base', description: 'Experiencia completa.' }] },
      { id: 'dlx', name: 'Digital Deluxe', price: '$1,499.00', perks: [{ title: 'Pack Deluxe', description: 'Contenido estético adicional.' }] }
    ],
    marketPrices: [
      { store: "Steam", price: "$1,299.00", availability: "PC" },
      { store: "PlayStation Store", price: "$1,449.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 10, gráficos: 9.4, historia: 10 },
    description: "Una obra maestra sin precedentes en el género del RPG.",
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
      { lang: "Inglés", interface: true, voices: true, subs: true },
      { lang: "Francés", interface: true, voices: true, subs: true },
      { lang: "Alemán", interface: true, voices: true, subs: true },
      { lang: "Italiano", interface: true, voices: false, subs: true },
      { lang: "Chino simplificado", interface: true, voices: false, subs: true },
      { lang: "Ruso", interface: true, voices: false, subs: true },
      { lang: "Coreano", interface: true, voices: false, subs: true },
      { lang: "Polaco", interface: true, voices: false, subs: true },
      { lang: "Portugués (Brasil)", interface: true, voices: false, subs: true },
      { lang: "Ucraniano", interface: true, voices: false, subs: true }
    ],
    reviews: [
      { id: 501, user: "D&D_Master_Ultra", text: "La profundidad es abrumadora.", score: 10 },
      { id: 502, user: "RTX_3090_Sweat", text: "La historia es de 10.", score: 8.5 }
    ]
  },
  {
    id: 1,
    title: "Elden Ring: Shadow of the Erdtree",
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2071&auto=format&fit=crop",
    globalScore: 9.8,
    platforms: ["PC", "PS5", "Xbox Series X"],
    editions: [
      { id: 'std', name: 'Standard Edition', price: '$859.00', perks: [{ title: 'DLC', description: 'Shadow of the Erdtree.' }] }
    ],
    marketPrices: [
      { store: "Steam", price: "$859.00", availability: "PC" },
      { store: "PlayStation Store", price: "$999.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 10, gráficos: 9.5, historia: 9.8 },
    description: "Miyazaki lo ha vuelto a hacer.",
    about: "La expansión presenta una historia completamente nueva ambientada en la Tierra de las Sombras.",
    specs: {
      desarrollador: "FromSoftware",
      editor: "Bandai Namco",
      genero: "Action RPG",
      lanzamiento: "2024",
      multijugador: "Cooperativo / Invasiones",
      clasificación: "M (17+)"
    },
    languages: [
      { lang: "Español", interface: true, voices: false, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true },
      { lang: "Japonés", interface: true, voices: true, subs: true },
      { lang: "Francés", interface: true, voices: false, subs: true },
      { lang: "Alemán", interface: true, voices: false, subs: true },
      { lang: "Italiano", interface: true, voices: false, subs: true },
      { lang: "Coreano", interface: true, voices: false, subs: true },
      { lang: "Chino simplificado", interface: true, voices: false, subs: true },
      { lang: "Tailandés", interface: true, voices: false, subs: true },
      { lang: "Ruso", interface: true, voices: false, subs: true }
    ],
    reviews: [
      { id: 101, user: "Souls_Addict", text: "Monumento al diseño.", score: 10 },
      { id: 102, user: "Casual_C", text: "Muy difícil pero justo.", score: 9.0 }
    ]
  },
  {
    id: 15,
    title: "The Witcher 4: Polaris",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.8,
    platforms: ["PC", "PS5", "Xbox Series X"],
    editions: [
      { id: 'std', name: 'Standard Edition', price: '$1,399.00', perks: [{ title: 'Juego Base', description: 'Historia completa.' }] }
    ],
    marketPrices: [
      { store: "Steam", price: "$1,399.00", availability: "PC" },
      { store: "PlayStation Store", price: "$1,549.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 9.6, gráficos: 9.8, historia: 10 },
    description: "El inicio de una nueva era para los brujos.",
    about: "Polaris inicia una nueva trilogía épica de fantasía oscura.",
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
      { lang: "Polaco", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true },
      { lang: "Alemán", interface: true, voices: true, subs: true },
      { lang: "Francés", interface: true, voices: true, subs: true },
      { lang: "Italiano", interface: true, voices: true, subs: true },
      { lang: "Portugués (Brasil)", interface: true, voices: true, subs: true },
      { lang: "Japonés", interface: true, voices: false, subs: true },
      { lang: "Coreano", interface: true, voices: false, subs: true },
      { lang: "Ruso", interface: true, voices: true, subs: true },
      { lang: "Chino simplificado", interface: true, voices: false, subs: true }
    ],
    reviews: [
      { id: 1501, user: "Geralt_F", text: "Pura magia.", score: 10 },
      { id: 1502, user: "MasterRace", text: "Brutal.", score: 9.0 }
    ]
  },
  {
    id: 9,
    title: "Resident Evil 4 Remake",
    image: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.5,
    platforms: ["PC", "PS5", "Xbox Series X"],
    editions: [
      { id: 'std', name: 'Standard Edition', price: '$799.00', perks: [{ title: 'Juego Base', description: 'Historia completa.' }] }
    ],
    marketPrices: [
      { store: "Steam", price: "$799.00", availability: "PC" },
      { store: "PlayStation Store", price: "$1,149.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 9.8, gráficos: 9.6, historia: 9.0 },
    description: "Leon S. Kennedy regresa.",
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
      { lang: "Español (España)", interface: true, voices: true, subs: true },
      { lang: "Español (Latam)", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true },
      { lang: "Japonés", interface: true, voices: true, subs: true },
      { lang: "Francés", interface: true, voices: true, subs: true },
      { lang: "Alemán", interface: true, voices: true, subs: true },
      { lang: "Italiano", interface: true, voices: true, subs: true },
      { lang: "Coreano", interface: true, voices: false, subs: true },
      { lang: "Ruso", interface: true, voices: false, subs: true },
      { lang: "Chino simplificado", interface: true, voices: false, subs: true }
    ],
    reviews: [
      { id: 901, user: "Leon_V", text: "Perfecto.", score: 10 },
      { id: 902, user: "RE_Fan", text: "El mejor remake.", score: 9.5 }
    ]
  },
  {
    id: 3,
    title: "The Legend of Zelda: Tears of the Kingdom",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.6,
    platforms: ["Switch"],
    editions: [
      { id: 'std', name: 'Standard Edition', price: '$1,399.00', perks: [{ title: 'Juego Base', description: 'Hyrule completo.' }] }
    ],
    marketPrices: [
      { store: "Nintendo eShop", price: "$1,399.00", availability: "Switch" }
    ],
    breakdown: { jugabilidad: 10, gráficos: 8.5, historia: 9.0 },
    description: "La ingeniería hecha videojuego.",
    about: "Decidirás tu propio camino a través de los extensos paisajes de Hyrule.",
    specs: {
      desarrollador: "Nintendo EPD",
      editor: "Nintendo",
      genero: "Aventura",
      lanzamiento: "2023",
      multijugador: "No",
      clasificación: "E10+"
    },
    languages: [
      { lang: "Español (España)", interface: true, voices: false, subs: true },
      { lang: "Español (Latam)", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true },
      { lang: "Japonés", interface: true, voices: true, subs: true },
      { lang: "Francés (Francia)", interface: true, voices: true, subs: true },
      { lang: "Francés (Canadá)", interface: true, voices: true, subs: true },
      { lang: "Alemán", interface: true, voices: true, subs: true },
      { lang: "Italiano", interface: true, voices: true, subs: true },
      { lang: "Holandés", interface: true, voices: false, subs: true },
      { lang: "Ruso", interface: true, voices: false, subs: true },
      { lang: "Coreano", interface: true, voices: false, subs: true },
      { lang: "Chino simplificado", interface: true, voices: false, subs: true }
    ],
    reviews: [
      { id: 301, user: "Link_H", text: "Magistral.", score: 10 },
      { id: 302, user: "Zelda_Fan", text: "Pura libertad.", score: 9.5 }
    ]
  },
  {
    id: 14,
    title: "Death Stranding 2: On The Beach",
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2071&auto=format&fit=crop",
    globalScore: 9.4,
    platforms: ["PS5"],
    editions: [
      { id: 'std', name: 'Standard Edition', price: '$1,549.00', perks: [{ title: 'Juego Base', description: 'Historia completa.' }] }
    ],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,549.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 8.9, gráficos: 10, historia: 10 },
    description: "Hideo Kojima nos invita a un nuevo viaje.",
    about: "Sam Porter Bridges se embarca en un nuevo viaje para salvar a la humanidad.",
    specs: {
      desarrollador: "Kojima Productions",
      editor: "Sony",
      genero: "Acción",
      lanzamiento: "2025",
      multijugador: "Social Asíncrono",
      clasificación: "M (17+)"
    },
    languages: [
      { lang: "Español", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true },
      { lang: "Japonés", interface: true, voices: true, subs: true },
      { lang: "Francés", interface: true, voices: true, subs: true },
      { lang: "Alemán", interface: true, voices: true, subs: true },
      { lang: "Italiano", interface: true, voices: true, subs: true },
      { lang: "Portugués", interface: true, voices: true, subs: true },
      { lang: "Ruso", interface: true, voices: false, subs: true },
      { lang: "Coreano", interface: true, voices: false, subs: true },
      { lang: "Griego", interface: true, voices: false, subs: true }
    ],
    reviews: [
      { id: 1401, user: "Kojima_G", text: "Cine interactivo.", score: 10 },
      { id: 1402, user: "Porter", text: "Visualmente arrebatador.", score: 9.0 }
    ]
  },
  {
    id: 7,
    title: "Marvel's Spider-Man 2",
    image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=2080&auto=format&fit=crop",
    globalScore: 9.3,
    platforms: ["PS5"],
    editions: [
      { id: 'std', name: 'Standard Edition', price: '$1,549.00', perks: [{ title: 'Juego Base', description: 'Historia completa.' }] }
    ],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,549.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 9.5, gráficos: 9.8, historia: 9.0 },
    description: "Dos Spider-Men, una amenaza colosal.",
    about: "Explora la Nueva York de Marvel expandida como Peter Parker y Miles Morales.",
    specs: {
      desarrollador: "Insomniac Games",
      editor: "Sony",
      genero: "Acción",
      lanzamiento: "2023",
      multijugador: "No",
      clasificación: "T (Teen)"
    },
    languages: [
      { lang: "Español (Latam)", interface: true, voices: true, subs: true },
      { lang: "Español (España)", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true },
      { lang: "Francés", interface: true, voices: true, subs: true },
      { lang: "Alemán", interface: true, voices: true, subs: true },
      { lang: "Italiano", interface: true, voices: true, subs: true },
      { lang: "Portugués (Brasil)", interface: true, voices: true, subs: true },
      { lang: "Portugués (Portugal)", interface: true, voices: true, subs: true },
      { lang: "Polaco", interface: true, voices: true, subs: true },
      { lang: "Ruso", interface: true, voices: true, subs: true },
      { lang: "Árabe", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 701, user: "Spidey", text: "Espectacular.", score: 10 },
      { id: 702, user: "WebSlinger", text: "Combate fluido.", score: 9.5 }
    ]
  }
];
