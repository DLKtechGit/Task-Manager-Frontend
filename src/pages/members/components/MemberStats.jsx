import React from 'react';
import Icon from '../../../components/AppIcon';

const MemberStats = ({ members }) => {
  const totalMembers = members?.length;
  const activeMembers = members?.filter(m => m?.status === 'active')?.length;
  const pendingMembers = members?.filter(m => m?.status === 'pending')?.length;
  const adminCount = members?.filter(m => m?.role === 'admin')?.length;
  const managerCount = members?.filter(m => m?.role === 'manager')?.length;
  const userCount = members?.filter(m => m?.role === 'user')?.length;

  const stats = [
    {
      label: 'Total Members',
      value: totalMembers,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Active',
      value: activeMembers,
      icon: 'UserCheck',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Pending',
      value: pendingMembers,
      icon: 'UserX',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Admins',
      value: adminCount,
      icon: 'Shield',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      label: 'Managers',
      value: managerCount,
      icon: 'Crown',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Users',
      value: userCount,
      icon: 'User',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {stats?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
              <div className="text-xs text-muted-foreground">{stat?.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemberStats;