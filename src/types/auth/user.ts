export interface User {
  pk: string;
  email: string;
  name: string;
  lastName?: string;
  createdAt: string;
  updatedAt: string;
  role: UserRole;
  idDocType: IdDocType;
  idNumber: string;
}

type UserRole = "admin" | "doctor" | "patient";
type IdDocType = "IdenityCard" | "DNI";
