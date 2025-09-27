import React from 'react';
import Icon from '../../../components/AppIcon';
import './MemberStats.css';

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
      color: 'member-stats-icon-text-primary',
      bgColor: 'member-stats-icon-primary'
    },
    {
      label: 'Active',
      value: activeMembers,
      icon: 'UserCheck',
      color: 'member-stats-icon-text-success',
      bgColor: 'member-stats-icon-success'
    },
    {
      label: 'Pending',
      value: pendingMembers,
      icon: 'UserX',
      color: 'member-stats-icon-text-warning',
      bgColor: 'member-stats-icon-warning'
    },
    {
      label: 'Admins',
      value: adminCount,
      icon: 'Shield',
      color: 'member-stats-icon-text-error',
      bgColor: 'member-stats-icon-error'
    },
    {
      label: 'Managers',
      value: managerCount,
      icon: 'Crown',
      color: 'member-stats-icon-text-warning',
      bgColor: 'member-stats-icon-warning'
    },
    {
      label: 'Users',
      value: userCount,
      icon: 'User',
      color: 'member-stats-icon-text-success',
      bgColor: 'member-stats-icon-success'
    }
  ];

  return (
    <div className="member-stats">
      {stats?.map((stat, index) => (
        <div key={index} className="member-stats-card">
          <div className="member-stats-content">
            <div className={`member-stats-icon-container ${stat?.bgColor}`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <div className="member-stats-info">
              <div className="member-stats-value">{stat?.value}</div>
              <div className="member-stats-label">{stat?.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemberStats;