import {
  User,
  AlertCircle,
  Calendar,
  Activity,
  Pill,
  Syringe,
  ClipboardList,
  MapIcon,
} from "lucide-react";
import InfoCard from "@/components/pages/ViewData/InfoCard";
import MedicalSection from "@/components/pages/ViewData/MedicalSection";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import type { UserData } from "@/types/dashboard/user";
import {
  UserBloodTypeOptions,
  type MedicalData,
} from "@/types/dashboard/medicalData";
import { getUser } from "@/actions/dashboard/user";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getAgeFromBirthdate,
  getEnumValue,
  getLocalDateTime,
} from "@/lib/utils";
import { useValidatePinStore } from "@/store/medicalData/useValidatePinStore";
import PinSessionTimerDisplay from "@/components/pages/ViewData/PinSessionTimerDisplay";
import MedicalPageHeader from "@/components/pages/ViewData/MedicalPageHeader";
import { CopyButton } from "@/components/blocks/CopyBtn";

export default function MedicalDashboard() {
  const params = useParams();
  const pk = params.pk as string;
  const [isLoading, setIsLoading] = useState(false);
  const [userBaseData, setUserBaseData] = useState<UserData>();
  const [userMedicalData, setUserMedicalData] = useState<MedicalData>();
  const isPinValidated = useValidatePinStore((state) => state.isPinValidated);

  const accessUrl = import.meta.env.VITE_DOMAIN_URL + "/viewData/" + pk;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Mild":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Moderate":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "Severe":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getUser(pk);
      setUserBaseData(res.data.user);
      setUserMedicalData(res.data.medicalData);
      setIsLoading(false);
    };
    fetchData();
  }, [pk]);

  return (
    <div className="min-h-screen">
      <MedicalPageHeader isLoading={isLoading} userBaseData={userBaseData} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-end gap-6 flex-wrap mb-6">
          <CopyButton textToCopy={accessUrl} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <InfoCard
            icon={<User className="w-5 h-5" />}
            title="Tipo de Sangre"
            description={getEnumValue(
              UserBloodTypeOptions,
              userMedicalData?.bloodType || ""
            )}
            bgColor="bg-red-50"
            iconColor="text-red-600"
            isLoading={isLoading}
          />
          <InfoCard
            icon={<MapIcon className="w-5 h-5" />}
            title="País, Ciudad"
            description={
              userMedicalData?.country + ", " + userMedicalData?.city
            }
            bgColor="bg-emerald-50"
            iconColor="text-emerald-600"
            isLoading={isLoading}
          />
          <InfoCard
            icon={<Calendar className="w-5 h-5" />}
            title="Fecha de Nacimiento"
            description={
              getLocalDateTime(
                userMedicalData?.dateOfBirth || "",
                ["es-CO"],
                true
              ) +
              ` (${getAgeFromBirthdate(
                userMedicalData?.dateOfBirth || ""
              )} años)`
            }
            bgColor="bg-blue-50"
            iconColor="text-blue-600"
            isLoading={isLoading}
          />
        </div>

        <PinSessionTimerDisplay />

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <User className="w-5 h-5 text-slate-700" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Información General
              </h2>
              <p className="text-sm text-slate-500">
                Detalles personales e información de contacto
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                Nombre Completo
              </p>
              {isLoading ? (
                <Skeleton className="h-5 w-48 rounded-md" />
              ) : (
                <p className="text-slate-900 font-medium">
                  {userBaseData?.name} {userBaseData?.lastName}
                </p>
              )}
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                Correo Electrónico
              </p>
              {isLoading ? (
                <Skeleton className="h-5 w-48 rounded-md" />
              ) : (
                <p className="text-slate-900 font-medium">
                  {userBaseData?.email}
                </p>
              )}
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                Teléfono
              </p>
              {isLoading ? (
                <Skeleton className="h-5 w-48 rounded-md" />
              ) : (
                <p className="text-slate-900 font-medium">
                  {userMedicalData?.phone}
                </p>
              )}
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                Dirección
              </p>
              {isLoading ? (
                <Skeleton className="h-5 w-48 rounded-md" />
              ) : (
                <p className="text-slate-900 font-medium">
                  {userMedicalData?.address}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MedicalSection
            icon={<AlertCircle className="w-5 h-5 text-amber-600" />}
            title="Alergias"
            description="Alergias y reacciones conocidas"
            bgColor="bg-amber-50"
            items={userMedicalData?.allergies || []}
            shouldLock={false}
            isLocked={!isPinValidated}
            isLoading={isLoading}
            userPk={userBaseData?.pk || ""}
            renderItem={(allergy) => (
              <div key={allergy.pk}>
                <div className="flex items-start justify-between mb-1">
                  <p className="font-semibold text-slate-900">{allergy.name}</p>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${getSeverityColor(
                      allergy.severity
                    )}`}
                  >
                    {allergy.severity}
                  </span>
                </div>
                <p className="text-sm text-slate-600">{allergy.reaction}</p>
              </div>
            )}
          />

          <MedicalSection
            icon={<Calendar className="w-5 h-5 text-blue-600" />}
            title="Citas Previas"
            description="Visitas médicas recientes"
            bgColor="bg-blue-50"
            items={
              userMedicalData?.appointments.sort(
                (a, b) =>
                  new Date(b.appointmentDate).getTime() -
                  new Date(a.appointmentDate).getTime()
              ) || []
            }
            shouldLock={true}
            isLocked={!isPinValidated}
            userPk={userBaseData?.pk || ""}
            isLoading={isLoading}
            renderItem={(visit) => (
              <div key={visit.pk}>
                <div className="flex items-start justify-between mb-1">
                  <p className="font-semibold text-slate-900">{visit.reason}</p>
                  <span className="text-xs text-slate-500">
                    {getLocalDateTime(visit.appointmentDate, ["es-CO"], true)}
                  </span>
                </div>
                <p className="text-sm text-slate-700 mb-1">
                  {visit.doctorName}
                </p>
                <p className="text-sm text-slate-600">{visit.notes}</p>
              </div>
            )}
          />

          <MedicalSection
            icon={<Activity className="w-5 h-5 text-rose-600" />}
            title="Cirugías"
            description="Historial quirúrgico"
            bgColor="bg-rose-50"
            items={userMedicalData?.surgeries || []}
            shouldLock={true}
            isLocked={!isPinValidated}
            userPk={userBaseData?.pk || ""}
            isLoading={isLoading}
            renderItem={(surgery) => (
              <div key={surgery.pk}>
                <div className="flex items-start justify-between mb-1">
                  <p className="font-semibold text-slate-900">{surgery.name}</p>
                  <span className="text-xs text-slate-500">
                    {surgery.date &&
                      getLocalDateTime(surgery.date, ["es-CO"], true)}
                  </span>
                </div>
                <p className="text-sm text-slate-700">{surgery.notes}</p>
              </div>
            )}
          />

          <MedicalSection
            icon={<ClipboardList className="w-5 h-5 text-teal-600" />}
            title="Condiciones Crónicas"
            description="Condiciones de salud en curso"
            bgColor="bg-teal-50"
            items={userMedicalData?.chronicConditions || []}
            shouldLock={true}
            isLocked={!isPinValidated}
            userPk={userBaseData?.pk || ""}
            isLoading={isLoading}
            renderItem={(condition) => (
              <div key={condition.pk}>
                <div className="flex items-start justify-between mb-1">
                  <p className="font-semibold text-slate-900">
                    {condition.name}
                  </p>
                </div>
                <p className="text-sm text-slate-600 mb-1">
                  Diagnosticado:{" "}
                  {condition.diagnosisDate &&
                    getLocalDateTime(condition.diagnosisDate, ["es-CO"], true)}
                </p>
                <p className="text-sm text-slate-700">{condition.notes}</p>
              </div>
            )}
          />

          <MedicalSection
            icon={<Pill className="w-5 h-5 text-cyan-600" />}
            title="Medicamentos"
            description="Prescripciones actuales"
            bgColor="bg-cyan-50"
            items={userMedicalData?.medications || []}
            shouldLock={true}
            isLocked={!isPinValidated}
            userPk={userBaseData?.pk || ""}
            isLoading={isLoading}
            renderItem={(med) => (
              <div key={med.pk}>
                <p className="font-semibold text-slate-900 mb-1">{med.name}</p>
                <p className="text-sm text-slate-700 mb-0.5">
                  {med.dosage} - {med.frequency}
                </p>
                <p className="text-sm text-slate-600">
                  Desde{" "}
                  {med.startDate &&
                    getLocalDateTime(med.startDate, ["es-CO"], true)}{" "}
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
          />

          <MedicalSection
            icon={<Syringe className="w-5 h-5 text-violet-600" />}
            title="Vacunas"
            description="Registros de inmunización"
            bgColor="bg-violet-50"
            items={userMedicalData?.vaccines || []}
            shouldLock={true}
            isLocked={!isPinValidated}
            userPk={userBaseData?.pk || ""}
            isLoading={isLoading}
            renderItem={(vaccine) => (
              <div key={vaccine.pk}>
                <div className="flex items-start justify-between mb-1">
                  <p className="font-semibold text-slate-900">{vaccine.name}</p>
                  <span className="text-xs text-slate-500">
                    {vaccine.vaccinationDate &&
                      getLocalDateTime(
                        vaccine.vaccinationDate,
                        ["es-CO"],
                        true
                      )}
                  </span>
                </div>
                <p className="text-sm text-slate-700 mb-0.5">
                  {vaccine.doseNumber}
                </p>
                {vaccine.notes && (
                  <p className="text-sm text-slate-600">
                    Notas: {vaccine.notes}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      </main>
    </div>
  );
}
