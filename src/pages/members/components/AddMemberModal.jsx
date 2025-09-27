import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import './AddMemberModel.css'; // Import CSS
 
const AddMemberModal = ({ isOpen, onClose, onAddMember, showToast }) => {
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
 
    if (!formData?.username?.trim()) newErrors.username = 'Username is required';
    if (!formData?.email?.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password min 6 chars';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password';
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.department) newErrors.department = 'Department is required';
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
 
    setIsLoading(true);
 
    try {
      const backendData = new FormData();
      backendData.append('username', formData.username);
      backendData.append('email', formData.email);
      backendData.append('password', formData.password);
      backendData.append('role', formData.role);
      backendData.append('department', formData.department);
      if (formData.avatar) backendData.append('avatar', formData.avatar);
 
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        body: backendData
      });
 
      const result = await response.json();
 
      if (!response.ok) throw new Error(result.message || 'Failed to register');
 
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
      showToast('Member added successfully!', 'success');
 
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
      console.error(error);
      showToast(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };
 
  if (!isOpen) return null;
 
  return (
    <div className="modal-overlay">
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Member</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="close-btn">
            <Icon name="X" size={16} />
          </Button>
        </div>
 
        <form onSubmit={handleSubmit} className="modal-form">
          <Input
            label="Username"
            type="text"
            placeholder="Enter username"
            value={formData.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            error={errors.username}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            error={errors.password}
            required
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            error={errors.confirmPassword}
            required
          />
          <Select
            label="Role"
            options={roleOptions}
            value={formData.role}
            onChange={(val) => handleInputChange('role', val)}
            required
          />
          <Select
            label="Department"
            options={departmentOptions}
            value={formData.department}
            onChange={(val) => handleInputChange('department', val)}
            error={errors.department}
            required
          />
          <Input
            label="Avatar URL (Optional)"
            type="url"
            placeholder="Enter avatar image URL"
            value={formData.avatar}
            onChange={(e) => handleInputChange('avatar', e.target.value)}
          />
 
          <div className="modal-actions">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" loading={isLoading} iconName="UserPlus" iconPosition="left" iconSize={16}>
              Add Member
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
 
export default AddMemberModal;
 
 