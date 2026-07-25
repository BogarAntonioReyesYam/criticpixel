import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';

const WishlistContext = createContext();
const STORAGE_KEY = 'criticpixel_wishlist';

export const WishlistProvider = ({ children }) => {
  const { addToast } = useToast();
  const { user } = useAuth();
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load wishlist when user changes
  useEffect(() => {
    async function load() {
      if (user) {
        const { data } = await supabase
          .from('wishlists')
          .select('game_id')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true });

        const ids = (data || []).map(r => r.game_id);

        // Migrate localStorage items into Supabase
        try {
          const local = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
          if (local.length > 0) {
            const toInsert = local
              .filter(id => !ids.includes(id))
              .map(id => ({ user_id: user.id, game_id: id }));
            if (toInsert.length > 0) {
              await supabase.from('wishlists').upsert(toInsert, { onConflict: 'user_id,game_id' });
              const merged = [...ids, ...toInsert.map(r => r.game_id)];
              setWishlistIds(merged);
              localStorage.removeItem(STORAGE_KEY);
            } else {
              setWishlistIds(ids);
            }
          } else {
            setWishlistIds(ids);
          }
        } catch {
          setWishlistIds(ids);
        }
      } else {
        // Not logged in: use localStorage
        try {
          setWishlistIds(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
        } catch {
          setWishlistIds([]);
        }
      }
      setLoaded(true);
    }
    load();
  }, [user]);

  // Sync localStorage for non-logged-in users
  useEffect(() => {
    if (!user && loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistIds));
    }
  }, [wishlistIds, user, loaded]);

  const toggleWishlist = useCallback(async (gameId, gameName) => {
    const isRemoving = wishlistIds.includes(gameId);
    const name = gameName || 'Juego';

    if (user) {
      if (isRemoving) {
        await supabase
          .from('wishlists')
          .delete()
          .eq('user_id', user.id)
          .eq('game_id', gameId);
      } else {
        await supabase
          .from('wishlists')
          .upsert({ user_id: user.id, game_id: gameId }, { onConflict: 'user_id,game_id' });
      }
    }

    setWishlistIds(prev => {
      if (isRemoving) {
        addToast(`${name} eliminado de tu lista`, 'unwishlist');
        return prev.filter(id => id !== gameId);
      }
      addToast(`${name} agregado a tu lista`, 'wishlist');
      return [...prev, gameId];
    });
  }, [wishlistIds, user, addToast]);

  const isWishlisted = useCallback((gameId) => {
    return wishlistIds.includes(gameId);
  }, [wishlistIds]);

  const count = wishlistIds.length;

  return (
    <WishlistContext.Provider value={{ wishlistIds, toggleWishlist, isWishlisted, count, loaded }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
