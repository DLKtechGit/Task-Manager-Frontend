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
      const response = await fetch('http://192.168.1.77:5000/api/users');
      
      if (!response.ok) {
        throw new Error('Failed to fetch members');
      }
      
      const users = await response.json();
      
      // Transform backend data to frontend format
      const transformedMembers = users.map(user => ({
        id: user._id,
        name: user.username,
        email: user.email,
        role: user.role,
        department: user.department || '',
        status: 'active', // You might want to add status field to your backend
        avatar: user.profile_pic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
        joinedDate: new Date(user.createdAt || Date.now()).toLocaleDateString(),
        lastActive: 'Recently',
        tasksAssigned: 0, // You might want to add these fields to your backend
        tasksCompleted: 0,
        tasksInProgress: 0
      }));
      
      setMembers(transformedMembers);
      setError('');
    } catch (err) {
      console.error('Error fetching members:', err);
      setError('Failed to load members. Using demo data.');
      // Fallback to demo data
      loadDemoData();
    } finally {
      setLoading(false);
    }
  };

  // Demo data fallback
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
    setMembers(prev => [...prev, newMember]);
    // Refresh the list to get data from backend
    await fetchMembers();
  };

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setIsEditModalOpen(true);
  };

  const handleUpdateMember = async (updatedMember) => {
    try {
      // Update member in backend
      const response = await fetch(`http://192.168.1.77:5000/api/users/${updatedMember.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: updatedMember.name,
          email: updatedMember.email,
          role: updatedMember.role,
          department: updatedMember.department,
          status: updatedMember.status
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update member');
      }

      // Update local state
      setMembers(prev => 
        prev.map(member => 
          member.id === updatedMember.id ? updatedMember : member
        )
      );
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
      // Delete from backend
      const response = await fetch(`http://192.168.1.77:5000/api/users/${memberId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete member');
      }

      // Update local state
      setMembers(prev => prev.filter(member => member.id !== memberId));
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
      // Update bulk roles in backend
      await Promise.all(
        selectedMembers.map(async (memberId) => {
          const response = await fetch(`http://192.168.1.77:5000/api/users/${memberId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role: newRole })
          });
          return response.ok;
        })
      );

      // Update local state
      setMembers(prev => 
        prev.map(member => 
          selectedMembers.includes(member.id) 
            ? { ...member, role: newRole }
            : member
        )
      );
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
    setMembers(prev => 
      prev.map(member => 
        selectedMembers.includes(member.id) 
          ? { ...member, status: newStatus }
          : member
      )
    );
    setSelectedMembers([]);
  };

  const handleBulkDelete = async () => {
    try {
      // Bulk delete from backend
      await Promise.all(
        selectedMembers.map(async (memberId) => {
          const response = await fetch(`http://192.168.1.77:5000/api/users/${memberId}`, {
            method: 'DELETE'
          });
          return response.ok;
        })
      );

      // Update local state
      setMembers(prev => 
        prev.filter(member => !selectedMembers.includes(member.id))
      );
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={32} className="animate-spin mx-auto mb-4" />
          <p className="text-foreground">Loading members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar userRole={currentUserRole} onToggle={() => {}} />
      <div className="md:ml-60">
        <div className="p-6">
          <BreadcrumbNavigation />
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Team Members</h1>
              <p className="text-muted-foreground">
                Manage your team members, roles, and permissions
              </p>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              iconName="UserPlus"
              iconPosition="left"
              iconSize={18}
              className="mt-4 sm:mt-0"
            >
              Add Member
            </Button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-warning/10 border border-warning/20 rounded-md">
              <p className="text-warning text-sm">{error}</p>
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
            <div className="mb-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMembers.map((member) => (
                <div key={member.id} className="relative">
                  <div className="absolute top-4 left-4 z-10">
                    <Checkbox
                      checked={selectedMembers.includes(member.id)}
                      onChange={() => handleSelectMember(member.id)}
                      className="bg-card/80 backdrop-blur-sm"
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
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No members found</h3>
              <p className="text-muted-foreground mb-4">
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