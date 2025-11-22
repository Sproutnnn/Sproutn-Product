import React, { Fragment } from 'react';
import { ClipboardIcon, BeakerIcon, PackageIcon, CheckCircleIcon, PencilRulerIcon, MegaphoneIcon, WrenchIcon } from 'lucide-react';
import { Project } from './ProjectCard';
import { Link, useParams } from 'react-router-dom';
interface ProjectStepsProps {
  currentStep: Project['status'];
}
const ProjectSteps: React.FC<ProjectStepsProps> = ({
  currentStep
}) => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  // Map status to step index for software development steps
  const getStepIndex = (status: Project['status']) => {
    switch (status) {
      case 'requirements':
        return 0;
      // Brief
      case 'design':
        return 1;
      // Design phase
      case 'beta-testing':
        return 2;
      // Beta Testing
      case 'mvp':
        return 3;
      // MVP
      case 'marketing':
        return 4;
      // Marketing Plan
      case 'completed':
        return 5;
      // Project completed
      case 'maintenance':
        return 6;
      // Maintenance
      default:
        return 0;
    }
  };
  const steps = [{
    key: 'requirements',
    label: 'Brief',
    icon: <ClipboardIcon className="w-5 h-5" />,
    path: `/project/${id}`
  }, {
    key: 'design',
    label: 'Design',
    icon: <PencilRulerIcon className="w-5 h-5" />,
    path: `/project/${id}/design`
  }, {
    key: 'beta-testing',
    label: 'Beta Testing',
    icon: <BeakerIcon className="w-5 h-5" />,
    path: `/project/${id}/beta-testing`
  }, {
    key: 'mvp',
    label: 'MVP',
    icon: <PackageIcon className="w-5 h-5" />,
    path: `/project/${id}/mvp`
  }, {
    key: 'marketing',
    label: 'Marketing',
    icon: <MegaphoneIcon className="w-5 h-5" />,
    path: `/project/${id}/marketing`
  }, {
    key: 'completed',
    label: 'Completed',
    icon: <CheckCircleIcon className="w-5 h-5" />,
    path: `/project/${id}/completed`
  }, {
    key: 'maintenance',
    label: 'Maintenance',
    icon: <WrenchIcon className="w-5 h-5" />,
    path: `/project/${id}/maintenance`
  }];
  const currentStepIndex = getStepIndex(currentStep);
  return <div className="py-4 mb-6">
      <div className="flex items-start justify-between w-full">
        {steps.map((step, index) => {
        const isActive = index <= currentStepIndex;
        const isClickable = true; // All steps are now clickable
        // Determine link or div based on clickability
        const Element = Link; // Always a link since all steps are clickable
        const elementProps = {
          to: step.path
        };
        // Calculate progress bar color for the connector
        const progressBarColor = index < currentStepIndex ? 'bg-primary-500' : 'bg-gray-200';
        return <Fragment key={step.key}>
              <div className="flex flex-col items-center">
                <Element {...elementProps} className={`flex flex-col items-center cursor-pointer`}>
                  <div className={`w-12 h-12 rounded-full ${isActive ? 'bg-primary-50' : 'bg-gray-100'} flex items-center justify-center`}>
                    <div className={`${isActive ? index === currentStepIndex ? 'text-primary-600' : 'text-charcoal-500' : 'text-gray-400'}`}>
                      {step.icon}
                    </div>
                  </div>
                  <span className={`mt-2 text-xs text-center ${isActive ? index === currentStepIndex ? 'text-primary-600 font-medium' : 'text-charcoal-500' : 'text-gray-400'}`}>
                    {step.label}
                  </span>
                </Element>
              </div>
              {/* Connector line between steps */}
              {index < steps.length - 1 && <div className="flex-1 h-1 mx-2 mt-6">
                  <div className={`h-full ${progressBarColor}`}></div>
                </div>}
            </Fragment>;
      })}
      </div>
    </div>;
};
export default ProjectSteps;