import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


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
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="min-w-0 flex-1">
            <Select
              label="Filter by Status"
              options={statusOptions}
              value={statusFilter}
              onChange={onStatusFilterChange}
              className="w-full"
            />
          </div>
          <div className="min-w-0 flex-1">
            <Select
              label="Filter by Priority"
              options={priorityOptions}
              value={priorityFilter}
              onChange={onPriorityFilterChange}
              className="w-full"
            />
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="flex-shrink-0">
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">{taskCounts?.pending}</div>
          <div className="text-sm text-muted-foreground">Pending</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{taskCounts?.in_progress}</div>
          <div className="text-sm text-muted-foreground">In Progress</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{taskCounts?.completed}</div>
          <div className="text-sm text-muted-foreground">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-600">{taskCounts?.on_hold}</div>
          <div className="text-sm text-muted-foreground">On Hold</div>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;