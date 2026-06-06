export const mockGames = [
  {
    id: 1,
    title: "Elden Ring: Shadow of the Erdtree",
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2071&auto=format&fit=crop",
    globalScore: 9.8,
    platforms: ["PC", "PS5", "Xbox Series X"],
    marketPrices: [
      { store: "Steam", price: "$859.00", availability: "PC" },
      { store: "Epic Games", price: "$859.00", availability: "PC" },
      { store: "Microsoft Store", price: "$859.00", availability: "PC / Xbox" }
    ],
    breakdown: {
      jugabilidad: 10,
      gráficos: 9.5,
      historia: 9.8
    },
    description: "La muy esperada expansión para el galardonado RPG de acción Elden Ring. Viaja a la Tierra de las Sombras y descubre los misterios de Miquella.",
    reviews: [
      { id: 101, user: "TarnishedOne", text: "Obra maestra. La dificultad está perfectamente equilibrada con las nuevas armas.", score: 10 },
      { id: 102, user: "SoulsFan", text: "Diseño de mundo increíble, aunque algunos jefes están un poco rotos.", score: 9 }
    ]
  },
  {
    id: 3,
    title: "The Legend of Zelda: Tears of the Kingdom",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.6,
    platforms: ["Switch"],
    marketPrices: [
      { store: "Nintendo eShop", price: "$1,399.00", availability: "Switch" }
    ],
    breakdown: {
      jugabilidad: 10,
      gráficos: 8.5,
      historia: 9.0
    },
    description: "La épica secuela de Breath of the Wild. Explora la tierra, los cielos y las profundidades de Hyrule con nuevas habilidades de construcción.",
    reviews: [
      { id: 301, user: "LinkHero", text: "Las mecánicas de construcción son revolucionarias para los juegos de mundo abierto.", score: 10 },
      { id: 302, user: "HylianGuard", text: "El rendimiento puede caer, pero la jugabilidad es simplemente demasiado buena.", score: 9 }
    ]
  },
  {
    id: 4,
    title: "God of War Ragnarök",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.4,
    platforms: ["PS4", "PS5"],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,549.00", availability: "PS5" },
      { store: "Steam", price: "$1,149.00", availability: "PC" }
    ],
    breakdown: {
      jugabilidad: 9.2,
      gráficos: 9.8,
      historia: 9.6
    },
    description: "Kratos y Atreus deben viajar a cada uno de los Nueve Reinos en busca de respuestas mientras se acerca el Fimbulwinter.",
    reviews: [
      { id: 401, user: "KratosDad", text: "Un viaje emocional que mejora al original en todos los aspectos.", score: 9.5 },
      { id: 402, user: "MimirHead", text: "El combate es contundente y la actuación de voz es estelar.", score: 9 }
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
      { store: "Microsoft Store", price: "$1,399.00", availability: "Xbox" }
    ],
    breakdown: {
      jugabilidad: 10,
      gráficos: 9.4,
      historia: 10
    },
    description: "Reúne a tu grupo y regresa a los Reinos Olvidados en una historia de compañerismo y traición, sacrificio y supervivencia, y la atracción del poder absoluto.",
    reviews: [
      { id: 501, user: "DiceRoller", text: "Libertad de jugador sin precedentes. El mejor RPG en una década.", score: 10 },
      { id: 502, user: "D&DFan", text: "Tantas opciones, tantas consecuencias. Simplemente brillante.", score: 9.8 }
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
      { store: "PlayStation Store", price: "$1,149.00", availability: "PS5" },
      { store: "Microsoft Store", price: "$1,149.00", availability: "Xbox" }
    ],
    breakdown: {
      jugabilidad: 8.5,
      gráficos: 10,
      historia: 9.2
    },
    description: "Una serie de asesinatos rituales amenaza Bright Falls, una comunidad en el noroeste del Pacífico. Saga Anderson y Alan Wake deben encontrar una salida.",
    reviews: [
      { id: 601, user: "DarkPlace", text: "Una obra maestra visual con una historia que te volará la cabeza.", score: 9 },
      { id: 602, user: "RemedyFan", text: "A fuego lento pero vale muchísimo la pena al final.", score: 8.5 }
    ]
  }
];
