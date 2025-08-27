import React from 'react';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';

interface NameDescriptionStepProps {
  name: string;
  description: string;
  errors: {
    name?: string;
    description?: string;
  };
  onChange: (field: 'name' | 'description', value: string) => void;
}

export const NameDescriptionStep: React.FC<NameDescriptionStepProps> = ({
  name,
  description,
  errors,
  onChange,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Name & Description</h2>
        
        <div className="space-y-4">
          <Input
            label="Department Name"
            placeholder="Department Name"
            value={name}
            onChange={(e) => onChange('name', e.target.value)}
            error={errors.name}
          />
          
          <Textarea
            label="Department Info"
            placeholder="Department Info"
            value={description}
            onChange={(e) => onChange('description', e.target.value)}
            error={errors.description}
            maxLength={500}
            rows={6}
          />
        </div>
      </div>
    </div>
  );
};