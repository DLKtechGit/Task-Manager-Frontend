import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import './TaskCard.css';

const TaskCard = ({ task, onStatusUpdate, onAccept, onDecline }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(task.status);
  const [comment, setComment] = useState('');
  const [showStatusUpdate, setShowStatusUpdate] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const statusOptions = [
    { value: 'pending', label: 'Pending Acceptance' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'on_hold', label: 'On Hold' }
  ];

  const priorityColors = {
    high: 'task-card-priority-high',
    medium: 'task-card-priority-medium',
    low: 'task-card-priority-low'
  };

  const statusColors = {
    pending: 'task-card-status-pending',
    in_progress: 'task-card-status-in-progress',
    completed: 'task-card-status-completed',
    on_hold: 'task-card-status-on-hold'
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
  const daysUntilDue = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));

  const handleStatusUpdate = async () => {
    if (selectedStatus !== task.status) {
      setIsUpdating(true);
      try {
        await onStatusUpdate(task.id, selectedStatus, comment);
        setComment('');
        setShowStatusUpdate(false);
      } catch (error) {
        console.error('Error updating status:', error);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleAccept = async () => {
    setIsUpdating(true);
    try {
      await onAccept(task.id);
    } catch (error) {
      console.error('Error accepting task:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDecline = async () => {
    setIsUpdating(true);
    try {
      await onDecline(task.id);
    } catch (error) {
      console.error('Error declining task:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="task-card">
      {/* Header */}
      <div className="task-card-header">
        <div className="task-card-header-content">
          <div className="task-card-title-section">
            <h3 className="task-card-title">{task.title}</h3>
            <span className={`task-card-priority-badge ${priorityColors[task.priority]}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </span>
            <span className={`task-card-status-badge ${statusColors[task.status]}`}>
              {task.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </div>
          <p className="task-card-description">
            {task.description}
          </p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="task-card-expand-button"
        >
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="task-card-expand-icon"
          />
        </button>
      </div>

      {/* Task Details */}
      <div className="task-card-details">
        <div className="task-card-detail-item">
          <Icon name="Calendar" size={16} className="task-card-detail-icon" />
          <span className={`task-card-detail-text ${isOverdue ? 'task-card-overdue' : ''}`}>
            Due: {formatDate(task.dueDate)}
            {isOverdue && ' (Overdue)'}
            {!isOverdue && daysUntilDue <= 3 && daysUntilDue > 0 && (
              <span className="task-card-due-soon">({daysUntilDue} days left)</span>
            )}
          </span>
        </div>
        <div className="task-card-detail-item">
          <Icon name="Building" size={16} className="task-card-detail-icon" />
          <span className="task-card-detail-text">{task.clientName}</span>
        </div>
        <div className="task-card-detail-item">
          <Icon name="FolderOpen" size={16} className="task-card-detail-icon" />
          <span className="task-card-detail-text">{task.projectName}</span>
        </div>
      </div>

      {/* Attachments and Created By */}
      <div className="task-card-meta">
        <div className="task-card-meta-item">
          <Icon name="Paperclip" size={16} className="task-card-meta-icon" />
          <span className="task-card-meta-text">
            {task.attachments} attachment{task.attachments !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="task-card-meta-item">
          <Icon name="User" size={16} className="task-card-meta-icon" />
          <span className="task-card-meta-text">Created by {task.createdBy}</span>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="task-card-expanded-content">
          <div className="task-card-expanded-section">
            <h4 className="task-card-expanded-title">Full Description</h4>
            <p className="task-card-expanded-text">
              {task.fullDescription}
            </p>
          </div>
          {task.notes && (
            <div className="task-card-expanded-section">
              <h4 className="task-card-expanded-title">Notes</h4>
              <p className="task-card-expanded-text">{task.notes}</p>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="task-card-actions">
        {task.status === 'pending' && (
          <>
            <Button
              variant="default"
              size="sm"
              onClick={handleAccept}
              iconName="Check"
              iconPosition="left"
              iconSize={16}
              disabled={isUpdating}
            >
              {isUpdating ? 'Accepting...' : 'Accept Task'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              iconName="X"
              iconPosition="left"
              iconSize={16}
              disabled={isUpdating}
            >
              {isUpdating ? 'Declining...' : 'Decline'}
            </Button>
          </>
        )}
        
        {task.status !== 'pending' && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowStatusUpdate(!showStatusUpdate)}
            iconName="Edit"
            iconPosition="left"
            iconSize={16}
          >
            Update Status
          </Button>
        )}
      </div>

      {/* Status Update Section */}
      {showStatusUpdate && (
        <div className="task-card-status-update">
          <div className="task-card-status-update-grid">
            <Select
              label="Update Status"
              options={statusOptions}
              value={selectedStatus}
              onChange={setSelectedStatus}
            />
            <div className="task-card-comment-section">
              <label className="task-card-comment-label">
                Progress Comment (Optional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment about your progress..."
                className="task-card-comment-textarea"
                rows={3}
              />
            </div>
          </div>
          <div className="task-card-status-update-actions">
            <Button
              variant="default"
              size="sm"
              onClick={handleStatusUpdate}
              disabled={selectedStatus === task.status || isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Update Status'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowStatusUpdate(false);
                setSelectedStatus(task.status);
                setComment('');
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;