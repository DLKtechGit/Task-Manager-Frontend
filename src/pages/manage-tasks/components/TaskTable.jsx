import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const TaskTable = ({ tasks, onEditTask, onUpdateStatus, onViewDetails }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-orange-100 text-orange-800 border-orange-200',
    low: 'bg-green-100 text-green-800 border-green-200'
  };

  const statusColors = {
    unassigned: 'bg-gray-100 text-gray-800 border-gray-200',
    assigned: 'bg-blue-100 text-blue-800 border-blue-200',
    'in-progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    closed: 'bg-green-100 text-green-800 border-green-200'
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
      return <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={16} className="text-primary" />
      : <Icon name="ArrowDown" size={16} className="text-primary" />;
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left px-6 py-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('taskName')}
                  className="flex items-center space-x-2 hover:text-primary transition-micro"
                >
                  <span>Task Name</span>
                  {getSortIcon('taskName')}
                </button>
              </th>
              <th className="text-left px-6 py-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-2 hover:text-primary transition-micro"
                >
                  <span>Status</span>
                  {getSortIcon('status')}
                </button>
              </th>
              <th className="text-left px-6 py-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('priority')}
                  className="flex items-center space-x-2 hover:text-primary transition-micro"
                >
                  <span>Priority</span>
                  {getSortIcon('priority')}
                </button>
              </th>
              <th className="text-left px-6 py-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('assignedTo')}
                  className="flex items-center space-x-2 hover:text-primary transition-micro"
                >
                  <span>Assigned To</span>
                  {getSortIcon('assignedTo')}
                </button>
              </th>
              <th className="text-left px-6 py-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('dueDate')}
                  className="flex items-center space-x-2 hover:text-primary transition-micro"
                >
                  <span>Due Date</span>
                  {getSortIcon('dueDate')}
                </button>
              </th>
              <th className="text-right px-6 py-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedTasks?.map((task) => (
              <tr key={task?.id} className="hover:bg-muted/30 transition-micro">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">{task?.taskName}</span>
                    <span className="text-sm text-muted-foreground">{task?.projectName}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="w-32">
                    <Select
                      options={statusOptions}
                      value={task?.status}
                      onChange={(value) => handleStatusChange(task?.id, value)}
                      className="text-xs"
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityColors?.[task?.priority]}`}>
                    {task?.priority?.charAt(0)?.toUpperCase() + task?.priority?.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} className="text-muted-foreground" />
                    </div>
                    <span className="text-sm text-foreground">{task?.assignedTo}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-foreground">{formatDate(task?.dueDate)}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end space-x-2">
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
      <div className="md:hidden space-y-4 p-4">
        {paginatedTasks?.map((task) => (
          <div key={task?.id} className="bg-background border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{task?.taskName}</h3>
                <p className="text-sm text-muted-foreground">{task?.projectName}</p>
              </div>
              <div className="flex space-x-1">
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
            
            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityColors?.[task?.priority]}`}>
                {task?.priority?.charAt(0)?.toUpperCase() + task?.priority?.slice(1)}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors?.[task?.status]}`}>
                {task?.status?.charAt(0)?.toUpperCase() + task?.status?.slice(1)?.replace('-', ' ')}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                  <Icon name="User" size={12} className="text-muted-foreground" />
                </div>
                <span className="text-foreground">{task?.assignedTo}</span>
              </div>
              <span className="text-muted-foreground">{formatDate(task?.dueDate)}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedTasks?.length)} of {sortedTasks?.length} tasks
          </div>
          <div className="flex items-center space-x-2">
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
            <span className="text-sm text-foreground">
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