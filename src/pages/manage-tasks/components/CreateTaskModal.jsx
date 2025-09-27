import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import './CreateTaskModal.css';
 
const CreateTaskModal = ({ isOpen, onClose, onCreateTask }) => {
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
  const [teamMembers, setTeamMembers] = useState([]);
 
  const priorityOptions = [
    { value: 'High', label: 'High Priority' },
    { value: 'Medium', label: 'Medium Priority' },
    { value: 'Low', label: 'Low Priority' }
  ];
 
  // Fetch users on modal open
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get('http://localhost:5000/api/admin/get/allUsers', {
          headers: { Authorization: `Bearer ${token}` },
        });
 
        // Format users as { value: _id, label: username }
        const options = (res.data || [])
          .filter(user => user.role === 'user') // only include users
          .map(user => ({
            value: user._id,
            label: user.username
          }));
 
        setTeamMembers(options);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
 
    if (isOpen) fetchUsers();
  }, [isOpen]);
 
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };
 
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...files] }));
  };
 
  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };
 
  const validateForm = () => {
    const newErrors = {};
    if (!formData.taskTitle.trim()) newErrors.taskTitle = 'Task title is required';
    if (!formData.taskDescription.trim()) newErrors.taskDescription = 'Task description is required';
    if (!formData.assignedTo) newErrors.assignedTo = 'Please assign the task to someone';
    if (!formData.priority) newErrors.priority = 'Please select a priority level';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    if (!formData.projectName.trim()) newErrors.projectName = 'Project name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
 
    setIsSubmitting(true);
 
    try {
      const data = new FormData();
      data.append('task_title', formData.taskTitle);
      data.append('task_description', formData.taskDescription);
      data.append('assigned_to', formData.assignedTo); // user _id
      data.append('priority', formData.priority);
      data.append('due_date', formData.dueDate);
      data.append('client_name', formData.clientName);
      data.append('project_name', formData.projectName);
      data.append('notes', formData.notes);
 
      formData.attachments.forEach(file => data.append('attachments', file));
 
      const token = localStorage.getItem('authToken');
 
      const response = await axios.post(
        'http://localhost:5000/api/admin/create/task',
        data,
        {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        }
      );
 
      onCreateTask(response.data.task);
      handleClose();
    } catch (err) {
      console.error('Error creating task:', err);
      alert(err.response?.data?.message || 'Failed to create task.');
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
          <div className="create-task-modal-header">
            <h2 className="create-task-modal-title">Create New Task</h2>
            <Button variant="ghost" size="sm" onClick={handleClose} iconName="X" iconSize={20} />
          </div>
 
          <form onSubmit={handleSubmit} className="create-task-modal-form">
            <Input
              label="Task Title"
              type="text"
              placeholder="Enter task title"
              value={formData.taskTitle}
              onChange={(e) => handleInputChange('taskTitle', e.target.value)}
              error={errors.taskTitle}
              required
            />
 
            <Input
              label="Task Description"
              type="text"
              placeholder="Describe the task"
              value={formData.taskDescription}
              onChange={(e) => handleInputChange('taskDescription', e.target.value)}
              error={errors.taskDescription}
              required
            />
 
            <Select
              label="Assign To"
              options={teamMembers} // usernames as label, _id as value
              value={formData.assignedTo}
              onChange={(value) => handleInputChange('assignedTo', value)}
              placeholder="Select team member"
              error={errors.assignedTo}
              required
            />
 
            <Select
              label="Priority"
              options={priorityOptions}
              value={formData.priority}
              onChange={(value) => handleInputChange('priority', value)}
              placeholder="Select priority"
              error={errors.priority}
              required
            />
 
            <Input
              label="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleInputChange('dueDate', e.target.value)}
              error={errors.dueDate}
              required
            />
 
            <Input
              label="Client Name"
              type="text"
              placeholder="Enter client name"
              value={formData.clientName}
              onChange={(e) => handleInputChange('clientName', e.target.value)}
            />
 
            <Input
              label="Project Name"
              type="text"
              placeholder="Enter project name"
              value={formData.projectName}
              onChange={(e) => handleInputChange('projectName', e.target.value)}
              error={errors.projectName}
              required
            />
 
            <Input
              label="Notes"
              type="text"
              placeholder="Additional notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
            />
 
            {/* File Upload */}
            <div className="create-task-modal-full-width">
              <label className="create-task-modal-file-upload">Attachments</label>
              <input type="file" multiple onChange={handleFileUpload} />
              {formData.attachments.length > 0 && (
                <ul>
                  {formData.attachments.map((file, index) => (
                    <li key={index}>
                      {file.name} ({(file.size / 1024).toFixed(1)} KB)
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(index)}
                        iconName="X"
                        iconSize={16}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
 
            <div className="create-task-modal-footer">
              <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" loading={isSubmitting} iconName="Plus" iconPosition="left" iconSize={16}>
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
 
 