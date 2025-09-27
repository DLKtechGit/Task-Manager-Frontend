import React, { useState, useEffect } from 'react';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';

const AcceptTaskPage = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);

  // Mock data for tasks assigned to current user
  const mockTasks = [
    {
      id: 1,
      title: "Implement User Authentication System",
      description: "Design and develop a comprehensive user authentication system with JWT tokens, password reset functionality, and role-based access control.",
      fullDescription: `Design and develop a comprehensive user authentication system with JWT tokens, password reset functionality, and role-based access control.\n\nKey Requirements:\n- JWT token implementation\n- Password encryption using bcrypt\n- Role-based middleware\n- Password reset via email\n- Session management\n- Security best practices\n\nDeliverables:\n- Authentication API endpoints\n- Frontend login/register components\n- Password reset flow\n- Documentation`,
      status: "pending",
      priority: "high",
      dueDate: "2025-01-15",
      clientName: "TechCorp Solutions",
      projectName: "Enterprise Portal",
      createdBy: "Sarah Johnson",
      attachments: 3,
      notes: "Please review the security requirements document before starting implementation."
    },
    {
      id: 2,
      title: "Database Schema Optimization",
      description: "Analyze and optimize the current database schema for better performance and scalability.",
      fullDescription: `Analyze and optimize the current database schema for better performance and scalability.\n\nScope of Work:\n- Performance analysis of current queries\n- Index optimization\n- Table structure review\n- Query optimization\n- Database normalization review\n\nExpected Outcomes:\n- 30% improvement in query performance\n- Reduced database load\n- Better scalability for future growth`,
      status: "in_progress",
      priority: "medium",
      dueDate: "2025-01-20",
      clientName: "DataFlow Inc",
      projectName: "Analytics Platform",
      createdBy: "Michael Chen",
      attachments: 5,
      notes: "Database backup has been created. Test environment is ready for optimization testing."
    },
    {
      id: 3,
      title: "Mobile App UI/UX Redesign",
      description: "Redesign the mobile application interface to improve user experience and modernize the visual design.",
      fullDescription: `Redesign the mobile application interface to improve user experience and modernize the visual design.\n\nProject Scope:\n- User research and persona development\n- Wireframing and prototyping\n- Visual design system creation\n- Responsive design implementation\n- Usability testing\n\nDeliverables:\n- Design system documentation\n- High-fidelity mockups\n- Interactive prototypes\n- Implementation guidelines`,
      status: "completed",
      priority: "low",
      dueDate: "2025-01-10",
      clientName: "MobileFirst Ltd",
      projectName: "Consumer App",
      createdBy: "Emily Rodriguez",
      attachments: 8,
      notes: "Client has approved the initial design concepts. Ready for development phase."
    },
    {
      id: 4,
      title: "API Integration Testing",
      description: "Comprehensive testing of third-party API integrations including error handling and performance validation.",
      fullDescription: `Comprehensive testing of third-party API integrations including error handling and performance validation.\n\nTesting Areas:\n- Payment gateway integration\n- Social media APIs\n- Email service providers\n- Analytics platforms\n- Error handling scenarios\n- Rate limiting compliance\n\nTest Cases:\n- Positive flow testing\n- Negative scenario testing\n- Performance benchmarking\n- Security validation`,
      status: "on_hold",
      priority: "medium",
      dueDate: "2025-01-25",
      clientName: "IntegrateNow Corp",
      projectName: "Platform Unification",
      createdBy: "David Kim",
      attachments: 2,
      notes: "Waiting for API credentials from third-party vendors. Testing environment is prepared."
    },
    {
      id: 5,
      title: "Security Audit Implementation",
      description: "Conduct comprehensive security audit and implement recommended security measures across the application.",
      fullDescription: `Conduct comprehensive security audit and implement recommended security measures across the application.\n\nAudit Scope:\n- Code review for security vulnerabilities\n- Infrastructure security assessment\n- Data encryption validation\n- Access control review\n- Compliance check (GDPR, SOC2)\n\nImplementation Tasks:\n- Fix identified vulnerabilities\n- Implement security headers\n- Update authentication mechanisms\n- Enhance logging and monitoring`,
      status: "pending",
      priority: "high",
      dueDate: "2025-01-12",
      clientName: "SecureBank",
      projectName: "Banking Platform",
      createdBy: "Lisa Thompson",
      attachments: 4,
      notes: "Critical priority due to compliance requirements. Security team will provide support."
    },
    {
      id: 6,
      title: "Performance Monitoring Setup",
      description: "Set up comprehensive performance monitoring and alerting system for production applications.",
      fullDescription: `Set up comprehensive performance monitoring and alerting system for production applications.\n\nMonitoring Components:\n- Application performance metrics\n- Database performance tracking\n- Server resource monitoring\n- User experience metrics\n- Error tracking and alerting\n\nTools Integration:\n- APM tool configuration\n- Custom dashboard creation\n- Alert rule setup\n- Notification channels\n- Reporting automation`,
      status: "in_progress",
      priority: "low",
      dueDate: "2025-01-30",
      clientName: "MonitorTech",
      projectName: "Observability Suite",
      createdBy: "Alex Wilson",
      attachments: 1,
      notes: "Monitoring tools have been procured. Infrastructure team is ready to assist with setup."
    }
  ];

  // Filter tasks based on current filters
  const filteredTasks = mockTasks?.filter(task => {
    const statusMatch = statusFilter === 'all' || task?.status === statusFilter;
    const priorityMatch = priorityFilter === 'all' || task?.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  // Calculate task counts for different statuses
  const taskCounts = {
    pending: mockTasks?.filter(task => task?.status === 'pending')?.length,
    in_progress: mockTasks?.filter(task => task?.status === 'in_progress')?.length,
    completed: mockTasks?.filter(task => task?.status === 'completed')?.length,
    on_hold: mockTasks?.filter(task => task?.status === 'on_hold')?.length
  };

  const handleStatusUpdate = (taskId, newStatus, comment) => {
    console.log(`Updating task ${taskId} to status: ${newStatus}`, comment ? `Comment: ${comment}` : '');
    // In a real app, this would make an API call
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Show success message or update local state
    }, 1000);
  };

  const handleAcceptTask = (taskId) => {
    console.log(`Accepting task ${taskId}`);
    handleStatusUpdate(taskId, 'in_progress', 'Task accepted and started');
  };

  const handleDeclineTask = (taskId) => {
    console.log(`Declining task ${taskId}`);
    // In a real app, this would remove the task from user's list or mark as declined
  };

  const handleClearFilters = () => {
    setStatusFilter('all');
    setPriorityFilter('all');
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Tasks refreshed');
    }, 1000);
  };

  const handleBulkAccept = () => {
    console.log('Bulk accepting tasks:', selectedTasks);
    selectedTasks?.forEach(taskId => handleAcceptTask(taskId));
    setSelectedTasks([]);
  };

  const handleBulkComplete = () => {
    console.log('Bulk completing tasks:', selectedTasks);
    selectedTasks?.forEach(taskId => handleStatusUpdate(taskId, 'completed', 'Bulk completed'));
    setSelectedTasks([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar userRole="user" onToggle={() => {}} />
      <div className="md:ml-60">
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <BreadcrumbNavigation />
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Accept Tasks</h1>
                <p className="text-muted-foreground">
                  Manage your assigned tasks, update status, and track progress
                </p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
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
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Your Tasks ({filteredTasks?.length})
              </h2>
              {filteredTasks?.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  Showing {filteredTasks?.length} of {mockTasks?.length} tasks
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
          <div className="mt-12 pt-8 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Icon name="CheckSquare" size={24} className="text-blue-600" />
                </div>
                <h3 className="font-medium text-foreground">Accept Tasks</h3>
                <p className="text-sm text-muted-foreground">
                  Review and accept tasks assigned to you
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Icon name="TrendingUp" size={24} className="text-green-600" />
                </div>
                <h3 className="font-medium text-foreground">Track Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Update status and monitor your progress
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Icon name="MessageSquare" size={24} className="text-purple-600" />
                </div>
                <h3 className="font-medium text-foreground">Communicate</h3>
                <p className="text-sm text-muted-foreground">
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