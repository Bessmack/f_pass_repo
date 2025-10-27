import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Foot from '../components/Footer';

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  // Sign In States
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [userRole, setUserRole] = useState('user');

  // Sign Up States
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email: signInEmail, password: signInPassword, rememberMe, userRole });
    
    if (userRole === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/user/dashboard');
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Sign up attempt:', { 
      name: signUpName, 
      email: signUpEmail, 
      password: signUpPassword 
    });
    navigate('/user/dashboard');
  };

  return (
    <>
      <div className="auth-page-container">
        <div className={`auth-slider-wrapper ${isSignUp ? 'slide-to-signup' : ''}`}>
          
          {/* Sign In Card */}
          <div className="auth-card auth-signin-card">
            <div className="auth-card-header">
              <div className="auth-logo-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h1 className="auth-title">Welcome.</h1>
              <p className="auth-subtitle">Sign in to manage your transfers</p>
            </div>

            {/* Role Selection */}
            <div className="auth-role-selector">
              <button
                type="button"
                className={`auth-role-btn ${userRole === 'user' ? 'auth-role-active' : ''}`}
                onClick={() => setUserRole('user')}
              >
                <span className="auth-role-icon">👤</span>
                <div className="auth-role-info">
                  <div className="auth-role-name">User</div>
                  <div className="auth-role-description">Personal Account</div>
                </div>
              </button>
              <button
                type="button"
                className={`auth-role-btn ${userRole === 'admin' ? 'auth-role-active' : ''}`}
                onClick={() => setUserRole('admin')}
              >
                <span className="auth-role-icon">⚡</span>
                <div className="auth-role-info">
                  <div className="auth-role-name">Admin</div>
                  <div className="auth-role-description">Management Portal</div>
                </div>
              </button>
            </div>

            <div className="auth-form-wrapper">
              <div className="auth-form-group">
                <label htmlFor="signin-email" className="auth-label">Email Address</label>
                <div className="auth-input-container">
                  <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <input
                    type="email"
                    id="signin-email"
                    className="auth-input"
                    placeholder="Enter your email"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label htmlFor="signin-password" className="auth-label">Password</label>
                <div className="auth-input-container">
                  <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    type="password"
                    id="signin-password"
                    className="auth-input"
                    placeholder="Enter your password"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-form-options">
                <label className="auth-checkbox-wrapper">
                  <input
                    type="checkbox"
                    className="auth-checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="auth-checkbox-text">Remember me</span>
                </label>
                <a href="#" className="auth-forgot-link">Forgot Password?</a>
              </div>

              <button type="button" className="auth-submit-button" onClick={handleSignIn}>
                Sign In as {userRole === 'admin' ? 'Admin' : 'User'}
                <svg className="auth-button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="auth-card-footer">
              <p className="auth-footer-text">
                Don't have an account? {' '}
                <a href="#" className="auth-footer-link" onClick={(e) => { e.preventDefault(); setIsSignUp(true); }}>
                  Sign Up
                </a>
              </p>
            </div>

            <div className="auth-security-badge">
              <svg className="auth-security-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="auth-security-text">Secured & Encrypted</span>
            </div>
          </div>

          {/* Sign Up Card */}
          <div className="auth-card auth-signup-card">
            <div className="auth-card-header">
              <div className="auth-logo-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h1 className="auth-title">Create Account.</h1>
              <p className="auth-subtitle">Join us to manage your transfers</p>
            </div>

            <div className="auth-form-wrapper">
              <div className="auth-form-group">
                <label htmlFor="signup-name" className="auth-label">Full Name</label>
                <div className="auth-input-container">
                  <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input
                    type="text"
                    id="signup-name"
                    className="auth-input"
                    placeholder="Enter your full name"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label htmlFor="signup-email" className="auth-label">Email Address</label>
                <div className="auth-input-container">
                  <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <input
                    type="email"
                    id="signup-email"
                    className="auth-input"
                    placeholder="Enter your email"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label htmlFor="signup-password" className="auth-label">Password</label>
                <div className="auth-input-container">
                  <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    type="password"
                    id="signup-password"
                    className="auth-input"
                    placeholder="Enter your password"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="button" className="auth-submit-button" onClick={handleSignUp}>
                Create Account
                <svg className="auth-button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="auth-card-footer">
              <p className="auth-footer-text">
                Already have an account? {' '}
                <a href="#" className="auth-footer-link" onClick={(e) => { e.preventDefault(); setIsSignUp(false); }}>
                  Sign In
                </a>
              </p>
            </div>

            <div className="auth-security-badge">
              <svg className="auth-security-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="auth-security-text">Secured & Encrypted</span>
            </div>
          </div>
        </div>
      </div>
      <Foot />
    </>
  );
}

export default Login;