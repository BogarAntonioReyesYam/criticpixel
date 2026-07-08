import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Clock, Search } from 'lucide-react';
import { mockArticles, categories } from '../data/mockArticles';
import { useTheme } from '../context/ThemeContext';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();

  const filteredArticles = mockArticles.filter(article => {
    const matchesCategory = selectedCategory === 'Todos' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const cardStyle = { 
    backgroundColor: theme === 'dark' ? '#1d1d1d' : '#ffffff',
    border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`,
    boxShadow: theme === 'dark' ? '0 2px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.05)'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link to="/" className="inline-flex items-center gap-2 text-gamingMuted hover:text-gamingOrange transition-colors mb-8">
          <ChevronLeft className="w-5 h-5" />
          Volver al catalogo
        </Link>

        <div className="mb-10 space-y-2">
          <h1 className="text-4xl font-black italic tracking-tighter uppercase text-gamingText dark:text-white">
            Blog & <span className="text-gamingOrange">Noticias</span>
          </h1>
          <p className="text-gamingMuted">Noticias, guias y analisis del mundo gaming.</p>
        </div>

        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gamingMuted" />
          <input
            type="text"
            placeholder="Buscar articulos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-gamingOrange/50 transition-all text-sm text-gamingText dark:text-white"
            style={{ 
              backgroundColor: theme === 'dark' ? '#1d1d1d' : '#ffffff',
              border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)'}`
            }}
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                selectedCategory === cat
                  ? 'bg-gamingOrange text-white shadow-lg shadow-gamingOrange/20'
                  : 'text-gamingMuted hover:text-gamingOrange'
              }`}
              style={selectedCategory !== cat ? { 
                backgroundColor: theme === 'dark' ? '#1d1d1d' : '#ffffff',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`
              } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + searchTerm}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, i) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="group rounded-2xl overflow-hidden transition-all duration-300 hover:border-gamingOrange/30"
                  style={cardStyle}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-72 h-48 md:h-auto relative overflow-hidden flex-shrink-0">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent hidden md:block"
                           style={{ 
                             background: `linear-gradient(to right, transparent, ${theme === 'dark' ? '#1d1d1d' : '#ffffff'}ee)`
                           }} />
                      <div className="absolute inset-0 bg-gradient-to-t md:hidden"
                           style={{ 
                             background: `linear-gradient(to top, ${theme === 'dark' ? '#1d1d1d' : '#ffffff'}, transparent)`
                           }} />
                    </div>
                    <div className="flex-1 p-6 space-y-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="bg-gamingOrange/10 text-gamingOrange text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                          {article.category}
                        </span>
                        <span className="text-xs flex items-center gap-1 text-gamingMuted">
                          <Clock className="w-3 h-3" /> {article.readTime}
                        </span>
                        <span className="text-xs text-gamingMuted">{article.date}</span>
                      </div>
                      <h2 className="text-xl font-bold group-hover:text-gamingOrange transition-colors text-gamingText dark:text-white">
                        {article.title}
                      </h2>
                      <p className="text-sm leading-relaxed line-clamp-2 text-gamingMuted">
                        {article.excerpt}
                      </p>
                      <div className="flex gap-2 pt-2">
                        {article.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[9px] px-2 py-0.5 rounded uppercase font-medium text-gamingMuted"
                                style={{ 
                                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                                  border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`
                                }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="text-center py-20 rounded-3xl"
                   style={{ 
                     backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                     border: `2px dashed ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
                   }}>
                <Search className="w-12 h-12 mx-auto mb-4 text-gamingMuted opacity-50" />
                <p className="text-lg font-bold italic text-gamingMuted">No se encontraron articulos.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Blog;
