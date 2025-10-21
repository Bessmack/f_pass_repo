import { useState } from 'react';
import { Link } from 'react-router-dom';

function UserDashboard() {
  const [balance] = useState('$1,250.50');
  
  const recentTransactions = [
    {
      id: 1,
      type: 'received',
      from: 'Alice Cooper',
      amount: '$250.00',
      date: '2025-10-15',
      status: 'completed'
    },
    {
      id: 2,
      type: 'sent',
      to: 'Bob Martin',
      amount: '$150.00',
      date: '2025-10-14',
      status: 'completed'
    },
    {
      id: 3,
      type: 'received',
      from: 'Carol White',
      amount: '$320.00',
      date: '2025-10-13',
      status: 'pending'
    }
  ];

  return (
    <div style={styles.container}>
      {/* Balance Card */}
      <div style={styles.balanceCard}>
        <div style={styles.balanceHeader}>
          <div>
            <p style={styles.balanceLabel}>Available Balance</p>
            <h1 style={styles.balanceAmount}>{balance}</h1>
          </div>
          <div style={styles.walletIcon}>💰</div>
        </div>
        
        <div style={styles.actionButtons}>
          <Link to="/user/send-money" style={styles.actionBtn}>
            <span style={styles.btnIcon}>📤</span>
            Send Money
          </Link>
          <Link to="/user/request-money" style={styles.actionBtn}>
            <span style={styles.btnIcon}>📥</span>
            Request Money
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={styles.quickActions}>
        <h2 style={styles.sectionTitle}>Quick Actions</h2>
        <div style={styles.actionsGrid}>
          <Link to="/user/transactions" style={styles.quickActionCard}>
            <span style={styles.actionIcon}>📊</span>
            <h3 style={styles.actionTitle}>Transactions</h3>
            <p style={styles.actionDesc}>View history</p>
          </Link>
          <Link to="/user/contacts" style={styles.quickActionCard}>
            <span style={styles.actionIcon}>👥</span>
            <h3 style={styles.actionTitle}>Contacts</h3>
            <p style={styles.actionDesc}>Manage recipients</p>
          </Link>
          <Link to="/user/profile" style={styles.quickActionCard}>
            <span style={styles.actionIcon}>⚙️</span>
            <h3 style={styles.actionTitle}>Settings</h3>
            <p style={styles.actionDesc}>Account settings</p>
          </Link>
        </div>
      </div>

      {/* Recent Transactions */}
      <div style={styles.recentTransactions}>
        <div style={styles.transactionsHeader}>
          <h2 style={styles.sectionTitle}>Recent Transactions</h2>
          <Link to="/user/transactions" style={styles.viewAllLink}>View All →</Link>
        </div>
        
        <div style={styles.transactionsList}>
          {recentTransactions.map(transaction => (
            <div key={transaction.id} style={styles.transactionItem}>
              <div style={styles.transactionIcon}>
                {transaction.type === 'received' ? '📥' : '📤'}
              </div>
              <div style={styles.transactionDetails}>
                <h4 style={styles.transactionName}>
                  {transaction.type === 'received' 
                    ? `From ${transaction.from}` 
                    : `To ${transaction.to}`}
                </h4>
                <p style={styles.transactionDate}>{transaction.date}</p>
              </div>
              <div style={styles.transactionAmount}>
                <span style={{
                  ...styles.amount,
                  color: transaction.type === 'received' ? '#059669' : '#dc2626'
                }}>
                  {transaction.type === 'received' ? '+' : '-'}{transaction.amount}
                </span>
                <span style={styles.status}>{transaction.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  balanceCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '20px',
    padding: '32px',
    color: 'white',
    marginBottom: '32px',
    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)'
  },
  balanceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px'
  },
  balanceLabel: {
    fontSize: '14px',
    opacity: 0.9,
    margin: '0 0 8px 0'
  },
  balanceAmount: {
    fontSize: '48px',
    fontWeight: '700',
    margin: '0'
  },
  walletIcon: {
    fontSize: '48px'
  },
  actionButtons: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px'
  },
  actionBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '16px',
    background: 'rgba(255, 255, 255, 0.2)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '12px',
    color: 'white',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    cursor: 'pointer'
  },
  btnIcon: {
    fontSize: '20px'
  },
  quickActions: {
    marginBottom: '32px'
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: '16px'
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px'
  },
  quickActionCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    textAlign: 'center',
    textDecoration: 'none',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
  },
  actionIcon: {
    fontSize: '40px',
    display: 'block',
    marginBottom: '12px'
  },
  actionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a202c',
    margin: '0 0 4px 0'
  },
  actionDesc: {
    fontSize: '14px',
    color: '#718096',
    margin: '0'
  },
  recentTransactions: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
  },
  transactionsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  viewAllLink: {
    color: '#667eea',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600'
  },
  transactionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  transactionItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    background: '#f7fafc',
    borderRadius: '12px',
    gap: '12px'
  },
  transactionIcon: {
    fontSize: '24px',
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'white',
    borderRadius: '10px'
  },
  transactionDetails: {
    flex: 1
  },
  transactionName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a202c',
    margin: '0 0 4px 0'
  },
  transactionDate: {
    fontSize: '14px',
    color: '#718096',
    margin: '0'
  },
  transactionAmount: {
    textAlign: 'right'
  },
  amount: {
    display: 'block',
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '4px'
  },
  status: {
    fontSize: '12px',
    color: '#718096',
    textTransform: 'capitalize'
  }
};

export default UserDashboard;