import React, { useState, useMemo, useEffect } from 'react';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Button from '../../components/ui/Button';
import TaskFilters from './components/TaskFilters';
import TaskTable from './components/TaskTable';
import CreateTaskModal from './components/CreateTaskModal';
import TaskDetailsModal from './components/TaskDetailsModal';
import Icon from '../../components/AppIcon';


const ManageTasksPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Mock data for tasks
  const [tasks, setTasks] = useState([
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
      assignedTo: "David Kim",
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
  ]);

  // Mock team members data
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
    return tasks?.filter(task => {
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
      unassigned: tasks?.filter(task => task?.status === 'unassigned')?.length,
      assigned: tasks?.filter(task => task?.status === 'assigned')?.length,
      inProgress: tasks?.filter(task => task?.status === 'in-progress')?.length,
      closed: tasks?.filter(task => task?.status === 'closed')?.length
    };
  }, [tasks]);

  const handleCreateTask = async (newTask) => {
    setTasks(prev => [...prev, newTask]);
  };

  const handleUpdateStatus = (taskId, newStatus) => {
    setTasks(prev => prev?.map(task => 
      task?.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsCreateModalOpen(true);
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
    document.title = 'Manage Tasks - TaskFlow Manager';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar userRole="admin" onToggle={() => {}} />
      <div className="md:ml-60">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <BreadcrumbNavigation />
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Manage Tasks</h1>
                <p className="text-muted-foreground mt-2">
                  Create, assign, and track tasks across your projects
                </p>
              </div>
              
              <div className="mt-4 sm:mt-0">
                <Button
                  onClick={() => setIsCreateModalOpen(true)}
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={20}
                  className="w-full sm:w-auto"
                >
                  Create Task
                </Button>
              </div>
            </div>

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
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Tasks ({filteredTasks?.length})
                </h2>
              </div>
              
              <TaskTable
                tasks={filteredTasks}
                onEditTask={handleEditTask}
                onUpdateStatus={handleUpdateStatus}
                onViewDetails={handleViewDetails}
              />
            </div>

            {/* Empty State */}
            {filteredTasks?.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No tasks found</h3>
                <p className="text-muted-foreground mb-4">
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