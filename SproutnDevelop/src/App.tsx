import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProjectCreation from './pages/ProjectCreation';
import ProjectDetails from './pages/ProjectDetails';
import Payment from './pages/Payment';
import Tracking from './pages/Tracking';
import ChatPage from './pages/ChatPage';
import UserProfile from './pages/UserProfile';
import UserManagement from './pages/UserManagement';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import BlogPage from './pages/BlogPage';
import TermsOfService from './pages/legal/TermsOfService';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import CookiesPolicy from './pages/legal/CookiesPolicy';
import BlogEditor from './components/admin/BlogEditor';
import BlogManagement from './components/admin/BlogManagement';
import PageEditor from './components/admin/PageEditor';
import PageManagement from './components/admin/PageManagement';
import ServiceManagement from './components/admin/ServiceManagement';
import ServiceEditor from './components/admin/ServiceEditor';
import About from './pages/About';
import Design from './pages/Design';
import BetaTesting from './pages/BetaTesting';
import MVP from './pages/MVP';
import Marketing from './pages/Marketing';
import Maintenance from './pages/Maintenance';
import Completed from './pages/Completed';
import './styles/animations.css';
export function App() {
  return <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiesPolicy />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>} />
            <Route path="/create-project" element={<ProtectedRoute roleRequired="customer">
                  <ProjectCreation />
                </ProtectedRoute>} />
            <Route path="/project/:id" element={<ProtectedRoute>
                  <ProjectDetails />
                </ProtectedRoute>} />
            <Route path="/project/:id/design" element={<ProtectedRoute>
                  <Design />
                </ProtectedRoute>} />
            <Route path="/project/:id/beta-testing" element={<ProtectedRoute>
                  <BetaTesting />
                </ProtectedRoute>} />
            <Route path="/project/:id/mvp" element={<ProtectedRoute>
                  <MVP />
                </ProtectedRoute>} />
            <Route path="/project/:id/marketing" element={<ProtectedRoute>
                  <Marketing />
                </ProtectedRoute>} />
            <Route path="/project/:id/completed" element={<ProtectedRoute>
                  <Completed />
                </ProtectedRoute>} />
            <Route path="/project/:id/maintenance" element={<ProtectedRoute>
                  <Maintenance />
                </ProtectedRoute>} />
            <Route path="/project/:id/tracking" element={<ProtectedRoute>
                  <Tracking />
                </ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute roleRequired="admin">
                  <UserManagement />
                </ProtectedRoute>} />
            <Route path="/admin/blogs" element={<ProtectedRoute roleRequired="admin">
                  <BlogManagement />
                </ProtectedRoute>} />
            <Route path="/admin/blogs/new" element={<ProtectedRoute roleRequired="admin">
                  <BlogEditor />
                </ProtectedRoute>} />
            <Route path="/admin/blogs/edit/:id" element={<ProtectedRoute roleRequired="admin">
                  <BlogEditor editMode={true} />
                </ProtectedRoute>} />
            <Route path="/admin/pages" element={<ProtectedRoute roleRequired="admin">
                  <PageManagement />
                </ProtectedRoute>} />
            <Route path="/admin/pages/new" element={<ProtectedRoute roleRequired="admin">
                  <PageEditor />
                </ProtectedRoute>} />
            <Route path="/admin/pages/edit/:slug" element={<ProtectedRoute roleRequired="admin">
                  <PageEditor editMode={true} />
                </ProtectedRoute>} />
            <Route path="/admin/services" element={<ProtectedRoute roleRequired="admin">
                  <ServiceManagement />
                </ProtectedRoute>} />
            <Route path="/admin/services/new" element={<ProtectedRoute roleRequired="admin">
                  <ServiceEditor />
                </ProtectedRoute>} />
            <Route path="/admin/services/edit/:id" element={<ProtectedRoute roleRequired="admin">
                  <ServiceEditor editMode={true} />
                </ProtectedRoute>} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>;
}