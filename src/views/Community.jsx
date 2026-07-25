import { Link } from 'react-router-dom';
import { Users, MessageSquare, BookOpen, Camera, Trophy, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import ActivityFeed from '../components/ActivityFeed';
import Leaderboard from '../components/Leaderboard';
import CommunityAchievements from '../components/CommunityAchievements';
import useSEO from '../hooks/useSEO';

const Community = () => {
  useSEO({ title: 'Comunidad', description: 'Únete a la comunidad de CriticPixel — foros, guías, rankings y más' });

  const sections = [
    { title: 'Foro', desc: 'Discute sobre tus juegos favoritos', icon: MessageSquare, link: '/forum', color: 'text-blue-400' },
    { title: 'Grupos', desc: 'Únete a clans por género o plataforma', icon: Users, link: '/groups', color: 'text-purple-400' },
    { title: 'Artículos', desc: 'Noticias y opiniones de la comunidad', icon: BookOpen, link: '/articles', color: 'text-green-400' },
    { title: 'Guías', desc: 'Guías creadas por jugadores', icon: BookOpen, link: '/community-guides', color: 'text-yellow-400' },
    { title: 'Screenshots', desc: 'Capturas compartidas por juego', icon: Camera, link: '/screenshots', color: 'text-pink-400' },
    { title: 'Rankings', desc: 'Top usuarios de la comunidad', icon: Trophy, link: '/leaderboard', color: 'text-gamingOrange' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-6 h-6 text-gamingOrange" />
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">
            Comunidad <span className="text-gamingOrange">CriticPixel</span>
          </h1>
        </div>
        <p className="text-gray-400 text-sm">Conecta con otros jugadores, comparte y aprende</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        {sections.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link to={s.link} className="block bg-gamingCard rounded-2xl p-5 border border-white/5 hover:border-gamingOrange/20 transition-all group text-center">
                <Icon className={`w-6 h-6 ${s.color} mx-auto mb-2`} />
                <p className="font-bold text-white text-sm group-hover:text-gamingOrange transition-colors">{s.title}</p>
                <p className="text-[10px] text-gray-500 mt-1">{s.desc}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div>
          <h2 className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-gamingOrange" /> Actividad Reciente
          </h2>
          <div className="bg-gamingCard rounded-2xl border border-white/5 p-4 max-h-[400px] overflow-y-auto">
            <ActivityFeed limit={15} />
          </div>
        </div>
        <div>
          <h2 className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-2 mb-4">
            <Trophy className="w-4 h-4 text-gamingOrange" /> Top Usuarios
          </h2>
          <div className="bg-gamingCard rounded-2xl border border-white/5 p-4 max-h-[400px] overflow-y-auto">
            <Leaderboard limit={10} />
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-2 mb-4">
          <Trophy className="w-4 h-4 text-gamingOrange" /> Logros Comunitarios
        </h2>
        <CommunityAchievements />
      </div>
    </div>
  );
};

export default Community;
