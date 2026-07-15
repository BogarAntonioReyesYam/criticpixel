import { useState } from 'react';
import { User, Mail, Shield, Save, Camera, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import useSEO from '../hooks/useSEO';

export default function ProfilePage() {
  useSEO({
    title: 'Mi Perfil',
    description: 'Administra tu perfil de PixelVerdict.'
  });

  const { user, profile, updateProfile, isAdmin } = useAuth();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(profile?.display_name || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  if (!user) {
    navigate('/login');
    return null;
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const { error: err } = await updateProfile({ display_name: displayName });
    if (err) {
      setError(err.message);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
    setSaving(false);
  }

  const initials = (profile?.display_name || user.email)?.[0]?.toUpperCase() || '?';
  const memberSince = new Date(user.created_at).toLocaleDateString('es-MX', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gamingBg py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 mb-6 text-sm transition-colors ${isLight ? 'text-gray-600 hover:text-gamingOrange' : 'text-gray-400 hover:text-gamingOrange'}`}
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${isLight ? 'bg-white border-gray-200' : 'bg-gamingCard border-white/10'} rounded-2xl border p-6 shadow-xl`}
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gamingOrange/20 flex items-center justify-center">
                <span className="text-3xl font-black text-gamingOrange">{initials}</span>
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 bg-gamingOrange rounded-full text-white hover:bg-gamingOrange/80 transition-colors">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <h1 className={`text-2xl font-black ${isLight ? 'text-gray-900' : 'text-white'}`}>
                {profile?.display_name || 'Usuario'}
              </h1>
              <p className={`text-sm ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{user.email}</p>
              {isAdmin && (
                <span className="inline-flex items-center gap-1 mt-1 text-xs font-bold text-gamingOrange bg-gamingOrange/10 px-2 py-0.5 rounded-full">
                  <Shield className="w-3 h-3" />
                  Administrador
                </span>
              )}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
                Nombre de usuario
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className={`w-full rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-gamingOrange transition-colors ${
                    isLight
                      ? 'bg-gray-100 border-gray-200 text-gray-900'
                      : 'bg-white/5 border-white/10 text-white'
                  }`}
                  placeholder="Tu nombre"
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className={`w-full rounded-xl pl-10 pr-4 py-3 opacity-60 cursor-not-allowed ${
                    isLight
                      ? 'bg-gray-100 border-gray-200 text-gray-900'
                      : 'bg-white/5 border-white/10 text-white'
                  }`}
                />
              </div>
              <p className={`text-xs mt-1 ${isLight ? 'text-gray-400' : 'text-gray-600'}`}>
                El email no se puede cambiar
              </p>
            </div>

            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
                Miembro desde
              </label>
              <p className={`text-sm py-3 ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                {memberSince}
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            {saved && (
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                Perfil actualizado correctamente
              </div>
            )}

            <button
              type="submit"
              disabled={saving || displayName === (profile?.display_name || '')}
              className="w-full bg-gamingOrange hover:bg-gamingOrange/80 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Guardar cambios
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
