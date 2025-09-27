import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import './QuickActions.css';

const QuickActions = ({ onBulkAccept, onBulkComplete, onRefresh, selectedTasks = [] }) => {
  const hasSelectedTasks = selectedTasks.length > 0;

  return (
    <div className="quick-actions">
      <div className="quick-actions-container">
        <div className="quick-actions-header">
          <div className="quick-actions-title-container">
            <Icon name="Zap" size={20} className="quick-actions-icon" />
            <h3 className="quick-actions-title">Quick Actions</h3>
            {hasSelectedTasks && (
              <span className="quick-actions-badge">
                {selectedTasks.length} selected
              </span>
            )}
          </div>
          
          <div className="quick-actions-buttons">
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
          <div className="quick-actions-footer">
            <p className="quick-actions-description">
              You have selected {selectedTasks.length} task{selectedTasks.length !== 1 ? 's' : ''}. 
              Use the actions above to perform bulk operations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickActions;