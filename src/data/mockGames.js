export const mockGames = [
  {
    id: 12,
    title: "Grand Theft Auto VI",
    image: "https://www.igrandtheftauto.com/content/images/large/gta-vi-key-3840x2160.jpg",
    globalScore: 10,
    trailer: "QdBZY2fkU-0",
    platforms: ["PS5", "Xbox Series X"],
    price: 1499,
    releaseDate: "2026-11-19",
    genre: "Mundo Abierto",
    editions: [
      { id: 'std', name: 'Standard Edition', price: '$1,499.00', perks: [{ title: 'Juego Base', description: 'Acceso completo a la historia de Lucía y Jason.' }, { title: 'Bono de Reserva', description: 'Pack de dinero digital para el modo historia.' }] },
      { id: 'dlx', name: 'Deluxe Edition', price: '$1,879.00', perks: [{ title: 'Juego Base', description: 'Acceso completo a la historia principal.' }, { title: 'Pack de Ropa Vice', description: 'Conjuntos exclusivos inspirados en los años 80.' }, { title: '500k GTA Online', description: 'Impulso económico inmediato para tu imperio criminal.' }] },
      { id: 'ult', name: 'Ultimate Edition', price: '$2,100.00', perks: [{ title: 'Todo lo anterior', description: 'Incluye beneficios de las ediciones Standard y Deluxe.' }, { title: 'Acceso anticipado', description: 'Juega 3 días antes del lanzamiento oficial.' }, { title: 'Pase de Temporada', description: 'Acceso a los primeros 3 DLCs de historia planeados.' }] }
    ],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,700.00", availability: "PS5" },
      { store: "Microsoft Store", price: "$1,499.00", availability: "Xbox Series X" }
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
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/header.jpg",
    globalScore: 9.9,
    platforms: ["PC", "PS5", "Xbox Series X"],
    price: 1299,
    releaseDate: "2023-08-03",
    genre: "RPG",
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
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/header.jpg",
    globalScore: 9.4,
    platforms: ["PC", "PS5"],
    price: 1299,
    releaseDate: "2024-08-20",
    genre: "Action RPG",
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
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2778580/header.jpg",
    globalScore: 9.8,
    platforms: ["PC", "PS5", "Xbox Series X"],
    price: 859,
    releaseDate: "2024-06-21",
    genre: "Action RPG",
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
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2124490/header.jpg",
    globalScore: 9.5,
    platforms: ["PC", "PS5"],
    price: 1149,
    releaseDate: "2024-10-08",
    genre: "Horror",
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,149.00', perks: [{ title: 'Juego Base', description: 'Regresa a Silent Hill.' }] },
      { id: 'dlx', name: 'Deluxe', price: '$1,399.00', perks: [{ title: 'Máscara de Pyramid Head', description: 'Cosmético exclusivo.' }, { title: 'Libro de arte', description: 'Diseños de monstruos.' }] }
    ],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,149.00", availability: "PS5" },
      { store: "Steam", price: "$1,149.00", availability: "PC" }
    ],
    breakdown: { jugabilidad: 9.2, graphics: 9.8, historia: 10 },
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
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145350/header.jpg",
    globalScore: 9.7,
    platforms: ["PC"],
    price: 549,
    releaseDate: "2024-05-06",
    genre: "Roguelike",
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
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2124800/header.jpg",
    globalScore: 9.7,
    platforms: ["PC", "PS5", "Xbox Series X"],
    price: 1299,
    releaseDate: "2024-10-11",
    genre: "JRPG",
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
    image: "https://press.cdn.cdpr.app/news/e84f93bf4a4c3d451282614323ccc7942d0e5250_q90_900x900.jpeg",
    globalScore: 9.8,
    trailer: "yWMu6JeT2g8",
    platforms: ["PC", "PS5", "Xbox Series X"],
    price: 1399,
    releaseDate: "2027-12-01",
    genre: "RPG de Acción",
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
    image: "https://upload.wikimedia.org/wikipedia/en/a/a9/Astro_Bot_cover_art.jpg",
    globalScore: 9.8,
    trailer: "unYFdcEjV9k",
    platforms: ["PS5"],
    price: 1399,
    releaseDate: "2024-09-06",
    genre: "Plataformas",
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
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2246340/header.jpg",
    globalScore: 9.6,
    trailer: "a_wNFT4j6qI",
    platforms: ["PC", "PS5", "Xbox Series X"],
    price: 1199,
    releaseDate: "2025-02-28",
    genre: "Acción",
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,199.00', perks: [{ title: 'Juego Base', description: 'Caza en Tierras Prohibidas.' }] }
    ],
    marketPrices: [
      { store: "Steam", price: "$1,199.00", availability: "PC" },
      { store: "PlayStation Store", price: "$1,293.00", availability: "PS5" }
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
    image: "https://upload.wikimedia.org/wikipedia/en/4/48/Metroid_Prime_4_Beyond_cover_art.png",
    globalScore: 9.7,
    trailer: "mMAgmdR8jwU",
    platforms: ["Switch"],
    price: 1399,
    releaseDate: "2025-12-04",
    genre: "Aventura / FPS",
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,399.00', perks: [{ title: 'Samus Aran regresa.' , description: 'Samus Aran regresa.' }] }
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
    image: "https://upload.wikimedia.org/wikipedia/en/5/5e/Doom_The_Dark_Ages_key_art.jpg",
    globalScore: 9.5,
    trailer: "D4ZqHVfiA4M",
    platforms: ["PC", "PS5", "Xbox Series X"],
    price: 1399,
    releaseDate: "2025-05-15",
    genre: "Shooter",
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
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1616430/header.jpg",
    globalScore: 9.1,
    platforms: ["PC", "Xbox Series X"],
    price: 1399,
    releaseDate: "2027-02-23",
    genre: "RPG",
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
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2235701/header.jpg",
    globalScore: 9.2,
    platforms: ["PC", "PS5", "Xbox Series X"],
    price: 1399,
    releaseDate: "2025-09-12",
    genre: "Shooter",
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
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2350780/header.jpg",
    globalScore: 9.6,
    platforms: ["PC", "Xbox Series X"],
    price: 1399,
    releaseDate: "2026-10-06",
    genre: "Shooter",
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
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3280350/header.jpg",
    globalScore: 9.4,
    trailer: "DNvGx4nAN2U",
    platforms: ["PS5"],
    price: 1549,
    releaseDate: "2025-06-26",
    genre: "Acción / Exploración",
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,549.00', perks: [{ title: 'Juego Base', description: 'Conecta de nuevo.' }] },
      { id: 'dlx', name: 'Digital Deluxe', price: '$1,849.00', perks: [{ title: 'Trajes Dorados', description: 'Lujo estético.' }, { title: 'Gafas de sol', description: 'Cosmético in-game.' }] }
    ],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,549.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 8.9, gráficos: 10, historia: 10 },
    description: "Hideo Kojima nos invita a un nuevo viaje cinematográfico y emocional.",
    about: "Sam Porter Bridges se embarca en un nuevo viaje para salvar a la humanity de la extinción definitiva.",
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
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2050650/header.jpg",
    globalScore: 9.5,
    trailer: "gTMwx9-rKe8",
    platforms: ["PC", "PS5", "Xbox Series X"],
    price: 799,
    releaseDate: "2023-03-24",
    genre: "Survival Horror",
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
    image: "https://upload.wikimedia.org/wikipedia/en/f/fb/The_Legend_of_Zelda_Tears_of_the_Kingdom_cover.jpg",
    globalScore: 9.6,
    trailer: "uHGShqcAHlQ",
    platforms: ["Switch"],
    price: 1399,
    releaseDate: "2023-05-12",
    genre: "Aventura",
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,399.00', perks: [{ title: 'Hyrule completo.' , description: 'Hyrule completo.' }] }
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
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2651280/header.jpg",
    globalScore: 9.3,
    trailer: "9fVYKsEmuRo",
    platforms: ["PS5"],
    price: 1225,
    releaseDate: "2023-10-20",
    genre: "Acción",
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,225.00', perks: [{ title: 'Juego Base', description: 'Doble de héroes.' }] }
    ],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,225.00", availability: "PS5" }
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
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg",
    globalScore: 9.2,
    trailer: "sJbexcm4Trk",
    platforms: ["PC", "PS5", "Xbox Series X"],
    price: 1299,
    releaseDate: "2023-09-21",
    genre: "RPG de Acción",
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
    image: "https://upload.wikimedia.org/wikipedia/en/e/ed/Alan_Wake_2_box_art.jpg",
    globalScore: 8.9,
    trailer: "dlQ3FeNu5Yw",
    platforms: ["PC", "PS5", "Xbox Series X"],
    price: 949,
    releaseDate: "2023-10-27",
    genre: "Survival Horror / Misterio",
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
  },
  {
    id: 50,
    title: "Ghost of Yōtei",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202504/2116/050bb77f895515e0b0e906b0b9d75b6174b37eece097b462.png",
    globalScore: 9.2,
    platforms: ["PS5"],
    price: 1499,
    releaseDate: "2025-10-02",
    genre: "Acción / Aventura",
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,499.00', perks: [{ title: 'Juego Base', description: 'Explora el norte de Japón en el siglo XVII.' }] },
      { id: 'dlx', name: 'Digital Deluxe', price: '$1,699.00', perks: [{ title: 'Armadura Oscura', description: 'Set exclusivo de armadura.' }, { title: 'Caballo Negro', description: 'Montura cosmética.' }] }
    ],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,499.00", availability: "PS5", editionName: "Estándar" },
      { store: "PlayStation Store", price: "$1,699.00", availability: "PS5", editionName: "Digital Deluxe" }
    ],
    breakdown: { jugabilidad: 9, gráficos: 10, historia: 9 },
    description: "Una guerrera solitaria busca venganza en las tierras salvajes del monte Yōtei en el Japón del siglo XVII.",
    about: "De los creadores de Ghost of Tsushima, Ghost of Yōtei te lleva al norte de Japón en 1603. Atsu, una guerrera que perdió a su familia, emprende un viaje de venganza contra los Seis Yotei, un grupo de bandidos enmascarados.",
    specs: { desarrollador: "Sucker Punch Productions", editor: "Sony Interactive Entertainment", genero: "Acción / Mundo Abierto", lanzamiento: "2025", multijugador: "No", clasificación: "M (17+)" },
    languages: [
      { lang: "Español (Latam)", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true },
      { lang: "Japonés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 5001, user: "Samurai_Fan", text: "Mejor que Ghost of Tsushima en todo sentido.", score: 9.5 },
      { id: 5002, user: "OpenWorld_Lover", text: "El mundo es hermoso y la historia te atrapa.", score: 9.0 }
    ]
  },
  {
    id: 51,
    title: "Marvel's Wolverine",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202605/2215/a69481c5fa50fe19f42896d84fb7cbf37ab8646801a93322.png",
    globalScore: 9.0,
    platforms: ["PS5"],
    price: 1499,
    releaseDate: "2026-09-15",
    genre: "Acción / Aventura",
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,499.00', perks: [{ title: 'Juego Base', description: 'La historia definitiva de Wolverine.' }] }
    ],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,499.00", availability: "PS5" }
    ],
    breakdown: { jugabilidad: 9, gráficos: 9, historia: 9 },
    description: "Insomniac Games trae la historia definitiva de Logan con combate visceral y una narrativa intensa.",
    about: "Marvel's Wolverine es un juego de acción y aventura desarrollado por Insomniac Games. Con una historia original, el juego explora la naturaleza violenta y el pasado misterioso de Logan.",
    specs: { desarrollador: "Insomniac Games", editor: "Sony Interactive Entertainment", genero: "Acción / Aventura", lanzamiento: "2026", multijugador: "No", clasificación: "M (17+)" },
    languages: [
      { lang: "Español", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 5101, user: "MarvelFan_X", text: "El combate con las garras es adictivo.", score: 9.0 },
      { id: 5102, user: "PS5_Owner", text: "Gráficos de otro nivel. Insomniac no falla.", score: 9.0 }
    ]
  },
  {
    id: 52,
    title: "Resident Evil Requiem",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202512/1205/79661d7a2bdb9784749b4e57e1456ca89f7ac7bed8615aee.png",
    globalScore: 9.4,
    platforms: ["PS5", "Xbox Series X", "PC", "Nintendo Switch 2"],
    price: 1319,
    releaseDate: "2026-02-27",
    genre: "Survival Horror",
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,319.00', perks: [{ title: 'Juego Base', description: 'Regresa a Raccoon City.' }] },
      { id: 'dlx', name: 'Deluxe', price: '$1,507.00', perks: [{ title: 'Pack de Trajes', description: 'Cosméticos exclusivos.' }, { title: 'Armas Deluxe', description: 'Armas con skins especiales.' }] }
    ],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,225.00", availability: "PS5", editionName: "Estándar" },
      { store: "PlayStation Store", price: "$1,507.00", availability: "PS5", editionName: "Deluxe" },
      { store: "Microsoft Store", price: "$1,319.00", availability: "Xbox Series X", editionName: "Estándar" },
      { store: "Microsoft Store", price: "$1,507.00", availability: "Xbox Series X", editionName: "Deluxe" },
      { store: "Steam", price: "$1,399.00", availability: "PC", editionName: "Estándar" },
      { store: "Steam", price: "$1,507.00", availability: "PC", editionName: "Deluxe" }
    ],
    breakdown: { jugabilidad: 9, gráficos: 10, historia: 9 },
    description: "El nono juego principal de Resident Evil. Leon y Grace regresan a Raccoon City 30 años después.",
    about: "Resident Evil Requiem es la novena entrega principal de la serie. Sigue a la analista del FBI Grace Ashcroft y al legendario agente Leon S. Kennedy mientras investigan muertes misteriosas vinculadas al Incidente de Raccoon City.",
    specs: { desarrollador: "Capcom", editor: "Capcom", genero: "Survival Horror", lanzamiento: "2026", multijugador: "No", clasificación: "M (17+)" },
    languages: [
      { lang: "Español (Latam)", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true },
      { lang: "Japonés", interface: true, voices: true, subs: true },
      { lang: "Francés", interface: true, voices: true, subs: true },
      { lang: "Alemán", interface: true, voices: true, subs: true },
      { lang: "Italiano", interface: true, voices: true, subs: true },
      { lang: "Portugués (Brasil)", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 5201, user: "Horror_Gamer", text: "El mejor Resident Evil desde el 4. La vuelta a Raccoon City es perfecta.", score: 9.5 },
      { id: 5202, user: "CapcomFan_99", text: "Leon sigue siendo el protagonista más cool de los videojuegos.", score: 9.0 }
    ]
  },
  {
    id: 53,
    title: "Phantom Blade Zero",
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4115450/5930310dc5f043a1df400d9dc70ddb43843480fc/header.jpg",
    globalScore: 9.0,
    platforms: ["PS5", "PC"],
    price: 1099,
    releaseDate: "2026-10-29",
    genre: "Acción / RPG",
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,099.00', perks: [{ title: 'Juego Base', description: 'Una aventura wuxia épica.' }] }
    ],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,099.00", availability: "PS5" },
      { store: "Steam", price: "$1,082.00", availability: "PC" }
    ],
    breakdown: { jugabilidad: 9, gráficos: 9, historia: 8 },
    description: "Un action RPG wuxia con combate ultra rápido ambientado en una China oscura y ficticia.",
    about: "Phantom Blade Zero es un action RPG de S-Game que fusiona el storytelling clásico wuxia con combate trepidante impulsado por Unreal Engine 5. Juegas como Soul, un guerrero que busca redención.",
    specs: { desarrollador: "S-Game", editor: "S-Game", genero: "Acción / RPG", lanzamiento: "2026", multijugador: "No", clasificación: "M (17+)" },
    languages: [
      { lang: "Chino simplificado", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true },
      { lang: "Japonés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 5301, user: "Wuxia_Fan", text: "El combate es una obra de arte. Cada golpe se siente satisfactorio.", score: 9.0 },
      { id: 5302, user: "ActionRPG_Lover", text: "Un MUST para los fans de Sekiro y Nioh.", score: 9.0 }
    ]
  },
  {
    id: 54,
    title: "Nioh 3",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202509/0401/835b207c01d1b02c29229e73fba0da13b914148c8b8bd4ed.png",
    globalScore: 8.8,
    platforms: ["PS5", "PC"],
    price: 999,
    releaseDate: "2026-02-06",
    genre: "Acción / RPG",
    editions: [
      { id: 'std', name: 'Estándar', price: '$999.00', perks: [{ title: 'Juego Base', description: 'Conquista la Crucible.' }] }
    ],
    marketPrices: [
      { store: "PlayStation Store", price: "$700.00", availability: "PS5" },
      { store: "Steam", price: "$650.00", availability: "PC" }
    ],
    breakdown: { jugabilidad: 9, gráficos: 8, historia: 8 },
    description: "Team NINJA regresa con una nueva aventura de samurái oscuro en el Japón feudal.",
    about: "Nioh 3 es la tercera entrega de la serie de acción desafiante de Team NINJA. Explora un mundo abierto por primera vez en la serie mientras te conviertes en shogun.",
    specs: { desarrollador: "Team NINJA", editor: "KOEI TECMO", genero: "Acción / RPG", lanzamiento: "2026", multijugador: "Sí (co-op hasta 3)", clasificación: "M (17+)" },
    languages: [
      { lang: "Japonés", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 5401, user: "SoulsLike_Pro", text: "Difícil como siempre, pero el mundo abierto le da un giro fresco.", score: 8.5 },
      { id: 5402, user: "Samurai_Soul", text: "El combate es brillante. Team NINJA lo hizo de nuevo.", score: 9.0 }
    ]
  },
  {
    id: 55,
    title: "The Outer Worlds 2",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1449110/header.jpg",
    globalScore: 8.5,
    platforms: ["PC", "PS5", "Xbox Series X"],
    price: 1399,
    releaseDate: "2025-10-29",
    genre: "RPG / Ciencia Ficción",
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,399.00', perks: [{ title: 'Juego Base', description: 'Explora la colonia Arcadia.' }] },
      { id: 'ult', name: 'Ultimate', price: '$1,799.00', perks: [{ title: 'Pase de DLC', description: '2 expansiones futuras.' }, { title: 'Arte conceptual', description: 'Libro digital y banda sonora.' }] }
    ],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,399.00", availability: "PS5", editionName: "Estándar" },
      { store: "PlayStation Store", price: "$1,799.00", availability: "PS5", editionName: "Ultimate" },
      { store: "Microsoft Store", price: "$1,399.00", availability: "Xbox Series X", editionName: "Estándar" },
      { store: "Microsoft Store", price: "$1,799.00", availability: "Xbox Series X", editionName: "Ultimate" },
      { store: "Steam", price: "$1,299.00", availability: "PC", editionName: "Estándar" },
      { store: "Steam", price: "$1,599.00", availability: "PC", editionName: "Ultimate" }
    ],
    breakdown: { jugabilidad: 8, gráficos: 8, historia: 9 },
    description: "Obsidian regresa con la secuela de su RPG de ciencia ficción. Nuevas colonias, nuevas facciones, nuevas decisiones.",
    about: "The Outer Worlds 2 es la secuela del aclamado RPG de Obsidian. Explora Arcadia, una colonia devastada por grietas dimensionales y guerras faccionales.",
    specs: { desarrollador: "Obsidian Entertainment", editor: "Xbox Game Studios", genero: "RPG", lanzamiento: "2025", multijugador: "No", clasificación: "M (17+)" },
    languages: [
      { lang: "Español", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 5501, user: "RPG_Veteran", text: "Obsidian nunca decepciona. Las decisiones realmente importan.", score: 8.5 },
      { id: 5502, user: "SpaceExplorer", text: "El humor dark sigue intacto. Muy divertido.", score: 8.5 }
    ]
  },
  {
    id: 56,
    title: "Elden Ring: Nightreign",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/2622380/header.jpg",
    globalScore: 8.7,
    platforms: ["PS5", "PS4", "Xbox Series X", "PC"],
    price: 829,
    releaseDate: "2025-05-30",
    genre: "Acción / Co-op",
    editions: [
      { id: 'std', name: 'Estándar', price: '$829.00', perks: [{ title: 'Juego Base', description: 'Supervive en Limveld con hasta 3 jugadores.' }] }
    ],
    marketPrices: [
      { store: "Microsoft Store", price: "$829.00", availability: "Xbox" },
      { store: "PlayStation Store", price: "$849.00", availability: "PS5" },
      { store: "Steam", price: "$700.00", availability: "PC" }
    ],
    breakdown: { jugabilidad: 9, gráficos: 8, historia: 7 },
    description: "Un spin-off co-op de FromSoftware que transforma Elden Ring en un juego de supervivencia cooperativo.",
    about: "ELDEN RING NIGHTREIGN es un juego independiente de acción supervivencia cooperativa ambientado en el universo de ELDEN RING. Enfrenta desafíos con hasta 2 amigos en un mundo hostil y cambiante.",
    specs: { desarrollador: "FromSoftware", editor: "Bandai Namco", genero: "Acción / Co-op", lanzamiento: "2025", multijugador: "Sí (co-op hasta 3)", clasificación: "M (17+)" },
    languages: [
      { lang: "Español", interface: true, voices: false, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true },
      { lang: "Japonés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 5601, user: "Soulsborne_Addict", text: "No es Elden Ring 2, pero es una experiencia cooperativa brillante.", score: 8.5 },
      { id: 5602, user: "CoopPlayer_42", text: "Con amigos es increíble. Muy adictivo.", score: 9.0 }
    ]
  },
  {
    id: 57,
    title: "God of War Ragnarök",
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2322010/header.jpg?t=1776465233",
    globalScore: 9.4,
    platforms: ["PS5", "PS4", "PC"],
    price: 999,
    releaseDate: "2022-11-09",
    genre: "Acción / Aventura",
    editions: [
      { id: 'std', name: 'Estándar', price: '$999.00', perks: [{ title: 'Juego Base', description: 'La conclusión de la saga nórdica.' }] },
      { id: 'jtn', name: 'Jötnar Edition', price: '$2,499.00', perks: [{ title: 'Caja de acero', description: 'Estuche de colección.' }, { title: 'Anillo de Djupul', description: 'Réplica física.' }] }
    ],
    marketPrices: [
      { store: "PlayStation Store", price: "$999.00", availability: "PS5", editionName: "Estándar" },
      { store: "PlayStation Store", price: "$2,499.00", availability: "PS5", editionName: "Jötnar Edition" },
      { store: "Steam", price: "$1,199.00", availability: "PC", editionName: "Estándar" },
      { store: "Steam", price: "$2,499.00", availability: "PC", editionName: "Jötnar Edition" }
    ],
    breakdown: { jugabilidad: 10, gráficos: 10, historia: 10 },
    description: "Kratos y Atreus enfrentan el Ragnarök en la conclusión de la saga nórdica de Santa Monica Studio.",
    about: "God of War Ragnarök es la continuación del aclamado God of War (2018). Kratos y su hijo Atreus deben enfrentar las profecías del Ragnarök mientras exploran los Nueve Reinos.",
    specs: { desarrollador: "Santa Monica Studio", editor: "Sony Interactive Entertainment", genero: "Acción / Aventura", lanzamiento: "2022", multijugador: "No", clasificación: "M (17+)" },
    languages: [
      { lang: "Español (Latam)", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true },
      { lang: "Japonés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 5701, user: "Kratos_Fan", text: "La mejor historia jamás contada en videojuegos. Una obra maestra.", score: 10 },
      { id: 5702, user: "NorseMyth_Lover", text: "El combate evoluciona perfectamente. Ragnarök es épico.", score: 9.5 }
    ]
  },
  {
    id: 58,
    title: "Hogwarts Legacy",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/990080/header.jpg",
    globalScore: 8.6,
    platforms: ["PS5", "PS4", "Xbox Series X", "PC", "Nintendo Switch"],
    price: 1299,
    releaseDate: "2023-02-10",
    genre: "RPG / Mundo Abierto",
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,299.00', perks: [{ title: 'Juego Base', description: 'Vive tu experiencia en Hogwarts.' }] },
      { id: 'dlx', name: 'Digital Deluxe', price: '$1,599.00', perks: [{ title: 'Mascota Thestral', description: 'Montura exclusiva.' }, { title: 'Pack de batalla', description: 'Armas y armaduras oscuras.' }] }
    ],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,299.00", availability: "PS5", editionName: "Estándar" },
      { store: "PlayStation Store", price: "$1,599.00", availability: "PS5", editionName: "Digital Deluxe" },
      { store: "Steam", price: "$1,199.00", availability: "PC", editionName: "Estándar" },
      { store: "Steam", price: "$1,499.00", availability: "PC", editionName: "Digital Deluxe" }
    ],
    breakdown: { jugabilidad: 8, gráficos: 9, historia: 8 },
    description: "Un RPG de mundo abierto ambientado en el universo de Harry Potter. Asiste a Hogwarts y forja tu propia leyenda.",
    about: "Hogwarts Legacy te transporta al siglo XVIII del universo de Harry Potter. Como estudiante con habilidades únicas, exploras Hogwarts, Hogsmeade y los alrededores mientras descubres un secreto oscuro.",
    specs: { desarrollador: "Avalanche Software", editor: "Warner Bros. Games", genero: "RPG / Mundo Abierto", lanzamiento: "2023", multijugador: "No", clasificación: "T (13+)" },
    languages: [
      { lang: "Español (Latam)", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 5801, user: "HarryPotter_Fan", text: "El sueño de todo fan de Harry Potter hecho realidad.", score: 9.0 },
      { id: 5802, user: "RPG_Addict", text: "El combate con varitas es sorprendentemente divertido.", score: 8.5 }
    ]
  },
  {
    id: 59,
    title: "Starfield",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1716740/header.jpg",
    globalScore: 7.5,
    platforms: ["PC", "Xbox Series X"],
    price: 1399,
    releaseDate: "2023-09-06",
    genre: "RPG / Ciencia Ficción",
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,399.00', perks: [{ title: 'Juego Base', description: 'Explora el espacio profundo.' }] },
      { id: 'cst', name: "Constellation Edition", price: '$2,299.00', perks: [{ title: 'Reproductor de vinilos', description: 'Banda sonora física.' }, { title: 'Art book', description: 'Libro de arte de 80 páginas.' }] }
    ],
    marketPrices: [
      { store: "Microsoft Store", price: "$1,699.00", availability: "Xbox Series X" },
      { store: "Steam", price: "$875.00", availability: "PC" }
    ],
    breakdown: { jugabilidad: 7, gráficos: 8, historia: 7 },
    description: "El RPG espacial de Bethesda. Explora más de 1,000 planetas en una aventura épica por la galaxia.",
    about: "Starfield es el primer universo nuevo de Bethesda Game Studios en 25 años. Crea tu personaje y explora la galaxia mientras desentrañas el misterio más profundo de la humanidad.",
    specs: { desarrollador: "Bethesda Game Studios", editor: "Bethesda Softworks", genero: "RPG", lanzamiento: "2023", multijugador: "No", clasificación: "M (17+)" },
    languages: [
      { lang: "Español", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 5901, user: "SpaceExplorer_99", text: "La exploración espacial es genial, pero las loading screens cansan.", score: 7.5 },
      { id: 5902, user: "BethesdaFan", text: "Es Skyrim en el espacio. Tiene sus defectos pero es divertido.", score: 7.0 }
    ]
  },
  {
    id: 60,
    title: "Diablo IV",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/2344520/header.jpg",
    globalScore: 8.3,
    platforms: ["PS5", "PS4", "Xbox Series X", "PC"],
    price: 999,
    releaseDate: "2023-06-06",
    genre: "ARPG / Hack and Slash",
    editions: [
      { id: 'std', name: 'Estándar', price: '$999.00', perks: [{ title: 'Juego Base', description: 'La oscuridad regresa a Sanctuary.' }] },
      { id: 'ult', name: 'Ultimate Edition', price: '$1,599.00', perks: [{ title: 'Pase de Temporada', description: 'Acceso a 2 pases de batalla.' }, { title: 'Montura alada', description: 'Montura exclusiva de los cielos.' }] }
    ],
    marketPrices: [
      { store: "PlayStation Store", price: "$999.00", availability: "PS5" },
      { store: "Microsoft Store", price: "$999.00", availability: "Xbox Series X" },
      { store: "Battle.net", price: "$999.00", availability: "PC" }
    ],
    breakdown: { jugabilidad: 8, gráficos: 8, historia: 8 },
    description: "Lilith regresa. Diablo IV trae el mundo oscuro y gótico de Sanctuary de vuelta con combate adictivo.",
    about: "Diablo IV es la continuación del icónico ARPG de Blizzard. Explora un mundo compartido persistente donde Lilith ha sido invocada y amenaza con consumir Sanctuary.",
    specs: { desarrollador: "Blizzard Entertainment", editor: "Blizzard Entertainment", genero: "ARPG", lanzamiento: "2023", multijugador: "Sí (MMO-lite)", clasificación: "M (17+)" },
    languages: [
      { lang: "Español (Latam)", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 6001, user: "Diablo_Veteran", text: "La mejor entrega desde Diablo II. El mundo oscuro es perfecto.", score: 8.5 },
      { id: 6002, user: "LootGoblin", text: "El loot loop es adictivo. Horas y horas de diversión.", score: 8.0 }
    ]
  },
  {
    id: 61,
    title: "Stellar Blade",
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3489700/header.jpg",
    globalScore: 8.2,
    platforms: ["PS5"],
    price: 1029,
    releaseDate: "2024-04-26",
    genre: "Acción / RPG",
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,029.00', perks: [{ title: 'Juego Base', description: 'Sobrevive en la Tierra abandonada.' }] },
      { id: 'dlx', name: 'Digital Deluxe', price: '$1,299.00', perks: [{ title: 'Traje de emperatriz', description: 'Skin exclusiva para Eve.' }, { title: 'Gafas de sol', description: 'Accesorio cosmético.' }] }
    ],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,029.00", availability: "PS5", editionName: "Estándar" },
      { store: "PlayStation Store", price: "$1,299.00", availability: "PS5", editionName: "Digital Deluxe" }
    ],
    breakdown: { jugabilidad: 8, gráficos: 9, historia: 7 },
    description: "Un action RPG de Shift Up con combate precioso y una protagonist que lucha contra alienígenas en una Tierra post-apocalíptica.",
    about: "Stellar Blade es un action RPG que combina combate fluido con una narrativa de ciencia ficción. Eve, una guerrera de la división VII, debe salvar a la humanidad de los Naytibas.",
    specs: { desarrollador: "Shift Up", editor: "Sony Interactive Entertainment", genero: "Acción / RPG", lanzamiento: "2024", multijugador: "No", clasificación: "M (17+)" },
    languages: [
      { lang: "Español", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true },
      { lang: "Japonés", interface: true, voices: true, subs: true },
      { lang: "Coreano", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 6101, user: "ActionFan_X", text: "El combate es satisfactorio. Los jefes son épicos.", score: 8.5 },
      { id: 6102, user: "PS5_Gamer", text: "Visualmente impresionante. Shift Up hizo un gran trabajo.", score: 8.0 }
    ]
  },
  {
    id: 62,
    title: "Like a Dragon: Infinite Wealth",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/2072450/header.jpg",
    globalScore: 9.0,
    platforms: ["PS5", "PS4", "Xbox Series X", "PC"],
    price: 1399,
    releaseDate: "2024-01-26",
    genre: "RPG / Aventura",
    editions: [
      { id: 'std', name: 'Estándar', price: '$1,399.00', perks: [{ title: 'Juego Base', description: 'La aventura de Ichiban y Kiryu.' }] }
    ],
    marketPrices: [
      { store: "PlayStation Store", price: "$1,399.00", availability: "PS5" },
      { store: "Steam", price: "$1,199.00", availability: "PC" }
    ],
    breakdown: { jugabilidad: 9, gráficos: 8, historia: 9 },
    description: "Ichiban Kasuga y Kazuma Kiryu se unen en una aventura global que los lleva de Japón a Hawái.",
    about: "Like a Dragon: Infinite Wealth es la continuación del RPG de SEGA. Ichiban y Kiryu viajan a Hawái en busca de una conexión perdida mientras enfrentan amenazas de Yakuza.",
    specs: { desarrollador: "Ryu Ga Gotoku Studio", editor: "SEGA", genero: "RPG", lanzamiento: "2024", multijugador: "No", clasificación: "M (17+)" },
    languages: [
      { lang: "Español", interface: true, voices: true, subs: true },
      { lang: "Inglés", interface: true, voices: true, subs: true },
      { lang: "Japonés", interface: true, voices: true, subs: true }
    ],
    reviews: [
      { id: 6201, user: "YakuzaFan_42", text: "La mejor historia de la serie. Ichiban es un héroe increíble.", score: 9.0 },
      { id: 6202, user: "RPG_Master", text: "El combate por turnos está perfecto. Horas de contenido.", score: 9.0 }
    ]
  }
];
