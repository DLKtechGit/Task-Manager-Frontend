import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const TaskCard = ({ task, onStatusUpdate, onAccept, onDecline }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(task?.status);
  const [comment, setComment] = useState('');
  const [showStatusUpdate, setShowStatusUpdate] = useState(false);

  const statusOptions = [
    { value: 'pending', label: 'Pending Acceptance' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'on_hold', label: 'On Hold' }
  ];

  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-orange-100 text-orange-800 border-orange-200',
    low: 'bg-green-100 text-green-800 border-green-200'
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    on_hold: 'bg-gray-100 text-gray-800 border-gray-200'
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task?.status !== 'completed';
  const daysUntilDue = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));

  const handleStatusUpdate = () => {
    if (selectedStatus !== task?.status) {
      onStatusUpdate(task?.id, selectedStatus, comment);
      setComment('');
      setShowStatusUpdate(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-modal transition-smooth">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-foreground">{task?.title}</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${priorityColors?.[task?.priority]}`}>
              {task?.priority?.charAt(0)?.toUpperCase() + task?.priority?.slice(1)} Priority
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusColors?.[task?.status]}`}>
              {task?.status?.replace('_', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {task?.description}
          </p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-4 p-1 hover:bg-muted rounded-md transition-micro"
        >
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-muted-foreground"
          />
        </button>
      </div>
      {/* Task Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center text-sm">
          <Icon name="Calendar" size={16} className="text-muted-foreground mr-2" />
          <span className={`${isOverdue ? 'text-red-600 font-medium' : 'text-muted-foreground'}`}>
            Due: {formatDate(task?.dueDate)}
            {isOverdue && ' (Overdue)'}
            {!isOverdue && daysUntilDue <= 3 && daysUntilDue > 0 && (
              <span className="text-orange-600 ml-1">({daysUntilDue} days left)</span>
            )}
          </span>
        </div>
        <div className="flex items-center text-sm">
          <Icon name="Building" size={16} className="text-muted-foreground mr-2" />
          <span className="text-muted-foreground">{task?.clientName}</span>
        </div>
        <div className="flex items-center text-sm">
          <Icon name="FolderOpen" size={16} className="text-muted-foreground mr-2" />
          <span className="text-muted-foreground">{task?.projectName}</span>
        </div>
      </div>
      {/* Attachments and Created By */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Icon name="Paperclip" size={16} className="mr-2" />
          <span>{task?.attachments} attachment{task?.attachments !== 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Icon name="User" size={16} className="mr-2" />
          <span>Created by {task?.createdBy}</span>
        </div>
      </div>
      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-border pt-4 mb-4">
          <div className="mb-4">
            <h4 className="text-sm font-medium text-foreground mb-2">Full Description</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {task?.fullDescription}
            </p>
          </div>
          {task?.notes && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-foreground mb-2">Notes</h4>
              <p className="text-sm text-muted-foreground">{task?.notes}</p>
            </div>
          )}
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {task?.status === 'pending' && (
          <>
            <Button
              variant="default"
              size="sm"
              onClick={() => onAccept(task?.id)}
              iconName="Check"
              iconPosition="left"
              iconSize={16}
            >
              Accept Task
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDecline(task?.id)}
              iconName="X"
              iconPosition="left"
              iconSize={16}
            >
              Decline
            </Button>
          </>
        )}
        
        {task?.status !== 'pending' && (
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
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Select
              label="Update Status"
              options={statusOptions}
              value={selectedStatus}
              onChange={setSelectedStatus}
            />
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Progress Comment (Optional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e?.target?.value)}
                placeholder="Add a comment about your progress..."
                className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                rows={3}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={handleStatusUpdate}
              disabled={selectedStatus === task?.status}
            >
              Update Status
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowStatusUpdate(false);
                setSelectedStatus(task?.status);
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