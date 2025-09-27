import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import './TaskTable.css';

const TaskTable = ({ tasks, onEditTask, onUpdateStatus, onViewDetails }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'task-table-badge task-table-priority-high';
      case 'medium':
        return 'task-table-badge task-table-priority-medium';
      case 'low':
        return 'task-table-badge task-table-priority-low';
      default:
        return 'task-table-badge task-table-priority-medium';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'unassigned':
        return 'task-table-badge task-table-status-unassigned';
      case 'assigned':
        return 'task-table-badge task-table-status-assigned';
      case 'in-progress':
        return 'task-table-badge task-table-status-in-progress';
      case 'closed':
        return 'task-table-badge task-table-status-closed';
      default:
        return 'task-table-badge task-table-status-unassigned';
    }
  };

  const statusOptions = [
    { value: 'unassigned', label: 'Unassigned' },
    { value: 'assigned', label: 'Assigned' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'closed', label: 'Closed' }
  ];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedTasks = useMemo(() => {
    let sortableTasks = [...tasks];
    if (sortConfig?.key) {
      sortableTasks?.sort((a, b) => {
        if (sortConfig?.key === 'dueDate') {
          const dateA = new Date(a[sortConfig.key]);
          const dateB = new Date(b[sortConfig.key]);
          return sortConfig?.direction === 'asc' ? dateA - dateB : dateB - dateA;
        }
        
        if (a?.[sortConfig?.key] < b?.[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (a?.[sortConfig?.key] > b?.[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableTasks;
  }, [tasks, sortConfig]);

  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedTasks?.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedTasks, currentPage]);

  const totalPages = Math.ceil(sortedTasks?.length / itemsPerPage);

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleStatusChange = (taskId, newStatus) => {
    onUpdateStatus(taskId, newStatus);
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={16} className="task-table-sort-icon" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={16} className="task-table-sort-icon-active" />
      : <Icon name="ArrowDown" size={16} className="task-table-sort-icon-active" />;
  };

  return (
    <div className="task-table">
      {/* Desktop Table View */}
      <div className="task-table-desktop">
        <table className="task-table-table">
          <thead className="task-table-thead">
            <tr>
              <th className="task-table-th">
                <button
                  onClick={() => handleSort('taskName')}
                  className="task-table-sort-button"
                >
                  <span>Task Name</span>
                  {getSortIcon('taskName')}
                </button>
              </th>
              <th className="task-table-th">
                <button
                  onClick={() => handleSort('status')}
                  className="task-table-sort-button"
                >
                  <span>Status</span>
                  {getSortIcon('status')}
                </button>
              </th>
              <th className="task-table-th">
                <button
                  onClick={() => handleSort('priority')}
                  className="task-table-sort-button"
                >
                  <span>Priority</span>
                  {getSortIcon('priority')}
                </button>
              </th>
              <th className="task-table-th">
                <button
                  onClick={() => handleSort('assignedTo')}
                  className="task-table-sort-button"
                >
                  <span>Assigned To</span>
                  {getSortIcon('assignedTo')}
                </button>
              </th>
              <th className="task-table-th">
                <button
                  onClick={() => handleSort('dueDate')}
                  className="task-table-sort-button"
                >
                  <span>Due Date</span>
                  {getSortIcon('dueDate')}
                </button>
              </th>
              <th className="task-table-th" style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody className="task-table-tbody">
            {paginatedTasks?.map((task) => (
              <tr key={task?.id} className="task-table-tr task-table-transition">
                <td className="task-table-td">
                  <div className="task-table-task-info">
                    <span className="task-table-task-name">{task?.taskName}</span>
                    <span className="task-table-project-name">{task?.projectName}</span>
                  </div>
                </td>
                <td className="task-table-td">
                  <div className="task-table-select">
                    <Select
                      options={statusOptions}
                      value={task?.status}
                      onChange={(value) => handleStatusChange(task?.id, value)}
                      className="task-table-select-xs"
                    />
                  </div>
                </td>
                <td className="task-table-td">
                  <span className={getPriorityClass(task?.priority)}>
                    {task?.priority?.charAt(0)?.toUpperCase() + task?.priority?.slice(1)}
                  </span>
                </td>
                <td className="task-table-td">
                  <div className="task-table-assignee">
                    <div className="task-table-avatar">
                      <Icon name="User" size={16} className="task-table-avatar-icon" />
                    </div>
                    <span className="task-table-assignee-name">{task?.assignedTo}</span>
                  </div>
                </td>
                <td className="task-table-td">
                  <span className="task-table-date">{formatDate(task?.dueDate)}</span>
                </td>
                <td className="task-table-td">
                  <div className="task-table-actions">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails(task)}
                      iconName="Eye"
                      iconSize={16}
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditTask(task)}
                      iconName="Edit"
                      iconSize={16}
                    >
                      Edit
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Mobile Card View */}
      <div className="task-table-mobile">
        {paginatedTasks?.map((task) => (
          <div key={task?.id} className="task-table-card">
            <div className="task-table-card-header">
              <div className="task-table-card-info">
                <h3 className="task-table-card-title">{task?.taskName}</h3>
                <p className="task-table-card-project">{task?.projectName}</p>
              </div>
              <div className="task-table-card-actions">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(task)}
                  iconName="Eye"
                  iconSize={16}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditTask(task)}
                  iconName="Edit"
                  iconSize={16}
                />
              </div>
            </div>
            
            <div className="task-table-card-badges">
              <span className={getPriorityClass(task?.priority)}>
                {task?.priority?.charAt(0)?.toUpperCase() + task?.priority?.slice(1)}
              </span>
              <span className={getStatusClass(task?.status)}>
                {task?.status?.charAt(0)?.toUpperCase() + task?.status?.slice(1)?.replace('-', ' ')}
              </span>
            </div>
            
            <div className="task-table-card-details">
              <div className="task-table-card-assignee">
                <div className="task-table-card-avatar">
                  <Icon name="User" size={12} className="task-table-card-avatar-icon" />
                </div>
                <span className="task-table-card-assignee-name">{task?.assignedTo}</span>
              </div>
              <span className="task-table-card-date">{formatDate(task?.dueDate)}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="task-table-pagination">
          <div className="task-table-pagination-info">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedTasks?.length)} of {sortedTasks?.length} tasks
          </div>
          <div className="task-table-pagination-controls">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              iconName="ChevronLeft"
              iconSize={16}
            >
              Previous
            </Button>
            <span className="task-table-pagination-text">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              iconName="ChevronRight"
              iconSize={16}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskTable;