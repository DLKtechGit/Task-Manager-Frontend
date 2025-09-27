import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import './MemberFilters.css';

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
    <div className="member-filters">
      <div className="member-filters-content">
        {/* Search Input */}
        <div className="member-filters-search">
          <Input
            type="search"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="member-filters-search-input"
          />
        </div>

        {/* Role Filter */}
        <div className="member-filters-select member-filters-select-role">
          <Select
            options={roleOptions}
            value={selectedRole}
            onChange={onRoleChange}
            placeholder="Role"
          />
        </div>

        {/* Department Filter */}
        <div className="member-filters-select member-filters-select-department">
          <Select
            options={departmentOptions}
            value={selectedDepartment}
            onChange={onDepartmentChange}
            placeholder="Department"
          />
        </div>

        {/* Status Filter */}
        <div className="member-filters-select member-filters-select-status">
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
            className="member-filters-clear"
          >
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default MemberFilters;