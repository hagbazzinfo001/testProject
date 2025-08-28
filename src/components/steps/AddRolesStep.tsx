import React, { useState, useMemo } from "react";
import { Search, Filter, Trash2 } from "lucide-react";
import { Role } from "../../types";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { ErrorMessage } from "../ui/ErrorMessage";

interface AddRolesStepProps {
  availableRoles: Role[];
  selectedRoles: Role[];
  loading: boolean;
  error: string | null;
  onAddRole: (role: Role) => void;
  onRemoveRole: (roleId: string) => void;
  onRetryFetch: () => void;
}

export const AddRolesStep: React.FC<AddRolesStepProps> = ({
  availableRoles,
  selectedRoles,
  loading,
  error,
  onAddRole,
  onRemoveRole,
  onRetryFetch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const departments = useMemo(() => {
    const depts = Array.from(
      new Set(availableRoles.map((role) => role.department))
    );
    return depts.filter((dept) => dept && dept.trim() !== "");
  }, [availableRoles]);

  const filteredRoles = useMemo(() => {
    return availableRoles
      .filter(
        (role) => !selectedRoles.some((selected) => selected.id === role.id)
      )
      .filter((role) => {
        const matchesSearch = role.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesDepartment =
          !departmentFilter || role.department === departmentFilter;
        return matchesSearch && matchesDepartment;
      });
  }, [availableRoles, selectedRoles, searchTerm, departmentFilter]);

  const resetFilters = () => {
    setSearchTerm("");
    setDepartmentFilter("");
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading roles..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetryFetch} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Add Roles</h2>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="relative">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Filter</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>

          {(searchTerm || departmentFilter) && (
            <Button variant="outline" onClick={resetFilters}>
              RESET FILTERS
            </Button>
          )}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Roles */}
          <div>
            <div className=" p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Available</h3>
              <p className="text-sm text-gray-600">
                {filteredRoles.length} Role(s)
              </p>
            </div>

            <div className="mt-4 space-y-2 border border-gray-200 rounded-lg">
              <div className=" bg-gray-50 grid grid-cols-3 gap-4 p-2 border-b text-sm font-medium text-gray-500">
                <span>Role</span>
                <span>On Department(s)</span>
                <span></span>
              </div>

              {filteredRoles.map((role) => (
                <div
                  key={role.id}
                  className="grid grid-cols-3 gap-4 items-center py-2 px-3 border-b border-gray-100"
                >
                  <span className="text-gray-900">{role.name}</span>
                  <span className="text-gray-600">{role.department}</span>
                  <Button
                    size="sm"
                    onClick={() => onAddRole(role)}
                    className="justify-self-end"
                  >
                    ADD
                  </Button>
                </div>
              ))}

              {filteredRoles.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No roles found matching your criteria
                </div>
              )}
            </div>
          </div>

          {/* Selected Roles */}
          <div>
            <div className=" p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">
                In Product Department
              </h3>
              <p className="text-sm text-gray-600">
                {selectedRoles.length} Role(s)
              </p>
            </div>

            <div className="mt-4 space-y-2 border border-gray-200 rounded-lg">
              <div className="bg-gray-50 grid grid-cols-3 gap-4 p-2 border-b text-sm font-medium text-gray-500  ">
                <span>Name</span>
                <span>On Department(s)</span>
                <span></span>
              </div>
              {selectedRoles.length > 0 ? (
                <>
                  {selectedRoles.map((role) => (
                    <div
                      key={role.id}
                      className="grid grid-cols-3 gap-4 items-center py-2 px-3 border-b border-gray-100"
                    >
                      <span className="text-gray-900">{role.name}</span>
                      <span className="text-gray-600">-</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRemoveRole(role.id)}
                        className="justify-self-end text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">
                    You currently don't have any roles in the Department.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
