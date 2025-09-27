import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import './CreateTaskModal.css';

const CreateTaskModal = ({ isOpen, onClose, onCreateTask, teamMembers }) => {
  const [formData, setFormData] = useState({
    taskTitle: '',
    taskDescription: '',
    assignedTo: '',
    priority: '',
    dueDate: '',
    clientName: '',
    projectName: '',
    notes: '',
    attachments: []
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const priorityOptions = [
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const assigneeOptions = teamMembers?.map(member => ({
    value: member?.name,
    label: member?.name
  }));

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e?.target?.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev?.attachments, ...files]
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev?.attachments?.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.taskTitle?.trim()) {
      newErrors.taskTitle = 'Task title is required';
    }
    
    if (!formData?.taskDescription?.trim()) {
      newErrors.taskDescription = 'Task description is required';
    }
    
    if (!formData?.assignedTo) {
      newErrors.assignedTo = 'Please assign the task to someone';
    }
    
    if (!formData?.priority) {
      newErrors.priority = 'Please select a priority level';
    }
    
    if (!formData?.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    if (!formData?.projectName?.trim()) {
      newErrors.projectName = 'Project name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const newTask = {
        id: Date.now(),
        taskName: formData?.taskTitle,
        description: formData?.taskDescription,
        assignedTo: formData?.assignedTo,
        priority: formData?.priority,
        dueDate: formData?.dueDate,
        clientName: formData?.clientName,
        projectName: formData?.projectName,
        notes: formData?.notes,
        attachments: formData?.attachments,
        status: 'assigned',
        createdBy: 'John Doe', // Current user
        createdAt: new Date()?.toISOString()
      };
      
      await onCreateTask(newTask);
      handleClose();
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      taskTitle: '',
      taskDescription: '',
      assignedTo: '',
      priority: '',
      dueDate: '',
      clientName: '',
      projectName: '',
      notes: '',
      attachments: []
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="create-task-modal">
      <div className="create-task-modal-overlay">
        <div className="create-task-modal-backdrop" onClick={handleClose} />
        
        <div className="create-task-modal-content">
          {/* Header */}
          <div className="create-task-modal-header">
            <h2 className="create-task-modal-title">Create New Task</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              iconName="X"
              iconSize={20}
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="create-task-modal-form">
            <div className="create-task-modal-grid">
              <div className="create-task-modal-full-width">
                <Input
                  label="Task Title"
                  type="text"
                  placeholder="Enter task title"
                  value={formData?.taskTitle}
                  onChange={(e) => handleInputChange('taskTitle', e?.target?.value)}
                  error={errors?.taskTitle}
                  required
                />
              </div>

              <div className="create-task-modal-full-width">
                <Input
                  label="Task Description"
                  type="text"
                  placeholder="Describe the task in detail"
                  value={formData?.taskDescription}
                  onChange={(e) => handleInputChange('taskDescription', e?.target?.value)}
                  error={errors?.taskDescription}
                  required
                />
              </div>

              <div>
                <Select
                  label="Assign To"
                  options={assigneeOptions}
                  value={formData?.assignedTo}
                  onChange={(value) => handleInputChange('assignedTo', value)}
                  placeholder="Select team member"
                  error={errors?.assignedTo}
                  required
                />
              </div>

              <div>
                <Select
                  label="Priority"
                  options={priorityOptions}
                  value={formData?.priority}
                  onChange={(value) => handleInputChange('priority', value)}
                  placeholder="Select priority"
                  error={errors?.priority}
                  required
                />
              </div>

              <div>
                <Input
                  label="Due Date"
                  type="date"
                  value={formData?.dueDate}
                  onChange={(e) => handleInputChange('dueDate', e?.target?.value)}
                  error={errors?.dueDate}
                  required
                />
              </div>

              <div>
                <Input
                  label="Client Name"
                  type="text"
                  placeholder="Enter client name"
                  value={formData?.clientName}
                  onChange={(e) => handleInputChange('clientName', e?.target?.value)}
                />
              </div>

              <div className="create-task-modal-full-width">
                <Input
                  label="Project Name"
                  type="text"
                  placeholder="Enter project name"
                  value={formData?.projectName}
                  onChange={(e) => handleInputChange('projectName', e?.target?.value)}
                  error={errors?.projectName}
                  required
                />
              </div>

              <div className="create-task-modal-full-width">
                <Input
                  label="Notes"
                  type="text"
                  placeholder="Additional notes or instructions"
                  value={formData?.notes}
                  onChange={(e) => handleInputChange('notes', e?.target?.value)}
                />
              </div>

              {/* File Upload */}
              <div className="create-task-modal-full-width">
                <label className="create-task-modal-file-upload">
                  Attachments
                </label>
                <div className="create-task-modal-upload-area">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="create-task-modal-upload-input"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="create-task-modal-upload-label"
                  >
                    <Icon name="Upload" size={32} className="create-task-modal-upload-text" />
                    <span className="create-task-modal-upload-text">
                      Click to upload files or drag and drop
                    </span>
                  </label>
                </div>

                {/* Attachment List */}
                {formData?.attachments?.length > 0 && (
                  <div className="create-task-modal-attachments">
                    {formData?.attachments?.map((file, index) => (
                      <div key={index} className="create-task-modal-attachment">
                        <div className="create-task-modal-attachment-info">
                          <Icon name="File" size={16} className="create-task-modal-upload-text" />
                          <span className="create-task-modal-attachment-name">{file?.name}</span>
                          <span className="create-task-modal-attachment-size">
                            ({(file?.size / 1024)?.toFixed(1)} KB)
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAttachment(index)}
                          iconName="X"
                          iconSize={16}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="create-task-modal-footer">
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
              >
                Create Task
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;