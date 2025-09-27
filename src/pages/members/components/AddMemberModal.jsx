import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddMemberModal = ({ isOpen, onClose, onAddMember }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    department: '',
    avatar: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'manager', label: 'Manager' },
    { value: 'admin', label: 'Admin' }
  ];

  const departmentOptions = [
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Design', label: 'Design' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
    { value: 'HR', label: 'Human Resources' },
    { value: 'Finance', label: 'Finance' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.username?.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.department) {
      newErrors.department = 'Department is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Prepare form data for backend
      const backendData = new FormData();
      backendData.append('username', formData.username);
      backendData.append('email', formData.email);
      backendData.append('password', formData.password);
      backendData.append('role', formData.role);
      backendData.append('department', formData.department);
      
      // If avatar URL is provided, handle file upload logic here
      if (formData.avatar) {
        // For now, we'll just add the URL as a string
        // In a real app, you might want to upload the actual file
        backendData.append('avatar', formData.avatar);
      }

      // Send request to backend
      const response = await fetch('http://192.168.1.77:5000/api/register', {
        method: 'POST',
        body: backendData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to register user');
      }

      // Create frontend member object with backend response
      const newMember = {
        id: result.user._id || Date.now(),
        name: result.user.username,
        email: result.user.email,
        role: result.user.role,
        department: result.user.department,
        status: 'pending',
        avatar: result.user.profile_pic || formData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.username}`,
        joinedDate: new Date().toLocaleDateString(),
        tasksAssigned: 0,
        tasksCompleted: 0,
        tasksInProgress: 0,
        lastActive: null
      };

      await onAddMember(newMember);
      
      // Reset form
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user',
        department: '',
        avatar: ''
      });
      
      onClose();
    } catch (error) {
      console.error('Error adding member:', error);
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-modal w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Add New Member</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Username"
            type="text"
            placeholder="Enter username"
            value={formData?.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            error={errors?.username}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="Enter email address"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors?.email}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            error={errors?.password}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            value={formData?.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            error={errors?.confirmPassword}
            required
          />

          <Select
            label="Role"
            options={roleOptions}
            value={formData?.role}
            onChange={(value) => handleInputChange('role', value)}
            required
          />

          <Select
            label="Department"
            options={departmentOptions}
            value={formData?.department}
            onChange={(value) => handleInputChange('department', value)}
            error={errors?.department}
            required
          />

          <Input
            label="Avatar URL (Optional)"
            type="url"
            placeholder="Enter avatar image URL"
            value={formData?.avatar}
            onChange={(e) => handleInputChange('avatar', e.target.value)}
            description="Leave empty to generate a default avatar"
          />

          {errors?.submit && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-destructive text-sm">{errors.submit}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isLoading}
              iconName="UserPlus"
              iconPosition="left"
              iconSize={16}
            >
              Add Member
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;