import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const usePageView = (gameId = null) => {
  const location = useLocation();

  useEffect(() => {
    const trackView = async () => {
      try {
        await supabase.from('page_views').insert({
          page: location.pathname,
          game_id: gameId ? parseInt(gameId) : null,
          created_at: new Date().toISOString(),
        });
      } catch (_err) {
        // Silent fail for analytics
      }
    };

    trackView();
  }, [location.pathname, gameId]);
};

export default usePageView;
