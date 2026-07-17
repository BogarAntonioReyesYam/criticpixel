import { useState } from 'react';
import { Users, Gamepad2, Monitor, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import GroupList from '../components/GroupList';
import useSEO from '../hooks/useSEO';

const Groups = () => {
  useSEO({ title: 'Grupos', description: 'Únete a grupos de la comunidad por género o plataforma' });
  const [filter, setFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'Todos', icon: Globe },
    { key: 'genre', label: 'Por Género', icon: Gamepad2 },
    { key: 'platform', label: 'Por Plataforma', icon: Monitor },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Users className="w-6 h-6 text-gamingOrange" />
        <h1 className="text-3xl font-black italic tracking-tighter uppercase">Grupos <span className="text-gamingOrange">Comunidad</span></h1>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {filters.map((f) => {
          const Icon = f.icon;
          return (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${filter === f.key ? 'bg-gamingOrange text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
              <Icon className="w-3 h-3" /> {f.label}
            </button>
          );
        })}
      </div>

      <GroupList type={filter === 'all' ? null : filter} />
    </div>
  );
};

export default Groups;
