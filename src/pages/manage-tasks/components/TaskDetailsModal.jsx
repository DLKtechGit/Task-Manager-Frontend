import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaskDetailsModal = ({ isOpen, onClose, task }) => {
  if (!isOpen || !task) return null;

  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-orange-100 text-orange-800 border-orange-200',
    low: 'bg-green-100 text-green-800 border-green-200'
  };

  const statusColors = {
    unassigned: 'bg-gray-100 text-gray-800 border-gray-200',
    assigned: 'bg-blue-100 text-blue-800 border-blue-200',
    'in-progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    closed: 'bg-green-100 text-green-800 border-green-200'
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
    <div className="fixed inset-0 z-500 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-card rounded-lg shadow-modal w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-foreground">Task Details</h2>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors?.[task?.status]}`}>
                  {task?.status?.charAt(0)?.toUpperCase() + task?.status?.slice(1)?.replace('-', ' ')}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityColors?.[task?.priority]}`}>
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
          <div className="p-6 space-y-6">
            {/* Task Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-foreground mb-2">{task?.taskName}</h3>
                <p className="text-muted-foreground">{task?.description}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Project</label>
                  <p className="text-muted-foreground">{task?.projectName}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Client</label>
                  <p className="text-muted-foreground">{task?.clientName || 'Not specified'}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Created By</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                      <Icon name="User" size={12} className="text-muted-foreground" />
                    </div>
                    <span className="text-muted-foreground">{task?.createdBy}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Assigned To</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                      <Icon name="User" size={12} className="text-muted-foreground" />
                    </div>
                    <span className="text-muted-foreground">{task?.assignedTo}</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Due Date</label>
                  <p className="text-muted-foreground">{formatDate(task?.dueDate)}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Created</label>
                  <p className="text-muted-foreground">{formatDateTime(task?.createdAt)}</p>
                </div>
              </div>
            </div>

            {/* Notes */}
            {task?.notes && (
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Notes</label>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-muted-foreground">{task?.notes}</p>
                </div>
              </div>
            )}

            {/* Attachments */}
            {task?.attachments && task?.attachments?.length > 0 && (
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Attachments</label>
                <div className="space-y-2">
                  {task?.attachments?.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center">
                          <Icon name="File" size={16} className="text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{file?.name}</p>
                          <p className="text-xs text-muted-foreground">
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
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">Timeline</label>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Task Created</p>
                    <p className="text-xs text-muted-foreground">{formatDateTime(task?.createdAt)}</p>
                  </div>
                </div>
                
                {task?.status !== 'unassigned' && (
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Task Assigned</p>
                      <p className="text-xs text-muted-foreground">Assigned to {task?.assignedTo}</p>
                    </div>
                  </div>
                )}
                
                {task?.status === 'in-progress' && (
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Work Started</p>
                      <p className="text-xs text-muted-foreground">Task is now in progress</p>
                    </div>
                  </div>
                )}
                
                {task?.status === 'closed' && (
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Task Completed</p>
                      <p className="text-xs text-muted-foreground">Task has been closed</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
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