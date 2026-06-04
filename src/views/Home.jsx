import { useState, useMemo } from 'react';
import { ChevronDown, SortAsc, SortDesc, Type } from 'lucide-react';
import { mockGames } from '../data/mockGames';
import GameCard from '../components/GameCard';

const Home = () => {
  const [sortOrder, setSortOrder] = useState('score-desc');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortOptions = [
    { id: 'score-desc', label: 'Mayor a Menor (Puntaje)', icon: <SortDesc className="w-4 h-4" /> },
    { id: 'score-asc', label: 'Menor a Mayor (Puntaje)', icon: <SortAsc className="w-4 h-4" /> },
    { id: 'alpha-asc', label: 'A-Z (Nombre)', icon: <Type className="w-4 h-4" /> },
    { id: 'alpha-desc', label: 'Z-A (Nombre)', icon: <Type className="w-4 h-4" /> },
  ];

  const sortedGames = useMemo(() => {
    return [...mockGames].sort((a, b) => {
      switch (sortOrder) {
        case 'score-desc':
          return b.globalScore - a.globalScore;
        case 'score-asc':
          return a.globalScore - b.globalScore;
        case 'alpha-asc':
          return a.title.localeCompare(b.title);
        case 'alpha-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }, [sortOrder]);

  const currentOption = sortOptions.find(opt => opt.id === sortOrder);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">
            Reseñas <span className="text-gamingOrange">Populares</span>
          </h1>
          <p className="text-gray-400">Las calificaciones más esperadas por la comunidad.</p>
        </div>

        {/* Selector de Orden */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 bg-gamingCard border border-white/10 px-4 py-2 rounded-lg hover:border-gamingOrange transition-colors min-w-[220px] justify-between"
          >
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
              {currentOption.icon}
              {currentOption.label}
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-full bg-gamingCard border border-white/10 rounded-lg shadow-xl z-10 overflow-hidden">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setSortOrder(option.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-4 py-3 text-sm font-bold uppercase tracking-wider hover:bg-white/5 transition-colors text-left ${
                    sortOrder === option.id ? 'text-gamingOrange' : 'text-gray-400'
                  }`}
                >
                  {option.icon}
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default Home;
