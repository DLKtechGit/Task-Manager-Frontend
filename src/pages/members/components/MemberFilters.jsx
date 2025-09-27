import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const MemberFilters = ({ 
  searchTerm, 
  onSearchChange, 
  selectedRole, 
  onRoleChange, 
  selectedDepartment, 
  onDepartmentChange,
  selectedStatus,
  onStatusChange,
  onClearFilters 
}) => {
  const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'user', label: 'User' }
  ];

  const departmentOptions = [
    { value: '', label: 'All Departments' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Design', label: 'Design' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
    { value: 'HR', label: 'Human Resources' },
    { value: 'Finance', label: 'Finance' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' }
  ];

  const hasActiveFilters = searchTerm || selectedRole || selectedDepartment || selectedStatus;

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-end gap-4">
        {/* Search Input */}
        <div className="flex-1 lg:max-w-sm">
          <Input
            type="search"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Role Filter */}
        <div className="lg:w-40">
          <Select
            options={roleOptions}
            value={selectedRole}
            onChange={onRoleChange}
            placeholder="Role"
          />
        </div>

        {/* Department Filter */}
        <div className="lg:w-48">
          <Select
            options={departmentOptions}
            value={selectedDepartment}
            onChange={onDepartmentChange}
            placeholder="Department"
          />
        </div>

        {/* Status Filter */}
        <div className="lg:w-40">
          <Select
            options={statusOptions}
            value={selectedStatus}
            onChange={onStatusChange}
            placeholder="Status"
          />
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={16}
          >
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default MemberFilters;