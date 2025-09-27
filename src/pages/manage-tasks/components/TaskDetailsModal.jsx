import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import './TaskDetailsModal.css';

const TaskDetailsModal = ({ isOpen, onClose, task }) => {
  if (!isOpen || !task) return null;

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'task-details-modal-badge task-details-modal-badge-high';
      case 'medium':
        return 'task-details-modal-badge task-details-modal-badge-medium';
      case 'low':
        return 'task-details-modal-badge task-details-modal-badge-low';
      default:
        return 'task-details-modal-badge task-details-modal-badge-unassigned';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'unassigned':
        return 'task-details-modal-badge task-details-modal-badge-unassigned';
      case 'assigned':
        return 'task-details-modal-badge task-details-modal-badge-assigned';
      case 'in-progress':
        return 'task-details-modal-badge task-details-modal-badge-in-progress';
      case 'closed':
        return 'task-details-modal-badge task-details-modal-badge-closed';
      default:
        return 'task-details-modal-badge task-details-modal-badge-unassigned';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString)?.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="task-details-modal">
      <div className="task-details-modal-overlay">
        <div className="task-details-modal-backdrop" onClick={onClose} />
        
        <div className="task-details-modal-content">
          {/* Header */}
          <div className="task-details-modal-header">
            <div className="task-details-modal-title-section">
              <h2 className="task-details-modal-title">Task Details</h2>
              <div className="task-details-modal-badges">
                <span className={getStatusClass(task?.status)}>
                  {task?.status?.charAt(0)?.toUpperCase() + task?.status?.slice(1)?.replace('-', ' ')}
                </span>
                <span className={getPriorityClass(task?.priority)}>
                  {task?.priority?.charAt(0)?.toUpperCase() + task?.priority?.slice(1)} Priority
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
              iconSize={20}
            />
          </div>

          {/* Content */}
          <div className="task-details-modal-body">
            {/* Task Information */}
            <div className="task-details-modal-grid">
              <div className="task-details-modal-full-width">
                <h3 className="task-details-modal-label task-details-modal-title">{task?.taskName}</h3>
                <p className="task-details-modal-text">{task?.description}</p>
              </div>

              <div className="task-details-modal-section">
                <div className="task-details-modal-section">
                  <label className="task-details-modal-label">Project</label>
                  <p className="task-details-modal-text">{task?.projectName}</p>
                </div>

                <div className="task-details-modal-section">
                  <label className="task-details-modal-label">Client</label>
                  <p className="task-details-modal-text">{task?.clientName || 'Not specified'}</p>
                </div>

                <div className="task-details-modal-section">
                  <label className="task-details-modal-label">Created By</label>
                  <div className="task-details-modal-user">
                    <div className="task-details-modal-avatar">
                      <Icon name="User" size={12} className="task-details-modal-avatar-icon" />
                    </div>
                    <span className="task-details-modal-text">{task?.createdBy}</span>
                  </div>
                </div>
              </div>

              <div className="task-details-modal-section">
                <div className="task-details-modal-section">
                  <label className="task-details-modal-label">Assigned To</label>
                  <div className="task-details-modal-user">
                    <div className="task-details-modal-avatar">
                      <Icon name="User" size={12} className="task-details-modal-avatar-icon" />
                    </div>
                    <span className="task-details-modal-text">{task?.assignedTo}</span>
                  </div>
                </div>

                <div className="task-details-modal-section">
                  <label className="task-details-modal-label">Due Date</label>
                  <p className="task-details-modal-text">{formatDate(task?.dueDate)}</p>
                </div>

                <div className="task-details-modal-section">
                  <label className="task-details-modal-label">Created</label>
                  <p className="task-details-modal-text">{formatDateTime(task?.createdAt)}</p>
                </div>
              </div>
            </div>

            {/* Notes */}
            {task?.notes && (
              <div className="task-details-modal-section">
                <label className="task-details-modal-label">Notes</label>
                <div className="task-details-modal-notes">
                  <p className="task-details-modal-text">{task?.notes}</p>
                </div>
              </div>
            )}

            {/* Attachments */}
            {task?.attachments && task?.attachments?.length > 0 && (
              <div className="task-details-modal-section">
                <label className="task-details-modal-label">Attachments</label>
                <div className="task-details-modal-attachments">
                  {task?.attachments?.map((file, index) => (
                    <div key={index} className="task-details-modal-attachment">
                      <div className="task-details-modal-attachment-info">
                        <div className="task-details-modal-attachment-icon">
                          <Icon name="File" size={16} className="task-details-modal-avatar-icon" />
                        </div>
                        <div className="task-details-modal-attachment-details">
                          <p className="task-details-modal-attachment-name">{file?.name}</p>
                          <p className="task-details-modal-attachment-size">
                            {(file?.size / 1024)?.toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Download"
                        iconSize={16}
                      >
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Task Timeline */}
            <div className="task-details-modal-section">
              <label className="task-details-modal-label">Timeline</label>
              <div className="task-details-modal-timeline">
                <div className="task-details-modal-timeline-item">
                  <div className="task-details-modal-timeline-dot task-details-modal-timeline-dot-created"></div>
                  <div className="task-details-modal-timeline-content">
                    <p className="task-details-modal-timeline-title">Task Created</p>
                    <p className="task-details-modal-timeline-date">{formatDateTime(task?.createdAt)}</p>
                  </div>
                </div>
                
                {task?.status !== 'unassigned' && (
                  <div className="task-details-modal-timeline-item">
                    <div className="task-details-modal-timeline-dot task-details-modal-timeline-dot-assigned"></div>
                    <div className="task-details-modal-timeline-content">
                      <p className="task-details-modal-timeline-title">Task Assigned</p>
                      <p className="task-details-modal-timeline-date">Assigned to {task?.assignedTo}</p>
                    </div>
                  </div>
                )}
                
                {task?.status === 'in-progress' && (
                  <div className="task-details-modal-timeline-item">
                    <div className="task-details-modal-timeline-dot task-details-modal-timeline-dot-in-progress"></div>
                    <div className="task-details-modal-timeline-content">
                      <p className="task-details-modal-timeline-title">Work Started</p>
                      <p className="task-details-modal-timeline-date">Task is now in progress</p>
                    </div>
                  </div>
                )}
                
                {task?.status === 'closed' && (
                  <div className="task-details-modal-timeline-item">
                    <div className="task-details-modal-timeline-dot task-details-modal-timeline-dot-completed"></div>
                    <div className="task-details-modal-timeline-content">
                      <p className="task-details-modal-timeline-title">Task Completed</p>
                      <p className="task-details-modal-timeline-date">Task has been closed</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="task-details-modal-footer">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button iconName="Edit" iconPosition="left" iconSize={16}>
              Edit Task
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;