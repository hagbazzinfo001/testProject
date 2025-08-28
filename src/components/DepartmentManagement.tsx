// import React, { useState, useEffect, useMemo } from 'react';
// import { ArrowLeft, Search, Filter, Plus } from 'lucide-react';
// import { Department } from '../types';
// import { api } from '../services/api';
// import { useApi } from '../hooks/useApi';
// import { Button } from './ui/Button';
// import { Input } from './ui/Input';
// import { LoadingSpinner } from './ui/LoadingSpinner';
// import { ErrorMessage } from './ui/ErrorMessage';

// interface DepartmentManagementProps {
//   onBack: () => void;
//   onAddDepartment: () => void;
// }

// export const DepartmentManagement: React.FC<DepartmentManagementProps> = ({
//   onBack,
//   onAddDepartment,
// }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterValue, setFilterValue] = useState('');

//   const departmentsApi = useApi<Department[]>();

//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   const fetchDepartments = async () => {
//     try {
//       await departmentsApi.execute(() => api.getDepartments());
//     } catch (error) {
//       // Error is handled by the hook
//     }
//   };

//   const filteredDepartments = useMemo(() => {
//     if (!departmentsApi.data) return [];

//     return departmentsApi.data.filter(dept => {
//       const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            dept.description.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesFilter = !filterValue || dept.name.toLowerCase().includes(filterValue.toLowerCase());
//       return matchesSearch && matchesFilter;
//     });
//   }, [departmentsApi.data, searchTerm, filterValue]);

//   const resetFilters = () => {
//     setSearchTerm('');
//     setFilterValue('');
//   };

//   const handleManage = (departmentId: string) => {
//     // Placeholder for manage functionality
//     console.log('Managing department:', departmentId);
//   };

//   if (departmentsApi.loading) {
//     return <LoadingSpinner size="lg" text="Loading departments..." />;
//   }

//   if (departmentsApi.error) {
//     return (
//       <ErrorMessage
//         message={departmentsApi.error}
//         onRetry={fetchDepartments}
//       />
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto p-6">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center">
//             <button
//               onClick={onBack}
//               className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
//             >
//               <ArrowLeft className="w-5 h-5 mr-1" />
//               BACK
//             </button>
//             <h1 className="text-2xl font-semibold text-gray-900">Department Management</h1>
//           </div>

//           <Button onClick={onAddDepartment}>
//             ADD DEPARTMENT
//           </Button>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
//           <div className="flex gap-4 items-center">
//             <div className="relative flex-1 max-w-md">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <Input
//                 placeholder="Search..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>

//             <div className="relative">
//               <select
//                 value={filterValue}
//                 onChange={(e) => setFilterValue(e.target.value)}
//                 className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="">Filters</option>
//                 <option value="product">Product</option>
//                 <option value="engineering">Engineering</option>
//                 <option value="accounting">Accounting</option>
//                 <option value="marketing">Marketing</option>
//                 <option value="support">Support</option>
//               </select>
//               <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
//             </div>

//             {(searchTerm || filterValue) && (
//               <Button variant="outline" onClick={resetFilters}>
//                 RESET FILTERS
//               </Button>
//             )}
//           </div>
//         </div>

//         {/* Department Count */}
//         <div className="mb-4">
//           <p className="text-gray-600">
//             {filteredDepartments.length} Department{filteredDepartments.length !== 1 ? 's' : ''}
//           </p>
//         </div>

