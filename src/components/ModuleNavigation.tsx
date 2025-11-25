import React, { Fragment } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { FileTextIcon, BoxIcon, TruckIcon, PackageIcon, CameraIcon, MegaphoneIcon, CheckIcon } from 'lucide-react';
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

  // Debug logging
  console.log('ModuleNavigation - Project:', {
    status: project.status,
    photography_unlocked: project.photography_unlocked,
    marketing_unlocked: project.marketing_unlocked
  });

  // Define all modules with their properties
  const modules = [{
    id: 'brief',
    name: 'Brief',
    icon: <FileTextIcon className="w-5 h-5" />,
    path: `/project/${id}`,
    available: true // Always available as the first step
  }, {
    id: 'prototyping',
    name: 'Sampling',
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
    available: project.photography_unlocked === true || ['production', 'shipping', 'completed'].includes(project.status)
  }, {
    id: 'marketing',
    name: 'Marketing Plan',
    icon: <MegaphoneIcon className="w-5 h-5" />,
    path: `/project/${id}/marketing`,
    available: project.marketing_unlocked === true || ['production', 'shipping', 'completed'].includes(project.status)
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