import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProjectCreation from './pages/ProjectCreation';
import ProjectDetails from './pages/ProjectDetails';
import Prototyping from './pages/Prototyping';
import Sourcing from './pages/Sourcing';
import Payment from './pages/Payment';
import Tracking from './pages/Tracking';
import Photography from './pages/Photography';
import Marketing from './pages/Marketing';
import ChatPage from './pages/ChatPage';
import UserProfile from './pages/UserProfile';
import UserManagement from './pages/UserManagement';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import BlogPage from './pages/BlogPage';
import ServicesPage from './pages/ServicesPage';
import PrototypingService from './pages/services/PrototypingService';
import SourcingService from './pages/services/SourcingService';
import ManufacturingService from './pages/services/ManufacturingService';
import PhotographyService from './pages/services/PhotographyService';
import MarketingService from './pages/services/MarketingService';
import TermsOfService from './pages/legal/TermsOfService';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import CookiesPolicy from './pages/legal/CookiesPolicy';
import BlogEditor from './components/admin/BlogEditor';
import BlogManagement from './components/admin/BlogManagement';
import PageEditor from './components/admin/PageEditor';
import PageManagement from './components/admin/PageManagement';
import About from './pages/About';
import './styles/animations.css';
export function App() {
  return <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/prototyping" element={<PrototypingService />} />
          <Route path="/services/sourcing" element={<SourcingService />} />
          <Route path="/services/manufacturing" element={<ManufacturingService />} />
          <Route path="/services/photography" element={<PhotographyService />} />
          <Route path="/services/marketing" element={<MarketingService />} />
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
            <Route path="/project/:id/prototyping" element={<ProtectedRoute>
                  <Prototyping />
                </ProtectedRoute>} />
            <Route path="/project/:id/sourcing" element={<ProtectedRoute>
                  <Sourcing />
                </ProtectedRoute>} />
            <Route path="/project/:id/payment" element={<ProtectedRoute roleRequired="customer">
                  <Payment />
                </ProtectedRoute>} />
            <Route path="/project/:id/tracking" element={<ProtectedRoute>
                  <Tracking />
                </ProtectedRoute>} />
            <Route path="/project/:id/photography" element={<ProtectedRoute>
                  <Photography />
                </ProtectedRoute>} />
            <Route path="/project/:id/marketing" element={<ProtectedRoute>
                  <Marketing />
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
          </Route>
        </Routes>
      </AuthProvider>
    </Router>;
}