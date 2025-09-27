import React from 'react';
import TaskCard from './TaskCard';
import Icon from '../../../components/AppIcon';

const TaskList = ({ tasks, onStatusUpdate, onAccept, onDecline, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span>Loading tasks...</span>
        </div>
      </div>
    );
  }

  if (tasks?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-12 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Icon name="ClipboardList" size={32} className="text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">No Tasks Found</h3>
            <p className="text-muted-foreground max-w-md">
              There are no tasks matching your current filters. Try adjusting your filter criteria or check back later for new assignments.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {tasks?.map((task) => (
        <TaskCard
          key={task?.id}
          task={task}
          onStatusUpdate={onStatusUpdate}
          onAccept={onAccept}
          onDecline={onDecline}
        />
      ))}
    </div>
  );
};

export default TaskList;