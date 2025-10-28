import api from './api';

export const transactionService = {
  /**
   * Send money to another user
   */
  sendMoney: async (receiverId, amount, note = '') => {
    try {
      const response = await api.post('/transactions/send', {
        receiver_id: parseInt(receiverId),
        amount: parseFloat(amount),
        note
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to send money' };
    }
  },

  /**
   * Get transaction history
   * @param {string} type - 'all', 'sent', or 'received'
   * @param {number} limit - Number of transactions to fetch
   * @param {number} offset - Offset for pagination
   */
  getTransactions: async (type = 'all', limit = 50, offset = 0) => {
    try {
      const response = await api.get('/transactions', {
        params: { type, limit, offset }
      });
      return response.data.transactions;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to get transactions' };
    }
  },

  /**
   * Get specific transaction by ID
   */
  getTransactionById: async (id) => {
    try {
      const response = await api.get(`/transactions/${id}`);
      return response.data.transaction;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to get transaction' };
    }
  },

  /**
   * Calculate transaction fee
   */
  calculateFee: (amount) => {
    const feeRate = 0.005; // 0.5%
    return parseFloat(amount) * feeRate;
  },

  /**
   * Calculate total amount with fee
   */
  calculateTotal: (amount) => {
    const fee = transactionService.calculateFee(amount);
    return parseFloat(amount) + fee;
  },

  /**
   * Format transaction date
   */
  formatDate: (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};

export default transactionService;