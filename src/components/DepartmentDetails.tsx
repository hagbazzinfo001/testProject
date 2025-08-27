import React, { useState, useEffect } from "react";
import { ArrowLeft, Edit2, Trash2, Save, X } from "lucide-react";
// import { Department, Role } from "../types";
import { Department } from "../types";

import { api } from "../services/api";
import { useApi } from "../hooks/useApi";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import { ErrorMessage } from "./ui/ErrorMessage";

interface DepartmentDetailsProps {
  departmentId: string;
  onBack: () => void;
  onUpdate: (message: string) => void;
  onDelete: (message: string) => void;
}

export const DepartmentDetails: React.FC<DepartmentDetailsProps> = ({
  departmentId,
  onBack,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
  }>({});

  const departmentApi = useApi<Department>();
  const updateApi = useApi<Department>();
  const deleteApi = useApi<void>();

  useEffect(() => {
    fetchDepartment();
  }, [departmentId]);

  const fetchDepartment = async () => {
    try {
      await departmentApi.execute(() => api.getDepartment(departmentId));
    } catch (error) {
      alert(error);
      // Error handled by hook
    }
  };

  const handleEdit = () => {
    if (departmentApi.data) {
      setEditData({
        name: departmentApi.data.name,
        description: departmentApi.data.description,
      });
      setIsEditing(true);
      setErrors({});
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({ name: "", description: "" });
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!editData.name.trim()) {
      newErrors.name = "Department name is required";
    }
    if (!editData.description.trim()) {
      newErrors.description = "Department description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      await updateApi.execute(() =>
        api.updateDepartment(departmentId, editData)
      );
      setIsEditing(false);
      onUpdate("Department updated successfully!");
      // Refresh department data
      await fetchDepartment();
    } catch (error) {
      alert(error);
      // Error handled by hook
    }
  };

  const handleDelete = async () => {
    try {
      await deleteApi.execute(() => api.deleteDepartment(departmentId));
      onDelete("Department deleted successfully!");
    } catch (error) {
      alert(error);
      setShowDeleteConfirm(false);
      // Error handled by hook
    }
  };

  const handleFieldChange = (field: "name" | "description", value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (departmentApi.loading) {
    return <LoadingSpinner size="lg" text="Loading department..." />;
  }

  if (departmentApi.error) {
    return (
      <ErrorMessage message={departmentApi.error} onRetry={fetchDepartment} />
    );
  }

  if (!departmentApi.data) {
    return (
      <ErrorMessage message="Department not found" onRetry={fetchDepartment} />
    );
  }

  const department = departmentApi.data;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
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
              {isEditing ? "Edit Department" : "Department Details"}
            </h1>
          </div>

          {!isEditing && (
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleEdit}>
                <Edit2 className="w-4 h-4 mr-2" />
                EDIT
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(true)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                DELETE
              </Button>
            </div>
          )}
        </div>

        {/* Department Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          {isEditing ? (
            <div className="space-y-6">
              <Input
                label="Department Name"
                value={editData.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                error={errors.name}
              />

              <Textarea
                label="Department Description"
                value={editData.description}
                onChange={(e) =>
                  handleFieldChange("description", e.target.value)
                }
                error={errors.description}
                maxLength={500}
                rows={6}
              />

              {updateApi.error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{updateApi.error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <Button onClick={handleSave} loading={updateApi.loading}>
                  <Save className="w-4 h-4 mr-2" />
                  SAVE CHANGES
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancelEdit}
                  disabled={updateApi.loading}
                >
                  <X className="w-4 h-4 mr-2" />
                  CANCEL
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {department.name}
                </h3>
                <p className="text-gray-600">{department.description}</p>
              </div>

              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-3">
                  Team Roles ({department.roles.length})
                </h4>
                {department.roles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {department.roles.map((role) => (
                      <div
                        key={role.id}
                        className="p-3 bg-gray-50 rounded-lg border"
                      >
                        <div className="font-medium text-gray-900">
                          {role.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {role.department}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No roles assigned to this department.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Delete Department
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{department.name}"? This action
                cannot be undone.
              </p>

              {deleteApi.error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{deleteApi.error}</p>
                </div>
              )}

              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={deleteApi.loading}
                >
                  CANCEL
                </Button>
                <Button
                  onClick={handleDelete}
                  loading={deleteApi.loading}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  DELETE
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
