import React, { useState } from "react";
import { Plus } from "lucide-react";
import { CreateDepartmentWizard } from "./components/CreateDepartmentWizard";
import { DepartmentManagement } from "./components/DepartmentManagement";
import { DepartmentDetails } from "./components/DepartmentDetails";
import { SuccessNotification } from "./components/SuccessNotification";
import { Button } from "./components/ui/Button";

function App() {
  const [currentView, setCurrentView] = useState<
    "home" | "departments" | "wizard" | "details"
  >("home");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    string | null
  >(null);

  const handleSuccess = (message: string) => {
    setSuccessMessage(message);
    setCurrentView("departments");
  };

  const closeSuccessNotification = () => {
    setSuccessMessage(null);
  };

  const handleCreateDepartment = () => {
    setCurrentView("wizard");
  };

  const handleCloseWizard = () => {
    setCurrentView("home");
  };

  const handleViewDepartments = () => {
    setCurrentView("departments");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
  };

  const handleManageDepartment = (departmentId: string) => {
    setSelectedDepartmentId(departmentId);
    setCurrentView("details");
  };

  const handleBackToDepartments = () => {
    setSelectedDepartmentId(null);
    setCurrentView("departments");
  };

  const handleDepartmentUpdate = (message: string) => {
    setSuccessMessage(message);
  };

  const handleDepartmentDelete = (message: string) => {
    setSuccessMessage(message);
    setCurrentView("departments");
  };

  if (currentView === "details" && selectedDepartmentId) {
    return (
      <>
        <DepartmentDetails
          departmentId={selectedDepartmentId}
          onBack={handleBackToDepartments}
          onUpdate={handleDepartmentUpdate}
          onDelete={handleDepartmentDelete}
        />
        {successMessage && (
          <SuccessNotification
            message={successMessage}
            onClose={closeSuccessNotification}
          />
        )}
      </>
    );
  }

  if (currentView === "departments") {
    return (
      <>
        <DepartmentManagement
          onBack={handleBackToHome}
          onAddDepartment={handleCreateDepartment}
          onManageDepartment={handleManageDepartment}
        />
        {successMessage && (
          <SuccessNotification
            message={successMessage}
            onClose={closeSuccessNotification}
          />
        )}
      </>
    );
  }

  if (currentView === "wizard") {
    return (
      <>
        <CreateDepartmentWizard
          onClose={handleCloseWizard}
          onSuccess={handleSuccess}
        />
        {successMessage && (
          <SuccessNotification
            message={successMessage}
            onClose={closeSuccessNotification}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <div className="w-full bg-gray-50"> */}
      <div className="w-full mx-auto p-4 sm:p-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Lytical Department Management System
            </h1>
            <p className="text-gray-600 mb-8">
              Create and manage departments with roles and team members
            </p>

            <div className="flex gap-4 justify-center">
              <Button onClick={handleCreateDepartment}>
                <Plus className="w-5 h-5 mr-2" />
                Create Department
              </Button>

              <Button variant="outline" onClick={handleViewDepartments}>
                View Departments
              </Button>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">
                  IT Consulting & Advisory{" "}
                </h3>
                <p className="text-blue-700 text-sm">
                  Our IT and Advisory team designs and executes
                  industry-relevant solutions that allow organizations to
                  realize exceptional business value from technology.
                </p>
              </div>

              <div className="p-6 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">
                  Data Management & Analytics
                </h3>
                <p className="text-green-700 text-sm">
                  We help businesses realize the true potential of their data
                  through our data management & analytics services, helping them
                  make crucial business decisions.
                </p>
              </div>

              <div className="p-6 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">
                  Mobile App. Development
                </h3>
                <p className="text-purple-700 text-sm">
                  Our mobile app development team will help you create practical
                  and seamless experiences on any device and get the best of
                  mobile technology for your business.
                </p>
              </div>

              <div className="p-6 bg-lime-50 rounded-lg">
                <h3 className="font-semibold text-lime-900 mb-2">
                  Desktop Software Development
                </h3>
                <p className="text-lime-700 text-sm">
                  We create custom desktop applications for various industries.
                  Our apps bring your business the ability to create customized
                  features and functionality to tackle your unique business
                  challenges.
                </p>
              </div>
              <div className="p-6 bg-teal-50 rounded-lg">
                <h3 className="font-semibold text-teal-900 mb-2">
                  Desktop Software Development
                </h3>
                <p className="text-teal-700 text-sm">
                  We create custom desktop applications for various industries.
                  Our apps bring your business the ability to create customized
                  features and functionality to tackle your unique business
                  challenges.
                </p>
              </div>
              <div className="p-6 bg-amber-50 rounded-lg">
                <h3 className="font-semibold text-amber-900 mb-2">
                  Desktop Software Development
                </h3>
                <p className="text-amber-700 text-sm">
                  We create custom desktop applications for various industries.
                  Our apps bring your business the ability to create customized
                  features and functionality to tackle your unique business
                  challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {successMessage && (
        <SuccessNotification
          message={successMessage}
          onClose={closeSuccessNotification}
        />
      )}
    </div>
  );
}

export default App;
