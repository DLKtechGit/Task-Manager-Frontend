import React, { useState, useEffect } from 'react';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';
import "./AcceptTaskPage.css"

const AcceptTaskPage = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskCounts, setTaskCounts] = useState({
    pending: 0,
    in_progress: 0,
    completed: 0,
    on_hold: 0,
    total: 0
  });

  // Fetch user tasks from backend
  const fetchUserTasks = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('authToken');
      
      const response = await fetch('http://192.168.1.77:5000/api/user/get/alltask', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      
      const backendTasks = await response.json();
      
      // Transform backend data to frontend format
      const transformedTasks = backendTasks.map(task => ({
        id: task._id,
        title: task.task_title,
        description: task.task_description,
        fullDescription: task.task_description,
        status: mapBackendStatusToFrontend(task.status),
        priority: task.priority || 'medium',
        dueDate: task.due_date,
        clientName: task.client_name,
        projectName: task.project_name,
        createdBy: task.created_by?.username || 'Admin',
        attachments: task.attachments?.length || 0,
        notes: task.notes,
        originalData: task
      }));
      
      setTasks(transformedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      // Fallback to empty array
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch task counts from backend
  const fetchTaskCounts = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch('http://192.168.1.77:5000/api/user/task/counts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch task counts');
      }
      
      const counts = await response.json();
      setTaskCounts({
        pending: counts.pendingTasks || 0,
        in_progress: counts.inProgressTasks || 0,
        completed: counts.completedTasks || 0,
        on_hold: 0, // Backend doesn't have on_hold status
        total: counts.totalTasks || 0
      });
    } catch (error) {
      console.error('Error fetching task counts:', error);
    }
  };

  // Map backend status to frontend status
  const mapBackendStatusToFrontend = (backendStatus) => {
    const statusMap = {
      'Pending': 'pending',
      'Accepted': 'pending', // Treat accepted as pending for UI
      'In Progress': 'in_progress',
      'Completed': 'completed',
      'Rejected': 'on_hold'
    };
    return statusMap[backendStatus] || 'pending';
  };

  // Map frontend status to backend status
  const mapFrontendStatusToBackend = (frontendStatus) => {
    const statusMap = {
      'pending': 'Accepted',
      'in_progress': 'In Progress',
      'completed': 'Completed',
      'on_hold': 'Rejected'
    };
    return statusMap[frontendStatus] || 'Pending';
  };

  // Update task status in backend
  const updateTaskStatus = async (taskId, newStatus, comment = '') => {
    try {
      const token = localStorage.getItem('authToken');
      const backendStatus = mapFrontendStatusToBackend(newStatus);
      
      const response = await fetch(`http://192.168.1.77:5000/api/update/workflow/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          status: backendStatus,
          comment: comment 
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update task status');
      }
      
      // Refresh tasks and counts
      await fetchUserTasks();
      await fetchTaskCounts();
      
      return true;
    } catch (error) {
      console.error('Error updating task status:', error);
      return false;
    }
  };

  // Filter tasks based on current filters
  const filteredTasks = tasks.filter(task => {
    const statusMatch = statusFilter === 'all' || task.status === statusFilter;
    const priorityMatch = priorityFilter === 'all' || task.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  const handleStatusUpdate = async (taskId, newStatus, comment) => {
    const success = await updateTaskStatus(taskId, newStatus, comment);
    if (success) {
      console.log(`Task ${taskId} status updated to ${newStatus}`);
    }
  };

  const handleAcceptTask = async (taskId) => {
    const success = await updateTaskStatus(taskId, 'in_progress', 'Task accepted and started');
    if (success) {
      console.log(`Task ${taskId} accepted`);
    }
  };

  const handleDeclineTask = async (taskId) => {
    const success = await updateTaskStatus(taskId, 'on_hold', 'Task declined');
    if (success) {
      console.log(`Task ${taskId} declined`);
    }
  };

  const handleClearFilters = () => {
    setStatusFilter('all');
    setPriorityFilter('all');
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    await Promise.all([fetchUserTasks(), fetchTaskCounts()]);
    setIsLoading(false);
  };

  const handleBulkAccept = async () => {
    for (const taskId of selectedTasks) {
      await handleAcceptTask(taskId);
    }
    setSelectedTasks([]);
  };

  const handleBulkComplete = async () => {
    for (const taskId of selectedTasks) {
      await updateTaskStatus(taskId, 'completed', 'Bulk completed');
    }
    setSelectedTasks([]);
  };

  useEffect(() => {
    fetchUserTasks();
    fetchTaskCounts();
  }, []);

  return (
    <div className="accept-task-page">
      <NavigationSidebar userRole="user" onToggle={() => {}} />
      <div className="page-content">
        <div className="page-container">
          {/* Header */}
          <div className="page-header">
            <BreadcrumbNavigation />
            <div className="header-content">
              <div className="header-text">
                <h1 className="page-title">My Tasks</h1>
                <p className="page-subtitle">
                  Manage your assigned tasks, update status, and track progress
                </p>
              </div>
              <div className="last-updated">
                <Icon name="Clock" size={16} />
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <QuickActions
            onBulkAccept={handleBulkAccept}
            onBulkComplete={handleBulkComplete}
            onRefresh={handleRefresh}
            selectedTasks={selectedTasks}
          />

          {/* Filters */}
          <TaskFilters
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
            onStatusFilterChange={setStatusFilter}
            onPriorityFilterChange={setPriorityFilter}
            onClearFilters={handleClearFilters}
            taskCounts={taskCounts}
          />

          {/* Task List */}
          <div className="task-list-section">
            <div className="task-list-header">
              <h2 className="task-list-title">
                Your Tasks ({filteredTasks.length})
              </h2>
              {filteredTasks.length > 0 && (
                <div className="task-count-info">
                  Showing {filteredTasks.length} of {tasks.length} tasks
                </div>
              )}
            </div>
            
            <TaskList
              tasks={filteredTasks}
              onStatusUpdate={handleStatusUpdate}
              onAccept={handleAcceptTask}
              onDecline={handleDeclineTask}
              isLoading={isLoading}
            />
          </div>

          {/* Footer Info */}
          <div className="footer-info">
            <div className="footer-grid">
              <div className="footer-item">
                <div className="footer-icon accept-icon">
                  <Icon name="CheckSquare" size={24} />
                </div>
                <h3 className="footer-title">Accept Tasks</h3>
                <p className="footer-description">
                  Review and accept tasks assigned to you
                </p>
              </div>
              <div className="footer-item">
                <div className="footer-icon progress-icon">
                  <Icon name="TrendingUp" size={24} />
                </div>
                <h3 className="footer-title">Track Progress</h3>
                <p className="footer-description">
                  Update status and monitor your progress
                </p>
              </div>
              <div className="footer-item">
                <div className="footer-icon communicate-icon">
                  <Icon name="MessageSquare" size={24} />
                </div>
                <h3 className="footer-title">Communicate</h3>
                <p className="footer-description">
                  Add comments and communicate with your team
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcceptTaskPage;