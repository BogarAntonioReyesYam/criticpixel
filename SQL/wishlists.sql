-- Wishlists table: one row per user per game
CREATE TABLE IF NOT EXISTS wishlists (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  game_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, game_id)
);

-- Enable RLS
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

-- Users can only see their own wishlist
CREATE POLICY "Users can view own wishlist" ON wishlists
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert into their own wishlist
CREATE POLICY "Users can add to own wishlist" ON wishlists
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can delete from their own wishlist
CREATE POLICY "Users can remove from own wishlist" ON wishlists
  FOR DELETE USING (auth.uid() = user_id);
