import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActions = ({ onBulkAccept, onBulkComplete, onRefresh, selectedTasks = [] }) => {
  const hasSelectedTasks = selectedTasks?.length > 0;

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          {hasSelectedTasks && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
              {selectedTasks?.length} selected
            </span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            iconName="RefreshCw"
            iconPosition="left"
            iconSize={16}
          >
            Refresh
          </Button>
          
          {hasSelectedTasks && (
            <>
              <Button
                variant="default"
                size="sm"
                onClick={onBulkAccept}
                iconName="CheckSquare"
                iconPosition="left"
                iconSize={16}
              >
                Accept Selected
              </Button>
              <Button
                variant="success"
                size="sm"
                onClick={onBulkComplete}
                iconName="Check"
                iconPosition="left"
                iconSize={16}
              >
                Mark Complete
              </Button>
            </>
          )}
        </div>
      </div>
      {hasSelectedTasks && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            You have selected {selectedTasks?.length} task{selectedTasks?.length !== 1 ? 's' : ''}. 
            Use the actions above to perform bulk operations.
          </p>
        </div>
      )}
    </div>
  );
};

export default QuickActions;