import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
  return (
    <Link 
      to={`/game/${game.id}`}
      className="group relative bg-gamingCard rounded shadow-2xl transition-all duration-200 hover:-translate-y-1 block border border-transparent hover:border-gamingOrange/50 overflow-hidden"
    >
      {/* Contenedor de Imagen Denso */}
      <div className="aspect-[3/4] relative overflow-hidden">
        <img 
          src={game.image} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay de gradiente para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
        
        {/* Badge de Puntaje Estilo IG */}
        <div className="absolute top-2 left-2 bg-gamingOrange text-white font-black px-2 py-0.5 rounded-sm text-sm shadow-lg skew-x-[-10deg]">
          {game.globalScore}
        </div>
      </div>

      {/* Información Compacta */}
      <div className="p-2.5 space-y-1.5">
        <h3 className="font-bold text-sm leading-tight line-clamp-2 h-9 group-hover:text-gamingOrange transition-colors">
          {game.title}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {game.platforms.slice(0, 2).map((p) => (
              <span key={p} className="text-[9px] bg-white/5 px-1 rounded-sm text-gamingMuted border border-white/5 uppercase font-medium">
                {p === "Xbox Series X" ? "XSX" : p}
              </span>
            ))}
          </div>
          <span className="text-[10px] text-gamingOrange font-bold uppercase tracking-tighter">
            Ver Reseña
          </span>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
