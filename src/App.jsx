import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import './App.css'
import Logout from './pages/Logout';
import AdminOverview from './components/AdminOverview';
import AdminTransactions from './components/AdminTransactions';
import AdminUsers from './components/AdminUsers';
import AdminWallets from './components/AdminWallets';
import Profile from './pages/Profile';

import UserDashboard from './pages/UserDashboard';
import UserSendMoney from './pages/UserSendMoney';
import UserTransactions from './pages/UserTransactions';
import UserProfile from './pages/UserProfile';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/loggedout" element={<Logout />} />
          <Route path="/admin/dashboard" element={<AdminOverview />} />
          <Route path="/admin/dashboard/transactions" element={<AdminTransactions />} />
          <Route path="/admin/dashboard/users" element={<AdminUsers />} />
          <Route path="/admin/dashboard/wallets" element={<AdminWallets />} />
          <Route path="/admin/profile" element={<Profile />} />

          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/send-money" element={<UserSendMoney />} />
          <Route path="/user/transactions" element={<UserTransactions />} />
          <Route path="/user/profile" element={<UserProfile />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;