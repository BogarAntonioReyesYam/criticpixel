import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Users, MessageSquare, BookOpen, Camera, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

const actionIcons = {
  review: { icon: Star, color: 'text-yellow-400', label: 'reseñó' },
  wishlist: { icon: Heart, color: 'text-red-400', label: 'agregó a deseados' },
  follow: { icon: Users, color: 'text-blue-400', label: 'empezó a seguir a' },
  forum_post: { icon: MessageSquare, color: 'text-green-400', label: 'publicó en el foro' },
  guide: { icon: BookOpen, color: 'text-purple-400', label: 'publicó una guía' },
  screenshot: { icon: Camera, color: 'text-pink-400', label: 'compartió una captura' },
  achievement: { icon: Award, color: 'text-gamingOrange', label: 'desbloqueó' },
};

const ActivityFeed = ({ userId, limit = 20 }) => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchActivities = async () => {
    let query = supabase
      .from('activity_feed')
      .select('*, profiles:user_id(display_name, avatar_url)')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data } = await query;
    setActivities(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchActivities();
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `hace ${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `hace ${hrs}h`;
    return `hace ${Math.floor(hrs / 24)}d`;
  };

  const renderTarget = (activity) => {
    const meta = activity.metadata || {};
    switch (activity.action) {
      case 'review':
        return meta.game_title ? (
          <Link to={`/game/${meta.game_slug || meta.game_id}`} className="text-gamingOrange hover:underline font-bold">
            {meta.game_title}
          </Link>
        ) : <span className="text-gray-400">un juego</span>;
      case 'wishlist':
        return meta.game_title ? (
          <Link to={`/game/${meta.game_slug || meta.game_id}`} className="text-gamingOrange hover:underline font-bold">
            {meta.game_title}
          </Link>
        ) : <span className="text-gray-400">un juego</span>;
      case 'follow':
        return meta.following_name ? (
          <Link to={`/profile/${activity.target_id}`} className="text-gamingOrange hover:underline font-bold">
            {meta.following_name}
          </Link>
        ) : <span className="text-gray-400">un usuario</span>;
      case 'forum_post':
        return meta.thread_title ? (
          <Link to={`/forum/${activity.target_id}`} className="text-gamingOrange hover:underline font-bold">
            {meta.thread_title}
          </Link>
        ) : <span className="text-gray-400">un hilo</span>;
      case 'guide':
        return meta.guide_title ? (
          <Link to={`/guides/${activity.target_id}`} className="text-gamingOrange hover:underline font-bold">
            {meta.guide_title}
          </Link>
        ) : <span className="text-gray-400">una guía</span>;
      case 'screenshot':
        return <span className="text-gray-400">una captura</span>;
      case 'achievement':
        return meta.achievement_name ? (
          <span className="text-gamingOrange font-bold">{meta.achievement_name}</span>
        ) : <span className="text-gray-400">un logro</span>;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl animate-pulse">
            <div className="w-8 h-8 bg-white/10 rounded-full" />
            <div className="flex-1">
              <div className="h-3 bg-white/10 rounded w-2/3 mb-1" />
              <div className="h-2 bg-white/5 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {activities.length === 0 ? (
        <p className="text-gray-500 text-center py-8 text-sm">No hay actividad reciente</p>
      ) : (
        activities.map((activity) => {
          const action = actionIcons[activity.action] || actionIcons.review;
          const Icon = action.icon;
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
            >
              <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-4 h-4 ${action.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-300">
                  <Link to={`/profile/${activity.user_id}`} className="font-bold text-white hover:text-gamingOrange transition-colors">
                    {activity.profiles?.display_name || 'Usuario'}
                  </Link>{' '}
                  {action.label}{' '}
                  {renderTarget(activity)}
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" /> {timeAgo(activity.created_at)}
                </p>
              </div>
            </motion.div>
          );
        })
      )}
    </div>
  );
};

export default ActivityFeed;
