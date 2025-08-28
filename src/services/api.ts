import { Role, Department, CreateDepartmentData, ApiResponse } from "../types";

// Mock data
const mockRoles: Role[] = [
  { id: "1", name: "Finance Manager", department: "Accounting" },
  { id: "2", name: "Accountant", department: "Accounting" },
  { id: "3", name: "Engineering Manager", department: "Engineering" },
  { id: "4", name: "Software Engineer", department: "Engineering" },
  { id: "5", name: "QA Engineer", department: "Engineering" },
  { id: "6", name: "DevOps Engineer", department: "Engineering" },
  { id: "7", name: "Billing Specialist", department: "Accounting" },
  { id: "8", name: "Product Manager", department: "Product" },
  { id: "9", name: "Product Designer", department: "Product" },
  { id: "10", name: "UX Researcher", department: "Product" },
];

const mockDepartments: Department[] = [
  {
    id: "1",
    name: "Engineering",
    description: "Software development and technical operations",
    roles: [mockRoles[2], mockRoles[3], mockRoles[4]],
  },
  {
    id: "2",
    name: "Product",
    description:
      "Product department is responsible for defining the vision, strategy, and roadmap of the company's digital products. The team collaborates closely with engineering, design, and customer-facing departments to ensure product-market fit and long-term value.",
    roles: [mockRoles[7], mockRoles[8], mockRoles[9]],
  },
  {
    id: "3",
    name: "Accounting",
    description:
      "Handles financial records, invoicing, budgeting, and compliance to ensure the company's financial health and regulatory adherence.",
    roles: [mockRoles[0], mockRoles[1], mockRoles[6]],
  },
  {
    id: "4",
    name: "Marketing",
    description:
      "Drives brand awareness, customer engagement, and lead generation through strategic campaigns and market analysis.",
    roles: [],
  },
  {
    id: "5",
    name: "Support",
    description:
      "Provides timely assistance to customers and internal teams, resolving issues and ensuring a positive user experience.",
    roles: [],
  },
];

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  // Fetch all available roles
  async getRoles(): Promise<ApiResponse<Role[]>> {
    await delay(800);

    // Simulate occasional API errors
    if (Math.random() < 0.1) {
      throw new Error("Failed to fetch roles");
    }

    return {
      data: mockRoles,
      success: true,
    };
  },

  // Create a new department
  async createDepartment(
    departmentData: CreateDepartmentData
  ): Promise<ApiResponse<Department>> {
    await delay(1200);

    // Simulate validation errors
    if (!departmentData.name.trim()) {
      throw new Error("Department name is required");
    }

    if (departmentData.selectedRoles.length === 0) {
      throw new Error("At least one role must be selected");
    }

    // Simulate occasional API errors
    if (Math.random() < 0.15) {
      throw new Error("Failed to create department. Please try again.");
    }

    const newDepartment: Department = {
      id: Date.now().toString(),
      name: departmentData.name,
      description: departmentData.description,
      roles: departmentData.selectedRoles,
    };

    mockDepartments.push(newDepartment);

    return {
      data: newDepartment,
      success: true,
      message: "Department created successfully!",
    };
  },

  // Get all departments
  async getDepartments(): Promise<ApiResponse<Department[]>> {
    await delay(600);

    return {
      data: mockDepartments,
      success: true,
    };
  },

  // Get a single department by ID
  async getDepartment(id: string): Promise<ApiResponse<Department>> {
    await delay(400);

    const department = mockDepartments.find((dept) => dept.id === id);

    if (!department) {
      throw new Error("Department not found");
    }

    return {
      data: department,
      success: true,
    };
  },

  // Update a department
  async updateDepartment(
    id: string,
    updateData: { name: string; description: string }
  ): Promise<ApiResponse<Department>> {
    await delay(800);

    // Simulate validation errors
    if (!updateData.name.trim()) {
      throw new Error("Department name is required");
    }

    if (!updateData.description.trim()) {
      throw new Error("Department description is required");
    }

    // Simulate occasional API errors
    if (Math.random() < 0.1) {
      throw new Error("Failed to update department. Please try again.");
    }

    const departmentIndex = mockDepartments.findIndex((dept) => dept.id === id);

    if (departmentIndex === -1) {
      throw new Error("Department not found");
    }

    mockDepartments[departmentIndex] = {
      ...mockDepartments[departmentIndex],
      name: updateData.name,
      description: updateData.description,
    };

    return {
      data: mockDepartments[departmentIndex],
      success: true,
      message: "Department updated successfully!",
    };
  },

  // Delete a department
  async deleteDepartment(id: string): Promise<ApiResponse<void>> {
    await delay(600);

    // Simulate occasional API errors
    if (Math.random() < 0.1) {
      throw new Error("Failed to delete department. Please try again.");
    }

    const departmentIndex = mockDepartments.findIndex((dept) => dept.id === id);

    if (departmentIndex === -1) {
      throw new Error("Department not found");
    }

    mockDepartments.splice(departmentIndex, 1);

    return {
      data: undefined,
      success: true,
      message: "Department deleted successfully!",
    };
  },
};
