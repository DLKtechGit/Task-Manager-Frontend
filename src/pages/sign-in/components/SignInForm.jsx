import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
 
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
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <Icon name="CheckSquare" size={24} color="white" />
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">Welcome Back</h1>
        <p className="text-muted-foreground">Sign in to your TaskFlow Manager account</p>
      </div>
 
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} color="var(--color-error)" />
              <p className="text-sm text-error">{errors.general}</p>
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
 
        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={handleCreateAccount}
            className="text-primary hover:text-primary/80 transition-micro focus:outline-none rounded px-1 py-1"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};
 
export default SignInForm;
 
 