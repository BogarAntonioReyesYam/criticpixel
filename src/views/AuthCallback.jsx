import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Procesando autenticación...');

  useEffect(() => {
    console.log('[AuthCallback] Mounted, URL:', window.location.href);
    const handleCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log('[AuthCallback] session:', session, 'error:', error);

        if (error) {
          console.error('[AuthCallback] Session error:', error);
          setStatus(`Error: ${error.message}. Redirigiendo...`);
          setTimeout(() => navigate('/login', { replace: true }), 3000);
          return;
        }

        if (session) {
          console.log('[AuthCallback] Session found, redirecting to /');
          navigate('/', { replace: true });
        } else {
          console.log('[AuthCallback] No session, redirecting to /login');
          navigate('/login', { replace: true });
        }
      } catch (err) {
        console.error('[AuthCallback] Unexpected error:', err);
        setStatus(`Error inesperado: ${err.message}. Redirigiendo...`);
        setTimeout(() => navigate('/login', { replace: true }), 3000);
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gamingBg flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-gamingOrange border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">{status}</p>
      </div>
    </div>
  );
}
