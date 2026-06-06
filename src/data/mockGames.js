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
    description: "La culminación de una década de espera. GTA VI no es solo un juego; es el simulador definitivo de la vida moderna y el crimen organizado.",
    about: "Grand Theft Auto VI viaja al estado de Leonida, hogar de las calles bañadas en neón de Vice City y más allá, en la evolución más grande y envolvente de la serie hasta la fecha. Con una narrativa centrada en el dúo de Lucia y Jason, el juego promete un realismo nunca antes visto en un mundo abierto.",
    specs: {
      desarrollador: "Rockstar North",
      editor: "Rockstar Games",
      genero: "Acción / Mundo Abierto",
      lanzamiento: "2025/2026",
      multijugador: "Sí (GTA Online 2)",
      idiomas: "Español (Latam), Inglés",
      clasificación: "M (17+)"
    },
    reviews: [
      { id: 1201, user: "Rockstar_Loyalist_99", text: "¡EL REY HA VUELTO! No puedo creer el nivel de detalle en cada rincón. ¡Es simplemente perfecto!", score: 10 },
      { id: 1202, user: "JuanitoGamer_MX", text: "Me la paso horas solo manejando y escuchando la radio. La ciudad se siente viva.", score: 9.5 }
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
    description: "Una obra maestra sin precedentes en el género del RPG. Larian Studios ha forjado una leyenda donde cada elección tuya resuena en la eternidad.",
    about: "Baldur's Gate 3 es un RPG de nueva generación, ambientado en el mundo de Dungeons & Dragons. Reúne a tu grupo y regresa a los Reinos Olvidados en una historia de compañerismo y traición, sacrificio y supervivencia, y la atracción del poder absoluto.",
    specs: {
      desarrollador: "Larian Studios",
      editor: "Larian Studios",
      genero: "RPG / Estrategia",
      lanzamiento: "2023",
      multijugador: "Cooperativo Online/Local",
      idiomas: "Español, Inglés, Francés",
      clasificación: "M (17+)"
    },
    reviews: [
      { id: 501, user: "D&D_Master_Ultra", text: "La profundidad de las mecánicas es abrumadora. Finalmente un juego que respeta la inteligencia del jugador.", score: 10 },
      { id: 502, user: "RTX_3090_Sweat", text: "La historia es de 10, pero necesita un parche de optimización para PC de gama alta en ciudades densas.", score: 8.5 }
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
    description: "El inicio de una nueva era para los brujos. Polaris nos sumerge en una atmósfera gélida y despiadada con Unreal Engine 5.",
    about: "Polaris inicia una nueva trilogía épica de fantasía oscura de la mano de CD PROJEKT RED. Abandonando el motor REDengine por Unreal Engine 5, el juego explora nuevas regiones del continente y una nueva escuela de brujos: la Escuela del Lince.",
    specs: {
      desarrollador: "CD Projekt RED",
      editor: "CD Projekt RED",
      genero: "RPG de Acción",
      lanzamiento: "2026",
      multijugador: "No (Single Player)",
      idiomas: "Español, Inglés, Polaco",
      clasificación: "M (17+)"
    },
    reviews: [
      { id: 1501, user: "Geralt_Enjoyer_Forever", text: "¡BRUTAL! La nueva escuela del lince es fascinante. ¡Pura magia!", score: 10 },
      { id: 1502, user: "MasterRace_Enthusiast", text: "Visualmente imbatible, aunque el Ray Tracing Overdrive todavía pone de rodillas a mi 5090.", score: 9.0 }
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
    description: "Miyazaki lo ha vuelto a hacer. Shadow of the Erdtree no es una expansión, es un monumento al diseño de niveles.",
    about: "La expansión Shadow of the Erdtree presenta una historia completamente nueva ambientada en la Tierra de las Sombras, llena de misterios, mazmorras peligrosas y nuevos enemigos, armas y equipo. Descubre el lado oscuro del lore de Miquella.",
    specs: {
      desarrollador: "FromSoftware",
      editor: "Bandai Namco",
      genero: "Action RPG / Soulslike",
      lanzamiento: "2024",
      multijugador: "Cooperativo / Invasiones",
      idiomas: "Español, Inglés, Japonés",
      clasificación: "M (17+)"
    },
    reviews: [
      { id: 101, user: "SoulsBorne_Addict", text: "Mejor que muchos juegos completos. Los jefes son una pesadilla hermosa.", score: 10 },
      { id: 102, user: "Casual_Carlos", text: "Es muy difícil, pero explorar este mundo nuevo es increíblemente divertido.", score: 9.0 }
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
    description: "Melinoë toma la antorcha en esta secuela que perfecciona la fórmula de la perfección.",
    about: "Lucha más allá del Inframundo usando magia negra para enfrentarte al Titán del Tiempo en esta secuela fascinante. Como Melinoë, la princesa inmortal del Inframundo, explorarás un mundo mitológico más grande y profundo.",
    specs: {
      desarrollador: "Supergiant Games",
      editor: "Supergiant Games",
      genero: "Roguelike",
      lanzamiento: "2024",
      multijugador: "No",
      idiomas: "Español, Inglés",
      clasificación: "T (Teen)"
    },
    reviews: [
      { id: 1101, user: "Zagreus_Simp", text: "¡Dios mío, la dirección de arte es de otro mundo! Supera al primero en todo.", score: 10 },
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
    description: "La ingeniería hecha videojuego. Hyrule se expande hacia los cielos y las profundidades.",
    about: "En esta secuela de Breath of the Wild, decidirás tu propio camino a través de los extensos paisajes de Hyrule y las misteriosas islas que flotan en los cielos. Aprovecha el poder de las nuevas habilidades de Link para luchar contra las fuerzas malévolas.",
    specs: {
      desarrollador: "Nintendo EPD",
      editor: "Nintendo",
      genero: "Aventura / Mundo Abierto",
      lanzamiento: "2023",
      multijugador: "No",
      idiomas: "Español (Latam), Inglés, Japonés",
      clasificación: "E10+ (Everyone 10+)"
    },
    reviews: [
      { id: 301, user: "Hylian_Architect", text: "¡Las mecánicas de construcción son revolucionarias! He pasado 50 horas haciendo vehículos locos.", score: 10 },
      { id: 302, user: "Gamer_Relajado", text: "Me encanta perderme en el mapa. Siempre hay algo nuevo que descubrir.", score: 9.0 }
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
    description: "Leon S. Kennedy regresa en el que es, posiblemente, el mejor remake de la historia.",
    about: "Seis años después de la catástrofe biológica en Raccoon City, Leon S. Kennedy ha sido enviado a rescatar a la hija del presidente, a quien han secuestrado. La búsqueda le lleva a una aldea europea aislada donde algo terrible les ocurre a sus habitantes.",
    specs: {
      desarrollador: "Capcom",
      editor: "Capcom",
      genero: "Survival Horror",
      lanzamiento: "2023",
      multijugador: "No (Modo Mercenarios Online)",
      idiomas: "Español, Inglés, Japonés",
      clasificación: "M (17+)"
    },
    reviews: [
      { id: 901, user: "Resident_Evil_Veteran", text: "¡Increíble! Han respetado la esencia y mejorado todo lo que se podía mejorar.", score: 10 },
      { id: 902, user: "PC_Performance_Nerd", text: "Excelente remake, pero el Denuvo empaña un poco la versión de PC. Aun así, juegazo.", score: 8.5 }
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
    description: "Hideo Kojima nos invita a un nuevo viaje introspectivo y visualmente arrebatador.",
    about: "Sam Porter Bridges se embarca en un nuevo viaje para salvar a la humanidad de la extinción. En Death Stranding 2, el mundo se enfrenta a nuevas amenazas cataclísmicas mientras Sam busca reconectar a las personas aisladas.",
    specs: {
      desarrollador: "Kojima Productions",
      editor: "Sony Interactive Ent.",
      genero: "Acción / Exploración",
      lanzamiento: "2025",
      multijugador: "Social Asíncrono",
      idiomas: "Español, Inglés, Japonés",
      clasificación: "M (17+)"
    },
    reviews: [
      { id: 1401, user: "Kojima_Is_God", text: "Nadie entiende su genio. Es arte puro, cine interactivo en su máxima expresión.", score: 10 },
      { id: 1402, user: "Curioso_Gamer", text: "No entiendo la mitad de lo que pasa, pero los paisajes son tan bonitos que no puedo dejarlo.", score: 8.5 }
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
    description: "Dos Spider-Men, una amenaza colosal. La aventura definitiva del trepamuros.",
    about: "Explora la Nueva York de Marvel expandida como Peter Parker y Miles Morales. Cambia entre ambos para vivir historias diferentes y nuevos poderes épicos mientras el icónico villano Venom amenaza con destruir sus vidas y su ciudad.",
    specs: {
      desarrollador: "Insomniac Games",
      editor: "Sony Interactive Ent.",
      genero: "Acción / Aventura",
      lanzamiento: "2023",
      multijugador: "No",
      idiomas: "Español (Latam), Inglés",
      clasificación: "T (Teen)"
    },
    reviews: [
      { id: 701, user: "WebHead_Fanatic", text: "¡El mejor juego de superhéroes! Jugar con Peter y Miles es un sueño hecho realidad.", score: 10 },
      { id: 702, user: "Pura_Diversion_24", text: "Súper divertido, la acción no para nunca. Me encanta volar por la ciudad.", score: 9.5 }
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
    description: "Night City finalmente brilla como siempre debió hacerlo. La redención total.",
    about: "Cyberpunk 2077 es un RPG de acción y aventura en mundo abierto ambientado en la megalópolis de Night City. Conviértete en un mercenario cyberpunk y enfréntate a las fuerzas más poderosas de la ciudad en busca de la inmortalidad.",
    specs: {
      desarrollador: "CD Projekt RED",
      editor: "CD Projekt RED",
      genero: "RPG de Acción",
      lanzamiento: "2020/2023",
      multijugador: "No",
      idiomas: "Español, Inglés, Alemán",
      clasificación: "M (17+)"
    },
    reviews: [
      { id: 801, user: "Choomba_V", text: "¡Finalmente es el juego que nos prometieron! La expansión es mejor que el juego base.", score: 10 },
      { id: 802, user: "Optimization_Police", text: "El Path Tracing es increíble, pero necesitas una central eléctrica para correrlo a 60fps.", score: 8.0 }
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
    description: "Una pesadilla lúcida donde la realidad y la ficción se entrelazan de forma aterradora.",
    about: "Atrapado en una dimensión alternativa, el escritor Alan Wake intenta escapar escribiendo una historia de terror. Mientras tanto, en el mundo real, la agente del FBI Saga Anderson investiga una serie de asesinatos rituales en Bright Falls.",
    specs: {
      desarrollador: "Remedy Entertainment",
      editor: "Epic Games Publishing",
      genero: "Survival Horror / Misterio",
      lanzamiento: "2023",
      multijugador: "No",
      idiomas: "Español, Inglés",
      clasificación: "M (17+)"
    },
    reviews: [
      { id: 601, user: "Remedy_Scholar", text: "Una narrativa compleja y fascinante. Visualmente es lo más avanzado hoy. ¡Arte!", score: 9.5 },
      { id: 602, user: "FrameRate_Watcher", text: "La carga técnica es altísima. Si no tienes Mesh Shaders, ni lo intentes.", score: 8.0 }
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
    description: "Un monumento a las promesas vacías y al marketing engañoso.",
    about: "The Day Before era un MMO de supervivencia de mundo abierto ambientado en una América post-pandémica plagada de infectados y supervivientes que se matan entre sí por comida, armas y coches. Fue retirado de las tiendas días después de su lanzamiento.",
    specs: {
      desarrollador: "Fntastic",
      editor: "Mytona",
      genero: "Survival MMO",
      lanzamiento: "2023",
      multijugador: "Sí (Servidores cerrados)",
      idiomas: "Inglés, Ruso",
      clasificación: "M (17+)"
    },
    reviews: [
      { id: 2001, user: "Scam_Survivor", text: "¡CUIDADO! Es una estafa total, no hay nada de lo que prometieron. Dinero a la basura.", score: 1 },
      { id: 2002, user: "MasterRace_Cynic", text: "Assets de tienda y gameplay aburrido. El peor lanzamiento de la década.", score: 3 }
    ]
  }
];
