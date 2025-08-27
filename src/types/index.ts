export interface Role {
  id: string;
  name: string;
  department: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  roles: Role[];
}

export interface CreateDepartmentData {
  name: string;
  description: string;
  selectedRoles: Role[];
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}