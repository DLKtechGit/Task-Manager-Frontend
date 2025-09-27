import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import './BrandingPanel.css';

const BrandingPanel = () => {
  const features = [
    {
      icon: 'CheckSquare',
      title: 'Task Management',
      description: 'Organize and track tasks efficiently'
    },
    {
      icon: 'Users',
      title: 'Team Collaboration',
      description: 'Work together seamlessly'
    },
    {
      icon: 'BarChart3',
      title: 'Analytics Dashboard',
      description: 'Monitor progress with insights'
    }
  ];

  return (
    <div className="branding-panel">
      {/* Background Pattern */}
      <div className="branding-panel-background">
        <div className="branding-panel-circle-1"></div>
        <div className="branding-panel-circle-2"></div>
        <div className="branding-panel-circle-3"></div>
        <div className="branding-panel-circle-4"></div>
      </div>
      
      <div className="branding-panel-content">
        {/* Logo and Brand */}
        <div className="branding-panel-logo">
          <div className="branding-panel-logo-icon">
            <div>
              <Icon name="CheckSquare" size={32} color="white" />
            </div>
          </div>
          <h2>TaskFlow Manager</h2>
          <p>Streamline your team's productivity</p>
        </div>

        {/* Hero Illustration */}
        <div className="branding-panel-illustration">
          <div>
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&crop=center"
              alt="Team collaboration illustration"
              className="branding-panel-illustration-image"
            />
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="branding-panel-features">
          {features?.map((feature, index) => (
            <div key={index} className="branding-panel-feature">
              <div className="branding-panel-feature-icon">
                <Icon name={feature?.icon} size={18} color="var(--color-primary)" />
              </div>
              <div className="branding-panel-feature-text">
                <h3>{feature?.title}</h3>
                <p>{feature?.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="branding-panel-trust">
          <div className="branding-panel-trust-indicators">
            <div className="branding-panel-trust-item">
              <Icon name="Shield" size={14} />
              <span>Secure</span>
            </div>
            <div className="branding-panel-trust-item">
              <Icon name="Clock" size={14} />
              <span>24/7 Support</span>
            </div>
            <div className="branding-panel-trust-item">
              <Icon name="Users" size={14} />
              <span>10k+ Teams</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingPanel;