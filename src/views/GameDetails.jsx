import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Star, MessageSquare, ShoppingBag, Info, Settings, Globe, Check, X, Box, Search, Heart, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [langSearch, setLangModalSearch] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedEditionId, setSelectedEditionId] = useState(null);

  // Cargar datos completos del juego desde Supabase
  useEffect(() => {
    const fetchGameDetails = async () => {
      setIsLoading(true);
      
      // 1. Obtener datos base del juego
      const { data: gameData, error: gameError } = await supabase
        .from('games')
        .select('*')
        .eq('id', id)
        .single();

      if (gameError || !gameData) {
        setIsLoading(false);
        return;
      }

      // 2. Obtener puntuación técnica desde la nueva tabla
      const { data: scoreData } = await supabase
        .from('score_breakdown')
        .select('jugabilidad, graficos, historia')
        .eq('game_id', id)
        .single();

      // 3. Obtener precios de mercado detallados
      const { data: marketData } = await supabase
        .from('market_prices')
        .select('*')
        .eq('game_id', id);

      // 4. Obtener ediciones y sus perks
      const { data: editionsData } = await supabase
        .from('editions')
        .select('*, edition_perks(*)')
        .eq('game_id', id);

      // 5. Obtener idiomas
      const { data: langsData } = await supabase
        .from('game_languages')
        .select('*')
        .eq('game_id', id);

      // 6. Obtener reseñas
      const { data: reviewsData } = await supabase
        .from('game_reviews')
        .select('*')
        .eq('game_id', id);

      // Construir objeto unificado con la nueva estructura
      const fullGame = {
        ...gameData,
        globalScore: parseFloat(gameData.global_score),
        breakdown: {
          jugabilidad: parseFloat(scoreData?.jugabilidad || 0),
          gráficos: parseFloat(scoreData?.graficos || 0),
          historia: parseFloat(scoreData?.historia || 0)
        },
        specs: {
          desarrollador: gameData.developer,
          editor: gameData.publisher,
          genero: gameData.genre,
          lanzamiento: gameData.release_date,
          multijugador: gameData.multiplayer,
          clasificación: gameData.rating
        },
        editions: editionsData?.map(ed => ({
          ...ed,
          perks: ed.edition_perks
        })),
        languages: langsData,
        reviews: reviewsData?.map(r => ({
          id: r.id,
          user: r.user_name,
          text: r.text,
          score: r.score
        })) || [],
        marketPrices: marketData?.map(m => ({
          store: m.store,
          price: new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(m.price),
          availability: m.platform,
          url: m.store_url // NUEVO: URL de la tienda
        })) || []
      };

      setGame(fullGame);
      setSelectedEditionId(fullGame.editions?.[0]?.id);
      
      const wishlist = JSON.parse(localStorage.getItem('pixelVerdict_wishlist') || '[]');
      setIsWishlisted(wishlist.includes(fullGame.id));
      
      setIsLoading(false);
    };

    fetchGameDetails();
  }, [id]);

  // Manejar toggle de deseados
  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('pixelVerdict_wishlist') || '[]');
    let newWishlist;
    
    if (isWishlisted) {
      newWishlist = wishlist.filter(itemId => itemId !== game.id);
    } else {
      newWishlist = [...wishlist, game.id];
    }
    
    localStorage.setItem('pixelVerdict_wishlist', JSON.stringify(newWishlist));
    setIsWishlisted(!isWishlisted);
  };

  // Filtrado dinámico de idiomas
  const filteredLanguages = useMemo(() => {
    if (!game?.languages) return [];
    return game.languages.filter(l => 
      l.lang.toLowerCase().includes(langSearch.toLowerCase())
    );
  }, [game, langSearch]);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gamingOrange shadow-[0_0_15px_rgba(255,107,0,0.4)]"></div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-400 italic">Este veredicto aún no ha sido escrito...</h2>
        <Link to="/" className="bg-gamingOrange px-6 py-2 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-all">Volver al Inicio</Link>
      </div>
    );
  }

  const selectedEdition = game.editions?.find(e => e.id === selectedEditionId) || game.editions?.[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Botón Volver */}
      <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Volver a la lista
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Columna Izquierda: Imagen, Selector de Ediciones, Desglose y Specs */}
        <div className="lg:col-span-1 space-y-8">
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 group">
              <img src={game.image} alt={game.title} className="w-full h-auto group-hover:scale-105 transition-transform duration-700" />
            </div>

            {/* SELECTOR DE EDICIONES (Debajo de la imagen) */}
            {game.editions && game.editions.length > 0 && (
              <div className="bg-gamingCard rounded-2xl p-4 border border-white/5 space-y-3 shadow-2xl">
                <h4 className="text-xs font-black uppercase tracking-tighter text-gray-500 flex items-center gap-2">
                  <Box className="w-3 h-3" /> Seleccionar Edición
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {game.editions.map((edition) => (
                    <button
                      key={edition.id}
                      onClick={() => setSelectedEditionId(edition.id)}
                      className={`flex flex-col p-3 rounded-xl border transition-all duration-300 text-left ${
                        selectedEditionId === edition.id
                        ? 'bg-gamingOrange/10 border-gamingOrange shadow-lg shadow-gamingOrange/5'
                        : 'bg-white/5 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className={`font-bold text-sm ${selectedEditionId === edition.id ? 'text-gamingOrange' : 'text-white'}`}>
                          {edition.name}
                        </span>
                        <span className="font-black text-xs text-gamingOrange bg-gamingOrange/10 px-2 py-0.5 rounded">
                          {edition.price}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sección: Desglose Técnico */}
          <div className="bg-gamingCard rounded-2xl p-6 space-y-6 shadow-2xl border border-white/5">
            <h3 className="text-xl font-bold uppercase tracking-wider border-b border-white/5 pb-4 italic">
              Puntaje Técnico
            </h3>
            <div className="space-y-4">
              {Object.entries(game.breakdown).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between items-center mb-1 uppercase text-xs font-bold text-gray-400">
                    <span className="capitalize">{key}</span>
                    <span className="text-gamingOrange">{value}/10</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gamingOrange h-full rounded-full transition-all duration-1000"
                      style={{ width: `${value * 10}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sección: Especificaciones */}
          <div className="bg-gamingCard rounded-2xl p-6 space-y-6 shadow-2xl border border-white/5">
            <div className="flex items-center gap-2 text-xl font-bold uppercase tracking-wider border-b border-white/5 pb-4 italic">
              <Settings className="w-5 h-5 text-gamingOrange" />
              Especificaciones
            </div>
            <div className="space-y-4">
              {Object.entries(game.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0">
                  <span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">{key}</span>
                  <span className="text-gray-200 font-medium">{value || 'N/A'}</span>
                </div>
              ))}
              
              <div className="flex justify-between items-center text-sm pt-2">
                <span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Idiomas</span>
                <button 
                  onClick={() => setIsLangModalOpen(true)}
                  className="text-gamingOrange hover:text-white transition-colors font-bold flex items-center gap-1 group"
                >
                  Ver idiomas disponibles
                  <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Título, Acerca de, Mercado y Reseñas */}
        <div className="lg:col-span-2 space-y-10">
          <header className="animate-in fade-in slide-in-from-top duration-700">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="bg-gamingOrange px-3 py-1 rounded-full font-black text-xl shadow-lg shadow-gamingOrange/20">
                    {game.globalScore}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {game.platforms?.map((p) => (
                      <span key={p} className="text-[10px] bg-gamingOrange/10 border border-gamingOrange/30 text-gamingOrange px-3 py-1 rounded-md uppercase font-black">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <button 
                onClick={toggleWishlist}
                className={`p-3 rounded-full border transition-all duration-300 group shadow-xl ${
                  isWishlisted 
                  ? 'bg-red-500/10 border-red-500 shadow-red-500/5' 
                  : 'bg-white/5 border-white/10 hover:border-white/30'
                }`}
              >
                <Heart 
                  className={`w-6 h-6 transition-all duration-300 ${
                    isWishlisted 
                    ? 'fill-red-500 text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.6)]' 
                    : 'text-gray-400 group-hover:scale-110'
                  }`} 
                />
              </button>
            </div>

            <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none mb-6">
              {game.title}
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed italic border-l-4 border-gamingOrange pl-6 bg-white/5 py-4 rounded-r-xl">
              {game.description}
            </p>
          </header>

          {/* SECCIÓN DETALLADA: Contenido de la Edición */}
          {selectedEdition && selectedEdition.perks && (
            <section className="space-y-6 animate-in fade-in slide-in-from-bottom duration-700 delay-100">
              <div className="flex items-center gap-2 text-xl font-bold uppercase italic tracking-widest border-b border-white/5 pb-4">
                <Box className="text-gamingOrange" />
                Contenido de la {selectedEdition.name}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedEdition.perks.map((perk, idx) => (
                  <div key={idx} className="group bg-gamingCard border border-white/5 p-5 rounded-2xl hover:border-gamingOrange/50 transition-all duration-300 shadow-lg hover:shadow-gamingOrange/5">
                    <div className="flex items-start gap-4">
                      <div className="bg-gamingOrange/10 p-2 rounded-lg mt-1 group-hover:bg-gamingOrange/20 transition-colors">
                        <Check className="text-gamingOrange w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-black text-white uppercase tracking-tight text-lg mb-1 group-hover:text-gamingOrange transition-colors">
                          {perk.title}
                        </h5>
                        <p className="text-gray-400 text-sm leading-relaxed font-medium">
                          {perk.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Sección: Acerca de */}
          <section className="space-y-6 delay-200">
            <div className="flex items-center gap-2 text-xl font-bold uppercase italic tracking-widest border-b border-white/5 pb-4">
              <Info className="text-gamingOrange" />
              Acerca de este juego
            </div>
            <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
              {game.about}
            </p>
          </section>

          {/* Sección: Valor de Mercado (Interactiva con URLs) */}
          <section className="space-y-6 delay-300">
            <div className="flex items-center gap-2 text-xl font-bold uppercase italic tracking-widest border-b border-white/5 pb-4">
              <ShoppingBag className="text-gamingOrange" />
              Valor del Mercado (Ir a la tienda)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {game.marketPrices.map((market, idx) => (
                <a 
                  key={idx} 
                  href={market.url || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gamingCard border border-white/5 p-4 rounded-xl flex justify-between items-center hover:bg-white/5 hover:border-gamingOrange/50 transition-all group shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gamingOrange/10 p-2 rounded-lg group-hover:bg-gamingOrange/20 transition-colors">
                      <ExternalLink className="w-5 h-5 text-gamingOrange" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-gray-500 uppercase mb-0.5 tracking-widest">{market.availability}</div>
                      <div className="font-black text-lg group-hover:text-gamingOrange transition-colors uppercase italic">{market.store}</div>
                    </div>
                  </div>
                  <div className="text-2xl font-black text-gamingOrange">
                    {market.price}
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Sección: Reseñas */}
          <section className="space-y-6 delay-400">
            <div className="flex items-center gap-2 text-xl font-bold uppercase italic tracking-widest border-b border-white/5 pb-4">
              <MessageSquare className="text-gamingOrange" />
              Reseñas de Usuarios
            </div>

            <div className="space-y-4">
              {game.reviews && game.reviews.length > 0 ? game.reviews.map((review) => (
                <div key={review.id} className="bg-gamingCard rounded-xl p-6 border border-white/5 hover:border-white/10 transition-colors shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gamingOrange/20 rounded-full flex items-center justify-center font-bold text-gamingOrange">
                        {review.user?.[0] || '?'}
                      </div>
                      <span className="font-bold">{review.user}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gamingOrange font-bold">
                      <Star className="w-4 h-4 fill-gamingOrange" />
                      {review.score}
                    </div>
                  </div>
                  <p className="text-gray-300 italic">"{review.text}"</p>
                </div>
              )) : (
                <p className="text-gray-600 italic text-center py-10">Aún no hay reseñas para este título.</p>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* MODAL DE IDIOMAS DINÁMICO */}
      {isLangModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => {
              setIsLangModalOpen(false);
              setLangModalSearch('');
            }}
          ></div>
          <div className="relative bg-gamingCard border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <header className="p-6 border-b border-white/5">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <Globe className="text-gamingOrange" />
                  <h3 className="text-xl font-bold uppercase tracking-tighter italic">Idiomas Soportados</h3>
                  <span className="bg-gamingOrange/10 text-gamingOrange text-[10px] font-black px-2 py-0.5 rounded-md">
                    {game.languages?.length || 0} TOTAL
                  </span>
                </div>
                <button 
                  onClick={() => {
                    setIsLangModalOpen(false);
                    setLangModalSearch('');
                  }}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text"
                  placeholder="Buscar idioma..."
                  value={langSearch}
                  onChange={(e) => setLangModalSearch(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm font-bold focus:outline-none focus:border-gamingOrange transition-colors"
                />
              </div>
            </header>
            
            <div className="overflow-y-auto max-h-[60vh] custom-scrollbar">
              {filteredLanguages.length > 0 ? (
                <table className="w-full text-left">
                  <thead className="sticky top-0 bg-gamingCard z-10">
                    <tr className="bg-white/5 text-[10px] uppercase font-black tracking-widest text-gray-400">
                      <th className="px-6 py-4">Idioma</th>
                      <th className="px-6 py-4 text-center">Interfaz</th>
                      <th className="px-6 py-4 text-center">Voces</th>
                      <th className="px-6 py-4 text-center">Subtítulos</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredLanguages.map((l, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors group">
                        <td className="px-6 py-4 font-bold text-gray-200 group-hover:text-gamingOrange transition-colors">
                          {l.lang}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center">
                            {l.interface ? <Check className="text-green-500 w-5 h-5 drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]" /> : <X className="text-red-500 w-5 h-5 opacity-30" />}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center">
                            {l.voices ? <Check className="text-green-500 w-5 h-5 drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]" /> : <X className="text-red-500 w-5 h-5 opacity-30" />}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center">
                            {l.subs ? <Check className="text-green-500 w-5 h-5 drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]" /> : <X className="text-red-500 w-5 h-5 opacity-30" />}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="py-20 text-center space-y-4">
                  <Globe className="w-12 h-12 text-gray-700 mx-auto" />
                  <p className="text-gray-500 font-bold italic">No se encontró el idioma "{langSearch}"</p>
                </div>
              )}
            </div>
            
            <footer className="p-6 bg-white/5 text-center text-[10px] text-gray-500 font-black uppercase tracking-widest border-t border-white/5">
              * Base de datos sincronizada desde la nube
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDetails;
