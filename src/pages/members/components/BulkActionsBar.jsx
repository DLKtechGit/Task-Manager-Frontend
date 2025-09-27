import React from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import './BulkActionsBar.css';

const BulkActionsBar = ({ 
  selectedMembers, 
  onClearSelection, 
  onBulkRoleChange, 
  onBulkStatusChange,
  onBulkDelete 
}) => {
  const roleOptions = [
    { value: 'user', label: 'Change to User' },
    { value: 'manager', label: 'Change to Manager' },
    { value: 'admin', label: 'Change to Admin' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Set as Active' },
    { value: 'inactive', label: 'Set as Inactive' },
    { value: 'pending', label: 'Set as Pending' }
  ];

  if (selectedMembers?.length === 0) return null;

  return (
    <div className="bulk-actions-bar">
      <div className="bulk-actions-content">
        <div className="bulk-actions-left">
          <span className="bulk-actions-count">
            {selectedMembers?.length} member{selectedMembers?.length > 1 ? 's' : ''} selected
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
            iconPosition="left"
            iconSize={14}
            className="bulk-actions-clear"
          >
            Clear
          </Button>
        </div>

        <div className="bulk-actions-right">
          <Select
            options={roleOptions}
            placeholder="Change Role"
            onChange={onBulkRoleChange}
            className="bulk-actions-select"
          />
          
          <Select
            options={statusOptions}
            placeholder="Change Status"
            onChange={onBulkStatusChange}
            className="bulk-actions-select"
          />

          <Button
            variant="destructive"
            size="sm"
            onClick={onBulkDelete}
            iconName="Trash2"
            iconPosition="left"
            iconSize={14}
            className="bulk-actions-button"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;