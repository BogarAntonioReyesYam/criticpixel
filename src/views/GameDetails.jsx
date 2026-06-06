import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Star, MessageSquare, ShoppingBag, Globe } from 'lucide-react';
import { mockGames } from '../data/mockGames';

const GameDetails = () => {
  const { id } = useParams();
  const game = mockGames.find((g) => g.id === parseInt(id));

  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold mb-4">Juego no encontrado</h2>
        <Link to="/" className="text-gamingOrange hover:underline">Volver al Inicio</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Botón Volver */}
      <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
        <ChevronLeft className="w-5 h-5" />
        Volver a la lista
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Columna Izquierda: Imagen y Desglose */}
        <div className="lg:col-span-1 space-y-8">
          <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <img src={game.image} alt={game.title} className="w-full h-auto" />
          </div>

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
        </div>

        {/* Columna Derecha: Título, Desc, Valor de Mercado y Reseñas */}
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
            <p className="text-xl text-gray-400 leading-relaxed">
              {game.description}
            </p>
          </header>

          {/* NUEVA SECCIÓN: Valor de Mercado */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-xl font-bold uppercase italic tracking-widest border-b border-white/5 pb-4">
              <ShoppingBag className="text-gamingOrange" />
              Valor del Mercado
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {game.marketPrices.map((market, idx) => (
                <div key={idx} className="bg-gamingCard border border-white/5 p-4 rounded-xl flex justify-between items-center hover:bg-white/5 transition-colors group">
                  <div>
                    <div className="text-xs font-bold text-gray-500 uppercase mb-1">{market.availability}</div>
                    <div className="font-black text-lg group-hover:text-gamingOrange transition-colors">{market.store}</div>
                  </div>
                  <div className="text-2xl font-black text-gamingOrange">
                    {market.price}
                  </div>
                </div>
              ))}
            </div>
          </section>

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
    </div>
  );
};

export default GameDetails;
