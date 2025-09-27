import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import './EditMemberModal.css';

const EditMemberModal = ({ isOpen, onClose, member, onUpdateMember }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    department: '',
    avatar: '',
    status: 'active'
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

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' }
  ];

  useEffect(() => {
    if (member) {
      setFormData({
        name: member?.name || '',
        email: member?.email || '',
        role: member?.role || 'user',
        department: member?.department || '',
        avatar: member?.avatar || '',
        status: member?.status || 'active'
      });
    }
  }, [member]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
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
      const updatedMember = {
        ...member,
        ...formData,
        avatar: formData?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData?.name}`
      };

      await onUpdateMember(updatedMember);
      onClose();
    } catch (error) {
      console.error('Error updating member:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !member) return null;

  return (
    <div className="edit-member-modal-overlay">
      {/* Backdrop */}
      <div 
        className="edit-member-modal-backdrop"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="edit-member-modal-container">
        {/* Header */}
        <div className="edit-member-modal-header">
          <h2 className="edit-member-modal-title">Edit Member</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="edit-member-modal-close-btn"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="edit-member-modal-form">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter member's full name"
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            error={errors?.name}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="Enter email address"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
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

          <Select
            label="Status"
            options={statusOptions}
            value={formData?.status}
            onChange={(value) => handleInputChange('status', value)}
            required
          />

          <Input
            label="Avatar URL (Optional)"
            type="url"
            placeholder="Enter avatar image URL"
            value={formData?.avatar}
            onChange={(e) => handleInputChange('avatar', e?.target?.value)}
            description="Leave empty to use default avatar"
          />

          {/* Actions */}
          <div className="edit-member-modal-actions">
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
              iconName="Save"
              iconPosition="left"
              iconSize={16}
            >
              Update Member
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMemberModal;