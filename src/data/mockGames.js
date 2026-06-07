export const mockGames = [
  {
    id: 12,
    title: "Grand Theft Auto VI",
    image: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=2070&auto=format&fit=crop",
    globalScore: 10,
    platforms: ["PS5", "Xbox Series X"],
    editions: [
      { id: 'std', name: 'Standard Edition', price: '$1,899.00', perks: [{ title: 'Juego Base', description: 'Acceso completo a la historia de Lucía y Jason.' }, { title: 'Bono de Reserva', description: 'Pack de dinero digital para el modo historia.' }] },
      { id: 'dlx', name: 'Deluxe Edition', price: '$2,299.00', perks: [{ title: 'Juego Base', description: 'Acceso completo a la historia principal.' }, { title: 'Pack de Ropa Vice', description: 'Conjuntos exclusivos inspirados en los años 80.' }, { title: '500k GTA Online', description: 'Impulso económico inmediato para tu imperio criminal.' }] },
      { id: 'ult', name: 'Ultimate Edition', price: '$2,799.00', perks: [{ title: 'Todo lo anterior', description: 'Incluye beneficios de las ediciones Standard y Deluxe.' }, { title: 'Acceso anticipado', description: 'Juega 3 días antes del lanzamiento oficial.' }, { title: 'Pase de Temporada', description: 'Acceso a los primeros 3 DLCs de historia planeados.' }] }
    ],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,899.00", availability: "PS5" },
      { store: "Microsoft Store", price: "$1,899.00", availability: "Xbox Series X" }
    ],
    breakdown: { jugabilidad: 10, gráficos: 10, historia: 10 },
    description: "La culminación de una década de espera. GTA VI no es solo un juego; es el simulador definitivo de la vida moderna y el crimen organizado.",
    about: "Grand Theft Auto VI viaja al estado de Leonida, hogar de las calles bañadas en neón de Vice City y más allá, en la evolución más grande y envolvente de la serie hasta la fecha. Con una narrativa centrada en el dúo de Lucia y Jason, el juego promete un realismo nunca antes visto en un mundo abierto.",
    specs: { desarrollador: "Rockstar North", editor: "Rockstar Games", genero: "Acción / Mundo Abierto", lanzamiento: "2025/2026", multijugador: "Sí (GTA Online 2)", clasificación: "M (17+)" },
    languages: [
      { lang: "Español (Latam)", interface: true, voices: true, subs: true },
      { lang: "Español (España)", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true },
      { lang: "Francés", interface: true, voices: true, subs: true },
      { lang: "Alemán", interface: true, voices: true, subs: true },
      { lang: "Italiano", interface: true, voices: true, subs: true },
      { lang: "Portugués (Brasil)", interface: true, voices: true, subs: true },
      { lang: "Japonés", interface: true, voices: true, subs: true },
      { lang: "Coreano", interface: true, voices: false, subs: true },
      { lang: "Chino simplificado", interface: true, voices: false, subs: true },
      { lang: "Ruso", interface: true, voices: false, subs: true }
    ],
    reviews: [
      { id: 1201, user: "Rockstar_Loyalist_99", text: "¡EL REY HA VUELTO! No puedo creer el nivel de detalle en cada rincón. ¡Es simplemente perfecto!", score: 10 },
      { id: 1202, user: "JuanitoGamer_MX", text: "Me la paso horas solo manejando y escuchando la radio. La diversión es pura.", score: 9.5 }
    ]
  },
  {
    id: 5,
    title: "Baldur's Gate 3",
    image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=2084&auto=format&fit=crop",
    globalScore: 9.9,
    platforms: ["PC", "PS5", "Xbox Series X"],
    editions: [
      { id: 'std', name: 'Standard Edition', price: '$1,299.00', perks: [{ title: 'Juego Base', description: 'La experiencia completa de Baldur\'s Gate 3.' }] },
      { id: 'dlx', name: 'Digital Deluxe', price: '$1,499.00', perks: [{ title: 'Pack de canciones', description: 'Nuevas melodías de bardo.' }, { title: 'Pinturas de Rivellon', description: 'Arte exclusivo.' }, { title: 'Bolsa de aventurero', description: 'Suministros de inicio.' }] }
    ],
    marketPrices: [
      { store: "Steam", price: "$1,299.00", availability: "PC" },
      { store: "PlayStation Store", price: "$1,449.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 10, gráficos: 9.4, historia: 10 },
    description: "Una obra maestra sin precedentes en el género del RPG. Libertad absoluta hecha código.",
    about: "Baldur's Gate 3 es un RPG de nueva generación, ambientado en el mundo de Dungeons & Dragons. Reúne a tu grupo y regresa a los Reinos Olvidados en una historia de compañerismo y traición.",
    specs: { desarrollador: "Larian Studios", editor: "Larian Studios", genero: "RPG / Estrategia", lanzamiento: "2023", multijugador: "Cooperativo Online/Local", clasificación: "M (17+)" },
    languages: [
      { lang: "Español", interface: true, voices: false, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true },
      { lang: "Francés", interface: true, voices: true, subs: true },
      { lang: "Alemán", interface: true, voices: true, subs: true },
      { lang: "Italiano", interface: true, voices: false, subs: true },
      { lang: "Ruso", interface: true, voices: false, subs: true },
      { lang: "Chino", interface: true, voices: false, subs: true }
    ],
    reviews: [
      { id: 501, user: "D&D_Master_Ultra", text: "La profundidad de las mecánicas es abrumadora. Respeta la inteligencia del jugador.", score: 10 },
      { id: 502, user: "RTX_3090_Sweat", text: "La historia es de 10, pero necesita optimización en el Acto 3.", score: 8.5 }
    ]
  },
  {
    id: 21,
    title: "Black Myth: Wukong",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.4,
    platforms: ["PC", "PS5"],
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,299.00', perks: [{ title: 'Juego Base', description: 'La leyenda de Wukong.' }] },
      { id: 'dlx', name: 'Deluxe Edition', price: '$1,599.00', perks: [{ title: 'Banda Sonora', description: 'Música épica digital.' }, { title: 'Armadura de Bronce', description: 'Set cosmético exclusivo.' }] }
    ],
    marketPrices: [
      { store: "Steam", price: "$1,299.00", availability: "PC" },
      { store: "PlayStation Store", price: "$1,299.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 9.5, gráficos: 10, historia: 8.8 },
    description: "Una oda visual a la mitología china con un combate frenético.",
    about: "Explora la mitología china como el Predestinado en este action RPG basado en 'Viaje al Oeste'.",
    specs: { desarrollador: "Game Science", editor: "Game Science", genero: "Action RPG", lanzamiento: "2024", multijugador: "No", clasificación: "M (17+)" },
    languages: [
      { lang: "Español", interface: true, voices: false, subs: true },
      { lang: "Chino", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 2101, user: "MythHunter", text: "Visualmente imbatible. El combate es satisfactorio.", score: 10 },
      { id: 2102, user: "Casual_Gamer", text: "Muy difícil para mí, pero es hermoso.", score: 8.0 }
    ]
  },
  {
    id: 1,
    title: "Elden Ring: Shadow of the Erdtree",
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2071&auto=format&fit=crop",
    globalScore: 9.8,
    platforms: ["PC", "PS5", "Xbox Series X"],
    editions: [
      { id: 'std', name: 'Expansion', price: '$859.00', perks: [{ title: 'Shadow of the Erdtree', description: 'La mayor expansión de FromSoft.' }] },
      { id: 'pre', name: 'Premium Bundle', price: '$1,099.00', perks: [{ title: 'Expansión', description: ' Shadow of the Erdtree.' }, { title: 'Libro de arte', description: 'Arte conceptual digital.' }] }
    ],
    marketPrices: [
      { store: "Steam", price: "$859.00", availability: "PC" },
      { store: "PlayStation Store", price: "$999.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 10, gráficos: 9.5, historia: 9.8 },
    description: "Shadow of the Erdtree no es una expansión, es un monumento al diseño de niveles.",
    about: "Explora la Tierra de las Sombras y descubre los secretos de Miquella en esta expansión masiva.",
    specs: { desarrollador: "FromSoftware", editor: "Bandai Namco", genero: "Action RPG / Soulslike", lanzamiento: "2024", multijugador: "Sí", clasificación: "M (17+)" },
    languages: [
      { lang: "Español", interface: true, voices: false, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true },
      { lang: "Japonés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 101, user: "SoulsBorne_Stan", text: "Insuperable. Miyazaki es un genio.", score: 10 },
      { id: 102, user: "PC_Master_Race", text: "Stuttering ocasional pero la dirección de arte es de 10.", score: 9.0 }
    ]
  },
  {
    id: 23,
    title: "Silent Hill 2 Remake",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2069&auto=format&fit=crop",
    globalScore: 9.5,
    platforms: ["PC", "PS5"],
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,149.00', perks: [{ title: 'Juego Base', description: 'Regresa a Silent Hill.' }] },
      { id: 'dlx', name: 'Deluxe', price: '$1,399.00', perks: [{ title: 'Máscara de Pyramid Head', description: 'Cosmético exclusivo.' }, { title: 'Libro de arte', description: 'Diseños de monstruos.' }] }
    ],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,149.00", availability: "PS5" },
      { store: "Steam", price: "$1,149.00", availability: "PC" }
    ],
    breakdown: { jugabilidad: 9.2, gráficos: 9.8, historia: 10 },
    description: "Una pesadilla hermosa que respeta el legado original de terror psicológico.",
    about: "James Sunderland regresa al pueblo donde todo empezó tras recibir una carta de su difunta esposa.",
    specs: { desarrollador: "Bloober Team", editor: "Konami", genero: "Horror", lanzamiento: "2024", multijugador: "No", clasificación: "M (17+)" },
    languages: [
      { lang: "Español", interface: true, voices: false, subs: true },
      { lang: "Japonés", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 2301, user: "JamesS_Fan", text: "Atmósfera increíble. Han logrado capturar la melancolía del original.", score: 10 },
      { id: 2302, user: "Horror_Lover", text: "Me dio miedo de verdad. Los gráficos son de otro mundo.", score: 9.5 }
    ]
  },
  {
    id: 11,
    title: "Hades II",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.7,
    platforms: ["PC"],
    editions: [
      { id: 'std', name: 'Early Access', price: '$549.00', perks: [{ title: 'Game Access', description: 'Acceso inmediato al desarrollo.' }] }
    ],
    marketPrices: [
      { store: "Steam", price: "$549.00", availability: "PC" },
      { store: "Epic Games", price: "$549.00", availability: "PC" }
    ],
    breakdown: { jugabilidad: 10, gráficos: 9.8, historia: 9.5 },
    description: "Melinoë toma la antorcha en esta secuela divina que perfecciona la fórmula.",
    about: "Lucha más allá del Inframundo usando magia negra para enfrentarte al Titán del Tiempo en esta secuela roguelike.",
    specs: { desarrollador: "Supergiant Games", editor: "Supergiant Games", genero: "Roguelike", lanzamiento: "2024", multijugador: "No", clasificación: "T (Teen)" },
    languages: [
      { lang: "Español", interface: true, voices: false, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 1101, user: "ZagreusFan", text: "Mejor que el primero. La música y el arte son 10/10.", score: 10 },
      { id: 1102, user: "Indie_Enthusiast", text: "No puedo dejar de jugar. Una partida más es mentira.", score: 9.5 }
    ]
  },
  {
    id: 24,
    title: "Metaphor: ReFantazio",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.7,
    platforms: ["PC", "PS5", "Xbox Series X"],
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,299.00', perks: [{ title: 'Juego Base', description: 'Reclama el trono.' }] }
    ],
    marketPrices: [
      { store: "Microsoft Store", price: "$1,299.00", availability: "Xbox" },
      { store: "PlayStation Store", price: "$1,299.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 10, gráficos: 9.5, historia: 10 },
    description: "De los creadores de Persona, un nuevo estándar para el JRPG moderno.",
    about: "Participa en un torneo real en un mundo de fantasía lleno de intriga política y magia.",
    specs: { desarrollador: "Studio Zero", editor: "Atlus", genero: "JRPG", lanzamiento: "2024", multijugador: "No", clasificación: "T (Teen)" },
    languages: [
      { lang: "Español", interface: true, voices: false, subs: true },
      { lang: "Japonés", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 2401, user: "AtlusFan_88", text: "La interfaz es arte puro. La historia me tiene enganchado.", score: 10 },
      { id: 2402, user: "RPG_Pro", text: "Sistema de combate por turnos perfecto. Muy innovador.", score: 9.5 }
    ]
  },
  {
    id: 15,
    title: "The Witcher 4: Polaris",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.8,
    platforms: ["PC", "PS5", "Xbox Series X"],
    editions: [
      { id: 'std', name: 'Standard Edition', price: '$1,399.00', perks: [{ title: 'Juego Base', description: 'Nueva saga del brujo.' }] },
      { id: 'ult', name: 'Ursine Edition', price: '$1,999.00', perks: [{ title: 'Expansión 1', description: 'Pase para el primer DLC.' }, { title: 'Armadura Real', description: 'Set cosmético exclusivo.' }] }
    ],
    marketPrices: [
      { store: "Steam", price: "$1,499.00", availability: "PC" },
      { store: "Epic Games", price: "$1,499.00", availability: "PC" }
    ],
    breakdown: { jugabilidad: 9.6, gráficos: 9.8, historia: 10 },
    description: "El inicio de una nueva era para los brujos en Unreal Engine 5.",
    about: "Polaris inicia una nueva trilogía épica de fantasía oscura de la mano de CD PROJEKT RED.",
    specs: { desarrollador: "CD Projekt RED", editor: "CD Projekt RED", genero: "RPG de Acción", lanzamiento: "2026", multijugador: "No", clasificación: "M (17+)" },
    languages: [
      { lang: "Español", interface: true, voices: true, subs: true },
      { lang: "Polaco", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 1501, user: "Geralt_Forever", text: "Pura magia. Unreal Engine 5 se ve increíble.", score: 10 },
      { id: 1502, user: "PC_Master_Ex", text: "Exigente pero vale la pena cada frame.", score: 9.5 }
    ]
  },
  {
    id: 26,
    title: "Astro Bot",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.8,
    platforms: ["PS5"],
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,399.00', perks: [{ title: 'Juego Base', description: 'Aventura masiva de plataformas.' }] }
    ],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,399.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 10, gráficos: 9.6, historia: 8.5 },
    description: "Pura magia de plataformas que celebra el legado de PlayStation.",
    about: "Acompaña a Astro en una aventura masiva a través de galaxias mecánicas llenas de nostalgia.",
    specs: { desarrollador: "Team Asobi", editor: "Sony", genero: "Plataformas", lanzamiento: "2024", multijugador: "No", clasificación: "E (Everyone)" },
    languages: [
      { lang: "Español (Latam)", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 2601, user: "AstroFan_PS", text: "El mejor plataformas en años. Uso increíble del DualSense.", score: 10 },
      { id: 2602, user: "Casual_G", text: "Súper divertido para toda la familia.", score: 9.5 }
    ]
  },
  {
    id: 27,
    title: "Monster Hunter Wilds",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2069&auto=format&fit=crop",
    globalScore: 9.6,
    platforms: ["PC", "PS5", "Xbox Series X"],
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,549.00', perks: [{ title: 'Juego Base', description: 'Caza en Tierras Prohibidas.' }] }
    ],
    marketPrices: [
      { store: "Steam", price: "$1,549.00", availability: "PC" },
      { store: "PlayStation Store", price: "$1,549.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 9.8, gráficos: 9.7, historia: 8.2 },
    description: "La evolución definitiva de la cacería de monstruos en ecosistemas dinámicos.",
    about: "Explora ecosistemas vivos y caza bestias imponentes con amigos en este mundo abierto táctico.",
    specs: { desarrollador: "Capcom", editor: "Capcom", genero: "Acción", lanzamiento: "2025", multijugador: "Sí (Online)", clasificación: "T (Teen)" },
    languages: [
      { lang: "Español", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 2701, user: "HunterX_Elite", text: "La escala de los monstruos es inmensa. ¡Brutal!", score: 10 },
      { id: 2702, user: "PC_Gamer_T", text: "Muy bien optimizado para el lanzamiento.", score: 9.0 }
    ]
  },
  {
    id: 28,
    title: "Metroid Prime 4: Beyond",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.7,
    platforms: ["Switch"],
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,399.00', perks: [{ title: 'Juego Base', description: 'Samus Aran regresa.' }] }
    ],
    marketPrices: [
      { store: "Nintendo eShop", price: "$1,399.00", availability: "Switch" }
    ],
    breakdown: { jugabilidad: 10, gráficos: 9.4, historia: 9.0 },
    description: "El regreso triunfal de Samus Aran en una odisea en primera persona.",
    about: "Explora nuevos mundos alienígenas y enfrenta amenazas cósmicas desconocidas en Nintendo Switch.",
    specs: { desarrollador: "Retro Studios", editor: "Nintendo", genero: "Aventura / FPS", lanzamiento: "2025", multijugador: "No", clasificación: "T (Teen)" },
    languages: [
      { lang: "Español", interface: true, voices: false, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 2801, user: "SamusStan_99", text: "Valió la pena la espera de años. Inmersión total.", score: 10 },
      { id: 2802, user: "Nintendo_Fan", text: "Gráficamente lo mejor de la Switch.", score: 9.5 }
    ]
  },
  {
    id: 29,
    title: "DOOM: The Dark Ages",
    image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=2084&auto=format&fit=crop",
    globalScore: 9.5,
    platforms: ["PC", "PS5", "Xbox Series X"],
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,399.00', perks: [{ title: 'Juego Base', description: 'Destrucción medieval masiva.' }] }
    ],
    marketPrices: [
      { store: "Steam", price: "$1,399.00", availability: "PC" },
      { store: "Microsoft Store", price: "$1,399.00", availability: "Xbox" }
    ],
    breakdown: { jugabilidad: 10, gráficos: 9.6, historia: 8.0 },
    description: "El Slayer viaja al pasado en una guerra brutal de ambientación oscura.",
    about: "Descubre el origen del Slayer en este shooter frenético de inspiración medieval y gore.",
    specs: { desarrollador: "id Software", editor: "Bethesda", genero: "Shooter", lanzamiento: "2025", multijugador: "No", clasificación: "M (17+)" },
    languages: [
      { lang: "Español (Latam)", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 2901, user: "RipAndTear_Master", text: "Brutalidad medieval pura. La música es pesadísima.", score: 10 },
      { id: 2902, user: "FPS_Addict", text: "El gameplay más pulido del género.", score: 9.5 }
    ]
  },
  {
    id: 31,
    title: "Fable (2025)",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2069&auto=format&fit=crop",
    globalScore: 9.1,
    platforms: ["PC", "Xbox Series X"],
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,399.00', perks: [{ title: 'Juego Base', description: 'Regresa a Albion.' }] }
    ],
    marketPrices: [
      { store: "Microsoft Store", price: "$1,399.00", availability: "Xbox" }
    ],
    breakdown: { jugabilidad: 9.0, gráficos: 9.8, historia: 9.2 },
    description: "El regreso del cuento de hadas retorcido de Albion con humor y magia.",
    about: "Sé el héroe (o villano) que elijas en este RPG de mundo abierto renovado con tecnología de punta.",
    specs: { desarrollador: "Playground Games", editor: "Xbox Game Studios", genero: "RPG", lanzamiento: "2025", multijugador: "No", clasificación: "M (17+)" },
    languages: [
      { lang: "Español (Latam)", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 3101, user: "AlbionHero_Prime", text: "Visualmente es un sueño. El humor sigue intacto.", score: 10 },
      { id: 3102, user: "Casual_A", text: "Muy accesible y divertido.", score: 9.0 }
    ]
  },
  {
    id: 33,
    title: "Borderlands 4",
    image: "https://images.unsplash.com/photo-1605898960710-90da34597473?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.2,
    platforms: ["PC", "PS5", "Xbox Series X"],
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,399.00', perks: [{ title: 'Juego Base', description: 'Looteo infinito.' }] }
    ],
    marketPrices: [
      { store: "Steam", price: "$1,399.00", availability: "PC" }
    ],
    breakdown: { jugabilidad: 9.8, gráficos: 9.0, historia: 8.5 },
    description: "El looter-shooter definitivo regresa con billones de armas nuevas.",
    about: "Busca tesoros en nuevos planetas peligrosos con amigos en este shooter cooperativo explosivo.",
    specs: { desarrollador: "Gearbox Software", editor: "2K", genero: "Shooter", lanzamiento: "2025", multijugador: "Sí (Coop)", clasificación: "M (17+)" },
    languages: [
      { lang: "Español (Latam)", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 3301, user: "VaultHunter_X", text: "¡Millones de armas! El cooperativo es lo mejor.", score: 10 },
      { id: 3302, user: "Loot_Goblin", text: "Adictivo como siempre.", score: 9.0 }
    ]
  },
  {
    id: 35,
    title: "Gears of War: E-Day",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1957&auto=format&fit=crop",
    globalScore: 9.6,
    platforms: ["PC", "Xbox Series X"],
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,399.00', perks: [{ title: 'Juego Base', description: 'El origen del horror.' }] }
    ],
    marketPrices: [
      { store: "Microsoft Store", price: "$1,399.00", availability: "Xbox" }
    ],
    breakdown: { jugabilidad: 10, gráficos: 10, historia: 9.5 },
    description: "Vuelve al origen del horror en el Día de la Emergencia con Marcus Fenix.",
    about: "Marcus Fenix y Dominic Santiago enfrentan el inicio de la guerra Locust en esta precuela oscura.",
    specs: { desarrollador: "The Coalition", editor: "Xbox Game Studios", genero: "Shooter", lanzamiento: "2025/2026", multijugador: "Sí (Coop)", clasificación: "M (17+)" },
    languages: [
      { lang: "Español (Latam)", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 3501, user: "MarcusF_Fan", text: "El hype es real. Se ve aterrador y brutal.", score: 10 },
      { id: 3502, user: "Gears_Vet", text: "El regreso que necesitábamos.", score: 9.5 }
    ]
  },
  {
    id: 40,
    title: "Death Stranding 2: On The Beach",
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2071&auto=format&fit=crop",
    globalScore: 9.4,
    platforms: ["PS5"],
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,549.00', perks: [{ title: 'Juego Base', description: 'Conecta de nuevo.' }] },
      { id: 'dlx', name: 'Digital Deluxe', price: '$1,849.00', perks: [{ title: 'Trajes Dorados', description: 'Lujo estético.' }, { title: 'Gafas de sol', description: 'Cosmético in-game.' }] }
    ],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,549.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 8.9, gráficos: 10, historia: 10 },
    description: "Hideo Kojima nos invita a un nuevo viaje cinematográfico y emocional.",
    about: "Sam Porter Bridges se embarca en un nuevo viaje para salvar a la humanidad de la extinción definitiva.",
    specs: { desarrollador: "Kojima Productions", editor: "Sony", genero: "Acción / Exploración", lanzamiento: "2025", multijugador: "Sí", clasificación: "M (17+)" },
    languages: [
      { lang: "Español", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 4001, user: "KojimaG_Stan", text: "Arte puro. Una experiencia que solo él puede crear.", score: 10 },
      { id: 4002, user: "Porter_Prime", text: "Lento pero fascinante.", score: 9.0 }
    ]
  },
  {
    id: 9,
    title: "Resident Evil 4 Remake",
    image: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.5,
    platforms: ["PC", "PS5", "Xbox Series X"],
    editions: [
      { id: 'std', name: 'Estándar', price: '$799.00', perks: [{ title: 'Juego Base', description: 'Misión completa.' }] },
      { id: 'dlx', name: 'Deluxe', price: '$1,149.00', perks: [{ title: 'Pack de Trajes', description: 'Sets exclusivos.' }, { title: 'Armas Deluxe', description: 'Sentinel Nine.' }] }
    ],
    marketPrices: [
      { store: "Steam", price: "$799.00", availability: "PC" },
      { store: "PlayStation Store", price: "$1,149.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 9.8, gráficos: 9.6, historia: 9.0 },
    description: "Capcom entrega el mejor remake de la historia con una acción terrorífica.",
    about: "Leon S. Kennedy rescata a la hija del presidente en una aldea maldita plagada de horrores.",
    specs: { desarrollador: "Capcom", editor: "Capcom", genero: "Survival Horror", lanzamiento: "2023", multijugador: "No", clasificación: "M (17+)" },
    languages: [
      { lang: "Español", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true },
      { lang: "Japonés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 901, user: "LeonV_Pro", text: "Perfecto. Han mejorado cada segundo del original.", score: 10 },
      { id: 902, user: "Resident_Fan", text: "El GOTY de su año.", score: 9.5 }
    ]
  },
  {
    id: 3,
    title: "The Legend of Zelda: Tears of the Kingdom",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.6,
    platforms: ["Switch"],
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,399.00', perks: [{ title: 'Juego Base', description: 'Hyrule completo.' }] }
    ],
    marketPrices: [
      { store: "Nintendo eShop", price: "$1,399.00", availability: "Switch" }
    ],
    breakdown: { jugabilidad: 10, gráficos: 8.5, historia: 9.0 },
    description: "La ingeniería hecha videojuego en una aventura sin límites.",
    about: "Decidirás tu propio camino a través de los cielos y tierras de Hyrule con nuevas mecánicas de construcción.",
    specs: { desarrollador: "Nintendo EPD", editor: "Nintendo", genero: "Aventura", lanzamiento: "2023", multijugador: "No", clasificación: "E10+" },
    languages: [
      { lang: "Español (Latam)", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true },
      { lang: "Japonés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 301, user: "LinkH_Hero", text: "Libertad total. Las construcciones son infinitas.", score: 10 },
      { id: 302, user: "Hylian_Guard", text: "El mejor juego de la historia de Nintendo.", score: 9.5 }
    ]
  },
  {
    id: 7,
    title: "Marvel's Spider-Man 2",
    image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=2080&auto=format&fit=crop",
    globalScore: 9.3,
    platforms: ["PS5"],
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,549.00', perks: [{ title: 'Juego Base', description: 'Doble de héroes.' }] }
    ],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,549.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 9.5, gráficos: 9.8, historia: 9.0 },
    description: "La aventura definitiva del trepamuros con Peter Parker y Miles Morales.",
    about: "Explora una Nueva York expandida y enfréntate al poder de Venom y Kraven.",
    specs: { desarrollador: "Insomniac Games", editor: "Sony", genero: "Acción", lanzamiento: "2023", multijugador: "No", clasificación: "T (Teen)" },
    languages: [
      { lang: "Español (Latam)", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 701, user: "Spidey_Fan_2026", text: "Espectacular. El balanceo nunca se sintió tan bien.", score: 10 },
      { id: 702, user: "WebSlinger_PS", text: "Combate fluido y emocionante.", score: 9.5 }
    ]
  },
  {
    id: 8,
    title: "Cyberpunk 2077: Ultimate Edition",
    image: "https://images.unsplash.com/photo-1605898960710-90da34597473?q=80&w=2070&auto=format&fit=crop",
    globalScore: 9.2,
    platforms: ["PC", "PS5", "Xbox Series X"],
    editions: [
      { id: 'ult', name: 'Ultimate Edition', price: '$1,299.00', perks: [{ title: 'Phantom Liberty', description: 'Expansión de espionaje.' }, { title: 'Juego Base', description: 'Actualización 2.0.' }] }
    ],
    marketPrices: [
      { store: "Steam", price: "$1,299.00", availability: "PC" },
      { store: "Microsoft Store", price: "$1,299.00", availability: "Xbox" }
    ],
    breakdown: { jugabilidad: 9.0, gráficos: 10, historia: 9.5 },
    description: "La redención total de Night City en una experiencia distópica inigualable.",
    about: "Conviértete en V, un mercenario urbano, y sobrevive a las intrigas de la ciudad del futuro.",
    specs: { desarrollador: "CD Projekt RED", editor: "CD Projekt RED", genero: "RPG de Acción", lanzamiento: "2023", multijugador: "No", clasificación: "M (17+)" },
    languages: [
      { lang: "Español", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 801, user: "Choomba_V", text: "Lo lograron. Es el juego que siempre debió ser.", score: 10 },
      { id: 802, user: "Neon_Ghost", text: "Night City es el mejor mapa jamás creado.", score: 9.0 }
    ]
  },
  {
    id: 6,
    title: "Alan Wake 2",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1957&auto=format&fit=crop",
    globalScore: 8.9,
    platforms: ["PC", "PS5", "Xbox Series X"],
    editions: [
      { id: 'std', name: 'Estándar', price: '$949.00', perks: [{ title: 'Juego Base', description: 'Investiga la oscuridad.' }] }
    ],
    marketPrices: [
      { store: "Epic Games", price: "$949.00", availability: "PC" },
      { store: "PlayStation Store", price: "$1,149.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 8.5, gráficos: 10, historia: 9.2 },
    description: "Una pesadilla lúcida donde la realidad y la ficción se entrelazan de forma aterradora.",
    about: "Atrapado en una dimensión alternativa, Alan intenta escapar escribiendo su propio destino.",
    specs: { desarrollador: "Remedy Entertainment", editor: "Epic Games", genero: "Survival Horror / Misterio", lanzamiento: "2023", multijugador: "No", clasificación: "M (17+)" },
    languages: [
      { lang: "Español", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 601, user: "Remedy_Scholar", text: "¡Arte! Una narrativa compleja y fascinante.", score: 9.5 },
      { id: 602, user: "Dark_Place_Fan", text: "Visualmente es lo más avanzado hoy.", score: 8.0 }
    ]
  }
];
