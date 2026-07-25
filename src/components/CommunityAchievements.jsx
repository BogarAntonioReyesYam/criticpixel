import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

const CommunityAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAchievements = async () => {
    const { data } = await supabase
      .from('community_achievements')
      .select('*')
      .order('target_count', { ascending: true });
    setAchievements(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gamingCard rounded-2xl p-5 border border-white/5 animate-pulse">
            <div className="h-10 w-10 bg-white/10 rounded-xl mb-3" />
            <div className="h-4 bg-white/10 rounded w-2/3 mb-2" />
            <div className="h-3 bg-white/5 rounded w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {achievements.map((ach) => {
        const progress = Math.min((ach.current_count / ach.target_count) * 100, 100);
        const isComplete = ach.completed || progress >= 100;
        return (
          <motion.div
            key={ach.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gamingCard rounded-2xl p-5 border transition-all ${
              isComplete ? 'border-gamingOrange/30 shadow-lg shadow-gamingOrange/10' : 'border-white/5'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isComplete ? 'bg-gamingOrange/20' : 'bg-white/5'
              }`}>
                <span className="text-xl">{ach.icon}</span>
              </div>
              <div>
                <h3 className={`font-bold text-sm ${isComplete ? 'text-gamingOrange' : 'text-white'}`}>
                  {ach.name}
                </h3>
                <p className="text-xs text-gray-500">{ach.description}</p>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">{ach.current_count} / {ach.target_count}</span>
                <span className={`font-bold ${isComplete ? 'text-gamingOrange' : 'text-gray-400'}`}>
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={`h-full rounded-full ${
                    isComplete ? 'bg-gamingOrange' : 'bg-gray-600'
                  }`}
                />
              </div>
            </div>
            {isComplete && (
              <p className="text-xs text-gamingOrange mt-2 font-bold">🏆 ¡Completado!</p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default CommunityAchievements;
