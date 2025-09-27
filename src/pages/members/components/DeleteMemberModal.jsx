import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const DeleteMemberModal = ({ isOpen, onClose, member, onDeleteMember }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    
    try {
      await onDeleteMember(member?.id);
      onClose();
    } catch (error) {
      console.error('Error deleting member:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-modal w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Remove Member</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Image
              src={member?.avatar}
              alt={member?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium text-foreground">{member?.name}</h3>
              <p className="text-sm text-muted-foreground">{member?.email}</p>
            </div>
          </div>

          <div className="bg-error/10 border border-error/20 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-error flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-error mb-1">Warning</h4>
                <p className="text-sm text-error/80">
                  This action cannot be undone. The member will be permanently removed from the system, 
                  and all their task assignments will need to be reassigned.
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Are you sure you want to remove <strong>{member?.name}</strong> from the team? 
            This will also affect any tasks currently assigned to them.
          </p>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              loading={isLoading}
              iconName="Trash2"
              iconPosition="left"
              iconSize={16}
            >
              Remove Member
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteMemberModal;