import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SignInForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const mockCredentials = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'manager', password: 'manager123', role: 'manager' },
    { username: 'user', password: 'user123', role: 'user' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.username?.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData?.password?.trim()) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const validUser = mockCredentials?.find(
        cred => cred?.username === formData?.username && cred?.password === formData?.password
      );

      if (validUser) {
        // Store auth token and user info
        localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
        localStorage.setItem('userRole', validUser?.role);
        localStorage.setItem('username', validUser?.username);
        
        navigate('/dashboard');
      } else {
        setErrors({
          general: 'Invalid username or password. Try: admin/admin123, manager/manager123, or user/user123'
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality would be implemented here. For demo, use: admin/admin123, manager/manager123, or user/user123');
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
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Welcome Back
        </h1>
        <p className="text-muted-foreground">
          Sign in to your TaskFlow Manager account
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors?.general && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} color="var(--color-error)" />
              <p className="text-sm text-error">{errors?.general}</p>
            </div>
          </div>
        )}

        <Input
          label="Username"
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formData?.username}
          onChange={handleInputChange}
          error={errors?.username}
          required
          disabled={isLoading}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
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
            onClick={handleForgotPassword}
            className="text-primary hover:text-primary/80 transition-micro focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-1 py-1"
          >
            Forgot Password?
          </button>
          
          <button
            type="button"
            onClick={handleCreateAccount}
            className="text-primary hover:text-primary/80 transition-micro focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-1 py-1"
          >
            Create Account
          </button>
        </div>
      </form>
      {/* Demo Credentials Helper */}
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h3 className="text-sm font-medium text-foreground mb-2 flex items-center">
          <Icon name="Info" size={16} className="mr-2" />
          Demo Credentials
        </h3>
        <div className="space-y-1 text-xs text-muted-foreground">
          <p><strong>Admin:</strong> admin / admin123</p>
          <p><strong>Manager:</strong> manager / manager123</p>
          <p><strong>User:</strong> user / user123</p>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;