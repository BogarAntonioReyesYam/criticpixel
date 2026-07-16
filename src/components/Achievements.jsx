import { useState, useEffect } from 'react';
import { Award, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const Achievements = ({ userId }) => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState([]);
  const [userAchievements, setUserAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const { data: allAchievements } = await supabase
        .from('achievements')
        .select('*');

      if (userId || user) {
        const { data: unlocked } = await supabase
          .from('user_achievements')
          .select('achievement_id, unlocked_at')
          .eq('user_id', userId || user?.id);

        setUserAchievements(unlocked || []);
      }

      setAchievements(allAchievements || []);
      setIsLoading(false);
    };

    fetchData();
  }, [userId, user]);

  const isUnlocked = (achievementId) => {
    return userAchievements.some(ua => ua.achievement_id === achievementId);
  };

  const getUnlockedDate = (achievementId) => {
    const ua = userAchievements.find(ua => ua.achievement_id === achievementId);
    if (ua) {
      return new Date(ua.unlocked_at).toLocaleDateString('es-MX');
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gamingCard rounded-xl p-4 border border-white/5 animate-pulse">
            <div className="w-12 h-12 bg-white/5 rounded-full mx-auto mb-3" />
            <div className="h-4 bg-white/5 rounded w-3/4 mx-auto mb-2" />
            <div className="h-3 bg-white/5 rounded w-1/2 mx-auto" />
          </div>
        ))}
      </div>
    );
  }

  const unlockedCount = achievements.filter(a => isUnlocked(a.id)).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold uppercase tracking-wider flex items-center gap-2">
          <Award className="w-5 h-5 text-gamingOrange" />
          Logros
        </h3>
        <span className="text-xs font-bold text-gray-500 bg-white/5 px-3 py-1 rounded-full">
          {unlockedCount}/{achievements.length}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {achievements.map((achievement, i) => {
          const unlocked = isUnlocked(achievement.id);
          const date = getUnlockedDate(achievement.id);

          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`relative rounded-xl p-4 border text-center transition-all ${
                unlocked
                  ? 'bg-gamingOrange/10 border-gamingOrange/30 shadow-lg shadow-gamingOrange/10'
                  : 'bg-gamingCard border-white/5 opacity-50'
              }`}
            >
              {!unlocked && (
                <div className="absolute top-2 right-2">
                  <Lock className="w-3 h-3 text-gray-600" />
                </div>
              )}
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <h4 className={`font-bold text-sm ${unlocked ? 'text-gamingOrange' : 'text-gray-500'}`}>
                {achievement.name}
              </h4>
              <p className="text-[10px] text-gray-500 mt-1">{achievement.description}</p>
              {date && (
                <p className="text-[9px] text-gamingOrange/70 mt-2 font-bold">{date}</p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;
