import React, { Fragment } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { FileTextIcon, BoxIcon, TruckIcon, PackageIcon, CameraIcon, MegaphoneIcon, CheckIcon } from 'lucide-react';
import { Project } from './ProjectCard';
import { useAuth } from '../context/AuthContext';

interface ModuleNavigationProps {
  project: Project;
}
const ModuleNavigation: React.FC<ModuleNavigationProps> = ({
  project
}) => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const location = useLocation();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Debug logging - log everything to console
  console.log('=== ModuleNavigation Debug ===');
  console.log('Project object:', project);
  console.log('User:', user);
  console.log('Is Admin:', isAdmin);
  console.log('Project Status:', project?.status);
  console.log('Photography Unlocked:', project?.photography_unlocked);
  console.log('Marketing Unlocked:', project?.marketing_unlocked);

  // Define all modules with their properties
  // Simple logic: Admin sees all, Customer sees based on status
  const modules = [{
    id: 'brief',
    name: 'Brief',
    icon: <FileTextIcon className="w-5 h-5" />,
    path: `/project/${id}`,
    available: true // Always available
  }, {
    id: 'prototyping',
    name: 'Sampling',
    icon: <BoxIcon className="w-5 h-5" />,
    path: `/project/${id}/prototyping`,
    available: true // Always available
  }, {
    id: 'sourcing',
    name: 'Sourcing',
    icon: <TruckIcon className="w-5 h-5" />,
    path: `/project/${id}/sourcing`,
    available: true // Always available
  }, {
    id: 'order',
    name: 'Order & Delivery',
    icon: <PackageIcon className="w-5 h-5" />,
    path: `/project/${id}/tracking`,
    available: true // Always available
  }, {
    id: 'photography',
    name: 'Photography',
    icon: <CameraIcon className="w-5 h-5" />,
    path: `/project/${id}/photography`,
    available: true // Temporarily make always available for debugging
  }, {
    id: 'marketing',
    name: 'Marketing Plan',
    icon: <MegaphoneIcon className="w-5 h-5" />,
    path: `/project/${id}/marketing`,
    available: true // Temporarily make always available for debugging
  }];
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return <div className="py-4 mb-6">
      <div className="flex items-start justify-between w-full">
        {modules.map((module, index) => {
        const active = isActive(module.path);
        const isClickable = module.available;
        // Determine link or div based on clickability
        const Element = isClickable ? Link : 'div';
        const elementProps = isClickable ? {
          to: module.path
        } : {};
        // Calculate progress bar color for the connector
        const progressBarColor = module.available ? 'bg-primary-500' : 'bg-gray-200';
        return <Fragment key={module.id}>
              <div className="flex flex-col items-center">
                <Element {...elementProps} className={`flex flex-col items-center ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}>
                  <div className={`w-12 h-12 rounded-full ${active ? 'bg-primary-50' : module.available ? 'bg-primary-50' : 'bg-gray-100'} flex items-center justify-center`}>
                    <div className={`${active ? 'text-primary-600' : module.available ? 'text-charcoal-500' : 'text-gray-400'}`}>
                      {module.icon}
                    </div>
                  </div>
                  <span className={`mt-2 text-xs text-center ${active ? 'text-primary-600 font-medium' : module.available ? 'text-charcoal-500' : 'text-gray-400'}`}>
                    {module.name}
                  </span>
                </Element>
              </div>
              {/* Connector line between steps */}
              {index < modules.length - 1 && <div className="flex-1 h-1 mx-2 mt-6">
                  <div className={`h-full ${progressBarColor}`}></div>
                </div>}
            </Fragment>;
      })}
      </div>
    </div>;
};
export default ModuleNavigation;