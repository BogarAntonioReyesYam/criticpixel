import { useState, useEffect } from 'react';
import { UserPlus, UserMinus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const FollowButton = ({ targetUserId, onFollowChange }) => {
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    if (user && targetUserId) {
      checkFollow();
      fetchFollowerCount();
    }
  }, [user, targetUserId]);

  const checkFollow = async () => {
    const { data } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_id', user.id)
      .eq('following_id', targetUserId)
      .single();
    setIsFollowing(!!data);
  };

  const fetchFollowerCount = async () => {
    const { count } = await supabase
      .from('follows')
      .select('id', { count: 'exact', head: true })
      .eq('following_id', targetUserId);
    setFollowerCount(count || 0);
  };

  const toggleFollow = async () => {
    if (!user) return;

    if (isFollowing) {
      await supabase
        .from('follows')
        .delete()
        .eq('follower_id', user.id)
        .eq('following_id', targetUserId);
      setIsFollowing(false);
      setFollowerCount((prev) => prev - 1);
    } else {
      await supabase.from('follows').insert({
        follower_id: user.id,
        following_id: targetUserId,
      });
      setIsFollowing(true);
      setFollowerCount((prev) => prev + 1);
      onFollowChange?.();
    }
  };

  if (!user || user.id === targetUserId) return null;

  return (
    <button
      onClick={toggleFollow}
      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
        isFollowing
          ? 'bg-white/10 text-gray-300 hover:bg-red-500/20 hover:text-red-400'
          : 'bg-gamingOrange text-white hover:bg-gamingOrange/80'
      }`}
    >
      {isFollowing ? (
        <>
          <UserMinus className="w-3 h-3" /> Siguiendo ({followerCount})
        </>
      ) : (
        <>
          <UserPlus className="w-3 h-3" /> Seguir ({followerCount})
        </>
      )}
    </button>
  );
};

export default FollowButton;
