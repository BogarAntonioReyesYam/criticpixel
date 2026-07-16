import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Procesando autenticación...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Session error:', error);
          setStatus('Error al obtener sesión. Redirigiendo...');
          setTimeout(() => navigate('/login', { replace: true }), 2000);
          return;
        }

        if (session) {
          navigate('/', { replace: true });
        } else {
          navigate('/login', { replace: true });
        }
      } catch (err) {
        console.error('Callback error:', err);
        setStatus('Error inesperado. Redirigiendo...');
        setTimeout(() => navigate('/login', { replace: true }), 2000);
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
