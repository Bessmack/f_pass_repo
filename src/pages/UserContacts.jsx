import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './UserContacts.css';

const UserContacts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [beneficiaries, setBeneficiaries] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1 234 567 8900',
      initials: 'SJ',
      color: '#3B82F6'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael@example.com',
      phone: '+1 234 567 8901',
      initials: 'MC',
      color: '#6366F1'
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily@example.com',
      phone: '+1 234 567 8902',
      initials: 'ED',
      color: '#8B5CF6'
    },
    {
      id: 4,
      name: 'James Wilson',
      email: 'james@example.com',
      phone: '+1 234 567 8903',
      initials: 'JW',
      color: '#10B981'
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      email: 'lisa@example.com',
      phone: '+1 234 567 8904',
      initials: 'LA',
      color: '#F59E0B'
    }
  ]);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle new beneficiary from add page
  useEffect(() => {
    if (location.state?.newBeneficiary) {
      const newBeneficiary = location.state.newBeneficiary;
      setBeneficiaries(prev => [newBeneficiary, ...prev]);
      setSuccessMessage(location.state.message || 'Beneficiary added successfully!');

      // Clear the message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      // Clear the location state
      navigate('/user/contacts', { replace: true });
    }
  }, [location.state, navigate]);

  const filteredBeneficiaries = beneficiaries.filter(
    beneficiary =>
      beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beneficiary.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beneficiary.phone.includes(searchTerm)
  );

  const handleBack = () => {
    // Navigate back to previous page
    window.history.back();
  };

  const handleAddBeneficiary = () => {
    // Navigate to add beneficiary page
    navigate('/user/add-beneficiary');
  };

  const handleSendMoney = (beneficiary) => {
    // Navigate to send money page with beneficiary data
    navigate('/user/send-money', { state: { beneficiary } });
  };

  const handleDeleteBeneficiary = (id) => {
    setBeneficiaries(beneficiaries.filter(b => b.id !== id));
  };

  return (
    <div className="user-contacts">
      {/* Header */}
      <div className="contacts-header">
        <button className="back-button" onClick={handleBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path 
              d="M15 18L9 12L15 6" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="header-title">Beneficiaries</h1>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="success-message">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#10B981"/>
            <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{successMessage}</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="search-container">
        <div className="search-input-wrapper">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#9CA3AF" strokeWidth="2"/>
            <path d="21 21L16.65 16.65" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search beneficiaries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Add New Beneficiary Button */}
      <div className="add-beneficiary-container">
        <button className="add-beneficiary-btn" onClick={handleAddBeneficiary}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path 
              d="M12 5V19M5 12H19" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          Add New Beneficiary
        </button>
      </div>

      {/* Beneficiaries List */}
      <div className="beneficiaries-section">
        <h2 className="section-title">
          All Beneficiaries ({filteredBeneficiaries.length})
        </h2>

        <div className="beneficiaries-list">
          {filteredBeneficiaries.map((beneficiary) => (
            <div key={beneficiary.id} className="beneficiary-card">
              <div className="beneficiary-info">
                <div 
                  className="beneficiary-avatar"
                  style={{ backgroundColor: beneficiary.color }}
                >
                  {beneficiary.initials}
                </div>
                <div className="beneficiary-details">
                  <h3 className="beneficiary-name">{beneficiary.name}</h3>
                  <p className="beneficiary-email">{beneficiary.email}</p>
                  <p className="beneficiary-phone">{beneficiary.phone}</p>
                </div>
              </div>

              <div className="beneficiary-actions">
                <button 
                  className="action-btn send-btn"
                  onClick={() => handleSendMoney(beneficiary)}
                  title="Send Money"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path 
                      d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" 
                      stroke="#3B82F6" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <button 
                  className="action-btn delete-btn"
                  onClick={() => handleDeleteBeneficiary(beneficiary.id)}
                  title="Delete Beneficiary"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path 
                      d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" 
                      stroke="#EF4444" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredBeneficiaries.length === 0 && (
          <div className="no-results">
            <p>No beneficiaries found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserContacts;