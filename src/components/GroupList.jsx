import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

const GroupList = ({ type }) => {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGroups = async () => {
    let query = supabase.from('groups').select('*').order('member_count', { ascending: false });
    if (type) query = query.eq('type', type);
    const { data } = await query;
    setGroups(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchGroups();
  }, [type]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gamingCard rounded-2xl p-5 border border-white/5 animate-pulse">
            <div className="h-5 bg-white/10 rounded w-2/3 mb-3" />
            <div className="h-3 bg-white/5 rounded w-full mb-2" />
            <div className="h-3 bg-white/5 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {groups.map((group) => (
        <motion.div
          key={group.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gamingCard rounded-2xl p-5 border border-white/5 hover:border-gamingOrange/20 transition-all"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <Link to={`/groups/${group.slug}`} className="font-bold text-white hover:text-gamingOrange transition-colors">
                {group.name}
              </Link>
              <p className="text-xs text-gray-500 mt-1">{group.description}</p>
            </div>
            {group.type === 'genre' && <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded">Género</span>}
            {group.type === 'platform' && <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">Plataforma</span>}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Users className="w-3 h-3" /> {group.member_count} miembros
            </span>
            <Link to={`/groups/${group.slug}`} className="text-xs text-gamingOrange font-bold flex items-center gap-1 hover:underline">
              Ver <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default GroupList;
