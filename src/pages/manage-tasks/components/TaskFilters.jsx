import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

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
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={onStatusFilterChange}
            placeholder="Filter by status"
            className="w-full sm:w-40"
          />
          
          <Select
            options={priorityOptions}
            value={priorityFilter}
            onChange={onPriorityFilterChange}
            placeholder="Filter by priority"
            className="w-full sm:w-40"
          />
          
          <Select
            options={assigneeOptions}
            value={assigneeFilter}
            onChange={onAssigneeFilterChange}
            placeholder="Filter by assignee"
            className="w-full sm:w-40"
          />
          
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={16}
              className="whitespace-nowrap"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
      {/* Task Count Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{taskCounts?.unassigned}</p>
              <p className="text-sm text-muted-foreground">Unassigned</p>
            </div>
          </div>
        </div>

        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{taskCounts?.assigned}</p>
              <p className="text-sm text-muted-foreground">Assigned</p>
            </div>
          </div>
        </div>

        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{taskCounts?.inProgress}</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
          </div>
        </div>

        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{taskCounts?.closed}</p>
              <p className="text-sm text-muted-foreground">Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;