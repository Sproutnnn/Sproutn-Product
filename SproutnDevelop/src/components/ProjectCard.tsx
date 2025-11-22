import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, BeakerIcon, PencilRulerIcon, PackageIcon, CheckCircleIcon, ClipboardIcon, MegaphoneIcon, WrenchIcon } from 'lucide-react';
export interface Project {
  id: string;
  name: string;
  status: 'requirements' | 'design' | 'beta-testing' | 'mvp' | 'marketing' | 'completed' | 'maintenance';
  createdAt: string;
  updatedAt: string;
  customer: {
    name: string;
    email: string;
  };
}
const ProjectCard: React.FC<{
  project: Project;
}> = ({
  project
}) => {
  const getStatusInfo = (status: Project['status']): {
    label: string;
    color: string;
    bgColor: string;
    icon: React.ReactNode;
  } => {
    switch (status) {
      case 'requirements':
        return {
          label: 'Brief',
          color: 'text-blue-700',
          bgColor: 'bg-blue-100',
          icon: <ClipboardIcon className="h-5 w-5 text-blue-500" />
        };
      case 'design':
        return {
          label: 'Design',
          color: 'text-purple-700',
          bgColor: 'bg-purple-100',
          icon: <PencilRulerIcon className="h-5 w-5 text-purple-500" />
        };
      case 'beta-testing':
        return {
          label: 'Beta Testing',
          color: 'text-amber-700',
          bgColor: 'bg-amber-100',
          icon: <BeakerIcon className="h-5 w-5 text-amber-500" />
        };
      case 'mvp':
        return {
          label: 'MVP',
          color: 'text-cyan-700',
          bgColor: 'bg-cyan-100',
          icon: <PackageIcon className="h-5 w-5 text-cyan-500" />
        };
      case 'marketing':
        return {
          label: 'Marketing',
          color: 'text-indigo-700',
          bgColor: 'bg-indigo-100',
          icon: <MegaphoneIcon className="h-5 w-5 text-indigo-500" />
        };
      case 'completed':
        return {
          label: 'Completed',
          color: 'text-green-700',
          bgColor: 'bg-green-100',
          icon: <CheckCircleIcon className="h-5 w-5 text-green-500" />
        };
      case 'maintenance':
        return {
          label: 'Maintenance',
          color: 'text-orange-700',
          bgColor: 'bg-orange-100',
          icon: <WrenchIcon className="h-5 w-5 text-orange-500" />
        };
      default:
        return {
          label: 'Unknown',
          color: 'text-gray-700',
          bgColor: 'bg-gray-100',
          icon: <ClipboardIcon className="h-5 w-5 text-gray-500" />
        };
    }
  };
  const statusInfo = getStatusInfo(project.status);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  return <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {project.name}
          </h3>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.bgColor} ${statusInfo.color}`}>
            {statusInfo.label}
          </span>
        </div>
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              {statusInfo.icon}
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {project.customer.name}
            </p>
            <p className="text-sm text-gray-500">{project.customer.email}</p>
          </div>
        </div>
        <div className="text-sm text-gray-500 mb-4">
          <div className="flex justify-between">
            <span>Created:</span>
            <span>{formatDate(project.createdAt)}</span>
          </div>
          <div className="flex justify-between">
            <span>Updated:</span>
            <span>{formatDate(project.updatedAt)}</span>
          </div>
        </div>
        <div className="mt-4">
          <Link to={`/project/${project.id}`} className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700">
            View Details
            <ArrowRightIcon className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>;
};
export default ProjectCard;