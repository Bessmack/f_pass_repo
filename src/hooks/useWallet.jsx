import { useState, useEffect, useCallback } from 'react';
import walletService from '../services/walletService';

export const useWallet = () => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWallet = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await walletService.getWallet();
      setWallet(data);
      return data;
    } catch (err) {
      setError(err.error || 'Failed to fetch wallet');
      console.error('Wallet fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWallet();
  }, [fetchWallet]);

  const addFunds = async (amount, note = '', method = 'card') => {
    try {
      setLoading(true);
      setError(null);
      const data = await walletService.addFunds(amount, note, method);
      setWallet(data.wallet);
      return data;
    } catch (err) {
      setError(err.error || 'Failed to add funds');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refreshWallet = () => {
    return fetchWallet();
  };

  return {
    wallet,
    loading,
    error,
    addFunds,
    refreshWallet,
    balance: wallet?.balance || 0,
    walletId: wallet?.wallet_id || ''
  };
};

export default useWallet;