import { useState } from 'react';
import { Link } from 'react-router-dom';
import UserTopNavbar from '../components/UserTopNavbar';
import UserBottomNavbar from '../components/UserBottomNavbar';

function UserHomePage() {
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
    <>
      <UserTopNavbar/>
      <div className="user-home-container">
        {/* Balance Card */}
        {/* Balance Card */}
    <div className="balance-card">
        <div className="balance-header">
            <div>
            <p className="balance-label">Available Balance</p>
            <h1 className="balance-amount">{balance}</h1>
            </div>
            <div className="wallet-icon">💵</div>
        </div>
        
        {/* Monthly Stats */}
        <div className="balance-stats">
            <div className="balance-stat">
            <p className="stat-label">This Month</p>
            <p className="stat-amount positive">+$820.00</p>
            </div>
            <div className="stat-divider"></div>
            <div className="balance-stat">
            <p className="stat-label">Spent</p>
            <p className="stat-amount negative">$425.00</p>
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
            {recentTransactions.map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-icon">
                  {transaction.type === 'received' ? '💲' : '📤'}
                </div>
                <div className="transaction-details">
                  <h4 className="transaction-name">
                    {transaction.type === 'received' 
                      ? `From ${transaction.from}` 
                      : `To ${transaction.to}`}
                  </h4>
                  <p className="transaction-date">{transaction.date}</p>
                </div>
                <div className="transaction-amount">
                  <span className={`amount ${transaction.type}`}>
                    {transaction.type === 'received' ? '+' : '-'}{transaction.amount}
                  </span>
                  <span className="status">{transaction.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <UserBottomNavbar/>
    </>
  );
}

export default UserHomePage;