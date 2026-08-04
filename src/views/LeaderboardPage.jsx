import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import LeaderboardComponent from '../components/Leaderboard';
import useSEO from '../hooks/useSEO';

const LeaderboardPage = () => {
  useSEO({ title: 'Leaderboard', description: 'Ranking de los mejores usuarios de CriticPixel' });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/community" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gamingOrange transition-colors mb-6">
        ← Volver a Comunidad
      </Link>
      <div className="flex items-center gap-3 mb-8">
        <Trophy className="w-6 h-6 text-gamingOrange" />
        <h1 className="text-3xl font-black italic tracking-tighter uppercase">Leaderboard <span className="text-gamingOrange">Global</span></h1>
      </div>

      <div className="bg-gamingCard rounded-2xl border border-white/5 p-6 shadow-2xl">
        <LeaderboardComponent limit={50} />
      </div>
    </div>
  );
};

export default LeaderboardPage;
