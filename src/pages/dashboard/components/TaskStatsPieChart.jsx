import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import './TaskStatsPieChart.css';
 
const TaskStatsPieChart = ({ stats }) => {
  // stats.tasks should contain: total, inProgress, completed, pending
  const data = [
    { name: 'In Progress', value: stats.inProgress || 0, color: '#F59E0B' },
    { name: 'Completed', value: stats.completed || 0, color: '#22C55E' },
    { name: 'Pending', value: stats.pending || 0, color: '#FBBF24' }, // optional
    { name: 'Unassigned', value: stats.total - (stats.inProgress + stats.completed + stats.pending) || 0, color: '#6B7280' }
  ];
 
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-text">
            {payload[0].name}: {payload[0].value} tasks
          </p>
        </div>
      );
    }
    return null;
  };
 
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
 
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="chart-label"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
 
  return (
    <div className="task-pie-container">
      <h3 className="task-pie-title">Task Distribution</h3>
      <div className="task-pie-chart">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value, entry) => (
                <span style={{ color: entry.color }} className="legend-text">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
 
export default TaskStatsPieChart;
 
 