import api from './api';

export const walletService = {
  /**
   * Get user's wallet information
   */
  getWallet: async () => {
    try {
      const response = await api.get('/wallet');
      return response.data.wallet;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to get wallet' };
    }
  },
  /**
   * Get user's transaction information
   */
  getTransactions: async () => {
    const response = await api.get("/transactions");
    return response.data.transactions;
  },

  /**
   * Add funds to wallet
   */
  addFunds: async (amount, note = '', method = 'card') => {
    try {
      const response = await api.post('/wallet/add-funds', {
        amount: parseFloat(amount),
        note,
        method
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to add funds' };
    }
  },

  /**
   * Format currency
   */
  formatCurrency: (amount, currency = 'USD') => {
    const symbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      KES: 'KSh'
    };
    
    const symbol = symbols[currency] || currency;
    return `${symbol}${parseFloat(amount).toFixed(2)}`;
  }
};

export default walletService;