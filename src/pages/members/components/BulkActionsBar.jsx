import React from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

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
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-foreground">
            {selectedMembers?.length} member{selectedMembers?.length > 1 ? 's' : ''} selected
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
            iconPosition="left"
            iconSize={14}
          >
            Clear
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Select
            options={roleOptions}
            placeholder="Change Role"
            onChange={onBulkRoleChange}
            className="sm:w-40"
          />
          
          <Select
            options={statusOptions}
            placeholder="Change Status"
            onChange={onBulkStatusChange}
            className="sm:w-40"
          />

          <Button
            variant="destructive"
            size="sm"
            onClick={onBulkDelete}
            iconName="Trash2"
            iconPosition="left"
            iconSize={14}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;