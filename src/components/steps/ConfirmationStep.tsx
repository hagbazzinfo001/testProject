import React from 'react';
import { CreateDepartmentData } from '../../types';

interface ConfirmationStepProps {
  data: CreateDepartmentData;
}

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Confirmation</h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-sm font-medium text-gray-500">Department Name:</div>
            <div className="col-span-2 text-gray-900">{data.name}</div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-sm font-medium text-gray-500">Department Info:</div>
            <div className="col-span-2 text-gray-900">{data.description}</div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-sm font-medium text-gray-500">Team Roles:</div>
            <div className="col-span-2 space-y-1">
              {data.selectedRoles.map(role => (
                <div key={role.id} className="text-gray-900">{role.name}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};