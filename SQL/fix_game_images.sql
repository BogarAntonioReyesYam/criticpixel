-- Corregir imágenes rotas o incorrectas en la DB
-- Metaphor: ReFantazio - Steam app 2679460 (NO 2124800)
UPDATE games SET image = 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2679460/header.jpg' WHERE id = 24;
-- DOOM: The Dark Ages - Steam 3017860
UPDATE games SET image = 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3017860/header.jpg' WHERE id = 29;
-- Fable - Steam 2769570
UPDATE games SET image = 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2769570/header.jpg' WHERE id = 31;
-- Borderlands 4 - Steam 1285190
UPDATE games SET image = 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1285190/header.jpg' WHERE id = 33;
-- Gears of War: E-Day - Steam 3010850
UPDATE games SET image = 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3010850/header.jpg' WHERE id = 35;
-- Death Stranding 2 - Steam 3280350 (needs hash)
UPDATE games SET image = 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3280350/6270c77b0729e2df0a17d660286eeddfd9169386/header.jpg?t=1774022345' WHERE id = 40;
