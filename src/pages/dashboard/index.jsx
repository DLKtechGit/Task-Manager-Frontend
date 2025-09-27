import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import TaskCountCard from './components/TaskCountCard';
import TaskStatsPieChart from './components/TaskStatsPieChart';
import TaskStatsBarChart from './components/TaskStatsBarChart';
import RecentTasksList from './components/RecentTasksList';
import './Dashboard.css';
 
const Dashboard = () => {
  const userRole = localStorage.getItem('userRole') || 'user';
  const [stats, setStats] = useState({
    users: { unassigned: 0, assigned: 0 },
    tasks: { total: 0, inProgress: 0, completed: 0, pending: 0 }
  });
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    document.title = 'Dashboard - TaskFlow Manager';
  }, []);
 
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get('http://localhost:5000/api/admin/dashboard/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(res.data)
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };
 
    if (userRole === 'admin') {
      fetchStats();
    }
  }, [userRole]);
 
  const taskCounts = [
    {
      title: 'Unassigned Users',
      count: stats.users.unassigned,
      icon: 'Clock',
      color: 'bg-gray-500',
      bgColor: 'bg-card',
      textColor: 'text-gray-600'
    },
    {
      title: 'Assigned Users',
      count: stats.users.assigned,
      icon: 'UserCheck',
      color: 'bg-blue-500',
      bgColor: 'bg-card',
      textColor: 'text-blue-600'
    },
    {
      title: 'In Progress Tasks',
      count: stats.tasks.inProgress,
      icon: 'PlayCircle',
      color: 'bg-orange-500',
      bgColor: 'bg-card',
      textColor: 'text-orange-600'
    },
    {
      title: 'Completed Tasks',
      count: stats.tasks.completed,
      icon: 'CheckCircle',
      color: 'bg-green-500',
      bgColor: 'bg-card',
      textColor: 'text-green-600'
    },
    {
      title: 'Pending Tasks',
      count: stats.tasks.pending,
      icon: 'Clock',
      color: 'bg-yellow-500',
      bgColor: 'bg-card',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Total Tasks',
      count: stats.tasks.total,
      icon: 'ListChecks',
      color: 'bg-purple-500',
      bgColor: 'bg-card',
      textColor: 'text-purple-600'
    }
  ];
 
  if (loading) return <p className="dashboard-loading">Loading dashboard...</p>;
 
  return (
    <div className="dashboard">
      <NavigationSidebar userRole={userRole} onToggle={() => {}} />
      <div className="dashboard-main">
        <BreadcrumbNavigation />
 
        {/* Header Section */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
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
          <TaskStatsPieChart stats={stats.tasks} />
          <TaskStatsBarChart stats={stats.tasks} />
        </div>
 
        {/* Recent Tasks Section */}
        <RecentTasksList />
      </div>
    </div>
  );
};
 
export default Dashboard;
 
 