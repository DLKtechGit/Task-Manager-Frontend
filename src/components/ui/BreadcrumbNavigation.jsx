import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import './BreadcrumbNavigation.css';

const BreadcrumbNavigation = ({ customBreadcrumbs = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/dashboard': { label: 'Dashboard', parent: null },
    '/manage-tasks': { label: 'Manage Tasks', parent: '/dashboard' },
    '/accept-task': { label: 'Accept Task', parent: '/dashboard' },
    '/members': { label: 'Members', parent: '/dashboard' },
    '/sign-in': { label: 'Sign In', parent: null },
    '/sign-up': { label: 'Sign Up', parent: null }
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [];

    // Always start with Dashboard for authenticated routes
    if (location?.pathname !== '/sign-in' && location?.pathname !== '/sign-up') {
      breadcrumbs?.push({
        label: 'Dashboard',
        path: '/dashboard',
        isActive: location?.pathname === '/dashboard'
      });
    }

    // Add current page if not dashboard
    if (location?.pathname !== '/dashboard' && routeMap?.[location?.pathname]) {
      breadcrumbs?.push({
        label: routeMap?.[location?.pathname]?.label,
        path: location?.pathname,
        isActive: true
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  const handleNavigation = (path) => {
    if (path && path !== location?.pathname) {
      navigate(path);
    }
  };

  return (
    <nav className="breadcrumb-nav" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        {breadcrumbs?.map((crumb, index) => (
          <li key={crumb?.path || index} className="breadcrumb-item">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="breadcrumb-separator" 
              />
            )}
            {crumb?.isActive ? (
              <span className="breadcrumb-active">
                {crumb?.label}
              </span>
            ) : (
              <button
                onClick={() => handleNavigation(crumb?.path)}
                className="breadcrumb-button"
              >
                {crumb?.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;