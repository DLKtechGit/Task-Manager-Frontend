import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import "./TaskFilters.css"

const TaskFilters = ({ 
  statusFilter, 
  priorityFilter, 
  onStatusFilterChange, 
  onPriorityFilterChange, 
  onClearFilters,
  taskCounts 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Tasks' },
    { value: 'pending', label: 'Pending Acceptance' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'on_hold', label: 'On Hold' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const hasActiveFilters = statusFilter !== 'all' || priorityFilter !== 'all';

  return (
    <div className="task-filters-container">
      <div className="task-filters-content">
        {/* Filter Controls */}
        <div className="filter-controls">
          <div className="filter-select-container">
            <Select
              label="Filter by Status"
              options={statusOptions}
              value={statusFilter}
              onChange={onStatusFilterChange}
              className="filter-select"
            />
          </div>
          <div className="filter-select-container">
            <Select
              label="Filter by Priority"
              options={priorityOptions}
              value={priorityFilter}
              onChange={onPriorityFilterChange}
              className="filter-select"
            />
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="clear-filters-container">
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={16}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      
      {/* Task Count Summary */}
      <div className="task-counts-grid">
        <div className="task-count-item">
          <div className="task-count-number pending-count">{taskCounts.pending}</div>
          <div className="task-count-label">Pending</div>
        </div>
        <div className="task-count-item">
          <div className="task-count-number in-progress-count">{taskCounts.in_progress}</div>
          <div className="task-count-label">In Progress</div>
        </div>
        <div className="task-count-item">
          <div className="task-count-number completed-count">{taskCounts.completed}</div>
          <div className="task-count-label">Completed</div>
        </div>
        <div className="task-count-item">
          <div className="task-count-number total-count">{taskCounts.total}</div>
          <div className="task-count-label">Total</div>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;