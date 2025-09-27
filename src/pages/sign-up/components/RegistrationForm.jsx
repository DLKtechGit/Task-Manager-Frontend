import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import AvatarUpload from './AvatarUpload';

const API_BASE_URL = 'http://192.168.1.77:5000/api';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    role: 'user',
    avatar: null
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateUsername = (username) => {
    if (!username) return 'Username is required';
    if (username.length < 3) return 'Username must be at least 3 characters';
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Username can only contain letters, numbers, and underscores';
    return '';
  };

  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    return '';
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return 'Please confirm your password';
    if (confirmPassword !== password) return 'Passwords do not match';
    return '';
  };

  const validateDepartment = (department) => {
    if (!department) return 'Department is required';
    return '';
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation
    let error = '';
    switch (field) {
      case 'username':
        error = validateUsername(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        if (formData.confirmPassword) {
          const confirmError = validateConfirmPassword(formData.confirmPassword, value);
          setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
        }
        break;
      case 'confirmPassword':
        error = validateConfirmPassword(value, formData.password);
        break;
      case 'department':
        error = validateDepartment(value);
        break;
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleAvatarSelect = (imageData) => {
    setFormData(prev => ({ ...prev, avatar: imageData }));
    setErrors(prev => ({ ...prev, avatar: '' }));
  };

  const convertBase64ToFile = (base64String, filename) => {
    if (!base64String) return null;
    
    // Remove data URL prefix if present
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
    
    // Convert base64 to blob
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    
    const blob = new Blob(byteArrays, { type: 'image/jpeg' });
    return new File([blob], filename, { type: 'image/jpeg' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {
      username: validateUsername(formData.username),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.confirmPassword, formData.password),
      department: validateDepartment(formData.department)
    };

    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors) return;

    setIsLoading(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('username', formData.username);
      submitData.append('email', formData.email);
      submitData.append('password', formData.password);
      submitData.append('role', formData.role);
      submitData.append('department', formData.department);

      // Add avatar file if exists
      if (formData.avatar) {
        const avatarFile = convertBase64ToFile(formData.avatar, 'avatar.jpg');
        if (avatarFile) {
          submitData.append('file', avatarFile);
        }
      }

      // Make API call to backend
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        body: submitData,
        // Don't set Content-Type header - browser will set it with boundary
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      // Registration successful
      console.log('User registered successfully:', result);
      
      // Store user data in localStorage
      localStorage.setItem('authToken', result.token || 'mock-jwt-token');
      localStorage.setItem('userData', JSON.stringify(result.user));
      
      // Navigate to dashboard or login page
      navigate('/sign-in', { 
        state: { message: 'Registration successful! Please sign in.' } 
      });
      
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: error.message || 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return formData.username &&
           formData.email &&
           formData.password &&
           formData.confirmPassword &&
           formData.department &&
           Object.values(errors).every(error => error === '');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-foreground mb-2">
          Create Account
        </h1>
        <p className="text-muted-foreground">
          Join TaskFlow Manager and start organizing your team
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Upload */}
        <AvatarUpload
          onImageSelect={handleAvatarSelect}
          selectedImage={formData.avatar}
          error={errors.avatar}
        />

        {/* Username Field */}
        <Input
          label="Username"
          type="text"
          placeholder="Enter your username"
          value={formData.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
          error={errors.username}
          required
        />

        {/* Email Field */}
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          required
        />

        {/* Department Field */}
        <Input
          label="Department"
          type="text"
          placeholder="Enter your department"
          value={formData.department}
          onChange={(e) => handleInputChange('department', e.target.value)}
          error={errors.department}
          required
        />

        {/* Password Field */}
        <Input
          label="Password"
          type="password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          error={errors.password}
          description="Must contain at least 8 characters with uppercase, lowercase, and number"
          required
        />

        {/* Confirm Password Field */}
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          error={errors.confirmPassword}
          required
        />

        {/* Role Selection (hidden by default, can be shown for admin users) */}
        <input type="hidden" value={formData.role} />

        {/* Submit Error */}
        {errors.submit && (
          <div className="text-sm text-error text-center bg-error/10 p-3 rounded-lg">
            {errors.submit}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={!isFormValid() || isLoading}
        >
          Create Account
        </Button>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/sign-in')}
              className="text-primary hover:underline font-medium"
            >
              Sign in here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;