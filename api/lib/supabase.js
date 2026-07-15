import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, '../../.env') });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || 'https://pddczazavyhpdikgemav.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default supabase;
