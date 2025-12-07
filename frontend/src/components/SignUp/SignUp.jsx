import React, { useState } from 'react';
import './SignUp.css';
import { IoClose } from 'react-icons/io5';
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import LOGO from '../../assets/logo_up.png';
import { useAuth } from '../../context/AuthContext';

function SignUp({ onClose, onSignInClick }) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

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

    if (!agreedToTerms) {
      setError('Please agree to the Terms & Privacy Policy');
      return;
    }

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(formData);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-overlay" onClick={onClose}>
      <div className="signup-container" onClick={(e) => e.stopPropagation()}>
        <div className="signup-card">
          
          <button className="close-button" onClick={onClose}>
            <IoClose size={28} />
          </button>

          <div className="signup-header">
           
            <h2 className="signup-title">Create Account</h2>
            <p className="signup-subtitle">Join Meloxia and start your journey</p>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            
            {/* Name */}
            <div className="form-group">
              <div className="input-wrapper">
                <MdPerson className="input-icon" />
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

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

            {/* Terms */}
            <div className="terms-container">
              <input 
                type="checkbox" 
                className="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                disabled={loading}
              />
              <p className="terms-text">
                I agree to the <span className="terms-link">Terms & Privacy Policy</span>
              </p>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="signup-text">
            Already have an account?{" "}
            <span className="signup-link" onClick={onSignInClick}>Sign In</span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default SignUp;