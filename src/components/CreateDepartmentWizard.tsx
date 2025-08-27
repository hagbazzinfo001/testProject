import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Role, CreateDepartmentData } from "../types";
import { api } from "../services/api";
import { useApi } from "../hooks/useApi";
import { ProgressIndicator } from "./ui/ProgressIndicator";
import { Button } from "./ui/Button";
import { NameDescriptionStep } from "./steps/NameDescriptionStep";
import { AddRolesStep } from "./steps/AddRolesStep";
import { ConfirmationStep } from "./steps/ConfirmationStep";

interface CreateDepartmentWizardProps {
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export const CreateDepartmentWizard: React.FC<CreateDepartmentWizardProps> = ({
  onClose,
  onSuccess,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CreateDepartmentData>({
    name: "",
    description: "",
    selectedRoles: [],
  });

  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    roles?: string;
  }>({});

  const rolesApi = useApi<Role[]>();
  const createDepartmentApi = useApi<unknown>();

  const steps = [
    {
      id: 1,
      title: "Name & Description",
      completed: currentStep > 1,
      current: currentStep === 1,
    },
    {
      id: 2,
      title: "Add Roles",
      completed: currentStep > 2,
      current: currentStep === 2,
    },
    {
      id: 3,
      title: "Confirmation",
      completed: false,
      current: currentStep === 3,
    },
  ];

  useEffect(() => {
    if (currentStep === 2 && !rolesApi.data && !rolesApi.loading) {
      fetchRoles();
    }
  }, [currentStep]);

  const fetchRoles = async () => {
    try {
      await rolesApi.execute(() => api.getRoles());
    } catch (error) {
      alert(error || "Failed to fetch roles");
      // Error is handled by the hook
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: typeof errors = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Department name is required";
      }
      if (!formData.description.trim()) {
        newErrors.description = "Department description is required";
      }
    }

    if (step === 2) {
      if (formData.selectedRoles.length === 0) {
        newErrors.roles = "At least one role must be selected";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFieldChange = (field: "name" | "description", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAddRole = (role: Role) => {
    if (!formData.selectedRoles.some((r) => r.id === role.id)) {
      setFormData((prev) => ({
        ...prev,
        selectedRoles: [...prev.selectedRoles, role],
      }));
      // Clear roles error
      if (errors.roles) {
        setErrors((prev) => ({ ...prev, roles: undefined }));
      }
    }
  };

  const handleRemoveRole = (roleId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedRoles: prev.selectedRoles.filter((r) => r.id !== roleId),
    }));
  };

  const handleFinish = async () => {
    if (!validateStep(3)) return;

    try {
      const result = await createDepartmentApi.execute(() =>
        api.createDepartment(formData)
      );
      onSuccess(result.message || "Department created successfully!");
      onClose();
    } catch (error) {
      alert(error || "Failed to create department");
      // Error is handled by the hook and displayed in UI
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <NameDescriptionStep
            name={formData.name}
            description={formData.description}
            errors={errors}
            onChange={handleFieldChange}
          />
        );
      case 2:
        return (
          <AddRolesStep
            availableRoles={rolesApi.data || []}
            selectedRoles={formData.selectedRoles}
            loading={rolesApi.loading}
            error={rolesApi.error}
            onAddRole={handleAddRole}
            onRemoveRole={handleRemoveRole}
            onRetryFetch={fetchRoles}
          />
        );
      case 3:
        return <ConfirmationStep data={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full mx-auto p-2 sm:p-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between p-2 sm:p-8 border-b">
            <h1 className="text-2xl font-semibold text-gray-900">
              {currentStep === 3 ? "Create a Team" : "Create Department"}
            </h1>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="py-6 px-3 sm:py-8 sm:px-8">
            <ProgressIndicator steps={steps} />

            {renderStepContent()}

            {errors.roles && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{errors.roles}</p>
              </div>
            )}

            {createDepartmentApi.error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">
                  {createDepartmentApi.error}
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center p-6 bg-gray-50 border-t">
            <Button
              variant="outline"
              onClick={currentStep === 1 ? onClose : handleBack}
            >
              {currentStep === 1 ? "CANCEL" : "BACK"}
            </Button>

            <Button
              onClick={currentStep === 3 ? handleFinish : handleNext}
              loading={createDepartmentApi.loading}
              disabled={currentStep === 2 && rolesApi.loading}
            >
              {currentStep === 3 ? "FINISH" : "NEXT"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
