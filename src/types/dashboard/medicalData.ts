// ===== Enums =====
export const UserSexOptions = {
  M: "Masculino",
  F: "Femenino",
  O: "Otro",
} as const;

export const UserBloodTypeOptions = {
  A_POS: "A+",
  A_NEG: "A-",
  B_POS: "B+",
  B_NEG: "B-",
  AB_POS: "AB+",
  AB_NEG: "AB-",
  O_POS: "O+",
  O_NEG: "O-",
} as const;

// ===== Type Definitions =====
export type UserSex = keyof typeof UserSexOptions;
export type UserBloodType = keyof typeof UserBloodTypeOptions;

// ===== API Response Interface =====
export interface MedicalData {
  bloodType: string;
  city: string;
  country: string;
  dateOfBirth: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  address: string;
  phone: string;
  pk: string;
  sex: string;
  userId: string;
  allergies: Allergy[];
  appointments: Appointment[];
  chronicConditions: ChronicCondition[];
  medications: Medication[];
  surgeries: Surgery[];
  vaccines: Vaccine[];
}

export type AllergySeverityType = "Mild" | "Moderate" | "Severe";

export interface Allergy {
  pk: string;
  name: string;
  reaction: string;
  severity: AllergySeverityType;
  notes?: string;
  updatedAt: string;
  createdAt: string;
  patientDataPk: string;
}

export interface Appointment {
  pk: string;
  reason?: string;
  diagnosis?: string;
  doctorName?: string;
  appointmentDate: string;
  notes?: string;
  createdAt: string;
  patientDataPk?: string;
}

export interface ChronicCondition {
  pk: string;
  name: string;
  diagnosisDate?: string;
  notes?: string;
  createdAt: string;
  patientDataPk?: string;
}

export interface Medication {
  pk: string;
  name: string;
  dosage: string;
  frequency?: string;
  startDate?: string;
  endDate?: string;
  notes?: string;
  createdAt: string;
  patientDataPk?: string;
}

export interface Surgery {
  pk: string;
  name: string;
  date?: string;
  notes?: string;
  createdAt: string;
  patientDataPk?: string;
}

export interface Vaccine {
  pk: string;
  name: string;
  doseNumber: number;
  vaccinationDate?: string;
  notes?: string;
  createdAt: string;
  patientDataPk?: string;
}
