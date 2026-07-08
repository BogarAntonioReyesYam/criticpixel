import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Star, MessageSquare, ShoppingBag, Info, Settings, Globe, Check, X, Box, Search, Heart, ExternalLink, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { mockGames } from '../data/mockGames';
import GameCard from '../components/GameCard';
import { useWishlist } from '../context/WishlistContext';

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [langSearch, setLangModalSearch] = useState('');
  const [selectedEditionId, setSelectedEditionId] = useState(null);
  const { isWishlisted, toggleWishlist } = useWishlist();


  useEffect(() => {
    const fetchGameDetails = async () => {
      setIsLoading(true);

      const { data: gameData, error: gameError } = await supabase
        .from('games')
        .select('*')
        .eq('id', id)
        .single();

      if (gameError || !gameData) {
        const fallback = mockGames.find(g => g.id === parseInt(id));
        if (fallback) {
          setGame(fallback);
          setSelectedEditionId(fallback.editions?.[0]?.id);
          const wishlist = JSON.parse(localStorage.getItem('pixelVerdict_wishlist') || '[]');
          setIsWishlisted(wishlist.includes(fallback.id));
        }
        setIsLoading(false);
        return;
      }

      const { data: scoreData } = await supabase
        .from('score_breakdown')
        .select('jugabilidad, graficos, historia')
        .eq('game_id', id)
        .single();

      const { data: marketData } = await supabase
        .from('market_prices')
        .select('*')
        .eq('game_id', id);

      const { data: editionsData } = await supabase
        .from('editions')
        .select('*, edition_perks(*)')
        .eq('game_id', id);

      const { data: langsData } = await supabase
        .from('game_languages')
        .select('*')
        .eq('game_id', id);

      const { data: reviewsData } = await supabase
        .from('game_reviews')
        .select('*')
        .eq('game_id', id);

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
          url: m.store_url
        })) || []
      };

      const mockFallback = mockGames.find(g => g.id === parseInt(id));
      if (mockFallback?.trailer) {
        fullGame.trailer = mockFallback.trailer;
      }

      setGame(fullGame);
      setSelectedEditionId(fullGame.editions?.[0]?.id);

      setIsLoading(false);
    };

    fetchGameDetails();
  }, [id]);

  const filteredLanguages = useMemo(() => {
    if (!game?.languages) return [];
    return game.languages.filter(l =>
      l.lang.toLowerCase().includes(langSearch.toLowerCase())
    );
  }, [game, langSearch]);

  const similarGames = useMemo(() => {
    if (!game) return [];
    return mockGames
      .filter(g => g.id !== game.id && g.platforms?.some(p => game.platforms?.includes(p)))
      .slice(0, 4);
  }, [game]);

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

  const getScoreColor = (score) => {
    if (score >= 9) return '#ff6b00';
    if (score >= 7) return '#facc15';
    if (score >= 5) return '#f97316';
    return '#ef4444';
  };

  const getScoreLabel = (score) => {
    if (score >= 9.5) return 'Obra Maestra';
    if (score >= 9) return 'Excepcional';
    if (score >= 8) return 'Excelente';
    if (score >= 7) return 'Muy Bueno';
    if (score >= 6) return 'Bueno';
    return 'Regular';
  };

  const circumference = 2 * Math.PI * 42;
  const scoreOffset = circumference - (game.globalScore / 10) * circumference;

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-[60vh] min-h-[400px] overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: `url(${game.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gamingBg via-gamingBg/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-gamingBg/80 to-transparent" />

        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-end pb-12">
          <div className="flex items-end gap-8 w-full">
            {/* Score circular */}
            <div className="hidden md:flex flex-shrink-0">
              <div className="relative w-28 h-28">
                <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none" />
                  <circle
                    cx="50" cy="50" r="42"
                    stroke={getScoreColor(game.globalScore)}
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={scoreOffset}
                    className="transition-all duration-1000 ease-out"
                    style={{ filter: `drop-shadow(0 0 8px ${getScoreColor(game.globalScore)}40)` }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-white">{game.globalScore}</span>
                  <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">/ 10</span>
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="md:hidden bg-gamingOrange px-3 py-1 rounded-full font-black text-lg shadow-lg shadow-gamingOrange/20">
                  {game.globalScore}
                </span>
                <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border" style={{ borderColor: getScoreColor(game.globalScore), color: getScoreColor(game.globalScore), backgroundColor: `${getScoreColor(game.globalScore)}15` }}>
                  {getScoreLabel(game.globalScore)}
                </span>
                {game.platforms?.map((p) => (
                  <span key={p} className="text-[10px] bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-md uppercase font-black">
                    {p}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none mb-4 drop-shadow-2xl">
                {game.title}
              </h1>

              <p className="text-lg text-gray-300 leading-relaxed max-w-2xl drop-shadow-lg">
                {game.description}
              </p>
            </div>

            {/* Acciones */}
            <div className="flex-shrink-0 flex gap-3">
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => toggleWishlist(game.id)}
                className={`p-3 rounded-full backdrop-blur-sm border transition-all ${
                  isWishlisted(game.id)
                    ? 'bg-red-500/20 border-red-500/50'
                    : 'bg-white/10 border-white/20 hover:bg-white/20'
                }`}
                title="Añadir a deseados"
              >
                <Heart className={`w-5 h-5 ${isWishlisted(game.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* TRAILER */}
      {game.trailer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="max-w-4xl mx-auto px-4 -mt-6 mb-8 relative z-10"
        >
          <div className="bg-gamingCard rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-white/5 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-xs font-black uppercase tracking-widest text-gray-500">Trailer Oficial</span>
            </div>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${game.trailer}`}
                title={`${game.title} Trailer`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 py-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Columna Izquierda */}
          <div className="lg:col-span-1 space-y-8">
            {/* Imagen del juego */}
            <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 group">
              <img
                src={game.image}
                alt={game.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop";
                }}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Selector de ediciones */}
            {game.editions && game.editions.length > 0 && (
              <div className="bg-gamingCard rounded-2xl p-5 border border-white/5 space-y-4 shadow-2xl">
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

            {/* Desglose técnico */}
            <div className="bg-gamingCard rounded-2xl p-6 space-y-6 shadow-2xl border border-white/5">
              <h3 className="text-lg font-bold uppercase tracking-wider border-b border-white/5 pb-4 italic">
                Puntaje Técnico
              </h3>
              <div className="space-y-5">
                {Object.entries(game.breakdown).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="capitalize text-xs font-bold text-gray-400 uppercase tracking-widest">{key}</span>
                      <span className="text-sm font-black" style={{ color: getScoreColor(value) }}>{value}/10</span>
                    </div>
                    <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${value * 10}%`,
                          background: `linear-gradient(90deg, ${getScoreColor(value)}80, ${getScoreColor(value)})`,
                          boxShadow: `0 0 10px ${getScoreColor(value)}40`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Especificaciones */}
            <div className="bg-gamingCard rounded-2xl p-6 space-y-5 shadow-2xl border border-white/5">
              <div className="flex items-center gap-2 text-lg font-bold uppercase tracking-wider border-b border-white/5 pb-4 italic">
                <Settings className="w-4 h-4 text-gamingOrange" />
                Especificaciones
              </div>
              <div className="space-y-3">
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
                    Ver idiomas
                    <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha */}
          <div className="lg:col-span-2 space-y-10">
            {/* Contenido de edición */}
            {selectedEdition && selectedEdition.perks && (
              <section className="space-y-5">
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

            {/* Acerca de */}
            <section className="space-y-5">
              <div className="flex items-center gap-2 text-xl font-bold uppercase italic tracking-widest border-b border-white/5 pb-4">
                <Info className="text-gamingOrange" />
                Acerca de este juego
              </div>
              <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
                {game.about}
              </p>
            </section>

            {/* Mercado */}
            {game.marketPrices && game.marketPrices.length > 0 && (
              <section className="space-y-5">
                <div className="flex items-center gap-2 text-xl font-bold uppercase italic tracking-widest border-b border-white/5 pb-4">
                  <ShoppingBag className="text-gamingOrange" />
                  Valor del Mercado
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {game.marketPrices.map((market, idx) => (
                    <a
                      key={idx}
                      href={market.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gamingCard border border-white/5 p-5 rounded-xl flex justify-between items-center hover:bg-white/5 hover:border-gamingOrange/50 transition-all group shadow-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-gamingOrange/10 p-2.5 rounded-lg group-hover:bg-gamingOrange/20 transition-colors">
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
            )}

            {/* Reseñas */}
            <section className="space-y-5">
              <div className="flex items-center gap-2 text-xl font-bold uppercase italic tracking-widest border-b border-white/5 pb-4">
                <MessageSquare className="text-gamingOrange" />
                Reseñas de Usuarios
                {game.reviews?.length > 0 && (
                  <span className="bg-gamingOrange/10 text-gamingOrange text-xs font-black px-2 py-0.5 rounded-md ml-2">
                    {game.reviews.length}
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {game.reviews && game.reviews.length > 0 ? game.reviews.map((review) => (
                  <div key={review.id} className="bg-gamingCard rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all shadow-lg group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ background: `linear-gradient(135deg, ${getScoreColor(review.score)}80, ${getScoreColor(review.score)})` }}>
                          {review.user?.[0]?.toUpperCase() || '?'}
                        </div>
                        <div>
                          <span className="font-bold text-white">{review.user}</span>
                          <div className="flex items-center gap-1 mt-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${i < Math.round(review.score / 2) ? 'fill-gamingOrange text-gamingOrange' : 'text-gray-600'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 bg-gamingOrange/10 px-3 py-1.5 rounded-lg">
                        <Star className="w-4 h-4 fill-gamingOrange text-gamingOrange" />
                        <span className="font-black text-gamingOrange">{review.score}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 italic leading-relaxed">"{review.text}"</p>
                  </div>
                )) : (
                  <p className="text-gray-600 italic text-center py-10">Aún no hay reseñas para este título.</p>
                )}
              </div>
            </section>

            {/* Juegos Similares */}
            {similarGames.length > 0 && (
              <section className="space-y-5">
                <div className="flex items-center gap-2 text-xl font-bold uppercase italic tracking-widest border-b border-white/5 pb-4">
                  <Users className="text-gamingOrange" />
                  Juegos Similares
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {similarGames.map((g) => (
                    <GameCard key={g.id} game={g} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </motion.div>

      {/* MODAL DE IDIOMAS */}
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
