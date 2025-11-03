import React from "react";
import { Calendar, Activity, Pill, Syringe, ClipboardList } from "lucide-react";
import MedicalSection from "./MedicalSection"; // Importa el componente
import type { UserData } from "@/types/dashboard/user";
import type {
  MedicalData,
  Appointment, // Importa tus tipos específicos
  Surgery,
  ChronicCondition,
  Medication,
  Vaccine,
} from "@/types/dashboard/medicalData";
import { getLocalDateTime } from "@/lib/utils";

interface MedicalSectionsConfigArgs {
  isLoading: boolean;
  isPinValidated: boolean;
  userBaseData?: UserData;
  userMedicalData?: MedicalData;
  sortedAppointments: Appointment[];
}

/**
 * Generates an array of <MedicalSection /> components ready to render.
 */
export const getMedicalSections = ({
  isLoading,
  isPinValidated,
  userBaseData,
  userMedicalData,
  sortedAppointments,
}: MedicalSectionsConfigArgs): React.ReactNode[] => {
  const commonProps = {
    shouldLock: true,
    isLocked: !isPinValidated,
    userPk: userBaseData?.pk || "",
    isLoading: isLoading,
  };

  return [
    <MedicalSection<Appointment>
      key="Citas Previas"
      {...commonProps}
      icon={<Calendar className="w-5 h-5 text-blue-600" />}
      title="Citas Previas"
      description="Visitas médicas recientes"
      bgColor="bg-blue-50"
      items={sortedAppointments}
      renderItem={(visit) => (
        <div key={visit.pk}>
          <div className="flex items-start justify-between mb-1">
            <p className="font-semibold text-slate-900">{visit.reason}</p>
            <span className="text-xs text-slate-500">
              {getLocalDateTime(visit.appointmentDate, ["es-CO"], true)}
            </span>
          </div>
          <p className="text-sm text-slate-700 mb-1">{visit.doctorName}</p>
          <p className="text-sm text-slate-600">{visit.notes}</p>
        </div>
      )}
    />,

    <MedicalSection<Surgery>
      key="Cirugías"
      {...commonProps}
      icon={<Activity className="w-5 h-5 text-rose-600" />}
      title="Cirugías"
      description="Historial quirúrgico"
      bgColor="bg-rose-50"
      items={userMedicalData?.surgeries || []}
      renderItem={(surgery) => (
        <div key={surgery.pk}>
          <div className="flex items-start justify-between mb-1">
            <p className="font-semibold text-slate-900">{surgery.name}</p>
            <span className="text-xs text-slate-500">
              {surgery.date && getLocalDateTime(surgery.date, ["es-CO"], true)}
            </span>
          </div>
          <p className="text-sm text-slate-700">{surgery.notes}</p>
        </div>
      )}
    />,

    <MedicalSection<ChronicCondition>
      key="Condiciones Crónicas"
      {...commonProps}
      icon={<ClipboardList className="w-5 h-5 text-teal-600" />}
      title="Condiciones Crónicas"
      description="Condiciones de salud en curso"
      bgColor="bg-teal-50"
      items={userMedicalData?.chronicConditions || []}
      renderItem={(condition) => (
        <div key={condition.pk}>
          <div className="flex items-start justify-between mb-1">
            <p className="font-semibold text-slate-900">{condition.name}</p>
          </div>
          <p className="text-sm text-slate-600 mb-1">
            Diagnosticado:{" "}
            {condition.diagnosisDate &&
              getLocalDateTime(condition.diagnosisDate, ["es-CO"], true)}
          </p>
          <p className="text-sm text-slate-700">{condition.notes}</p>
        </div>
      )}
    />,

    <MedicalSection<Medication>
      key="Medicamentos"
      {...commonProps}
      icon={<Pill className="w-5 h-5 text-cyan-600" />}
      title="Medicamentos"
      description="Prescripciones actuales"
      bgColor="bg-cyan-50"
      items={userMedicalData?.medications || []}
      renderItem={(med) => (
        <div key={med.pk}>
          <p className="font-semibold text-slate-900 mb-1">{med.name}</p>
          <p className="text-sm text-slate-700 mb-0.5">
            {med.dosage} - {med.frequency}
          </p>
          <p className="text-sm text-slate-600">
            Desde{" "}
            {med.startDate && getLocalDateTime(med.startDate, ["es-CO"], true)}{" "}
            hasta{" "}
            {med.endDate
              ? getLocalDateTime(med.endDate, ["es-CO"], true)
              : "Presente"}
          </p>
          {med.notes && (
            <p className="text-sm text-slate-600">Notas: {med.notes}</p>
          )}
        </div>
      )}
    />,

    <MedicalSection<Vaccine>
      key="Vacunas"
      {...commonProps}
      icon={<Syringe className="w-5 h-5 text-violet-600" />}
      title="Vacunas"
      description="Registros de inmunización"
      bgColor="bg-violet-50"
      items={userMedicalData?.vaccines || []}
      renderItem={(vaccine) => (
        <div key={vaccine.pk}>
          <div className="flex items-start justify-between mb-1">
            <p className="font-semibold text-slate-900">{vaccine.name}</p>
            <span className="text-xs text-slate-500">
              {vaccine.vaccinationDate &&
                getLocalDateTime(vaccine.vaccinationDate, ["es-CO"], true)}
            </span>
          </div>
          <p className="text-sm text-slate-700 mb-0.5">{vaccine.doseNumber}</p>
          {vaccine.notes && (
            <p className="text-sm text-slate-600">Notas: {vaccine.notes}</p>
          )}
        </div>
      )}
    />,
  ];
};
