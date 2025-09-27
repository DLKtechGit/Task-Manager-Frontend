import React, { useState, useMemo, useEffect } from 'react';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Button from '../../components/ui/Button';
import TaskFilters from './components/TaskFilters';
import TaskTable from './components/TaskTable';
import CreateTaskModal from './components/CreateTaskModal';
import TaskDetailsModal from './components/TaskDetailsModal';
import Icon from '../../components/AppIcon';
import './ManageTasksPage.css';

const ManageTasksPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      
      const response = await fetch('http://192.168.1.77:5000/api/admin/get/alltask', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Access denied. Admin privileges required.');
        }
        throw new Error('Failed to fetch tasks');
      }
      
      const backendTasks = await response.json();
      
      // Transform backend data to frontend format
      const transformedTasks = backendTasks.map((task, index) => ({
        id: task._id || index + 1,
        taskName: task.task_name || 'Unnamed Task',
        description: task.description || 'No description available',
        status: task.status || 'unassigned',
        priority: task.priority || 'medium',
        assignedTo: task.assigned_user?.username || 'Unassigned',
        dueDate: task.due_date ? new Date(task.due_date).toISOString().split('T')[0] : 'No due date',
        clientName: task.client_name || 'No client',
        projectName: task.project_name || 'No project',
        createdBy: task.created_by || 'Admin',
        createdAt: task.created_at || new Date().toISOString(),
        notes: task.notes || '',
        attachments: task.attachments || [],
        // Include backend fields for details
        assigned_user: task.assigned_user,
        originalData: task
      }));
      
      setTasks(transformedTasks);
      setError('');
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err.message || 'Failed to load tasks. Using demo data.');
      // Fallback to demo data only if it's not an auth error
      if (!err.message.includes('Access denied')) {
        loadDemoData();
      }
    } finally {
      setLoading(false);
    }
  };

  // Demo data fallback (only used if backend fails and it's not an auth error)
  const loadDemoData = () => {
    const demoTasks = [
      {
        id: 1,
        taskName: "Implement User Authentication",
        description: "Create secure login and registration system with JWT tokens and password encryption",
        status: "in-progress",
        priority: "high",
        assignedTo: "Sarah Johnson",
        dueDate: "2025-01-15",
        clientName: "TechCorp Solutions",
        projectName: "E-commerce Platform",
        createdBy: "John Doe",
        createdAt: "2025-01-10T09:00:00Z",
        notes: "Ensure compliance with security standards and implement two-factor authentication",
        attachments: []
      },
      {
        id: 2,
        taskName: "Design Database Schema",
        description: "Create comprehensive database design for the new CRM system including all entities and relationships",
        status: "assigned",
        priority: "medium",
        assignedTo: "Mike Chen",
        dueDate: "2025-01-20",
        clientName: "Business Solutions Inc",
        projectName: "CRM System",
        createdBy: "John Doe",
        createdAt: "2025-01-08T14:30:00Z",
        notes: "Focus on scalability and performance optimization",
        attachments: []
      },
      {
        id: 3,
        taskName: "API Integration Testing",
        description: "Test all third-party API integrations and ensure proper error handling",
        status: "closed",
        priority: "low",
        assignedTo: "Emily Rodriguez",
        dueDate: "2025-01-12",
        clientName: "StartupXYZ",
        projectName: "Mobile App Backend",
        createdBy: "John Doe",
        createdAt: "2025-01-05T11:15:00Z",
        notes: "All tests passed successfully",
        attachments: []
      },
      {
        id: 4,
        taskName: "UI/UX Wireframes",
        description: "Create detailed wireframes for the admin dashboard including all user flows",
        status: "unassigned",
        priority: "medium",
        assignedTo: "Unassigned",
        dueDate: "2025-01-25",
        clientName: "Enterprise Corp",
        projectName: "Admin Dashboard",
        createdBy: "John Doe",
        createdAt: "2025-01-09T16:45:00Z",
        notes: "Include responsive design considerations",
        attachments: []
      },
      {
        id: 5,
        taskName: "Performance Optimization",
        description: "Optimize application performance and reduce loading times by at least 30%",
        status: "in-progress",
        priority: "high",
        assignedTo: "Alex Thompson",
        dueDate: "2025-01-18",
        clientName: "TechCorp Solutions",
        projectName: "E-commerce Platform",
        createdBy: "John Doe",
        createdAt: "2025-01-07T13:20:00Z",
        notes: "Focus on database queries and image optimization",
        attachments: []
      },
      {
        id: 6,
        taskName: "Security Audit",
        description: "Conduct comprehensive security audit and fix any vulnerabilities found",
        status: "assigned",
        priority: "high",
        assignedTo: "Lisa Wang",
        dueDate: "2025-01-22",
        clientName: "Financial Services Ltd",
        projectName: "Banking Application",
        createdBy: "John Doe",
        createdAt: "2025-01-06T10:00:00Z",
        notes: "Include penetration testing and code review",
        attachments: []
      }
    ];
    setTasks(demoTasks);
  };

  // Mock team members data (you might want to fetch this from your backend too)
  const teamMembers = [
    { id: 1, name: "Sarah Johnson", email: "sarah.johnson@company.com", role: "Frontend Developer" },
    { id: 2, name: "Mike Chen", email: "mike.chen@company.com", role: "Backend Developer" },
    { id: 3, name: "Emily Rodriguez", email: "emily.rodriguez@company.com", role: "QA Engineer" },
    { id: 4, name: "David Kim", email: "david.kim@company.com", role: "UI/UX Designer" },
    { id: 5, name: "Alex Thompson", email: "alex.thompson@company.com", role: "Full Stack Developer" },
    { id: 6, name: "Lisa Wang", email: "lisa.wang@company.com", role: "Security Specialist" }
  ];

  // Filter tasks based on search and filters
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task?.taskName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           task?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           task?.projectName?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      
      const matchesStatus = !statusFilter || task?.status === statusFilter;
      const matchesPriority = !priorityFilter || task?.priority === priorityFilter;
      const matchesAssignee = !assigneeFilter || task?.assignedTo === assigneeFilter;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
    });
  }, [tasks, searchTerm, statusFilter, priorityFilter, assigneeFilter]);

  // Calculate task counts
  const taskCounts = useMemo(() => {
    return {
      unassigned: tasks.filter(task => task?.status === 'unassigned')?.length,
      assigned: tasks.filter(task => task?.status === 'assigned')?.length,
      inProgress: tasks.filter(task => task?.status === 'in-progress')?.length,
      closed: tasks.filter(task => task?.status === 'closed')?.length
    };
  }, [tasks]);

  const handleCreateTask = async (newTask) => {
    // Note: You'll need to create a backend endpoint for adding tasks
    // For now, we'll just refresh the list
    await fetchTasks();
  };

  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem('authToken');
      
      // Update task status in backend - you'll need to create this endpoint
      const response = await fetch(`http://192.168.1.77:5000/api/admin/tasks/${taskId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        // Refresh the list to get updated data from backend
        await fetchTasks();
      } else {
        throw new Error('Failed to update task status');
      }
    } catch (error) {
      console.error('Error updating task status:', error);
      // Fallback to local update if backend fails
      setTasks(prev => prev.map(task => 
        task?.id === taskId ? { ...task, status: newStatus } : task
      ));
    }
  };

  const handleViewDetails = (task) => {
    setSelectedTask(task);
    setIsDetailsModalOpen(true);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setPriorityFilter('');
    setAssigneeFilter('');
  };

  useEffect(() => {
    fetchTasks();
    document.title = 'Manage Tasks - TaskFlow Manager';
  }, []);

  if (loading) {
    return (
      <div className="manage-tasks-loading">
        <div className="manage-tasks-loading-content">
          <Icon name="Loader" size={32} className="manage-tasks-loading-icon" />
          <p className="manage-tasks-loading-text">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="manage-tasks-page">
      <NavigationSidebar userRole="admin" onToggle={() => {}} />
      <div className="manage-tasks-main">
        <div className="manage-tasks-container">
          <BreadcrumbNavigation />
          
          {/* Header */}
          <div className="manage-tasks-header">
            <div className="manage-tasks-title-section">
              <h1 className="manage-tasks-title">Manage Tasks</h1>
              <p className="manage-tasks-subtitle">
                Create, assign, and track tasks across your projects
              </p>
            </div>
            
            <div className="manage-tasks-create-button">
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                iconName="Plus"
                iconPosition="left"
                iconSize={20}
              >
                Create Task
              </Button>
            </div>
          </div>

          {error && (
            <div className="manage-tasks-error">
              <Icon name="AlertCircle" size={20} className="manage-tasks-error-icon" />
              <p className="manage-tasks-error-text">{error}</p>
              {error.includes('Access denied') && (
                <Button 
                  onClick={() => window.location.href = '/dashboard'}
                  variant="outline"
                  size="sm"
                  className="manage-tasks-error-button"
                >
                  Back to Dashboard
                </Button>
              )}
            </div>
          )}

          {/* Filters */}
          <TaskFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityFilterChange={setPriorityFilter}
            assigneeFilter={assigneeFilter}
            onAssigneeFilterChange={setAssigneeFilter}
            onClearFilters={handleClearFilters}
            taskCounts={taskCounts}
            teamMembers={teamMembers}
          />

          {/* Tasks Table */}
          <div className="manage-tasks-section">
            <div className="manage-tasks-section-header">
              <h2 className="manage-tasks-section-title">
                Tasks ({filteredTasks?.length})
              </h2>
            </div>
            
            <TaskTable
              tasks={filteredTasks}
              onUpdateStatus={handleUpdateStatus}
              onViewDetails={handleViewDetails}
              // Remove edit functionality as requested
            />
          </div>

          {/* Empty State */}
          {filteredTasks?.length === 0 && (
            <div className="manage-tasks-empty">
              <div className="manage-tasks-empty-icon">
                <Icon name="Search" size={32} className="manage-tasks-empty-icon-svg" />
              </div>
              <h3 className="manage-tasks-empty-title">No tasks found</h3>
              <p className="manage-tasks-empty-description">
                {searchTerm || statusFilter || priorityFilter || assigneeFilter
                  ? 'Try adjusting your search or filters' : 'Get started by creating your first task'
                }
              </p>
              {!searchTerm && !statusFilter && !priorityFilter && !assigneeFilter && (
                <Button
                  onClick={() => setIsCreateModalOpen(true)}
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                >
                  Create First Task
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Modals */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setSelectedTask(null);
        }}
        onCreateTask={handleCreateTask}
        teamMembers={teamMembers}
      />
      <TaskDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
      />
    </div>
  );
};

export default ManageTasksPage;