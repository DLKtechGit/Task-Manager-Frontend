import React from 'react';
import TaskCard from './TaskCard';
import Icon from '../../../components/AppIcon';
import './TaskList.css';

const TaskList = ({ tasks, onStatusUpdate, onAccept, onDecline, isLoading }) => {
  if (isLoading) {
    return (
      <div className="task-list-loading-container">
        <div className="task-list-loading-content">
          <div className="task-list-loading-spinner"></div>
          <span>Loading tasks...</span>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list-empty-container">
        <div className="task-list-empty-content">
          <div className="task-list-empty-icon-container">
            <Icon name="ClipboardList" size={32} className="task-list-empty-icon" />
          </div>
          <div className="task-list-empty-text">
            <h3>No Tasks Found</h3>
            <p>
              There are no tasks matching your current filters. Try adjusting your filter criteria or check back later for new assignments.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
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