import { useState } from 'react';
import UserNavbar from '../components/UserNavbar';

function UserTransactions() {
  const [filter, setFilter] = useState('all');
  
  const transactions = [
    {
      id: 1,
      type: 'received',
      person: 'Alice Cooper',
      amount: '$250.00',
      date: '2025-10-15',
      time: '14:30',
      status: 'completed',
      avatar: '👩'
    },
    {
      id: 2,
      type: 'sent',
      person: 'Bob Martin',
      amount: '$150.00',
      date: '2025-10-14',
      time: '11:20',
      status: 'completed',
      avatar: '👨'
    },
    {
      id: 3,
      type: 'received',
      person: 'Carol White',
      amount: '$320.00',
      date: '2025-10-13',
      time: '09:15',
      status: 'pending',
      avatar: '👩'
    },
    {
      id: 4,
      type: 'sent',
      person: 'David Lee',
      amount: '$75.00',
      date: '2025-10-12',
      time: '16:45',
      status: 'completed',
      avatar: '👨'
    },
    {
      id: 5,
      type: 'received',
      person: 'Emma Brown',
      amount: '$180.00',
      date: '2025-10-11',
      time: '13:30',
      status: 'completed',
      avatar: '👩'
    }
  ];

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'sent') return t.type === 'sent';
    if (filter === 'received') return t.type === 'received';
    return true;
  });

  return (
    <>
      <UserNavbar />
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.header}>
            <div>
              <h1 style={styles.title}>Transaction History</h1>
              <p style={styles.subtitle}>View all your money transfers</p>
            </div>
            <button style={styles.exportBtn}>
              <svg style={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Export
            </button>
          </div>

          {/* Filters */}
          <div style={styles.filters}>
            <button
              style={{...styles.filterBtn, ...(filter === 'all' ? styles.filterBtnActive : {})}}
              onClick={() => setFilter('all')}
            >
              All Transactions
            </button>
            <button
              style={{...styles.filterBtn, ...(filter === 'sent' ? styles.filterBtnActive : {})}}
              onClick={() => setFilter('sent')}
            >
              📤 Sent
            </button>
            <button
              style={{...styles.filterBtn, ...(filter === 'received' ? styles.filterBtnActive : {})}}
              onClick={() => setFilter('received')}
            >
              📥 Received
            </button>
          </div>

          {/* Transactions List */}
          <div style={styles.transactionsList}>
            {filteredTransactions.map(transaction => (
              <div key={transaction.id} style={styles.transactionCard}>
                <div style={styles.transactionLeft}>
                  <div style={styles.avatar}>
                    {transaction.avatar}
                  </div>
                  <div style={styles.transactionInfo}>
                    <h3 style={styles.transactionTitle}>
                      {transaction.type === 'received' ? 'Received from' : 'Sent to'} {transaction.person}
                    </h3>
                    <p style={styles.transactionDate}>
                      {transaction.date} at {transaction.time}
                    </p>
                  </div>
                </div>
                <div style={styles.transactionRight}>
                  <div style={{
                    ...styles.amount,
                    color: transaction.type === 'received' ? '#059669' : '#dc2626'
                  }}>
                    {transaction.type === 'received' ? '+' : '-'}{transaction.amount}
                  </div>
                  <span style={{
                    ...styles.status,
                    ...(transaction.status === 'completed' ? styles.statusCompleted : styles.statusPending)
                  }}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div style={styles.pagination}>
            <button style={styles.pageBtn}>
              <svg style={styles.pageIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button style={{...styles.pageBtn, ...styles.pageBtnActive}}>1</button>
            <button style={styles.pageBtn}>2</button>
            <button style={styles.pageBtn}>3</button>
            <button style={styles.pageBtn}>
              <svg style={styles.pageIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
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
    maxWidth: '1000px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '16px'
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1a202c',
    margin: '0 0 8px 0'
  },
  subtitle: {
    fontSize: '16px',
    color: '#718096',
    margin: 0
  },
  exportBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#4a5568',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  btnIcon: {
    width: '18px',
    height: '18px',
    strokeWidth: 2
  },
  filters: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    flexWrap: 'wrap'
  },
  filterBtn: {
    padding: '12px 24px',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#4a5568',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  filterBtnActive: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderColor: 'transparent',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
  },
  transactionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '32px'
  },
  transactionCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    background: 'white',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  transactionLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  avatar: {
    width: '56px',
    height: '56px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    flexShrink: 0
  },
  transactionInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  transactionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a202c',
    margin: 0
  },
  transactionDate: {
    fontSize: '14px',
    color: '#718096',
    margin: 0
  },
  transactionRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '8px'
  },
  amount: {
    fontSize: '20px',
    fontWeight: '700'
  },
  status: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  statusCompleted: {
    background: '#dcfce7',
    color: '#166534'
  },
  statusPending: {
    background: '#fef3c7',
    color: '#92400e'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px'
  },
  pageBtn: {
    width: '40px',
    height: '40px',
    border: '1px solid #e2e8f0',
    background: 'white',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    color: '#4a5568',
    transition: 'all 0.2s ease'
  },
  pageBtnActive: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderColor: 'transparent'
  },
  pageIcon: {
    width: '18px',
    height: '18px',
    strokeWidth: 2
  }
};

export default UserTransactions;