import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export function usePriceAlerts() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAlerts = useCallback(async () => {
    if (!user) {
      setAlerts([]);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from('price_alerts')
      .select('*')
      .eq('user_id', user.id)
      .eq('active', true);
    if (!error && data) setAlerts(data);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  const hasActiveAlert = useCallback((gameId) => {
    return alerts.some(a => a.game_id === gameId);
  }, [alerts]);

  const createAlert = useCallback(async (gameId, targetPrice) => {
    if (!user) return { error: 'No autenticado' };
    const { data, error } = await supabase
      .from('price_alerts')
      .upsert(
        { user_id: user.id, game_id: gameId, target_price: targetPrice, active: true },
        { onConflict: 'user_id,game_id' }
      )
      .select()
      .single();
    if (!error && data) {
      setAlerts(prev => {
        const exists = prev.find(a => a.game_id === gameId);
        if (exists) return prev.map(a => a.game_id === gameId ? data : a);
        return [...prev, data];
      });
    }
    return { data, error };
  }, [user]);

  const removeAlert = useCallback(async (gameId) => {
    if (!user) return { error: 'No autenticado' };
    const { error } = await supabase
      .from('price_alerts')
      .update({ active: false })
      .eq('user_id', user.id)
      .eq('game_id', gameId);
    if (!error) {
      setAlerts(prev => prev.filter(a => a.game_id !== gameId));
    }
    return { error };
  }, [user]);

  return { alerts, loading, hasActiveAlert, createAlert, removeAlert, refreshAlerts: fetchAlerts };
}
