import React from 'react';
import { projectsService } from '../services/projects.service';

interface AdminStatusControlProps {
  projectId: string;
  currentStatus: string;
  onStatusChange?: (newStatus: string) => void;
}

const AdminStatusControl: React.FC<AdminStatusControlProps> = ({
  projectId,
  currentStatus,
  onStatusChange
}) => {
  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    console.log('Attempting to update status to:', newStatus);
    console.log('Project ID:', projectId);

    try {
      const updatedProject = await projectsService.updateProjectStatus(projectId, newStatus);
      console.log('Status updated successfully, new project data:', updatedProject);

      if (onStatusChange) {
        onStatusChange(newStatus);
      }

      alert(`Project status updated to "${newStatus}" successfully!`);
      // Reload the page to ensure all components get new data
      window.location.reload();
    } catch (err) {
      console.error('Failed to update status - Full error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      alert(`Failed to update project status: ${errorMessage}`);
    }
  };

  return (
    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-blue-800">Project Status</h3>
          <p className="text-xs text-blue-700 mt-1">
            Change to "Production" to unlock Photography and Marketing for customer
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={currentStatus}
            onChange={handleStatusChange}
            className="block border border-blue-300 bg-white rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="draft">Draft</option>
            <option value="details">Brief</option>
            <option value="prototyping">Prototyping</option>
            <option value="sourcing">Sourcing</option>
            <option value="payment">To Pay</option>
            <option value="production">Production</option>
            <option value="shipping">Shipping</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AdminStatusControl;
