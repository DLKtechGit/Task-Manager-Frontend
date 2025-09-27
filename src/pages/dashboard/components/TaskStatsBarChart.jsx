import React from 'react';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import './TaskStatsBarChart.css';
 
const TaskStatsBarChart = ({ stats }) => {

  // Create an array with one "month" representing current stats

  const data = [

    {

      month: 'Current',

      unassigned: stats.unassigned || 0,

      assigned: stats.assigned || 0,

      inProgress: stats.inProgress || 0,

      closed: stats.completed || 0

    }

  ];
 
  const CustomTooltip = ({ active, payload, label }) => {

    if (active && payload && payload.length) {

      return (
<div className="custom-tooltip">
<p className="tooltip-label">{label}</p>

          {payload.map((entry, index) => (
<p key={index} className="tooltip-item" style={{ color: entry.color }}>

              {entry.name}: {entry.value} tasks
</p>

          ))}
</div>

      );

    }

    return null;

  };
 
  return (
<div className="task-stats-container">
<h3 className="task-stats-title">Task Status Overview</h3>
<div className="task-stats-chart" style={{ height: 300 }}>
<ResponsiveContainer width="100%" height="100%">
<BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
<CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
<XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
<YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
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

 