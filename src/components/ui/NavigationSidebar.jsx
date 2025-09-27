import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Icon from '../AppIcon';
import Button from './Button';
import './NavigationSidebar.css';
 
const NavigationSidebar = ({ isCollapsed = false, onToggle, userRole = 'user' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
 
  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard', roles: ['admin', 'manager'] },
    { label: 'Manage Tasks', path: '/manage-tasks', icon: 'ClipboardList', roles: ['admin', 'manager'] },
    { label: 'Accept Task', path: '/accept-task', icon: 'CheckSquare', roles: [, 'manager', 'user'] },
    { label: 'Members', path: '/members', icon: 'Users', roles: ['admin', 'manager'] }
  ];
 
  const filteredItems = navigationItems.filter(item => item.roles.includes(userRole));
 
  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };
 
  const handleLogout = async () => {
    const token = localStorage.getItem('authToken');
    console.log(token)
 
    try {
      // Call backend logout
      await axios.post(
        'http://localhost:5000/api/user/logout',{},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
 
      // Clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
 
      // Navigate to sign-in
      navigate('/sign-in');
 
    } catch (err) {
      console.error('Logout failed:', err);
      alert(err.response?.data?.message || 'Logout failed. Please try again.');
    }
  };
 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileOpen(false);
    };
 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
 
  useEffect(() => {
    if (isMobileOpen) document.body.classList.add('body-overflow-hidden');
    else document.body.classList.remove('body-overflow-hidden');
 
    return () => document.body.classList.remove('body-overflow-hidden');
  }, [isMobileOpen]);
 
  const SidebarContent = () => (
    <div className="sidebar-content">
      {/* Logo Section */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-container">
          <div className="sidebar-logo-icon">
            <Icon name="CheckSquare" size={20} color="white" />
          </div>
          <div className="sidebar-logo-text">
            <span className="sidebar-logo-title">TaskFlow</span>
            <span className="sidebar-logo-subtitle">Manager</span>
          </div>
        </div>
      </div>
 
      {/* User Profile Section */}
      <div className="sidebar-user">
        <div className="sidebar-user-container">
          <div className="sidebar-user-avatar">
            <Icon name="User" size={20} color="#6b7280" />
          </div>
          <div className="sidebar-user-info">
            <p className="sidebar-user-name">{localStorage.getItem('username') || 'John Doe'}</p>
            <p className="sidebar-user-role">{userRole}</p>
          </div>
        </div>
      </div>
 
      {/* Navigation Items */}
      <nav className="sidebar-nav">
        {filteredItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon name={item.icon} size={18} className="sidebar-nav-icon" />
              <span className="sidebar-nav-label">{item.label}</span>
            </button>
          );
        })}
      </nav>
 
      {/* Logout Section */}
      <div className="sidebar-logout">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          iconName="LogOut"
          iconPosition="left"
          iconSize={18}
        >
          Logout
        </Button>
      </div>
    </div>
  );
 
  return (
    <div className="navigation-sidebar">
      {/* Desktop Sidebar */}
      <aside className="sidebar-desktop">
        <SidebarContent />
      </aside>
 
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="sidebar-mobile-overlay">
          <div className="sidebar-mobile-overlay-bg" onClick={() => setIsMobileOpen(false)} />
          <aside className="sidebar-mobile">
            <SidebarContent />
          </aside>
        </div>
      )}
 
      {/* Mobile Menu Toggle */}
      <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="sidebar-mobile-toggle">
        <Icon name={isMobileOpen ? 'X' : 'Menu'} size={20} />
      </button>
    </div>
  );
};
 
export default NavigationSidebar;
 
 