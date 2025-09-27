import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Select from '../../../components/ui/Select';
import './RecentTasksList.css';

const RecentTasksList = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Implement user authentication system",
      assignee: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      priority: "high",
      status: "in_progress",
      dueDate: "2025-01-15",
      project: "TaskFlow Manager"
    },
    {
      id: 2,
      title: "Design dashboard wireframes",
      assignee: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      priority: "medium",
      status: "assigned",
      dueDate: "2025-01-18",
      project: "UI/UX Project"
    },
    {
      id: 3,
      title: "Database optimization and indexing",
      assignee: {
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      priority: "high",
      status: "closed",
      dueDate: "2025-01-12",
      project: "Backend Services"
    },
    {
      id: 4,
      title: "Create API documentation",
      assignee: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      priority: "low",
      status: "assigned",
      dueDate: "2025-01-20",
      project: "Documentation"
    },
    {
      id: 5,
      title: "Mobile app responsive testing",
      assignee: {
        name: "Lisa Wang",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
      },
      priority: "medium",
      status: "in_progress",
      dueDate: "2025-01-16",
      project: "Quality Assurance"
    }
  ]);

  const statusOptions = [
    { value: 'unassigned', label: 'Unassigned' },
    { value: 'assigned', label: 'Assigned' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'closed', label: 'Closed' }
  ];

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'recent-tasks-priority priority-high';
      case 'medium':
        return 'recent-tasks-priority priority-medium';
      case 'low':
        return 'recent-tasks-priority priority-low';
      default:
        return 'recent-tasks-priority priority-default';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'unassigned':
        return 'recent-tasks-status status-unassigned';
      case 'assigned':
        return 'recent-tasks-status status-assigned';
      case 'in_progress':
        return 'recent-tasks-status status-in_progress';
      case 'closed':
        return 'recent-tasks-status status-closed';
      default:
        return 'recent-tasks-status status-unassigned';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prevTasks => 
      prevTasks?.map(task => 
        task?.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="recent-tasks">
      <div className="recent-tasks-header">
        <h3 className="recent-tasks-title">Recent Tasks</h3>
        <button className="recent-tasks-view-all recent-tasks-transition">
          View All
        </button>
      </div>
      
      {/* Desktop View */}
      <div className="recent-tasks-desktop">
        <div className="recent-tasks-table-wrapper">
          <table className="recent-tasks-table">
            <thead className="recent-tasks-thead">
              <tr>
                <th className="recent-tasks-th">Task</th>
                <th className="recent-tasks-th">Assignee</th>
                <th className="recent-tasks-th">Priority</th>
                <th className="recent-tasks-th">Status</th>
                <th className="recent-tasks-th">Due Date</th>
              </tr>
            </thead>
            <tbody className="recent-tasks-tbody">
              {tasks?.map((task) => (
                <tr key={task?.id} className="recent-tasks-tr recent-tasks-transition">
                  <td className="recent-tasks-td">
                    <div>
                      <p className="recent-tasks-task-title">
                        {task?.title}
                      </p>
                      <p className="recent-tasks-project">
                        {task?.project}
                      </p>
                    </div>
                  </td>
                  <td className="recent-tasks-td">
                    <div className="recent-tasks-assignee">
                      <Image
                        src={task?.assignee?.avatar}
                        alt={task?.assignee?.name}
                        className="recent-tasks-avatar"
                      />
                      <span className="recent-tasks-assignee-name">
                        {task?.assignee?.name}
                      </span>
                    </div>
                  </td>
                  <td className="recent-tasks-td">
                    <span className={getPriorityClass(task?.priority)}>
                      {task?.priority?.charAt(0)?.toUpperCase() + task?.priority?.slice(1)}
                    </span>
                  </td>
                  <td className="recent-tasks-td">
                    <div className="recent-tasks-select-wrapper">
                      <Select
                        options={statusOptions}
                        value={task?.status}
                        onChange={(value) => handleStatusChange(task?.id, value)}
                        className="recent-tasks-select-sm"
                      />
                    </div>
                  </td>
                  <td className="recent-tasks-td">
                    <div className="recent-tasks-due-date">
                      <span className={`recent-tasks-date ${isOverdue(task?.dueDate) ? 'recent-tasks-date-overdue' : 'recent-tasks-date-normal'}`}>
                        {formatDate(task?.dueDate)}
                      </span>
                      {isOverdue(task?.dueDate) && (
                        <Icon name="AlertCircle" size={16} color="var(--color-error)" />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Mobile View */}
      <div className="recent-tasks-mobile">
        {tasks?.map((task) => (
          <div key={task?.id} className="recent-tasks-card">
            <div className="recent-tasks-card-header">
              <div className="recent-tasks-card-title">
                <h4 className="recent-tasks-card-title-text">
                  {task?.title}
                </h4>
                <p className="recent-tasks-card-project">
                  {task?.project}
                </p>
              </div>
              <span className={getPriorityClass(task?.priority)}>
                {task?.priority?.charAt(0)?.toUpperCase() + task?.priority?.slice(1)}
              </span>
            </div>

            <div className="recent-tasks-card-body">
              <div className="recent-tasks-card-assignee">
                <Image
                  src={task?.assignee?.avatar}
                  alt={task?.assignee?.name}
                  className="recent-tasks-card-avatar"
                />
                <span className="recent-tasks-card-assignee-name">
                  {task?.assignee?.name}
                </span>
              </div>
              <div className="recent-tasks-card-due-date">
                <span className={`recent-tasks-card-date ${isOverdue(task?.dueDate) ? 'recent-tasks-card-date-overdue' : 'recent-tasks-card-date-normal'}`}>
                  {formatDate(task?.dueDate)}
                </span>
                {isOverdue(task?.dueDate) && (
                  <Icon name="AlertCircle" size={14} color="var(--color-error)" />
                )}
              </div>
            </div>

            <div className="recent-tasks-select-wrapper">
              <Select
                options={statusOptions}
                value={task?.status}
                onChange={(value) => handleStatusChange(task?.id, value)}
                className="recent-tasks-select-md"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTasksList;