import React from "react";
import "../App.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-header fade-in">
        <div className="logo-circle pop-in">
          <i className="wallet-icon">💳</i>
        </div>
        <h2>QuickPay</h2>
        <p>Fast, Secure, Affordable</p>
      </div>

      <div className="login-card slide-up">
        <h3>Welcome Back</h3>

        <label htmlFor="email">Email</label>
        <div className="input-group">
          <span className="icon">📧</span>
          <input type="email" id="email" placeholder="your@email.com" />
        </div>

        <label htmlFor="password">Password</label>
        <div className="input-group">
          <span className="icon">🔒</span>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>

        <a href="#" className="forgot-link">Forgot password?</a>

        <button className="sign-in-btn glow-hover">Sign In</button>

        <p className="signup-text">
          Don't have an account? <a href="#">Sign up</a>
        </p>
      </div>

      <div className="footer fade-in-delayed">
        <div>
          <h4>Low Fees</h4>
          <p>0.5% only</p>
        </div>
        <div>
          <h4>Fast</h4>
          <p>Instant</p>
        </div>
        <div>
          <h4>Secure</h4>
          <p>256-bit</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
