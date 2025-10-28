import api from './api';

export const beneficiaryService = {
  /**
   * Get all beneficiaries
   */
  getBeneficiaries: async () => {
    try {
      const response = await api.get('/beneficiaries');
      return response.data.beneficiaries;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to get beneficiaries' };
    }
  },

  /**
   * Get beneficiary by ID
   */
  getBeneficiaryById: async (id) => {
    try {
      const response = await api.get(`/beneficiaries/${id}`);
      return response.data.beneficiary;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to get beneficiary' };
    }
  },

  /**
   * Add new beneficiary
   */
  addBeneficiary: async (beneficiaryData) => {
    try {
      const response = await api.post('/beneficiaries', beneficiaryData);
      return response.data.beneficiary;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to add beneficiary' };
    }
  },

  /**
   * Update beneficiary
   */
  updateBeneficiary: async (id, beneficiaryData) => {
    try {
      const response = await api.put(`/beneficiaries/${id}`, beneficiaryData);
      return response.data.beneficiary;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to update beneficiary' };
    }
  },

  /**
   * Delete beneficiary
   */
  deleteBeneficiary: async (id) => {
    try {
      const response = await api.delete(`/beneficiaries/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to delete beneficiary' };
    }
  },

  /**
   * Generate initials from name
   */
  generateInitials: (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  },

  /**
   * Generate random color for avatar
   */
  generateAvatarColor: () => {
    const colors = [
      '#3B82F6', '#6366F1', '#8B5CF6', '#10B981', 
      '#F59E0B', '#EF4444', '#EC4899', '#06B6D4'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
};

export default beneficiaryService;