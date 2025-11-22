import React, { useEffect, useState } from 'react';
import { UserPlusIcon, TrashIcon, PencilIcon, UserIcon, BuildingIcon, XIcon } from 'lucide-react';
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  companyName?: string;
  permissions?: string[];
  dateAdded: string;
}
const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([{
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    companyName: "Sprout'n Admin",
    permissions: ['all'],
    dateAdded: '2023-01-15'
  }, {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer',
    companyName: 'Acme Corp',
    permissions: ['view_projects', 'edit_projects'],
    dateAdded: '2023-03-22'
  }, {
    id: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'customer',
    companyName: 'XYZ Industries',
    permissions: ['view_projects'],
    dateAdded: '2023-05-10'
  }]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'customer',
    companyName: '',
    permissions: [] as string[]
  });
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'customer',
      companyName: '',
      permissions: []
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handlePermissionChange = (permission: string) => {
    setFormData(prev => {
      if (prev.permissions.includes(permission)) {
        return {
          ...prev,
          permissions: prev.permissions.filter(p => p !== permission)
        };
      } else {
        return {
          ...prev,
          permissions: [...prev.permissions, permission]
        };
      }
    });
  };
  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create new user
    const newUser: User = {
      id: (users.length + 1).toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role as 'admin' | 'customer',
      companyName: formData.companyName,
      permissions: formData.permissions,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, newUser]);
    // Reset form and close modal
    resetForm();
    setShowInviteModal(false);
  };
  const handleEditClick = (user: User) => {
    setCurrentUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      companyName: user.companyName || '',
      permissions: user.permissions || []
    });
    setShowEditModal(true);
  };
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    const updatedUsers = users.map(user => {
      if (user.id === currentUser.id) {
        return {
          ...user,
          name: formData.name,
          email: formData.email,
          role: formData.role as 'admin' | 'customer',
          companyName: formData.companyName,
          permissions: formData.role === 'admin' ? ['all'] : formData.permissions
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    setShowEditModal(false);
    resetForm();
    setCurrentUser(null);
  };
  const deleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };
  // Reset form when modals close
  useEffect(() => {
    if (!showInviteModal && !showEditModal) {
      resetForm();
    }
  }, [showInviteModal, showEditModal]);
  return <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <button onClick={() => setShowInviteModal(true)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <UserPlusIcon className="h-5 w-5 mr-2" />
          Invite User
        </button>
      </div>
      {/* Users Table */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Added
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <UserIcon className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                      {user.companyName && <div className="text-xs text-gray-500 flex items-center">
                          <BuildingIcon className="h-3 w-3 mr-1" />
                          {user.companyName}
                        </div>}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                    {user.role === 'admin' ? 'Admin' : 'Customer'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {user.permissions?.includes('all') ? 'All Permissions' : user.permissions?.map((permission, index) => <span key={permission} className="inline-block bg-gray-100 rounded-full px-2 py-0.5 text-xs mr-1 mb-1">
                            {permission.replace('_', ' ')}
                          </span>)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.dateAdded}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-primary-600 hover:text-primary-900 mr-4" onClick={() => handleEditClick(user)}>
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900" onClick={() => deleteUser(user.id)}>
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
      {/* Invite User Modal */}
      {showInviteModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Invite User</h3>
              <button onClick={() => setShowInviteModal(false)} className="text-gray-400 hover:text-gray-500">
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleInviteSubmit} className="p-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <select id="role" name="role" required value={formData.role} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Permissions
                  </label>
                  {formData.role === 'admin' ? <div className="bg-gray-50 p-3 rounded text-sm text-gray-500">
                      Admins automatically have all permissions
                    </div> : <div className="space-y-2">
                      <div className="flex items-center">
                        <input id="view_projects" type="checkbox" checked={formData.permissions.includes('view_projects')} onChange={() => handlePermissionChange('view_projects')} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                        <label htmlFor="view_projects" className="ml-2 block text-sm text-gray-700">
                          View Projects
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input id="edit_projects" type="checkbox" checked={formData.permissions.includes('edit_projects')} onChange={() => handlePermissionChange('edit_projects')} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                        <label htmlFor="edit_projects" className="ml-2 block text-sm text-gray-700">
                          Edit Projects
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input id="approve_payments" type="checkbox" checked={formData.permissions.includes('approve_payments')} onChange={() => handlePermissionChange('approve_payments')} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                        <label htmlFor="approve_payments" className="ml-2 block text-sm text-gray-700">
                          Approve Payments
                        </label>
                      </div>
                    </div>}
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button type="button" onClick={() => setShowInviteModal(false)} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600">
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>}
      {/* Edit User Modal */}
      {showEditModal && currentUser && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Edit User</h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-500">
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input type="text" id="edit-name" name="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input type="email" id="edit-email" name="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="edit-role" className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <select id="edit-role" name="role" required value={formData.role} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="edit-companyName" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input type="text" id="edit-companyName" name="companyName" value={formData.companyName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Permissions
                  </label>
                  {formData.role === 'admin' ? <div className="bg-gray-50 p-3 rounded text-sm text-gray-500">
                      Admins automatically have all permissions
                    </div> : <div className="space-y-2">
                      <div className="flex items-center">
                        <input id="edit-view_projects" type="checkbox" checked={formData.permissions.includes('view_projects')} onChange={() => handlePermissionChange('view_projects')} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                        <label htmlFor="edit-view_projects" className="ml-2 block text-sm text-gray-700">
                          View Projects
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input id="edit-edit_projects" type="checkbox" checked={formData.permissions.includes('edit_projects')} onChange={() => handlePermissionChange('edit_projects')} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                        <label htmlFor="edit-edit_projects" className="ml-2 block text-sm text-gray-700">
                          Edit Projects
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input id="edit-approve_payments" type="checkbox" checked={formData.permissions.includes('approve_payments')} onChange={() => handlePermissionChange('approve_payments')} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                        <label htmlFor="edit-approve_payments" className="ml-2 block text-sm text-gray-700">
                          Approve Payments
                        </label>
                      </div>
                    </div>}
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
};
export default UserManagement;