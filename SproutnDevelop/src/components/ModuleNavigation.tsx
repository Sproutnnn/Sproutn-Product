import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { FileTextIcon, BeakerIcon, PackageIcon, MegaphoneIcon, CheckCircleIcon, PencilRulerIcon, WrenchIcon } from 'lucide-react';
import { Project } from './ProjectCard';
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
  // Define all modules with their properties
  const modules = [{
    id: 'brief',
    name: 'Brief',
    icon: <FileTextIcon className="w-5 h-5" />,
    path: `/project/${id}`,
    available: true,
    description: 'Software/service description, target users, and key functionalities',
    hasCost: false
  }, {
    id: 'design',
    name: 'Design',
    icon: <PencilRulerIcon className="w-5 h-5" />,
    path: `/project/${id}/design`,
    available: true,
    description: 'Full design download and feedback space',
    hasCost: true
  }, {
    id: 'beta-testing',
    name: 'Beta Testing',
    icon: <BeakerIcon className="w-5 h-5" />,
    path: `/project/${id}/beta-testing`,
    available: true,
    description: 'Testing objectives, timeline, success criteria, and feedback reporting',
    hasCost: true
  }, {
    id: 'mvp',
    name: 'MVP',
    icon: <PackageIcon className="w-5 h-5" />,
    path: `/project/${id}/mvp`,
    available: true,
    description: 'Service deployment and admin dashboard delivery',
    hasCost: true
  }, {
    id: 'marketing',
    name: 'Marketing',
    icon: <MegaphoneIcon className="w-5 h-5" />,
    path: `/project/${id}/marketing`,
    available: true,
    description: 'Mockups, product shots, social media plans, and more',
    hasCost: true,
    hasPackages: true
  }, {
    id: 'completed',
    name: 'Completed',
    icon: <CheckCircleIcon className="w-5 h-5" />,
    path: `/project/${id}/completed`,
    available: true,
    description: 'Full functionality and delivery of key features',
    hasCost: true
  }, {
    id: 'maintenance',
    name: 'Maintenance',
    icon: <WrenchIcon className="w-5 h-5" />,
    path: `/project/${id}/maintenance`,
    available: true,
    description: 'Monthly service for bug fixes and platform health',
    hasCost: true,
    isSubscription: true
  }];
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  return <div className="bg-white shadow rounded-lg mb-6">
      <div className="grid grid-cols-3 md:grid-cols-7 gap-1 p-1">
        {modules.map(module => <div key={module.id} className="relative">
            <Link to={module.path} className={`flex flex-col items-center p-3 rounded-md transition-colors ${isActive(module.path) ? 'bg-primary-50 text-primary-700' : 'text-charcoal-500 hover:bg-gray-50'}`}>
              <div className="mb-2">{module.icon}</div>
              <span className="text-xs font-medium text-center">
                {module.name}
              </span>
              {isActive(module.path) && <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-primary-500"></div>}
              {module.hasCost && <div className="absolute top-1 right-1">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                  </span>
                </div>}
            </Link>
          </div>)}
      </div>
    </div>;
};
export default ModuleNavigation;