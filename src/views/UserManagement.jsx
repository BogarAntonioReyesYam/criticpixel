import { useState, useEffect } from 'react';
import { Users, Search, Shield, Ban, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useToast } from '../context/ToastContext';

const UserManagement = () => {
  const { addToast } = useToast();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingUser, setUpdatingUser] = useState(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    setUsers(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(u =>
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.display_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleRole = async (userId, currentRole) => {
    setUpdatingUser(userId);
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);
      if (error) throw error;
      addToast(`Rol cambiado a ${newRole}`, 'success');
      fetchUsers();
    } catch (err) {
      addToast('Error: ' + err.message, 'error');
    } finally {
      setUpdatingUser(null);
    }
  };

  const toggleBan = async (userId, isBanned) => {
    setUpdatingUser(userId);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          is_banned: !isBanned,
          banned_at: !isBanned ? new Date().toISOString() : null,
        })
        .eq('id', userId);
      if (error) throw error;
      addToast(isBanned ? 'Usuario desbaneado' : 'Usuario baneado', 'success');
      fetchUsers();
    } catch (err) {
      addToast('Error: ' + err.message, 'error');
    } finally {
      setUpdatingUser(null);
    }
  };

  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    banned: users.filter(u => u.is_banned).length,
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-gamingCard rounded-xl p-4 border border-white/5 animate-pulse flex items-center gap-4">
            <div className="w-10 h-10 bg-white/5 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-white/5 rounded w-1/3" />
              <div className="h-3 bg-white/5 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black italic tracking-tighter uppercase flex items-center gap-2">
          <Users className="w-6 h-6 text-gamingOrange" />
          Gestión de <span className="text-gamingOrange">Usuarios</span>
        </h2>
        <p className="text-gray-500 text-sm">{stats.total} usuarios registrados</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gamingCard rounded-xl p-4 border border-white/5 text-center">
          <p className="text-2xl font-black text-white">{stats.total}</p>
          <p className="text-[10px] text-gray-500 uppercase font-bold">Total</p>
        </div>
        <div className="bg-gamingCard rounded-xl p-4 border border-white/5 text-center">
          <p className="text-2xl font-black text-gamingOrange">{stats.admins}</p>
          <p className="text-[10px] text-gray-500 uppercase font-bold">Admins</p>
        </div>
        <div className="bg-gamingCard rounded-xl p-4 border border-white/5 text-center">
          <p className="text-2xl font-black text-red-400">{stats.banned}</p>
          <p className="text-[10px] text-gray-500 uppercase font-bold">Baneados</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Buscar por email o nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gamingCard border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-gamingOrange transition-colors"
        />
      </div>

      <div className="space-y-2">
        {filteredUsers.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`bg-gamingCard rounded-xl p-4 border flex items-center gap-4 transition-colors ${
              user.is_banned ? 'border-red-500/30 bg-red-500/5' : 'border-white/5'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
              user.role === 'admin' ? 'bg-gamingOrange/20 text-gamingOrange' : 'bg-white/10 text-gray-400'
            }`}>
              {user.display_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || '?'}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-bold text-white text-sm truncate">{user.display_name || 'Sin nombre'}</p>
                {user.role === 'admin' && (
                  <span className="text-[9px] bg-gamingOrange/20 text-gamingOrange px-1.5 py-0.5 rounded font-bold">ADMIN</span>
                )}
                {user.is_banned && (
                  <span className="text-[9px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded font-bold">BANEADO</span>
                )}
              </div>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleRole(user.id, user.role)}
                disabled={updatingUser === user.id}
                className={`p-2 rounded-lg text-xs font-bold transition-all ${
                  user.role === 'admin'
                    ? 'bg-gamingOrange/10 text-gamingOrange hover:bg-gamingOrange/20'
                    : 'bg-white/5 text-gray-400 hover:text-gamingOrange hover:bg-gamingOrange/10'
                }`}
                title={user.role === 'admin' ? 'Quitar admin' : 'Hacer admin'}
              >
                <Shield className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleBan(user.id, user.is_banned)}
                disabled={updatingUser === user.id}
                className={`p-2 rounded-lg text-xs font-bold transition-all ${
                  user.is_banned
                    ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                    : 'bg-white/5 text-gray-400 hover:text-red-400 hover:bg-red-500/10'
                }`}
                title={user.is_banned ? 'Desbanear' : 'Banear'}
              >
                {user.is_banned ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
