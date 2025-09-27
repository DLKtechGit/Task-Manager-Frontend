import React from 'react';
import Icon from '../../../components/AppIcon';
import './TaskCountCard.css'; // import the CSS file

const TaskCountCard = ({ title, count, icon, color, bgColor, textColor }) => {
  return (
    <div className={`task-card ${bgColor}`}>
      <div className="task-card-content">
        <div>
          <p className="task-card-title">{title}</p>
          <p className={`task-card-count ${textColor}`}>
            {count?.toLocaleString()}
          </p>
        </div>
        <div className={`task-card-icon ${color}`}>
          <Icon name={icon} size={24} color="white" />
        </div>
      </div>
    </div>
  );
};

export default TaskCountCard;
