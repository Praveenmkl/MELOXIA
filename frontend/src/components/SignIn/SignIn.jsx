import React, { useState } from 'react';
import './SignIn.css';
import { IoClose } from 'react-icons/io5';
import { MdEmail, MdLock } from 'react-icons/md';
import LOGO from '../../assets/logo_up.png';
import { useAuth } from '../../context/AuthContext';

function SignIn({ onClose, onSignUpClick }) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      await login(formData);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-overlay" onClick={onClose}>
      <div className="signin-container" onClick={(e) => e.stopPropagation()}>
        <div className="signin-card">
          
          <button className="close-button" onClick={onClose}>
            <IoClose size={28} />
          </button>

          <div className="signin-header">
            <div className="signin-logo"><img src={LOGO} alt="" /></div>
            <h2 className="signin-title">Welcome Back</h2>
            <p className="signin-subtitle">Sign in to continue to your account</p>
          </div>

          <form className="signin-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            
            {/* Email */}
            <div className="form-group">
              <div className="input-wrapper">
                <MdEmail className="input-icon" />
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <div className="input-wrapper">
                <MdLock className="input-icon" />
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="signin-text">
            Don't have an account?{" "}
            <span className="signin-link" onClick={onSignUpClick}>Sign Up</span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default SignIn;