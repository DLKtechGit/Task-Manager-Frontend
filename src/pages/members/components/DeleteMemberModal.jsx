import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import './DeleteMemberModal.css';

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
    <div className="delete-member-modal-overlay">
      {/* Backdrop */}
      <div 
        className="delete-member-modal-backdrop"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="delete-member-modal-container">
        {/* Header */}
        <div className="delete-member-modal-header">
          <h2 className="delete-member-modal-title">Remove Member</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="delete-member-modal-close-btn"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Content */}
        <div className="delete-member-modal-content">
          <div className="delete-member-info">
            <Image
              src={member?.avatar}
              alt={member?.name}
              className="delete-member-avatar"
            />
            <div className="delete-member-details">
              <h3 className="delete-member-name">{member?.name}</h3>
              <p className="delete-member-email">{member?.email}</p>
            </div>
          </div>

          <div className="delete-warning-container">
            <div className="delete-warning-content">
              <Icon name="AlertTriangle" size={20} className="delete-warning-icon" />
              <div className="delete-warning-text">
                <h4 className="delete-warning-title">Warning</h4>
                <p className="delete-warning-description">
                  This action cannot be undone. The member will be permanently removed from the system, 
                  and all their task assignments will need to be reassigned.
                </p>
              </div>
            </div>
          </div>

          <p className="delete-confirmation-text">
            Are you sure you want to remove <strong>{member?.name}</strong> from the team? 
            This will also affect any tasks currently assigned to them.
          </p>

          {/* Actions */}
          <div className="delete-member-actions">
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