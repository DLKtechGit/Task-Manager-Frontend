import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import BrandingPanel from './components/BrandingPanel';
import Icon from '../../components/AppIcon';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is already authenticated
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/dashboard');
    }

    // Show success message if redirected from registration
    if (location.state?.message) {
      toast.success(location.state.message, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }, [navigate, location]);

  return (
    <div className="min-h-screen bg-background">
      <ToastContainer />
      <div className="flex min-h-screen">
        {/* Left Panel - Registration Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <RegistrationForm />
          </div>
        </div>

        {/* Right Panel - Branding */}
        <div className="flex-1 hidden lg:block">
          <BrandingPanel />
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-card border-b border-border p-4 z-50">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="CheckSquare" size={20} color="white" />
          </div>
          <div>
            <span className="text-lg font-semibold text-foreground">TaskFlow</span>
            <span className="text-sm text-muted-foreground ml-1">Manager</span>
          </div>
        </div>
      </div>

      {/* Mobile Spacing */}
      <div className="lg:hidden h-20"></div>
    </div>
  );
};

export default SignUpPage;