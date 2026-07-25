import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const ReviewTags = ({ reviewId }) => {
  const { user } = useAuth();
  const [tags, setTags] = useState([]);
  const [userVotes, setUserVotes] = useState([]);

  const fetchTags = async () => {
    const { data: allTags } = await supabase.from('review_tags').select('*');
    const { data: votes } = await supabase
      .from('review_tag_votes')
      .select('tag_id')
      .eq('review_id', reviewId);

    const votedIds = (votes || []).map((v) => v.tag_id);
    setUserVotes(votedIds);
    setTags(allTags || []);
  };

  useEffect(() => {
    fetchTags();
  }, [reviewId]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleTag = async (tagId) => {
    if (!user) return;

    if (userVotes.includes(tagId)) {
      await supabase
        .from('review_tag_votes')
        .delete()
        .eq('review_id', reviewId)
        .eq('tag_id', tagId)
        .eq('user_id', user.id);
      setUserVotes((prev) => prev.filter((id) => id !== tagId));
    } else {
      await supabase.from('review_tag_votes').insert({
        review_id: reviewId,
        tag_id: tagId,
        user_id: user.id,
      });
      setUserVotes((prev) => [...prev, tagId]);
    }
  };

  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {tags.map((tag) => {
        const isSelected = userVotes.includes(tag.id);
        return (
          <button
            key={tag.id}
            onClick={() => toggleTag(tag)}
            className={`flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-full transition-all ${
              isSelected
                ? 'text-white'
                : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300'
            }`}
            style={isSelected ? { backgroundColor: tag.color + '40', color: tag.color } : {}}
          >
            {tag.icon && <span>{tag.icon}</span>}
            {tag.name}
          </button>
        );
      })}
    </div>
  );
};

export default ReviewTags;
