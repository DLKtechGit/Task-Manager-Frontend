import React from 'react';
import Icon from '../../../components/AppIcon';

const TaskCountCard = ({ title, count, icon, color, bgColor, textColor }) => {
  return (
    <div className={`${bgColor} rounded-lg p-6 shadow-card transition-smooth hover:shadow-modal`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <p className={`text-3xl font-bold ${textColor}`}>
            {count?.toLocaleString()}
          </p>
        </div>
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
          <Icon name={icon} size={24} color="white" />
        </div>
      </div>
    </div>
  );
};

export default TaskCountCard;