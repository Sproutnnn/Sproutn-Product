import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ClockIcon, CheckCircleIcon, FileTextIcon, BoxIcon, TruckIcon, CreditCardIcon, PackageIcon, BarChartIcon } from 'lucide-react';
import type { ProjectWithCustomer } from '../services/projects.service';

export type Project = ProjectWithCustomer & {
  createdAt: string;
  updatedAt: string;
};
interface ProjectCardProps {
  project: Project;
}
const ProjectCard: React.FC<ProjectCardProps> = ({
  project
}) => {
  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'draft':
        return <ClockIcon className="h-4 w-4 text-gray-500" />;
      case 'details':
        return <FileTextIcon className="h-4 w-4 text-primary-600" />;
      case 'prototyping':
        return <BoxIcon className="h-4 w-4 text-primary-600" />;
      case 'sourcing':
        return <TruckIcon className="h-4 w-4 text-primary-600" />;
      case 'payment':
        return <CreditCardIcon className="h-4 w-4 text-primary-600" />;
      case 'production':
        return <PackageIcon className="h-4 w-4 text-primary-600" />;
      case 'shipping':
        return <TruckIcon className="h-4 w-4 text-primary-600" />;
      case 'completed':
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      default:
        return <ClockIcon className="h-4 w-4 text-gray-500" />;
    }
  };
  const getStatusLabel = (status: Project['status']) => {
    switch (status) {
      case 'draft':
        return 'Draft';
      case 'details':
        return 'Brief';
      case 'prototyping':
        return 'Prototyping';
      case 'sourcing':
        return 'Sourcing';
      case 'payment':
        return 'To Pay';
      case 'production':
        return 'Production';
      case 'shipping':
        return 'Shipped';
      case 'completed':
        return 'Completed';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'details':
        return 'bg-blue-100 text-blue-800';
      case 'prototyping':
        return 'bg-purple-100 text-purple-800';
      case 'sourcing':
        return 'bg-amber-100 text-amber-800';
      case 'payment':
        return 'bg-orange-100 text-orange-800';
      case 'production':
        return 'bg-indigo-100 text-indigo-800';
      case 'shipping':
        return 'bg-teal-100 text-teal-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getNextPageLink = (project: Project) => {
    switch (project.status) {
      case 'draft':
        return `/project/${project.id}`;
      case 'details':
        return `/project/${project.id}`;
      case 'prototyping':
        return `/project/${project.id}/prototyping`;
      case 'sourcing':
        return `/project/${project.id}/sourcing`;
      case 'payment':
      case 'production':
      case 'shipping':
        return `/project/${project.id}/tracking`;
      default:
        return `/project/${project.id}`;
    }
  };
  return <div className="bg-white rounded-lg shadow p-5 border border-gray-100 h-full flex flex-col">
      <div className="flex justify-between items-start">
        <div className="max-w-[70%]">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
            {project.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Created on {new Date(project.createdAt).toLocaleDateString()}
          </p>
          {project.project_code && (
            <p className="text-xs text-gray-600 mt-1 font-mono bg-gray-100 inline-block px-1.5 py-0.5 rounded">
              {project.project_code}
            </p>
          )}
        </div>
        <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)} whitespace-nowrap`}>
          <div className="flex items-center space-x-1">
            {getStatusIcon(project.status)}
            <span>{getStatusLabel(project.status)}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex-grow">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-primary-500 h-1.5 rounded-full" style={{
            width: `${getProgressPercentage(project.status)}%`
          }}></div>
          </div>
          <span className="text-xs text-gray-500 whitespace-nowrap">
            {getProgressPercentage(project.status)}% Complete
          </span>
        </div>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Last updated:</span>{' '}
          {new Date(project.updatedAt).toLocaleDateString()}
        </p>
      </div>
      <div className="mt-5 flex justify-end">
        <Link to={getNextPageLink(project)} className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-800">
          View Details
          <ArrowRightIcon className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>;
};
// Helper function to calculate progress percentage based on status
function getProgressPercentage(status: Project['status']): number {
  const stages = ['draft', 'details', 'prototyping', 'sourcing', 'payment', 'production', 'shipping', 'completed'];
  const currentIndex = stages.indexOf(status);
  return Math.round(currentIndex / (stages.length - 1) * 100);
}
export default ProjectCard;