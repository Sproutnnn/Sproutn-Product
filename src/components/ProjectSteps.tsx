import React, { Fragment } from 'react';
import { ClipboardIcon, BoxIcon, TruckIcon, ShoppingCartIcon, ImageIcon, LineChartIcon } from 'lucide-react';
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
  // Map status to step index for the new step sequence
  const getStepIndex = (status: Project['status']) => {
    switch (status) {
      case 'draft':
      case 'details':
        return 0;
      // Brief
      case 'prototyping':
        return 1;
      // Sampling
      case 'sourcing':
        return 2;
      // Sourcing
      case 'payment':
      case 'production':
      case 'shipping':
        return 3;
      // Order & Delivery
      case 'completed':
        return 5;
      // Marketing (final step)
      default:
        return 0;
    }
  };
  const steps = [{
    key: 'brief',
    label: 'Brief',
    icon: <ClipboardIcon className="w-5 h-5" />,
    path: `/project/${id}`
  }, {
    key: 'prototyping',
    label: 'Sampling',
    icon: <BoxIcon className="w-5 h-5" />,
    path: `/project/${id}/prototyping`
  }, {
    key: 'sourcing',
    label: 'Sourcing',
    icon: <TruckIcon className="w-5 h-5" />,
    path: `/project/${id}/sourcing`
  }, {
    key: 'order',
    label: 'Order & Delivery',
    icon: <ShoppingCartIcon className="w-5 h-5" />,
    path: `/project/${id}/tracking`
  }, {
    key: 'photography',
    label: 'Photography',
    icon: <ImageIcon className="w-5 h-5" />,
    path: `/project/${id}/photography`
  }, {
    key: 'marketing',
    label: 'Marketing Plan',
    icon: <LineChartIcon className="w-5 h-5" />,
    path: `/project/${id}/marketing`
  }];
  const currentStepIndex = getStepIndex(currentStep);
  return <div className="py-4 mb-6">
      <div className="flex items-start justify-between w-full">
        {steps.map((step, index) => {
        const isActive = index <= currentStepIndex;
        const isClickable = isActive;
        // Determine link or div based on clickability
        const Element = isClickable ? Link : 'div';
        const elementProps = isClickable ? {
          to: step.path
        } : {};
        // Calculate progress bar color for the connector
        const progressBarColor = index < currentStepIndex ? 'bg-primary-500' : 'bg-gray-200';
        return <Fragment key={step.key}>
              <div className="flex flex-col items-center">
                <Element {...elementProps} className={`flex flex-col items-center ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}>
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