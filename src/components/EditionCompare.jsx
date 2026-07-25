import { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const EditionCompare = ({ editions }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  if (!editions || editions.length < 2) return null;

  const allPerks = [...new Set(editions.flatMap(e => e.perks?.map(p => p.title || p) || []))];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border overflow-hidden ${
        isLight ? 'bg-white border-gray-200' : 'bg-gamingCard/50 border-white/10'
      }`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex items-center justify-between p-4 transition-colors ${
          isLight ? 'hover:bg-gray-50' : 'hover:bg-white/5'
        }`}
      >
        <h3 className={`font-black text-sm uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
          Comparar Ediciones
        </h3>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gamingOrange" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gamingOrange" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-t ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
                    <th className={`text-left text-xs font-bold uppercase tracking-wider p-3 ${isLight ? 'text-gray-500' : 'text-gamingMuted'}`}>
                      Beneficio
                    </th>
                    {editions.map((ed) => (
                      <th key={ed.id} className="text-center p-3">
                        <div className="text-xs font-black text-gamingOrange">{ed.name}</div>
                        <div className={`text-sm font-bold mt-1 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                          {ed.price}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allPerks.map((perk, _i) => (
                    <tr key={perk} className={`border-t ${isLight ? 'border-gray-100' : 'border-white/5'}`}>
                      <td className={`text-xs p-3 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                        {perk}
                      </td>
                      {editions.map((ed) => {
                        const hasPerk = ed.perks?.some(p => (p.title || p) === perk);
                        return (
                          <td key={ed.id} className="text-center p-3">
                            {hasPerk ? (
                              <Check className="w-4 h-4 text-green-500 mx-auto" />
                            ) : (
                              <X className="w-4 h-4 text-gray-600 mx-auto" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EditionCompare;