//         {/* Departments Table */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
//                     Name
//                   </th>
//                   <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
//                     Department Info
//                   </th>
//                   <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
//                     Roles
//                   </th>
//                   <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
//                     Members
//                   </th>
//                   <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredDepartments.map((department) => (
//                   <tr key={department.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="py-4 px-6">
//                       <div className="font-medium text-gray-900">{department.name}</div>
//                     </td>
//                     <td className="py-4 px-6">
//                       <div className="text-gray-600 max-w-md">
//                         {department.description.length > 100
//                           ? `${department.description.substring(0, 100)}...`
//                           : department.description
//                         }
//                       </div>
//                     </td>
//                     <td className="py-4 px-6">
//                       <div className="text-center">
//                         <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
//                           {department.roles.length}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="py-4 px-6">
//                       <div className="text-center">
//                         <span className="text-gray-900 font-medium">
//                           {Math.floor(Math.random() * 25)}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="py-4 px-6">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => handleManage(department.id)}
//                       >
//                         MANAGE
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {filteredDepartments.length === 0 && (
//             <div className="text-center py-12">
//               <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
//                 <Search className="w-8 h-8 text-gray-400" />
//               </div>
//               <p className="text-gray-500">
//                 {searchTerm || filterValue
//                   ? 'No departments found matching your criteria'
//                   : 'No departments created yet'
//                 }
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect, useMemo } from "react";
// import { ArrowLeft, Search, Filter, Plus } from "lucide-react";
import { ArrowLeft, Search, Filter } from "lucide-react";

import { Department } from "../types";
import { api } from "../services/api";
import { useApi } from "../hooks/useApi";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import { ErrorMessage } from "./ui/ErrorMessage";

interface DepartmentManagementProps {
  onBack: () => void;
  onAddDepartment: () => void;
  onManageDepartment: (departmentId: string) => void;
}

export const DepartmentManagement: React.FC<DepartmentManagementProps> = ({
  onBack,
  onAddDepartment,
  onManageDepartment,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const departmentsApi = useApi<Department[]>();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      await departmentsApi.execute(() => api.getDepartments());
    } catch (error) {
      alert(error);
      // Error is handled by the hook
    }
  };

  const filteredDepartments = useMemo(() => {
    if (!departmentsApi.data) return [];

    return departmentsApi.data.filter((dept) => {
      const matchesSearch =
        dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        !filterValue ||
        dept.name.toLowerCase().includes(filterValue.toLowerCase());
      return matchesSearch && matchesFilter;
    });
  }, [departmentsApi.data, searchTerm, filterValue]);

  const resetFilters = () => {
    setSearchTerm("");
    setFilterValue("");
  };

  const handleManage = (departmentId: string) => {
    onManageDepartment(departmentId);
  };

  if (departmentsApi.loading) {
    return <LoadingSpinner size="lg" text="Loading departments..." />;
  }

  if (departmentsApi.error) {
    return (
      <ErrorMessage message={departmentsApi.error} onRetry={fetchDepartments} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              BACK
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">
              Department Management
            </h1>
          </div>

          <Button onClick={onAddDepartment}>ADD DEPARTMENT</Button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="relative">
              <select
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Filters</option>
                <option value="product">Product</option>
                <option value="engineering">Engineering</option>
                <option value="accounting">Accounting</option>
                <option value="marketing">Marketing</option>
                <option value="support">Support</option>
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {(searchTerm || filterValue) && (
              <Button variant="outline" onClick={resetFilters}>
                RESET FILTERS
              </Button>
            )}
          </div>
        </div>

        {/* Department Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredDepartments.length} Department
            {filteredDepartments.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Departments Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Department Info
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Roles
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Members
                  </th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDepartments.map((department) => (
                  <tr
                    key={department.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">
                        {department.name}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-gray-600 max-w-md">
                        {department.description.length > 100
                          ? `${department.description.substring(0, 100)}...`
                          : department.description}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {department.roles.length}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-center">
                        <span className="text-gray-900 font-medium">
                          {Math.floor(Math.random() * 25)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Button
                        variant="outline"
                        className="!text-blue-600 border-blue-800 hover:bg-blue-50"
                        size="sm"
                        onClick={() => handleManage(department.id)}
                      >
                        MANAGE
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredDepartments.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">
                {searchTerm || filterValue
                  ? "No departments found matching your criteria"
                  : "No departments created yet"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
