import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const WishlistContext = createContext();

const STORAGE_KEY = 'pixelVerdict_wishlist';

export const WishlistProvider = ({ children }) => {
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
      if (prev.includes(gameId)) {
        return prev.filter(id => id !== gameId);
      }
      return [...prev, gameId];
    });
  }, []);

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
