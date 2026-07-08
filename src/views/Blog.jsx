import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Clock, Search } from 'lucide-react';
import { mockArticles, categories } from '../data/mockArticles';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = mockArticles.filter(article => {
    const matchesCategory = selectedCategory === 'Todos' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gamingOrange transition-colors mb-8">
          <ChevronLeft className="w-5 h-5" />
          Volver al catalogo
        </Link>

        <div className="mb-10 space-y-2">
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Blog & <span className="text-gamingOrange">Noticias</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Noticias, guias y analisis del mundo gaming.</p>
        </div>

        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar articulos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-[#1d1d1d] border border-gray-200 dark:border-white/5 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-gamingOrange transition-colors text-sm text-gray-900 dark:text-white"
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
                  : 'bg-white dark:bg-[#1d1d1d] text-gray-500 hover:text-gamingOrange border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10'
              }`}
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
                  className="group bg-white dark:bg-[#1d1d1d] rounded-2xl border border-gray-200 dark:border-white/5 hover:border-gamingOrange/30 overflow-hidden transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-72 h-48 md:h-auto relative overflow-hidden flex-shrink-0">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/80 dark:to-[#1d1d1d]/80 hidden md:block" />
                      <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#1d1d1d] to-transparent md:hidden" />
                    </div>
                    <div className="flex-1 p-6 space-y-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="bg-gamingOrange/10 text-gamingOrange text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                          {article.category}
                        </span>
                        <span className="text-gray-400 text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {article.readTime}
                        </span>
                        <span className="text-gray-400 text-xs">{article.date}</span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-gamingOrange transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex gap-2 pt-2">
                        {article.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[9px] bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded text-gray-500 border border-gray-200 dark:border-white/5 uppercase font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
                <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-bold italic">No se encontraron articulos.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Blog;
