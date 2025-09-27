import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MemberCard = ({ member, onEdit, onDelete, onRoleChange, currentUserRole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-error text-error-foreground';
      case 'manager':
        return 'bg-warning text-warning-foreground';
      case 'user':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success';
      case 'inactive':
        return 'text-error';
      case 'pending':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const canManageMember = currentUserRole === 'admin' || 
    (currentUserRole === 'manager' && member?.role === 'user');

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-modal transition-smooth">
      {/* Header with Avatar and Actions */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={member?.avatar}
              alt={member?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
              member?.status === 'active' ? 'bg-success' : 
              member?.status === 'inactive' ? 'bg-error' : 'bg-warning'
            }`} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{member?.name}</h3>
            <p className="text-sm text-muted-foreground">{member?.email}</p>
          </div>
        </div>

        {canManageMember && (
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-8 w-8"
            >
              <Icon name="MoreVertical" size={16} />
            </Button>

            {isMenuOpen && (
              <div className="absolute right-0 top-8 w-48 bg-popover border border-border rounded-lg shadow-modal z-50">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onEdit(member);
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center space-x-2"
                  >
                    <Icon name="Edit" size={14} />
                    <span>Edit Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      onRoleChange(member);
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center space-x-2"
                  >
                    <Icon name="Shield" size={14} />
                    <span>Change Role</span>
                  </button>
                  <button
                    onClick={() => {
                      onDelete(member);
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-muted text-error flex items-center space-x-2"
                  >
                    <Icon name="Trash2" size={14} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Member Details */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Role</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member?.role)}`}>
            {member?.role?.charAt(0)?.toUpperCase() + member?.role?.slice(1)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status</span>
          <span className={`text-sm font-medium capitalize ${getStatusColor(member?.status)}`}>
            {member?.status}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Department</span>
          <span className="text-sm text-foreground">{member?.department}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Joined</span>
          <span className="text-sm text-foreground">{member?.joinedDate}</span>
        </div>

        {member?.lastActive && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Last Active</span>
            <span className="text-sm text-foreground">{member?.lastActive}</span>
          </div>
        )}
      </div>
      {/* Task Statistics */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-foreground">{member?.tasksAssigned}</div>
            <div className="text-xs text-muted-foreground">Assigned</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-success">{member?.tasksCompleted}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-warning">{member?.tasksInProgress}</div>
            <div className="text-xs text-muted-foreground">In Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;