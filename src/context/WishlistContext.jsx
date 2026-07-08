import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useToast } from './ToastContext';
import { mockGames } from '../data/mockGames';

const WishlistContext = createContext();

const STORAGE_KEY = 'pixelVerdict_wishlist';

export const WishlistProvider = ({ children }) => {
  const { addToast } = useToast();
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const toggleWishlist = useCallback((gameId) => {
    setWishlistIds(prev => {
      const isRemoving = prev.includes(gameId);
      const game = mockGames.find(g => g.id === gameId);
      const name = game?.title || 'Juego';

      if (isRemoving) {
        addToast(`${name} eliminado de tu lista`, 'unwishlist');
        return prev.filter(id => id !== gameId);
      }

      addToast(`${name} agregado a tu lista`, 'wishlist');
      return [...prev, gameId];
    });
  }, [addToast]);

  const isWishlisted = useCallback((gameId) => {
    return wishlistIds.includes(gameId);
  }, [wishlistIds]);

  const count = wishlistIds.length;

  return (
    <WishlistContext.Provider value={{ wishlistIds, toggleWishlist, isWishlisted, count }}>
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
