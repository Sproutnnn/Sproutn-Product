import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { FileTextIcon, BoxIcon, TruckIcon, PackageIcon, CameraIcon, MegaphoneIcon, LockIcon, CheckCircleIcon } from 'lucide-react';
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
    available: true // Always available as the first step
  }, {
    id: 'prototyping',
    name: 'Prototyping',
    icon: <BoxIcon className="w-5 h-5" />,
    path: `/project/${id}/prototyping`,
    available: ['details', 'prototyping', 'sourcing', 'payment', 'production', 'shipping', 'completed'].includes(project.status)
  }, {
    id: 'sourcing',
    name: 'Sourcing',
    icon: <TruckIcon className="w-5 h-5" />,
    path: `/project/${id}/sourcing`,
    available: ['sourcing', 'payment', 'production', 'shipping', 'completed'].includes(project.status)
  }, {
    id: 'order',
    name: 'Order & Delivery',
    icon: <PackageIcon className="w-5 h-5" />,
    path: `/project/${id}/tracking`,
    available: ['payment', 'production', 'shipping', 'completed'].includes(project.status)
  }, {
    id: 'photography',
    name: 'Photography',
    icon: <CameraIcon className="w-5 h-5" />,
    path: `/project/${id}/photography`,
    available: true
  }, {
    id: 'marketing',
    name: 'Marketing Plan',
    icon: <MegaphoneIcon className="w-5 h-5" />,
    path: `/project/${id}/marketing`,
    available: true
  }];
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  return <div className="bg-white shadow rounded-lg mb-6">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-1 p-1">
        {modules.map(module => <div key={module.id} className="relative">
            {module.available ? <Link to={module.path} className={`flex flex-col items-center p-3 rounded-md transition-colors ${isActive(module.path) ? 'bg-primary-50 text-primary-700' : 'text-charcoal-500 hover:bg-gray-50'}`}>
                <div className="mb-2">{module.icon}</div>
                <span className="text-xs font-medium text-center">
                  {module.name}
                </span>
                {isActive(module.path) && <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-primary-500"></div>}
              </Link> : <div className="flex flex-col items-center p-3 rounded-md text-gray-400 cursor-not-allowed">
                <div className="mb-2 relative">
                  {module.icon}
                  <LockIcon className="w-3 h-3 absolute -top-1 -right-1 text-gray-400" />
                </div>
                <span className="text-xs font-medium text-center">
                  {module.name}
                </span>
              </div>}
          </div>)}
      </div>
    </div>;
};
export default ModuleNavigation;