import { useState, useEffect, useCallback } from 'react';
import transactionService from '../services/transactionService';

export const useTransactions = (type = 'all', limit = 50) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.getTransactions(type, limit);
      setTransactions(data);
      return data;
    } catch (err) {
      setError(err.error || 'Failed to fetch transactions');
      console.error('Transactions fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [type, limit]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const sendMoney = async (receiverId, amount, note = '') => {
    try {
      setError(null);
      const data = await transactionService.sendMoney(receiverId, amount, note);
      // Refresh transactions after sending money
      await fetchTransactions();
      return data;
    } catch (err) {
      setError(err.error || 'Failed to send money');
      throw err;
    }
  };

  const refreshTransactions = () => {
    return fetchTransactions();
  };

  // Calculate statistics
  const stats = {
    totalSent: transactions
      .filter(t => t.type === 'transfer' && t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0),
    totalReceived: transactions
      .filter(t => t.type !== 'add_funds' && t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0),
    sentCount: transactions.filter(t => t.type === 'transfer' && t.amount < 0).length,
    receivedCount: transactions.filter(t => t.type !== 'add_funds' && t.amount > 0).length
  };

  return {
    transactions,
    loading,
    error,
    sendMoney,
    refreshTransactions,
    stats
  };
};

export default useTransactions;