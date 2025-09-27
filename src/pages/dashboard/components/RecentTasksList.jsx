import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Select from '../../../components/ui/Select';
import './RecentTasksList.css';

const RecentTasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusOptions = [
    { value: 'Unassigned', label: 'Unassigned' },
    { value: 'Assigned', label: 'Assigned' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Closed', label: 'Closed' }
  ];

  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return 'recent-tasks-priority priority-critical';
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
      case 'Unassigned':
        return 'recent-tasks-status status-unassigned';
      case 'Assigned':
        return 'recent-tasks-status status-assigned';
      case 'In Progress':
        return 'recent-tasks-status status-in_progress';
      case 'Closed':
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
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get('http://localhost:5000/api/admin/recent/tasks', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const formattedTasks = res.data.map((task, index) => ({
          id: index + 1,
          title: task.task_title,
          project: task.task_description,
          assignee: task.assigned_user || { username: 'Unassigned', profile_pic: '' },
          priority: task.priority,
          status: task.status,
          dueDate: task.due_date
        }));

        setTasks(formattedTasks);
      } catch (err) {
        console.error('Error fetching recent tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <p className="dashboard-loading">Loading recent tasks...</p>;

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
              {tasks.map((task) => (
                <tr key={task.id} className="recent-tasks-tr recent-tasks-transition">
                  <td className="recent-tasks-td">
                    <div>
                      <p className="recent-tasks-task-title">
                        {task.title}
                      </p>
                      <p className="recent-tasks-project">
                        {task.project}
                      </p>
                    </div>
                  </td>
                  <td className="recent-tasks-td">
                    <div className="recent-tasks-assignee">
                      {task.assignee.profile_pic && (
                        <Image
                          src={task.assignee.profile_pic}
                          alt={task.assignee.username}
                          className="recent-tasks-avatar"
                        />
                      )}
                      <span className="recent-tasks-assignee-name">
                        {task.assignee.username}
                      </span>
                    </div>
                  </td>
                  <td className="recent-tasks-td">
                    <span className={getPriorityClass(task.priority)}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="recent-tasks-td">
                    <div className="recent-tasks-select-wrapper">
                      <Select
                        options={statusOptions}
                        value={task.status}
                        onChange={(value) => handleStatusChange(task.id, value)}
                        className="recent-tasks-select-sm"
                      />
                    </div>
                  </td>
                  <td className="recent-tasks-td">
                    <div className="recent-tasks-due-date">
                      <span className={`recent-tasks-date ${isOverdue(task.dueDate) ? 'recent-tasks-date-overdue' : 'recent-tasks-date-normal'}`}>
                        {formatDate(task.dueDate)}
                      </span>
                      {isOverdue(task.dueDate) && (
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
        {tasks.map((task) => (
          <div key={task.id} className="recent-tasks-card">
            <div className="recent-tasks-card-header">
              <div className="recent-tasks-card-title">
                <h4 className="recent-tasks-card-title-text">
                  {task.title}
                </h4>
                <p className="recent-tasks-card-project">
                  {task.project}
                </p>
              </div>
              <span className={getPriorityClass(task.priority)}>
                {task.priority}
              </span>
            </div>

            <div className="recent-tasks-card-body">
              <div className="recent-tasks-card-assignee">
                {task.assignee.profile_pic && (
                  <Image
                    src={task.assignee.profile_pic}
                    alt={task.assignee.username}
                    className="recent-tasks-card-avatar"
                  />
                )}
                <span className="recent-tasks-card-assignee-name">
                  {task.assignee.username}
                </span>
              </div>
              <div className="recent-tasks-card-due-date">
                <span className={`recent-tasks-card-date ${isOverdue(task.dueDate) ? 'recent-tasks-card-date-overdue' : 'recent-tasks-card-date-normal'}`}>
                  {formatDate(task.dueDate)}
                </span>
                {isOverdue(task.dueDate) && (
                  <Icon name="AlertCircle" size={14} color="var(--color-error)" />
                )}
              </div>
            </div>

            <div className="recent-tasks-select-wrapper">
              <Select
                options={statusOptions}
                value={task.status}
                onChange={(value) => handleStatusChange(task.id, value)}
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