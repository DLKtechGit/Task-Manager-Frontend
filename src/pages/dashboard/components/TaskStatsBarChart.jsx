import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './TaskStatsBarChart.css'; // import the CSS file

const TaskStatsBarChart = () => {
  const data = [
    { month: 'Jan', unassigned: 12, assigned: 25, inProgress: 18, closed: 35 },
    { month: 'Feb', unassigned: 8, assigned: 30, inProgress: 22, closed: 42 },
    { month: 'Mar', unassigned: 15, assigned: 28, inProgress: 25, closed: 38 },
    { month: 'Apr', unassigned: 10, assigned: 35, inProgress: 30, closed: 45 },
    { month: 'May', unassigned: 18, assigned: 32, inProgress: 28, closed: 40 },
    { month: 'Jun', unassigned: 23, assigned: 45, inProgress: 67, closed: 89 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="tooltip-item" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value} tasks
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="task-stats-container">
      <h3 className="task-stats-title">Monthly Task Trends</h3>
      <div className="task-stats-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="unassigned" fill="#6B7280" name="Unassigned" radius={[2, 2, 0, 0]} />
            <Bar dataKey="assigned" fill="#3B82F6" name="Assigned" radius={[2, 2, 0, 0]} />
            <Bar dataKey="inProgress" fill="#F59E0B" name="In Progress" radius={[2, 2, 0, 0]} />
            <Bar dataKey="closed" fill="#22C55E" name="Closed" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TaskStatsBarChart;
