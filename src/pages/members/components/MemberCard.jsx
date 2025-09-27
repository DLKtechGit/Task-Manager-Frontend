import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import './MemberCard.css';

const MemberCard = ({ member, onEdit, onDelete, onRoleChange, currentUserRole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'member-card-role-admin';
      case 'manager':
        return 'member-card-role-manager';
      case 'user':
        return 'member-card-role-user';
      default:
        return 'member-card-role-default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'member-card-status-active';
      case 'inactive':
        return 'member-card-status-inactive';
      case 'pending':
        return 'member-card-status-pending';
      default:
        return 'member-card-status-default';
    }
  };

  const getStatusDotColor = (status) => {
    switch (status) {
      case 'active':
        return 'member-card-status-dot-active';
      case 'inactive':
        return 'member-card-status-dot-inactive';
      case 'pending':
        return 'member-card-status-dot-pending';
      default:
        return 'member-card-status-dot-default';
    }
  };

  const canManageMember = currentUserRole === 'admin' || 
    (currentUserRole === 'manager' && member?.role === 'user');

  return (
    <div className="member-card">
      {/* Header with Avatar and Actions */}
      <div className="member-card-header">
        <div className="member-card-user-info">
          <div className="member-card-avatar-container">
            <Image
              src={member?.avatar}
              alt={member?.name}
              className="member-card-avatar"
            />
            <div className={`member-card-status-dot ${getStatusDotColor(member?.status)}`} />
          </div>
          <div className="member-card-user-details">
            <h3 className="member-card-user-name">{member?.name}</h3>
            <p className="member-card-user-email">{member?.email}</p>
          </div>
        </div>

        {canManageMember && (
          <div className="member-card-actions">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="member-card-menu-button"
            >
              <Icon name="MoreVertical" size={16} />
            </Button>

            {isMenuOpen && (
              <div className="member-card-dropdown">
                <div className="member-card-dropdown-content">
                  {/* <button
                    onClick={() => {
                      onEdit(member);
                      setIsMenuOpen(false);
                    }}
                    className="member-card-dropdown-item"
                  >
                    <Icon name="Edit" size={14} />
                    <span>Edit Profile</span>
                  </button> */}
                  {/* <button
                    onClick={() => {
                      onRoleChange(member);
                      setIsMenuOpen(false);
                    }}
                    className="member-card-dropdown-item"
                  >
                    <Icon name="Shield" size={14} />
                    <span>Change Role</span>
                  </button> */}
                  <button
                    onClick={() => {
                      onDelete(member);
                      setIsMenuOpen(false);
                    }}
                    className="member-card-dropdown-item delete"
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
      <div className="member-card-details">
        <div className="member-card-detail-row">
          <span className="member-card-detail-label">Role</span>
          <span className={`member-card-role-badge ${getRoleColor(member?.role)}`}>
            {member?.role?.charAt(0)?.toUpperCase() + member?.role?.slice(1)}
          </span>
        </div>

        <div className="member-card-detail-row">
          <span className="member-card-detail-label">Status</span>
          <span className={`member-card-status ${getStatusColor(member?.status)}`}>
            {member?.status}
          </span>
        </div>

        <div className="member-card-detail-row">
          <span className="member-card-detail-label">Department</span>
          <span className="member-card-detail-value">{member?.department}</span>
        </div>

        <div className="member-card-detail-row">
          <span className="member-card-detail-label">Joined</span>
          <span className="member-card-detail-value">{member?.joinedDate}</span>
        </div>

        {member?.lastActive && (
          <div className="member-card-detail-row">
            <span className="member-card-detail-label">Last Active</span>
            <span className="member-card-detail-value">{member?.lastActive}</span>
          </div>
        )}
      </div>

      {/* Task Statistics */}
      <div className="member-card-stats">
        <div className="member-card-stats-grid">
          <div className="member-card-stat">
            <div className="member-card-stat-number">{member?.tasksAssigned}</div>
            <div className="member-card-stat-label">Assigned</div>
          </div>
          <div className="member-card-stat">
            <div className="member-card-stat-number completed">{member?.tasksCompleted}</div>
            <div className="member-card-stat-label">Completed</div>
          </div>
          <div className="member-card-stat">
            <div className="member-card-stat-number in-progress">{member?.tasksInProgress}</div>
            <div className="member-card-stat-label">In Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;