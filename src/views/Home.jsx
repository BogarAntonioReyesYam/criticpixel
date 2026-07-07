import { useState, useMemo, useEffect } from 'react';
import { ChevronDown, SortAsc, SortDesc, Type, LayoutGrid, Monitor, Laptop, Gamepad2, Disc, Search as SearchIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { mockGames } from '../data/mockGames';
import GameCard from '../components/GameCard';

const Home = ({ searchQuery }) => {

  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('score-desc');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Cargar juegos desde Supabase
  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('games')
        .select('*');
      
      if (!error && data && data.length > 0) {
        const formattedData = data.map(g => ({
          ...g,
          globalScore: parseFloat(g.global_score)
        }));
        setGames(formattedData);
      } else {
        if (error) console.error('Supabase error:', error);
        setGames(mockGames);
      }
      setIsLoading(false);
    };

    fetchGames();
  }, []);

  const sortOptions = [
    { id: 'score-desc', label: 'Mayor a Menor (Puntaje)', icon: <SortDesc className="w-4 h-4" /> },
    { id: 'score-asc', label: 'Menor a Mayor (Puntaje)', icon: <SortAsc className="w-4 h-4" /> },
    { id: 'alpha-asc', label: 'A-Z (Nombre)', icon: <Type className="w-4 h-4" /> },
    { id: 'alpha-desc', label: 'Z-A (Nombre)', icon: <Type className="w-4 h-4" /> },
  ];

  const platforms = [
    { id: 'all', label: 'Todo', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'PC', label: 'PC', icon: <Monitor className="w-4 h-4" /> },
    { id: 'PS5', label: 'PlayStation', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'Xbox', label: 'Xbox', icon: <Laptop className="w-4 h-4" /> },
    { id: 'Switch', label: 'Nintendo', icon: <Disc className="w-4 h-4" /> },
  ];

  const filteredAndSortedGames = useMemo(() => {
    let result = [...games];

    // Filtrado por búsqueda de texto
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(game =>
        game.title?.toLowerCase().includes(q) ||
        game.description?.toLowerCase().includes(q) ||
        game.about?.toLowerCase().includes(q) ||
        game.platforms?.some(p => p.toLowerCase().includes(q)) ||
        game.specs?.genero?.toLowerCase().includes(q) ||
        game.specs?.desarrollador?.toLowerCase().includes(q) ||
        game.specs?.editor?.toLowerCase().includes(q) ||
        game.editions?.some(e => e.name?.toLowerCase().includes(q)) ||
        game.reviews?.some(r => r.text?.toLowerCase().includes(q) || r.user?.toLowerCase().includes(q))
      );
    }

    // Filtrado por plataforma
    if (platformFilter !== 'all') {
      result = result.filter(game => 
        game.platforms?.some(p => p.includes(platformFilter))
      );
    }

    // Ordenamiento
    return result.sort((a, b) => {
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
  }, [sortOrder, platformFilter, games, searchQuery]);

  const currentSortOption = sortOptions.find(opt => opt.id === sortOrder);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gamingOrange shadow-[0_0_15px_rgba(255,107,0,0.4)]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-10 space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">
              Reseñas <span className="text-gamingOrange">Populares</span>
            </h1>
            <p className="text-gray-400">Explora los títulos más destacados de la industria desde la nube.</p>
            {searchQuery && (
              <p className="text-sm text-gamingOrange font-bold mt-1">
                {filteredAndSortedGames.length} resultado{filteredAndSortedGames.length !== 1 ? 's' : ''} para "<span className="text-white">{searchQuery}</span>"
              </p>
            )}
          </div>

          {/* Selector de Orden */}
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-gamingCard border border-white/10 px-4 py-2 rounded-lg hover:border-gamingOrange transition-colors min-w-[220px] justify-between"
            >
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                {currentSortOption.icon}
                {currentSortOption.label}
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-full bg-gamingCard border border-white/10 rounded-lg shadow-xl z-20 overflow-hidden">
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
        </div>

        {/* Filtros de Plataforma estilo Instant-Gaming */}
        <div className="flex flex-wrap gap-2 p-1 bg-gamingCard/50 border border-white/5 rounded-xl w-fit">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => setPlatformFilter(p.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                platformFilter === p.id 
                ? 'bg-gamingOrange text-white shadow-lg shadow-gamingOrange/20' 
                : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {p.icon}
              {p.label}
            </button>
          ))}
        </div>
      </header>

      {filteredAndSortedGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {filteredAndSortedGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gamingCard/30 rounded-3xl border border-dashed border-white/10">
          <SearchIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          {searchQuery ? (
            <p className="text-gray-500 text-xl font-bold italic">No se encontraron resultados para "<span className="text-gamingOrange">{searchQuery}</span>".</p>
          ) : (
            <p className="text-gray-500 text-xl font-bold italic">No hay juegos disponibles para esta plataforma.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
