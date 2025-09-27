import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SignInForm from './components/SignInForm';
import BrandingPanel from './components/BrandingPanel';
import Icon from '../../components/AppIcon';


const SignInPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Sign In - TaskFlow Manager</title>
        <meta name="description" content="Sign in to your TaskFlow Manager account to access task management, team collaboration, and analytics dashboard." />
      </Helmet>

      <div className="min-h-screen bg-background flex">
        {/* Left Panel - Sign In Form */}
        <div className="flex-1 flex items-center justify-center px-4 py-8 lg:px-8">
          <div className="w-full max-w-md">
            <SignInForm />
          </div>
        </div>

        {/* Right Panel - Branding */}
        <div className="hidden lg:flex lg:flex-1 lg:max-w-2xl">
          <BrandingPanel />
        </div>

        {/* Mobile Branding Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 bg-card border-b border-border z-10">
          <div className="flex items-center justify-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="CheckSquare" size={20} color="white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">TaskFlow</h1>
                <p className="text-xs text-muted-foreground">Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile spacing for fixed header */}
        <div className="lg:hidden h-20"></div>
      </div>
    </>
  );
};

export default SignInPage;