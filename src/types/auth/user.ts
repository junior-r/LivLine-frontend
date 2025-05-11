export interface User {
  pk: string;
  email: string;
  name: string;
  lastName?: string;
  createdAt: string;
  updatedAt: string;
  role: UserRole;
}

type UserRole = "admin" | "doctor" | "patient";
