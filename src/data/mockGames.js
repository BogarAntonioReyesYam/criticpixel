export const mockGames = [
  {
    id: 12,
    title: "Grand Theft Auto VI",
    image: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=2070&auto=format&fit=crop",
    globalScore: 10,
    platforms: ["PS5", "Xbox Series X"],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,799.00", availability: "PS5" },
      { store: "Microsoft Store", price: "$1,799.00", availability: "Xbox" }
    ],
    breakdown: {
      jugabilidad: 10,
      gráficos: 10,
      historia: 10
    },
    description: "Grand Theft Auto VI viaja al estado de Leonida, hogar de las calles bañadas en neón de Vice City y más allá, en la evolución más grande y envolvente de la serie Grand Theft Auto hasta la fecha.",
    reviews: [
      { id: 1201, user: "ViceCityKing", text: "La espera de 12 años valió la pena. El nivel de detalle es absurdo.", score: 10 },
      { id: 1202, user: "RockstarFan", text: "Simplemente el juego más ambicioso de la historia. Insuperable.", score: 10 }
    ]
  },
  {
    id: 13,
    title: "Ghost of Yotei",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2069&auto=format&fit=crop",
    globalScore: 9.6,
    platforms: ["PS5"],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,549.00", availability: "PS5" }
    ],
    breakdown: {
      jugabilidad: 9.7,
      gráficos: 10,
      historia: 9.2
    },
    description: "En 1603, una nueva Ghost, Atsu, emprende un viaje por las tierras que rodean el monte Yotei, una zona llena de extensas praderas, tundras nevadas y peligros inesperados.",
    reviews: [
      { id: 1301, user: "RoninAtsu", text: "Visualmente es lo más hermoso que he visto en PS5. El sistema de combate ha evolucionado genial.", score: 9.5 },
      { id: 1302, user: "TsushimaLover", text: "Una secuela espiritual que se siente fresca y familiar a la vez.", score: 9.8 }
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
    breakdown: {
      jugabilidad: 8.9,
      gráficos: 10,
      historia: 10
    },
    description: "Embárcate en una misión inspiradora de conexión humana más allá de las UCA. Sam y sus compañeros inician un nuevo viaje para salvar a la humanidad de la extinción.",
    reviews: [
      { id: 1401, user: "KojimaGenius", text: "Nadie hace juegos como Hideo. Es una experiencia cinematográfica sin igual.", score: 10 },
      { id: 1402, user: "PorterEx", text: "Más extraño y más bello que el primero. Una obra de arte.", score: 9 }
    ]
  },
  {
    id: 15,
    title: "The Witcher 4: Polaris",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.8,
    platforms: ["PC", "PS5", "Xbox Series X"],
    marketPrices: [
      { store: "Steam", price: "$1,399.00", availability: "PC" },
      { store: "Epic Games", price: "$1,399.00", availability: "PC" },
      { store: "PlayStation Store", price: "$1,549.00", availability: "PS5" },
      { store: "Microsoft Store", price: "$1,549.00", availability: "Xbox" }
    ],
    breakdown: {
      jugabilidad: 9.6,
      gráficos: 9.8,
      historia: 10
    },
    description: "Una nueva saga comienza. Explora un mundo vasto y peligroso en el inicio de una nueva trilogía épica de RPG de CD PROJEKT RED.",
    reviews: [
      { id: 1501, user: "WitcherLegacy", text: "El salto al Unreal Engine 5 se nota. La narrativa sigue siendo la mejor de la industria.", score: 10 },
      { id: 1502, user: "GeraltFan", text: "Aunque extrañamos a Geralt, el nuevo protagonista y la escuela del lince son fascinantes.", score: 9.5 }
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
    breakdown: {
      jugabilidad: 9.5,
      gráficos: 9.8,
      historia: 9.0
    },
    description: "Los Spider-Men Peter Parker y Miles Morales regresan para una nueva y emocionante aventura en la aclamada franquicia de Marvel's Spider-Man para PS5.",
    reviews: [
      { id: 701, user: "WebSlinger", text: "El balanceo por la ciudad nunca se sintió tan bien. La historia de Venom es increíble.", score: 9.5 },
      { id: 702, user: "SpideyFan", text: "Gráficos de infarto y una jugabilidad muy pulida. Imprescindible.", score: 9 }
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
      { store: "Epic Games", price: "$1,299.00", availability: "PC" },
      { store: "PlayStation Store", price: "$1,299.00", availability: "PS5" },
      { store: "Microsoft Store", price: "$1,299.00", availability: "Xbox" }
    ],
    breakdown: {
      jugabilidad: 9.0,
      gráficos: 10,
      historia: 9.5
    },
    description: "Cyberpunk 2077 es un RPG de acción y aventura en mundo abierto ambientado en Night City, una megalópolis obsesionada con el poder, el glamour y la modificación corporal.",
    reviews: [
      { id: 801, user: "NightCityGhost", text: "Después de las actualizaciones, es el juego que siempre prometieron. Increíble.", score: 9.5 },
      { id: 802, user: "SilverhandFan", text: "La expansión Phantom Liberty es de lo mejor que he jugado.", score: 10 }
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
      { store: "PlayStation Store", price: "$1,149.00", availability: "PS5" },
      { store: "Microsoft Store", price: "$1,149.00", availability: "Xbox" }
    ],
    breakdown: {
      jugabilidad: 9.8,
      gráficos: 9.6,
      historia: 9.0
    },
    description: "Resident Evil 4 es un remake del Resident Evil 4 original de 2005. Conserva la esencia del juego original, a la vez que introduce una jugabilidad modernizada.",
    reviews: [
      { id: 901, user: "LeonS", text: "El mejor remake que se ha hecho jamás. Acción pura y tensión.", score: 10 },
      { id: 902, user: "Survivor99", text: "Han mejorado cada aspecto del original. Una joya.", score: 9.5 }
    ]
  },
  {
    id: 10,
    title: "Forza Horizon 5",
    image: "https://images.unsplash.com/photo-1614294149010-950b698f72c0?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.1,
    platforms: ["PC", "Xbox Series X", "Xbox One"],
    marketPrices: [
      { store: "Steam", price: "$1,199.00", availability: "PC" },
      { store: "Microsoft Store", price: "$1,199.00", availability: "PC / Xbox" }
    ],
    breakdown: {
      jugabilidad: 9.5,
      gráficos: 10,
      historia: 7.0
    },
    description: "Tu aventura Horizon definitiva te espera! Explora los vibrantes paisajes de mundo abierto de México en constante evolución con una acción de conducción ilimitada.",
    reviews: [
      { id: 1001, user: "SpeedDemon", text: "Gráficamente es lo mejor que existe en conducción. México se ve increíble.", score: 10 },
      { id: 1002, user: "CarLover", text: "Divertido, enorme y con cientos de coches. Un paraíso.", score: 9 }
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
    breakdown: {
      jugabilidad: 10,
      gráficos: 9.8,
      historia: 9.5
    },
    description: "La primera secuela de Supergiant Games se basa en los mejores aspectos del roguelike original de mazmorras en una experiencia totalmente nueva y llena de acción.",
    reviews: [
      { id: 1101, user: "ZagreusBro", text: "Si el primero era perfecto, este lo supera. Melinoë es genial.", score: 10 },
      { id: 1102, user: "RogueLover", text: "El sistema de combate y la dirección de arte son de otro mundo.", score: 9.5 }
    ]
  }
];
