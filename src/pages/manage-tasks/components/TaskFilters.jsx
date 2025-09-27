import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import './TaskFilters.css';

const TaskFilters = ({ 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange, 
  priorityFilter, 
  onPriorityFilterChange, 
  assigneeFilter, 
  onAssigneeFilterChange,
  onClearFilters,
  taskCounts,
  teamMembers 
}) => {
  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'unassigned', label: 'Unassigned' },
    { value: 'assigned', label: 'Assigned' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'closed', label: 'Closed' }
  ];

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const assigneeOptions = [
    { value: '', label: 'All Assignees' },
    ...teamMembers?.map(member => ({
      value: member?.name,
      label: member?.name
    }))
  ];

  const hasActiveFilters = statusFilter || priorityFilter || assigneeFilter || searchTerm;

  return (
    <div className="task-filters">
      <div className="task-filters-header">
        <div className="task-filters-search">
          <Input
            type="search"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="task-filters-search-input"
          />
        </div>
        
        <div className="task-filters-controls">
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={onStatusFilterChange}
            placeholder="Filter by status"
            className="task-filters-select"
          />
          
          <Select
            options={priorityOptions}
            value={priorityFilter}
            onChange={onPriorityFilterChange}
            placeholder="Filter by priority"
            className="task-filters-select"
          />
          
          <Select
            options={assigneeOptions}
            value={assigneeFilter}
            onChange={onAssigneeFilterChange}
            placeholder="Filter by assignee"
            className="task-filters-select"
          />
          
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={16}
              className="task-filters-clear"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
      
      {/* Task Count Summary */}
      <div className="task-filters-summary">
        <div className="task-filters-count-card task-filters-count-unassigned">
          <div className="task-filters-count-content">
            <div className="task-filters-count-icon">
              <div className="task-filters-count-dot"></div>
            </div>
            <div>
              <p className="task-filters-count-number">{taskCounts?.unassigned}</p>
              <p className="task-filters-count-label">Unassigned</p>
            </div>
          </div>
        </div>

        <div className="task-filters-count-card task-filters-count-assigned">
          <div className="task-filters-count-content">
            <div className="task-filters-count-icon">
              <div className="task-filters-count-dot"></div>
            </div>
            <div>
              <p className="task-filters-count-number">{taskCounts?.assigned}</p>
              <p className="task-filters-count-label">Assigned</p>
            </div>
          </div>
        </div>

        <div className="task-filters-count-card task-filters-count-in-progress">
          <div className="task-filters-count-content">
            <div className="task-filters-count-icon">
              <div className="task-filters-count-dot"></div>
            </div>
            <div>
              <p className="task-filters-count-number">{taskCounts?.inProgress}</p>
              <p className="task-filters-count-label">In Progress</p>
            </div>
          </div>
        </div>

        <div className="task-filters-count-card task-filters-count-closed">
          <div className="task-filters-count-content">
            <div className="task-filters-count-icon">
              <div className="task-filters-count-dot"></div>
            </div>
            <div>
              <p className="task-filters-count-number">{taskCounts?.closed}</p>
              <p className="task-filters-count-label">Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;