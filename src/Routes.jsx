import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import SignInPage from './pages/sign-in';
import MembersPage from './pages/members';
import SignUpPage from './pages/sign-up';
import Dashboard from './pages/dashboard';
import AcceptTaskPage from './pages/accept-task';
import ManageTasksPage from './pages/manage-tasks';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AcceptTaskPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/accept-task" element={<AcceptTaskPage />} />
        <Route path="/manage-tasks" element={<ManageTasksPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
