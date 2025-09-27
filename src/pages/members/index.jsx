import React, { useState, useEffect } from 'react';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import MemberCard from './components/MemberCard';
import MemberFilters from './components/MemberFilters';
import AddMemberModal from './components/AddMemberModal';
import EditMemberModal from './components/EditMemberModal';
import DeleteMemberModal from './components/DeleteMemberModal';
import BulkActionsBar from './components/BulkActionsBar';
import MemberStats from './components/MemberStats';
import Icon from '../../components/AppIcon';
import './MembersPage.css';

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [currentUserRole] = useState('admin');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch members from backend
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      
      const response = await fetch('http://192.168.1.77:5000/api/admin/get/allUsers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log("usersss",response)
      
      if (!response.ok) {
        
        if (response.status === 403) {
          throw new Error('Access denied. Admin privileges required.');
        }
        throw new Error('Failed to fetch members');
      }
      
      const users = await response.json();
      
      // Transform backend data to frontend format using the actual backend structure
      const transformedMembers = users.map(user => ({
        id: user._id,
        name: user.username,
        email: user.email,
        role: user.role,
        department: user.department || 'Not Assigned',
        status: user.activeStatus === 'Active' ? 'active' : 'inactive',
        avatar: user.profile_pic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
        joinedDate: new Date(user.joinDate || user.createdAt || Date.now()).toLocaleDateString(),
        lastActive: user.lastActive ? new Date(user.lastActive).toLocaleDateString() : 'Never',
        tasksAssigned: user.totalTasks || 0,
        tasksCompleted: user.completedTasks || 0,
        tasksInProgress: user.inProgressTasks || 0,
        // Include backend fields for editing
        originalData: user
      }));
      
      setMembers(transformedMembers);
      setError('');
    } catch (err) {
      console.error('Error fetching members:', err);
      setError(err.message || 'Failed to load members. Please check your admin privileges.');
      // Fallback to demo data only if it's not an auth error
      if (!err.message.includes('Access denied')) {
        loadDemoData();
      }
    } finally {
      setLoading(false);
    }
  };

  // Demo data fallback (only used if backend fails and it's not an auth error)
  const loadDemoData = () => {
    const demoMembers = [
      {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah.johnson@company.com",
        role: "admin",
        department: "Engineering",
        status: "active",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        joinedDate: "01/15/2023",
        lastActive: "2 hours ago",
        tasksAssigned: 12,
        tasksCompleted: 8,
        tasksInProgress: 4
      },
      {
        id: 2,
        name: "Michael Chen",
        email: "michael.chen@company.com",
        role: "manager",
        department: "Design",
        status: "active",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        joinedDate: "03/22/2023",
        lastActive: "1 day ago",
        tasksAssigned: 18,
        tasksCompleted: 15,
        tasksInProgress: 3
      }
    ];
    setMembers(demoMembers);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Filter members based on search and filters
  useEffect(() => {
    let filtered = members;

    if (searchTerm) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedRole) {
      filtered = filtered.filter(member => member.role === selectedRole);
    }

    if (selectedDepartment) {
      filtered = filtered.filter(member => member.department === selectedDepartment);
    }

    if (selectedStatus) {
      filtered = filtered.filter(member => member.status === selectedStatus);
    }

    setFilteredMembers(filtered);
  }, [members, searchTerm, selectedRole, selectedDepartment, selectedStatus]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedRole('');
    setSelectedDepartment('');
    setSelectedStatus('');
  };

  const handleSelectMember = (memberId) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedMembers(filteredMembers.map(member => member.id));
    } else {
      setSelectedMembers([]);
    }
  };

  const handleAddMember = async (newMember) => {
    // Note: You'll need to create a backend endpoint for adding users
    // For now, we'll just refresh the list
    await fetchMembers();
  };

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setIsEditModalOpen(true);
  };

  const handleUpdateMember = async (updatedMember) => {
    try {
      const token = localStorage.getItem('authToken');
      
      // Update member in backend - you'll need to create this endpoint
      const response = await fetch(`http://192.168.1.77:5000/api/admin/users/${updatedMember.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: updatedMember.name,
          email: updatedMember.email,
          role: updatedMember.role,
          department: updatedMember.department,
          activeStatus: updatedMember.status === 'active' ? 'Active' : 'Inactive'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update member');
      }

      // Refresh the list to get updated data from backend
      await fetchMembers();
    } catch (error) {
      console.error('Error updating member:', error);
      // Fallback to local update if backend fails
      setMembers(prev => 
        prev.map(member => 
          member.id === updatedMember.id ? updatedMember : member
        )
      );
    }
  };

  const handleDeleteMember = (member) => {
    setSelectedMember(member);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (memberId) => {
    try {
      const token = localStorage.getItem('authToken');
      
      // Delete from backend - you'll need to create this endpoint
      const response = await fetch(`http://192.168.1.77:5000/api/admin/users/${memberId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete member');
      }

      // Refresh the list to get updated data from backend
      await fetchMembers();
      setSelectedMembers(prev => prev.filter(id => id !== memberId));
    } catch (error) {
      console.error('Error deleting member:', error);
      // Fallback to local delete if backend fails
      setMembers(prev => prev.filter(member => member.id !== memberId));
      setSelectedMembers(prev => prev.filter(id => id !== memberId));
    }
  };

  const handleRoleChange = (member) => {
    setSelectedMember(member);
    setIsEditModalOpen(true);
  };

  const handleBulkRoleChange = async (newRole) => {
    try {
      const token = localStorage.getItem('authToken');
      
      // Update bulk roles in backend - you'll need to create this endpoint
      await Promise.all(
        selectedMembers.map(async (memberId) => {
          const response = await fetch(`http://192.168.1.77:5000/api/admin/users/${memberId}/role`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ role: newRole })
          });
          return response.ok;
        })
      );

      // Refresh the list to get updated data from backend
      await fetchMembers();
      setSelectedMembers([]);
    } catch (error) {
      console.error('Error in bulk role change:', error);
      // Fallback to local update
      setMembers(prev => 
        prev.map(member => 
          selectedMembers.includes(member.id) 
            ? { ...member, role: newRole }
            : member
        )
      );
      setSelectedMembers([]);
    }
  };

  const handleBulkStatusChange = async (newStatus) => {
    try {
      const token = localStorage.getItem('authToken');
      
      // Update bulk status in backend - you'll need to create this endpoint
      await Promise.all(
        selectedMembers.map(async (memberId) => {
          const response = await fetch(`http://192.168.1.77:5000/api/admin/users/${memberId}/status`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ 
              activeStatus: newStatus === 'active' ? 'Active' : 'Inactive' 
            })
          });
          return response.ok;
        })
      );

      // Refresh the list to get updated data from backend
      await fetchMembers();
      setSelectedMembers([]);
    } catch (error) {
      console.error('Error in bulk status change:', error);
      // Fallback to local update
      setMembers(prev => 
        prev.map(member => 
          selectedMembers.includes(member.id) 
            ? { ...member, status: newStatus }
            : member
        )
      );
      setSelectedMembers([]);
    }
  };

  const handleBulkDelete = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      // Bulk delete from backend - you'll need to create this endpoint
      await Promise.all(
        selectedMembers.map(async (memberId) => {
          const response = await fetch(`http://192.168.1.77:5000/api/admin/users/${memberId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          return response.ok;
        })
      );

      // Refresh the list to get updated data from backend
      await fetchMembers();
      setSelectedMembers([]);
    } catch (error) {
      console.error('Error in bulk delete:', error);
      // Fallback to local delete
      setMembers(prev => 
        prev.filter(member => !selectedMembers.includes(member.id))
      );
      setSelectedMembers([]);
    }
  };

  const isAllSelected = filteredMembers.length > 0 && 
    selectedMembers.length === filteredMembers.length;
  const isIndeterminate = selectedMembers.length > 0 && 
    selectedMembers.length < filteredMembers.length;

  if (loading) {
    return (
      <div className="members-page-loading">
        <div className="members-page-loading-content">
          <Icon name="Loader" size={32} className="members-page-loading-icon" />
          <p className="members-page-loading-text">Loading members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="members-page">
      <NavigationSidebar userRole={currentUserRole} onToggle={() => {}} />
      <div className="members-page-content">
        <div className="members-page-container">
          <BreadcrumbNavigation />
          
          {/* Header */}
          <div className="members-page-header">
            <div className="members-page-header-info">
              <h1 className="members-page-title">Team Members</h1>
              <p className="members-page-subtitle">
                Manage your team members, roles, and permissions
              </p>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              iconName="UserPlus"
              iconPosition="left"
              iconSize={18}
              className="members-page-add-button"
            >
              Add Member
            </Button>
          </div>

          {error && (
            <div className="members-page-error">
              <Icon name="AlertCircle" size={20} className="members-page-error-icon" />
              <p className="members-page-error-text">{error}</p>
              {error.includes('Access denied') && (
                <Button 
                  onClick={() => window.location.href = '/dashboard'}
                  variant="outline"
                  size="sm"
                  className="members-page-error-button"
                >
                  Back to Dashboard
                </Button>
              )}
            </div>
          )}

          {/* Member Statistics */}
          <MemberStats members={members} />

          {/* Filters */}
          <MemberFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedRole={selectedRole}
            onRoleChange={setSelectedRole}
            selectedDepartment={selectedDepartment}
            onDepartmentChange={setSelectedDepartment}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            onClearFilters={handleClearFilters}
          />

          {/* Bulk Actions */}
          {selectedMembers.length > 0 && (
            <BulkActionsBar
              selectedMembers={selectedMembers}
              onClearSelection={() => setSelectedMembers([])}
              onBulkRoleChange={handleBulkRoleChange}
              onBulkStatusChange={handleBulkStatusChange}
              onBulkDelete={handleBulkDelete}
            />
          )}

          {/* Select All Checkbox */}
          {filteredMembers.length > 0 && (
            <div className="members-page-select-all">
              <Checkbox
                label={`Select all ${filteredMembers.length} members`}
                checked={isAllSelected}
                indeterminate={isIndeterminate}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </div>
          )}

          {/* Members Grid */}
          {filteredMembers.length > 0 ? (
            <div className="members-grid">
              {filteredMembers.map((member) => (
                <div key={member.id} className="members-grid-item">
                  <div className="members-grid-item-checkbox">
                    <Checkbox
                      checked={selectedMembers.includes(member.id)}
                      onChange={() => handleSelectMember(member.id)}
                      className="member-card-checkbox"
                    />
                  </div>
                  <MemberCard
                    member={member}
                    onEdit={handleEditMember}
                    onDelete={handleDeleteMember}
                    onRoleChange={handleRoleChange}
                    currentUserRole={currentUserRole}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="members-page-empty">
              <div className="members-page-empty-icon">
                <Icon name="Users" size={32} className="members-page-empty-icon-svg" />
              </div>
              <h3 className="members-page-empty-title">No members found</h3>
              <p className="members-page-empty-description">
                {searchTerm || selectedRole || selectedDepartment || selectedStatus
                  ? "Try adjusting your filters to see more results." : "Get started by adding your first team member."
                }
              </p>
              {!searchTerm && !selectedRole && !selectedDepartment && !selectedStatus && (
                <Button
                  onClick={() => setIsAddModalOpen(true)}
                  iconName="UserPlus"
                  iconPosition="left"
                  iconSize={18}
                >
                  Add First Member
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Modals */}
      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddMember={handleAddMember}
      />
      <EditMemberModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedMember(null);
        }}
        member={selectedMember}
        onUpdateMember={handleUpdateMember}
      />
      <DeleteMemberModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedMember(null);
        }}
        member={selectedMember}
        onDeleteMember={handleConfirmDelete}
      />
    </div>
  );
};

export default MembersPage;