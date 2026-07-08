import { useState } from 'react';
import { SlidersHorizontal, X, ChevronDown, DollarSign, Calendar, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const genres = [
  'Todos', 'Acción', 'RPG', 'Mundo Abierto', 'Horror', 'Shooter',
  'Aventura', 'JRPG', 'Roguelike', 'Plataformas', 'Acción / Mundo Abierto',
  'RPG de Acción', 'Action RPG', 'Survival Horror', 'Aventura / FPS',
  'Acción / Exploración', 'Survival Horror / Misterio', 'Acción / Aventura'
];

const priceRanges = [
  { id: 'all', label: 'Todos los precios' },
  { id: '0-800', label: 'Menos de $800' },
  { id: '800-1200', label: '$800 - $1,200' },
  { id: '1200-1500', label: '$1,200 - $1,500' },
  { id: '1500+', label: 'Más de $1,500' },
];

const dateRanges = [
  { id: 'all', label: 'Todas las fechas' },
  { id: '2023', label: '2023' },
  { id: '2024', label: '2024' },
  { id: '2025', label: '2025' },
  { id: '2026', label: '2026' },
  { id: 'future', label: 'Próximamente' },
];

const AdvancedFilters = ({ filters, onFilterChange, activeFilterCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const handleGenreChange = (genre) => {
    onFilterChange({ ...filters, genre });
  };

  const handlePriceChange = (priceRange) => {
    onFilterChange({ ...filters, priceRange });
  };

  const handleDateChange = (dateRange) => {
    onFilterChange({ ...filters, dateRange });
  };

  const clearFilters = () => {
    onFilterChange({ genre: 'Todos', priceRange: 'all', dateRange: 'all' });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
          activeFilterCount > 0
            ? 'bg-gamingOrange text-white shadow-lg shadow-gamingOrange/20'
            : isLight
              ? 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
              : 'bg-gamingCard text-gray-400 border border-white/10 hover:text-white hover:border-gamingOrange/30'
        }`}
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filtros
        {activeFilterCount > 0 && (
          <span className="bg-white text-gamingOrange text-xs font-bold px-1.5 py-0.5 rounded-full">
            {activeFilterCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute right-0 mt-2 w-80 rounded-xl shadow-2xl z-30 overflow-hidden border ${
              isLight ? 'bg-white border-gray-200' : 'bg-gamingCard border-white/10'
            }`}
          >
            <div className={`flex items-center justify-between p-4 border-b ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
              <h3 className={`font-bold text-sm uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
                Filtros Avanzados
              </h3>
              <div className="flex items-center gap-2">
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-gamingOrange hover:underline font-bold"
                  >
                    Limpiar
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className={`p-1 rounded-full transition-colors ${isLight ? 'hover:bg-gray-100' : 'hover:bg-white/10'}`}
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
              {/* Genre Filter */}
              <div>
                <label className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2 ${isLight ? 'text-gray-500' : 'text-gamingMuted'}`}>
                  <Tag className="w-3 h-3" />
                  Género
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => handleGenreChange(genre)}
                      className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                        filters.genre === genre
                          ? 'bg-gamingOrange text-white'
                          : isLight
                            ? 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                            : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <label className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2 ${isLight ? 'text-gray-500' : 'text-gamingMuted'}`}>
                  <DollarSign className="w-3 h-3" />
                  Precio
                </label>
                <div className="space-y-1">
                  {priceRanges.map((range) => (
                    <button
                      key={range.id}
                      onClick={() => handlePriceChange(range.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-all ${
                        filters.priceRange === range.id
                          ? 'bg-gamingOrange text-white'
                          : isLight
                            ? 'text-gray-600 hover:bg-gray-100'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Filter */}
              <div>
                <label className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2 ${isLight ? 'text-gray-500' : 'text-gamingMuted'}`}>
                  <Calendar className="w-3 h-3" />
                  Fecha de Lanzamiento
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {dateRanges.map((range) => (
                    <button
                      key={range.id}
                      onClick={() => handleDateChange(range.id)}
                      className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                        filters.dateRange === range.id
                          ? 'bg-gamingOrange text-white'
                          : isLight
                            ? 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                            : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedFilters;
