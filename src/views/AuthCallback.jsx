import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    }).catch((err) => {
      console.error('Auth callback error:', err);
      setError(err.message);
      setTimeout(() => navigate('/login', { replace: true }), 3000);
    });
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-gamingBg flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-2">Error al autenticar</p>
          <p className="text-gray-500 text-sm">{error}</p>
          <p className="text-gray-600 text-xs mt-4">Redirigiendo al login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gamingBg flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-gamingOrange border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Autenticando...</p>
      </div>
    </div>
  );
}
