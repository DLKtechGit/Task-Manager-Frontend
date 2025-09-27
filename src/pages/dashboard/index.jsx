import React, { useEffect } from 'react';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import TaskCountCard from './components/TaskCountCard';
import TaskStatsPieChart from './components/TaskStatsPieChart';
import TaskStatsBarChart from './components/TaskStatsBarChart';
import RecentTasksList from './components/RecentTasksList';
import './Dashboard.css';

const Dashboard = () => {
  const userRole = localStorage.getItem('userRole') || 'user';

  useEffect(() => {
    document.title = 'Dashboard - TaskFlow Manager';
  }, []);

  const taskCounts = [
    {
      title: 'Unassigned',
      count: 23,
      icon: 'Clock',
      color: 'bg-gray-500',
      bgColor: 'bg-card',
      textColor: 'text-gray-600'
    },
    {
      title: 'Assigned',
      count: 45,
      icon: 'UserCheck',
      color: 'bg-blue-500',
      bgColor: 'bg-card',
      textColor: 'text-blue-600'
    },
    {
      title: 'In Progress',
      count: 67,
      icon: 'PlayCircle',
      color: 'bg-orange-500',
      bgColor: 'bg-card',
      textColor: 'text-orange-600'
    },
    {
      title: 'Closed',
      count: 89,
      icon: 'CheckCircle',
      color: 'bg-green-500',
      bgColor: 'bg-card',
      textColor: 'text-green-600'
    }
  ];

  return (
    <div className="dashboard">
      <NavigationSidebar userRole={userRole} onToggle={() => {}} />
      <div className="dashboard-main">
        <BreadcrumbNavigation />
        
        {/* Header Section */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">
            Dashboard
          </h1>
          <p className="dashboard-subtitle">
            Welcome back! Here's an overview of your project activities and team performance.
          </p>
        </div>

        {/* Task Count Cards */}
        <div className="dashboard-cards-grid">
          {taskCounts.map((task, index) => (
            <TaskCountCard
              key={index}
              title={task.title}
              count={task.count}
              icon={task.icon}
              color={task.color}
              bgColor={task.bgColor}
              textColor={task.textColor}
            />
          ))}
        </div>

        {/* Charts Section */}
        <div className="dashboard-charts-grid">
          <TaskStatsPieChart />
          <TaskStatsBarChart />
        </div>

        {/* Recent Tasks Section */}
        <RecentTasksList />
      </div>
    </div>
  );
};

export default Dashboard;