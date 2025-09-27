import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BrandingPanel = () => {
  return (
    <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:bg-gradient-to-br lg:from-primary/10 lg:to-accent/10 lg:p-12">
      {/* Logo Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <Icon name="CheckSquare" size={28} color="white" />
          </div>
          <div className="text-left">
            <h2 className="text-2xl font-bold text-foreground">TaskFlow</h2>
            <p className="text-sm text-muted-foreground">Manager</p>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-3">
          Join Your Team Today
        </h3>
        <p className="text-muted-foreground max-w-sm">
          Create your account and start collaborating with your team on projects that matter.
        </p>
      </div>

      {/* Illustration */}
      <div className="relative w-full max-w-md">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=400&fit=crop"
          alt="Team collaboration illustration"
          className="w-full h-80 object-cover rounded-2xl shadow-xl"
        />
        
        {/* Floating Cards */}
        <div className="absolute -top-4 -right-4 bg-card border border-border rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-xs font-medium text-foreground">5 Tasks Done</span>
          </div>
        </div>
        
        <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-primary" />
            <span className="text-xs font-medium text-foreground">12 Team Members</span>
          </div>
        </div>
      </div>

      {/* Features List */}
      <div className="mt-12 space-y-4 w-full max-w-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
            <Icon name="Check" size={16} className="text-success" />
          </div>
          <span className="text-sm text-foreground">Task Management & Tracking</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
            <Icon name="Users" size={16} className="text-primary" />
          </div>
          <span className="text-sm text-foreground">Team Collaboration Tools</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
            <Icon name="BarChart3" size={16} className="text-accent" />
          </div>
          <span className="text-sm text-foreground">Analytics & Insights</span>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="mt-8 flex items-center space-x-4 text-xs text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Icon name="Shield" size={14} />
          <span>SSL Secured</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Lock" size={14} />
          <span>256-bit Encryption</span>
        </div>
      </div>
    </div>
  );
};

export default BrandingPanel;