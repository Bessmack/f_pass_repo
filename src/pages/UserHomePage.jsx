import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserTopNavbar from '../components/UserTopNavbar';
import UserBottomNavbar from '../components/UserBottomNavbar';
import { useWallet } from '../hooks/useWallet';
import { useTransactions } from '../hooks/useTransactions';
import walletService from '../services/walletService';

function UserHomePage() {
  const { wallet, loading: walletLoading, refreshWallet } = useWallet();
  const { transactions, loading: transactionsLoading } = useTransactions('all', 5);
  const [monthlyStats, setMonthlyStats] = useState({ sent: 0, received: 0 });

  useEffect(() => {
    if (transactions.length > 0) {
      // Calculate this month's stats
      const now = new Date();
      const thisMonth = transactions.filter(t => {
        const transactionDate = new Date(t.created_at);
        return transactionDate.getMonth() === now.getMonth() && 
               transactionDate.getFullYear() === now.getFullYear();
      });

      const sent = thisMonth
        .filter(t => t.type === 'transfer' && t.sender_id === wallet?.user_id)
        .reduce((sum, t) => sum + t.total_amount, 0);

      const received = thisMonth
        .filter(t => t.type === 'transfer' && t.receiver_id === wallet?.user_id)
        .reduce((sum, t) => sum + t.amount, 0);

      setMonthlyStats({ sent, received });
    }
  }, [transactions, wallet]);

  // Auto-refresh wallet every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshWallet();
    }, 30000);

    return () => clearInterval(interval);
  }, [refreshWallet]);

  if (walletLoading) {
    return (
      <>
        <UserTopNavbar />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '80vh' 
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '50px', 
              height: '50px', 
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #3B82F6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px'
            }}></div>
            <p>Loading your wallet...</p>
          </div>
        </div>
        <UserBottomNavbar />
      </>
    );
  }

  return (
    <>
      <UserTopNavbar/>
      <div className="user-home-container">
        {/* Balance Card */}
        <div className="balance-card">
          <div className="balance-header">
            <div>
              <p className="balance-label">Available Balance</p>
              <h1 className="balance-amount">
                {wallet ? walletService.formatCurrency(wallet.balance) : '$0.00'}
              </h1>
            </div>
            <div className="wallet-icon">💵</div>
          </div>
          
          {/* Monthly Stats */}
          <div className="balance-stats">
            <div className="balance-stat">
              <p className="stat-label">This Month</p>
              <p className="stat-amount positive">
                +{walletService.formatCurrency(monthlyStats.received)}
              </p>
            </div>
            <div className="stat-divider"></div>
            <div className="balance-stat">
              <p className="stat-label">Spent</p>
              <p className="stat-amount negative">
                {walletService.formatCurrency(monthlyStats.sent)}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2 className="section-title">Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/user/send-money" className="quick-action-card">
              <h3 className="action-title">Send Money</h3>
              <p className="action-desc">Cash instantly</p>
            </Link>
            <Link to="/user/add-funds" className="quick-action-card">
              <h3 className="action-title">Add Funds</h3>
              <p className="action-desc">Add money to wallet</p>
            </Link>
            <Link to="/user/contacts" className="quick-action-card">
              <h3 className="action-title">Contacts</h3>
              <p className="action-desc">Account Contacts</p>
            </Link>
          </div>
        </div>

        {/* Recent Transactions */}
        <h2 className="section-title">Recent Transactions</h2>
        <div className="recent-transactions">
          <div className="transactions-header">
            <Link to="/user/transactions" className="view-all-link">View All →</Link>
          </div>
          
          <div className="transactions-list">
            {transactionsLoading ? (
              <div style={{ textAlign: 'center', padding: '20px', color: '#718096' }}>
                Loading transactions...
              </div>
            ) : transactions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
                <p>No transactions yet</p>
                <p style={{ fontSize: '14px', marginTop: '8px' }}>
                  Start by adding funds or sending money
                </p>
              </div>
            ) : (
              transactions.map(transaction => {
                const isReceived = transaction.receiver_id === wallet?.user_id;
                const isSent = transaction.sender_id === wallet?.user_id;
                const displayName = isReceived ? transaction.sender_name : transaction.receiver_name;
                const type = transaction.type === 'add_funds' ? 'received' : (isSent ? 'sent' : 'received');

                return (
                  <div key={transaction.id} className="transaction-item">
                    <div className="transaction-icon">
                      {type === 'received' ? '💲' : '📤'}
                    </div>
                    <div className="transaction-details">
                      <h4 className="transaction-name">
                        {transaction.type === 'add_funds' 
                          ? 'Add Funds' 
                          : (isReceived ? `From ${displayName}` : `To ${displayName}`)}
                      </h4>
                      <p className="transaction-date">
                        {new Date(transaction.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="transaction-amount">
                      <span className={`amount ${type}`}>
                        {type === 'received' ? '+' : '-'}
                        {walletService.formatCurrency(transaction.amount)}
                      </span>
                      <span className="status">{transaction.status}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <UserBottomNavbar/>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}

export default UserHomePage;