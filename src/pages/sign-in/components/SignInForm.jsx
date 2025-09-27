import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import './SignInForm.css'

 
const SignInForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
 
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
 
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email?.trim()) newErrors.email = 'Email is required';
    if (!formData.password?.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
 
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email: formData.email,
        password: formData.password
      });
 
      const { token, user } = response.data;
 
      // Save auth data
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('username', user.username);
      localStorage.setItem('email', user.email);
 
      // Role-based navigation
      if (user.role === 'admin') {
        navigate('/dashboard');
      } else if (user.role === 'user') {
        navigate('/accept-task');
      } else if (user.role === 'manager') {
        navigate('/manager-dashboard'); // optional
      } else {
        navigate('/'); // fallback
      }
 
    } catch (error) {
      console.error(error);
 
      if (error.response?.data?.message) {
        setErrors({ general: error.response.data.message });
      } else {
        setErrors({ general: 'Something went wrong. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };
 
  const handleCreateAccount = () => {
    navigate('/sign-up');
  };
 
  return (
    <div className="signin-form-container">
      <div className="signin-header">
        <div className="signin-logo">
          <div className="logo-icon">
            <Icon name="CheckSquare" size={24} color="white" />
          </div>
        </div>
        <h1 className="signin-title">Welcome Back</h1>
        <p className="signin-subtitle">Sign in to your TaskFlow Manager account</p>
      </div>
 
      <form onSubmit={handleSubmit} className="signin-form">
        {errors.general && (
          <div className="error-alert">
            <div className="error-content">
              <Icon name="AlertCircle" size={16} color="var(--color-error)" />
              <p className="error-message">{errors.general}</p>
            </div>
          </div>
        )}
 
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
          disabled={isLoading}
        />
 
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          required
          disabled={isLoading}
        />
 
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="LogIn"
          iconPosition="right"
        >
          Sign In
        </Button>
 
        <div className="form-footer">
          {/* <button
            type="button"
            onClick={handleCreateAccount}
            className="create-account-btn"
          >
            Create Account
          </button> */}
        </div>
      </form>
    </div>
  );
};
 
export default SignInForm;