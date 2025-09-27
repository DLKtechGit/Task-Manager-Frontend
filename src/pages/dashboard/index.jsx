import React, { useEffect } from 'react';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import TaskCountCard from './components/TaskCountCard';
import TaskStatsPieChart from './components/TaskStatsPieChart';
import TaskStatsBarChart from './components/TaskStatsBarChart';
import RecentTasksList from './components/RecentTasksList';

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
    <div className="min-h-screen bg-background">
      <NavigationSidebar userRole={userRole} onToggle={() => {}} />
      <div className="md:ml-60">
        <div className="p-6 md:p-8">
          <BreadcrumbNavigation />
          
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your project activities and team performance.
            </p>
          </div>

          {/* Task Count Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {taskCounts?.map((task, index) => (
              <TaskCountCard
                key={index}
                title={task?.title}
                count={task?.count}
                icon={task?.icon}
                color={task?.color}
                bgColor={task?.bgColor}
                textColor={task?.textColor}
              />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <TaskStatsPieChart />
            <TaskStatsBarChart />
          </div>

          {/* Recent Tasks Section */}
          <RecentTasksList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;