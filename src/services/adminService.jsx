import api from './api';

export const adminService = {
  /**
   * Get all users
   */
  getAllUsers: async () => {
    try {
      const response = await api.get('/admin/users');
      return response.data.users;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to get users' };
    }
  },

  /**
   * Get user by ID
   */
  getUserById: async (id) => {
    try {
      const response = await api.get(`/admin/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to get user' };
    }
  },

  /**
   * Update user
   */
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/admin/users/${id}`, userData);
      return response.data.user;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to update user' };
    }
  },

  /**
   * Delete user
   */
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/admin/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to delete user' };
    }
  },

  /**
   * Get all wallets
   */
  getAllWallets: async () => {
    try {
      const response = await api.get('/admin/wallets');
      return response.data.wallets;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to get wallets' };
    }
  },

  /**
   * Adjust wallet balance
   */
  adjustWalletBalance: async (walletId, action, amount) => {
    try {
      const response = await api.post(`/admin/wallets/${walletId}/adjust`, {
        action, // 'add' or 'deduct'
        amount: parseFloat(amount)
      });
      return response.data.wallet;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to adjust wallet' };
    }
  },

  /**
   * Get all transactions
   */
  getAllTransactions: async (limit = 100, offset = 0) => {
    try {
      const response = await api.get('/admin/transactions', {
        params: { limit, offset }
      });
      return response.data.transactions;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to get transactions' };
    }
  },

  /**
   * Get system statistics
   */
  getStats: async () => {
    try {
      const response = await api.get('/admin/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to get statistics' };
    }
  }
};

export default adminService;