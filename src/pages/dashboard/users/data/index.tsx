import { getUser } from "@/actions/dashboard/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/auth/useAuthStore";
import type { UserData } from "@/types/dashboard/user";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import CreateUserMedicalData from "./Create";
import type { MedicalData } from "@/types/dashboard/medicalData";
import { getEnumValue, getLocalDateTime } from "@/lib/utils";
import { UserBloodType, UserSexOptions } from "@/schemas/dashboard/medicalData";
import { CopyButton } from "@/components/blocks/CopyBtn";
import AllergiesPage from "./Allegies";
import AppointmentsPage from "./Appointments";
import SurgeriesPage from "./Surgeries";
import ChronicConditionsPage from "./ChronicConditions";
import MedicationsPage from "./Medications";
import VaccinesPage from "./Vaccines";

function ManageUserData() {
  const currentUser = useAuthStore((state) => state.user);
  const params = useParams();
  const { pk } = params;
  const [userBaseData, setUserBaseData] = useState<UserData>();
  const [userMedicalData, setUserMedicalData] = useState<MedicalData>();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const res = await getUser(pk || "");
    setUserBaseData(res.data.user);
    setUserMedicalData(res.data.medicalData);
    setIsLoading(false);
  }, [pk]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading || !userBaseData) {
    return (
      <div className="flex items-center justify-center h-full w-full gap-2">
        <Loader size="md" />
        <span>Cargando...</span>
      </div>
    );
  }

  return (
    <section className="container mx-auto py-6">
      <Card className="py-0">
        <CardHeader className="bg-slate-50 py-4 flex justify-between items-start">
          <section>
            <CardTitle className="text-2xl">Expediente Médico</CardTitle>
            <CardDescription>
              {pk === currentUser?.pk
                ? "Mi información médica completa"
                : "Información médica completa del paciente"}
              <div>
                <span>Nombre: </span>
                <span>
                  <strong>
                    {userBaseData.name} {userBaseData.lastName}
                  </strong>
                </span>
              </div>
              <div>
                <span>Correo electrónico: </span>
                <span>
                  <strong>{userBaseData.email}</strong>
                </span>
              </div>
            </CardDescription>
          </section>
          <CopyButton textToCopy="sfas" />
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex justify-between ga-4 flex-wrap mb-6 w-full">
              <TabsTrigger value="general">Información General</TabsTrigger>
              <TabsTrigger value="allergies">Alergias</TabsTrigger>
              <TabsTrigger value="appointments">Citas previas</TabsTrigger>
              <TabsTrigger value="surgeries">Cirugías</TabsTrigger>
              <TabsTrigger value="conditions">Condiciones Crónicas</TabsTrigger>
              <TabsTrigger value="medications">Medicamentos</TabsTrigger>
              <TabsTrigger value="vaccines">Vacunas</TabsTrigger>
            </TabsList>

            {/* Información General */}
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between gap-4">
                    <span>Datos Generales</span>
                    {!userMedicalData && (
                      <CreateUserMedicalData
                        user={userBaseData}
                        fetchData={fetchData}
                      />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {userMedicalData ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium">
                            Fecha de Nacimiento:
                          </span>
                          <span>
                            {getLocalDateTime(
                              userMedicalData.dateOfBirth,
                              ["es-co"],
                              true
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium">Tipo de Sangre:</span>
                          <span>
                            {getEnumValue(
                              UserBloodType,
                              userMedicalData.bloodType
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium">Sexo:</span>
                          <span>
                            {getEnumValue(UserSexOptions, userMedicalData.sex)}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium">País:</span>
                          <span>{userMedicalData.country}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium">Ciudad:</span>
                          <span>{userMedicalData.city}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium">Dirección:</span>
                          <span>{userMedicalData.address}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium">Teléfono:</span>
                          <span>{userMedicalData.phone}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium">
                            Contacto de Emergencia:
                          </span>
                          <span>{userMedicalData.emergencyContactName}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium">
                            Teléfono de Emergencia:
                          </span>
                          <span>{userMedicalData.emergencyContactPhone}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>No existen datos</>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Alergias */}
            <TabsContent value="allergies">
              <AllergiesPage
                patientDataPk={userMedicalData?.pk}
                allergiesData={userMedicalData?.allergies}
              />
            </TabsContent>

            {/* Citas previas */}
            <TabsContent value="appointments">
              <AppointmentsPage
                patientDataPk={userMedicalData?.pk}
                appointmentsData={userMedicalData?.appointments}
              />
            </TabsContent>

            {/* Cirugías */}
            <TabsContent value="surgeries">
              <SurgeriesPage
                patientDataPk={userMedicalData?.pk}
                surgeriesData={userMedicalData?.surgeries}
              />
            </TabsContent>

            {/* Condiciones Crónicas */}
            <TabsContent value="conditions">
              <ChronicConditionsPage
                patientDataPk={userMedicalData?.pk}
                chrConditionsData={userMedicalData?.chronicConditions}
              />
            </TabsContent>

            {/* Medicamentos */}
            <TabsContent value="medications">
              <MedicationsPage
                patientDataPk={userMedicalData?.pk}
                medicationsData={userMedicalData?.medications}
              />
            </TabsContent>

            {/* Vacunas */}
            <TabsContent value="vaccines">
              <VaccinesPage
                patientDataPk={userMedicalData?.pk}
                vaccinesData={userMedicalData?.vaccines}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}

export default ManageUserData;
