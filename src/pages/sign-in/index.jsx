import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SignInForm from './components/SignInForm';
import BrandingPanel from './components/BrandingPanel';
import Icon from '../../components/AppIcon';
import './SignInPage.css';

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

      <div className="signin-page">
        {/* Left Panel - Sign In Form */}
        <div className="signin-form-panel">
          <div className="signin-form-container">
            <SignInForm />
          </div>
        </div>

        {/* Right Panel - Branding */}
        <div className="branding-panel">
          <BrandingPanel />
        </div>

        {/* Mobile Branding Header */}
        <div className="mobile-branding-header">
          <div className="mobile-branding-content">
            <div className="mobile-branding-logo">
              <div className="mobile-branding-icon">
                <Icon name="CheckSquare" size={20} color="white" />
              </div>
              <div className="mobile-branding-text">
                <h1>TaskFlow</h1>
                <p>Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile spacing for fixed header */}
        <div className="mobile-spacing"></div>
      </div>
    </>
  );
};

export default SignInPage;