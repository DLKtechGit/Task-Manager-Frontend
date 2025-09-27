import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

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
    <div className="relative h-full flex flex-col justify-center items-center p-8 bg-gradient-to-br from-primary/5 to-accent/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full"></div>
        <div className="absolute top-32 right-16 w-12 h-12 bg-accent rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 bg-secondary rounded-full"></div>
        <div className="absolute bottom-32 right-12 w-8 h-8 bg-primary rounded-full"></div>
      </div>
      <div className="relative z-10 text-center max-w-md">
        {/* Logo and Brand */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Icon name="CheckSquare" size={32} color="white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            TaskFlow Manager
          </h2>
          <p className="text-lg text-muted-foreground">
            Streamline your team's productivity
          </p>
        </div>

        {/* Hero Illustration */}
        <div className="mb-8">
          <div className="w-64 h-48 mx-auto bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center">
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&crop=center"
              alt="Team collaboration illustration"
              className="w-full h-full object-cover rounded-2xl opacity-80"
            />
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="space-y-4">
          {features?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3 text-left">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={feature?.icon} size={18} color="var(--color-primary)" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground">
                  {feature?.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={14} />
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-1">
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