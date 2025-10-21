import { useState } from 'react';
import UserNavbar from '../components/UserNavbar';

function UserSendMoney() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    note: ''
  });

  const recentContacts = [
    { id: 1, name: 'Alice Cooper', email: 'alice@example.com', avatar: '👩' },
    { id: 2, name: 'Bob Martin', email: 'bob@example.com', avatar: '👨' },
    { id: 3, name: 'Carol White', email: 'carol@example.com', avatar: '👩' }
  ];

  const handleSelectContact = (contact) => {
    setFormData({ ...formData, recipient: contact.email });
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(3);
    // Add your send money logic here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <UserNavbar />
      <div style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.title}>Send Money</h1>
          <p style={styles.subtitle}>Transfer funds quickly and securely</p>

          {/* Progress Steps */}
          <div style={styles.progressBar}>
            <div style={{...styles.step, ...(step >= 1 ? styles.stepActive : {})}}>
              <div style={styles.stepNumber}>1</div>
              <span style={styles.stepLabel}>Recipient</span>
            </div>
            <div style={styles.progressLine}></div>
            <div style={{...styles.step, ...(step >= 2 ? styles.stepActive : {})}}>
              <div style={styles.stepNumber}>2</div>
              <span style={styles.stepLabel}>Amount</span>
            </div>
            <div style={styles.progressLine}></div>
            <div style={{...styles.step, ...(step >= 3 ? styles.stepActive : {})}}>
              <div style={styles.stepNumber}>3</div>
              <span style={styles.stepLabel}>Confirm</span>
            </div>
          </div>

          {/* Step 1: Select Recipient */}
          {step === 1 && (
            <div style={styles.stepContent}>
              <h2 style={styles.stepTitle}>Select Recipient</h2>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email or Phone</label>
                <input
                  type="text"
                  name="recipient"
                  value={formData.recipient}
                  onChange={handleChange}
                  placeholder="Enter recipient's email or phone"
                  style={styles.input}
                />
              </div>

              <div style={styles.recentContacts}>
                <h3 style={styles.sectionLabel}>Recent Contacts</h3>
                {recentContacts.map(contact => (
                  <div
                    key={contact.id}
                    style={styles.contactItem}
                    onClick={() => handleSelectContact(contact)}
                  >
                    <div style={styles.contactAvatar}>{contact.avatar}</div>
                    <div style={styles.contactInfo}>
                      <h4 style={styles.contactName}>{contact.name}</h4>
                      <p style={styles.contactEmail}>{contact.email}</p>
                    </div>
                    <svg style={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                ))}
              </div>

              {formData.recipient && (
                <button style={styles.primaryBtn} onClick={() => setStep(2)}>
                  Continue
                </button>
              )}
            </div>
          )}

          {/* Step 2: Enter Amount */}
          {step === 2 && (
            <div style={styles.stepContent}>
              <h2 style={styles.stepTitle}>Enter Amount</h2>
              
              <div style={styles.amountCard}>
                <div style={styles.currencySymbol}>$</div>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  style={styles.amountInput}
                />
              </div>

              <div style={styles.quickAmounts}>
                {['10', '50', '100', '500'].map(amt => (
                  <button
                    key={amt}
                    style={styles.quickAmountBtn}
                    onClick={() => setFormData({ ...formData, amount: amt })}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Note (Optional)</label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  placeholder="Add a note..."
                  style={styles.textarea}
                  rows="3"
                />
              </div>

              <div style={styles.buttonGroup}>
                <button style={styles.secondaryBtn} onClick={() => setStep(1)}>
                  Back
                </button>
                <button
                  style={styles.primaryBtn}
                  onClick={handleSubmit}
                  disabled={!formData.amount}
                >
                  Review Transfer
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div style={styles.stepContent}>
              <div style={styles.successIcon}>✓</div>
              <h2 style={styles.successTitle}>Transfer Successful!</h2>
              <p style={styles.successMessage}>
                ${formData.amount} has been sent to {formData.recipient}
              </p>

              <div style={styles.summaryCard}>
                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>Amount Sent:</span>
                  <span style={styles.summaryValue}>${formData.amount}</span>
                </div>
                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>Fee:</span>
                  <span style={styles.summaryValue}>$0.00</span>
                </div>
                <div style={{...styles.summaryRow, ...styles.summaryTotal}}>
                  <span style={styles.summaryLabel}>Total:</span>
                  <span style={styles.summaryValue}>${formData.amount}</span>
                </div>
              </div>

              <div style={styles.buttonGroup}>
                <button style={styles.secondaryBtn} onClick={() => window.location.href = '/user/transactions'}>
                  View Receipt
                </button>
                <button
                  style={styles.primaryBtn}
                  onClick={() => {
                    setStep(1);
                    setFormData({ recipient: '', amount: '', note: '' });
                  }}
                >
                  Send Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: 'calc(100vh - 70px)',
    background: '#f7fafc',
    padding: '40px 24px'
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1a202c',
    margin: '0 0 8px 0',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: '16px',
    color: '#718096',
    textAlign: 'center',
    marginBottom: '40px'
  },
  progressBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '40px'
  },
  step: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  },
  stepActive: {
    opacity: 1
  },
  stepNumber: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    color: '#718096'
  },
  stepLabel: {
    fontSize: '12px',
    color: '#718096',
    fontWeight: '500'
  },
  progressLine: {
    width: '80px',
    height: '2px',
    background: '#e2e8f0',
    margin: '0 16px'
  },
  stepContent: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
  },
  stepTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: '24px'
  },
  inputGroup: {
    marginBottom: '24px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: '8px'
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '15px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    outline: 'none',
    transition: 'all 0.3s ease',
    background: '#f7fafc',
    boxSizing: 'border-box'
  },
  recentContacts: {
    marginTop: '32px',
    marginBottom: '24px'
  },
  sectionLabel: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: '16px'
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    background: '#f7fafc',
    borderRadius: '12px',
    marginBottom: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '1px solid transparent'
  },
  contactAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    marginRight: '16px'
  },
  contactInfo: {
    flex: 1
  },
  contactName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a202c',
    margin: '0 0 4px 0'
  },
  contactEmail: {
    fontSize: '14px',
    color: '#718096',
    margin: 0
  },
  arrowIcon: {
    width: '20px',
    height: '20px',
    color: '#cbd5e0',
    strokeWidth: 2
  },
  amountCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '20px',
    marginBottom: '24px',
    gap: '16px'
  },
  currencySymbol: {
    fontSize: '48px',
    fontWeight: '700',
    color: 'white'
  },
  amountInput: {
    width: '300px',
    fontSize: '48px',
    fontWeight: '700',
    color: 'white',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    textAlign: 'center'
  },
  quickAmounts: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
    marginBottom: '24px'
  },
  quickAmountBtn: {
    padding: '12px',
    background: '#f7fafc',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#4a5568',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  textarea: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '15px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    outline: 'none',
    transition: 'all 0.3s ease',
    background: '#f7fafc',
    fontFamily: 'inherit',
    resize: 'vertical',
    boxSizing: 'border-box'
  },
  buttonGroup: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px'
  },
  primaryBtn: {
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
  },
  secondaryBtn: {
    padding: '16px 32px',
    background: 'white',
    color: '#4a5568',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  successIcon: {
    width: '80px',
    height: '80px',
    margin: '0 auto 24px',
    background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
    color: 'white',
    fontWeight: 'bold'
  },
  successTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1a202c',
    textAlign: 'center',
    marginBottom: '12px'
  },
  successMessage: {
    fontSize: '16px',
    color: '#718096',
    textAlign: 'center',
    marginBottom: '32px'
  },
  summaryCard: {
    background: '#f7fafc',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid #e2e8f0'
  },
  summaryTotal: {
    borderBottom: 'none',
    paddingTop: '16px',
    marginTop: '8px',
    borderTop: '2px solid #cbd5e0'
  },
  summaryLabel: {
    fontSize: '15px',
    color: '#4a5568',
    fontWeight: '500'
  },
  summaryValue: {
    fontSize: '15px',
    color: '#1a202c',
    fontWeight: '600'
  }
};

export default UserSendMoney;