import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Star, MessageSquare, ShoppingBag, Info, Settings, Globe, Check, X, Box } from 'lucide-react';
import { mockGames } from '../data/mockGames';

const GameDetails = () => {
  const { id } = useParams();
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const game = mockGames.find((g) => g.id === parseInt(id));
  
  // Estado para la edición seleccionada (por defecto la primera)
  const [selectedEditionId, setSelectedEditionId] = useState(game?.editions?.[0]?.id || 'std');

  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold mb-4">Juego no encontrado</h2>
        <Link to="/" className="text-gamingOrange hover:underline">Volver al Inicio</Link>
      </div>
    );
  }

  const selectedEdition = game.editions?.find(e => e.id === selectedEditionId) || game.editions?.[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Botón Volver */}
      <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
        <ChevronLeft className="w-5 h-5" />
        Volver a la lista
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Columna Izquierda: Imagen, Selector de Ediciones, Desglose y Specs */}
        <div className="lg:col-span-1 space-y-8">
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <img src={game.image} alt={game.title} className="w-full h-auto" />
            </div>

            {/* SELECTOR DE EDICIONES (Debajo de la imagen) */}
            {game.editions && game.editions.length > 0 && (
              <div className="bg-gamingCard rounded-2xl p-4 border border-white/5 space-y-3">
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
          <div className="bg-gamingCard rounded-2xl p-6 space-y-6">
            <h3 className="text-xl font-bold uppercase tracking-wider border-b border-white/5 pb-4">
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

          {/* Sección: Especificaciones (Estilo Instant-Gaming) */}
          <div className="bg-gamingCard rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-2 text-xl font-bold uppercase tracking-wider border-b border-white/5 pb-4">
              <Settings className="w-5 h-5 text-gamingOrange" />
              Especificaciones
            </div>
            <div className="space-y-4">
              {Object.entries(game.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0">
                  <span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">{key}</span>
                  <span className="text-gray-200 font-medium">{value}</span>
                </div>
              ))}
              
              {/* Botón Ver Idiomas */}
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
          <header>
            <div className="flex items-center gap-4 mb-2">
              <span className="bg-gamingOrange px-3 py-1 rounded-full font-black text-xl">
                {game.globalScore}
              </span>
              <div className="flex flex-wrap gap-2">
                {game.platforms.map((p) => (
                  <span key={p} className="text-[10px] bg-gamingOrange/10 border border-gamingOrange/30 text-gamingOrange px-3 py-1 rounded-md uppercase font-black">
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none mb-6">
              {game.title}
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed italic border-l-4 border-gamingOrange pl-6 bg-white/5 py-4 rounded-r-xl">
              {game.description}
            </p>
          </header>

          {/* NUEVA SECCIÓN: Contenido de la Edición (Paquetes) */}
          {selectedEdition && selectedEdition.perks && (
            <section className="space-y-6">
              <div className="flex items-center gap-2 text-xl font-bold uppercase italic tracking-widest border-b border-white/5 pb-4">
                <Box className="text-gamingOrange" />
                ¿Qué incluye esta edición?
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedEdition.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                    <Check className="text-green-500 w-5 h-5 flex-shrink-0" />
                    <span className="text-gray-200 font-bold">{perk}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Sección: Acerca de */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-xl font-bold uppercase italic tracking-widest border-b border-white/5 pb-4">
              <Info className="text-gamingOrange" />
              Acerca de este juego
            </div>
            <p className="text-gray-300 leading-relaxed text-lg">
              {game.about}
            </p>
          </section>

          {/* Sección: Valor de Mercado */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-xl font-bold uppercase italic tracking-widest border-b border-white/5 pb-4">
              <ShoppingBag className="text-gamingOrange" />
              Valor del Mercado (Edición Seleccionada)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {game.marketPrices.map((market, idx) => (
                <div key={idx} className="bg-gamingCard border border-white/5 p-4 rounded-xl flex justify-between items-center hover:bg-white/5 transition-colors group">
                  <div>
                    <div className="text-xs font-bold text-gray-500 uppercase mb-1">{market.availability}</div>
                    <div className="font-black text-lg group-hover:text-gamingOrange transition-colors">{market.store}</div>
                  </div>
                  <div className="text-2xl font-black text-gamingOrange">
                    {selectedEditionId === 'std' ? market.price : selectedEdition?.price}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sección: Reseñas */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-xl font-bold uppercase italic tracking-widest border-b border-white/5 pb-4">
              <MessageSquare className="text-gamingOrange" />
              Reseñas de Usuarios
            </div>

            <div className="space-y-4">
              {game.reviews.map((review) => (
                <div key={review.id} className="bg-gamingCard rounded-xl p-6 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gamingOrange/20 rounded-full flex items-center justify-center font-bold text-gamingOrange">
                        {review.user[0]}
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
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* MODAL DE IDIOMAS */}
      {isLangModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsLangModalOpen(false)}
          ></div>
          <div className="relative bg-gamingCard border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl">
            <header className="p-6 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Globe className="text-gamingOrange" />
                <h3 className="text-xl font-bold uppercase tracking-tighter italic">Idiomas Soportados</h3>
              </div>
              <button 
                onClick={() => setIsLangModalOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </header>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 text-[10px] uppercase font-black tracking-widest text-gray-400">
                    <th className="px-6 py-4">Idioma</th>
                    <th className="px-6 py-4 text-center">Interfaz</th>
                    <th className="px-6 py-4 text-center">Voces</th>
                    <th className="px-6 py-4 text-center">Subtítulos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {game.languages?.map((l, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-200">{l.lang}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center">
                          {l.interface ? <Check className="text-green-500 w-5 h-5" /> : <X className="text-red-500 w-5 h-5" />}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center">
                          {l.voices ? <Check className="text-green-500 w-5 h-5" /> : <X className="text-red-500 w-5 h-5" />}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center">
                          {l.subs ? <Check className="text-green-500 w-5 h-5" /> : <X className="text-red-500 w-5 h-5" />}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <footer className="p-6 bg-white/5 text-center text-xs text-gray-500 font-medium">
              * La disponibilidad de idiomas puede variar según la región de compra.
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDetails;
