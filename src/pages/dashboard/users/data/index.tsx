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
import {
  UserBloodTypeOptions,
  UserSexOptions,
  type MedicalData,
} from "@/types/dashboard/medicalData";
import { getEnumValue, getLocalDateTime } from "@/lib/utils";
import { CopyButton } from "@/components/blocks/CopyBtn";
import AllergiesPage from "./Allegies";
import AppointmentsPage from "./Appointments";
import SurgeriesPage from "./Surgeries";
import ChronicConditionsPage from "./ChronicConditions";
import MedicationsPage from "./Medications";
import VaccinesPage from "./Vaccines";
import { Button } from "@/components/ui/button";
import { RefreshCwIcon } from "lucide-react";
import UpdateMedicalData from "./Update";

function ManageUserData() {
  const currentUser = useAuthStore((state) => state.user);
  const params = useParams();
  const pk = params.pk as string;
  const [userData, setUserData] = useState<UserData>();
  const [medicalData, setMedicalData] = useState<MedicalData>();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const res = await getUser(pk);
    setUserData(res.data.user);
    setMedicalData(res.data.medicalData);
    setIsLoading(false);
  }, [pk]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading || !userData) {
    return (
      <div className="flex items-center justify-center h-full w-full gap-2">
        <Loader size="md" />
        <span>Cargando...</span>
      </div>
    );
  }

  const accessUrl = import.meta.env.VITE_DOMAIN_URL + "/viewData/" + pk;

  return (
    <section className="container mx-auto py-6">
      <Card className="py-0">
        <CardHeader className="bg-blue-100 py-4 flex justify-between items-start">
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
                    {userData.name} {userData.lastName}
                  </strong>
                </span>
              </div>
              <div>
                <span>Correo electrónico: </span>
                <span>
                  <strong>{userData.email}</strong>
                </span>
              </div>
            </CardDescription>
          </section>
          <section className="flex gap-2 items-center">
            <CopyButton textToCopy={accessUrl} />
            <Button
              variant={"outline"}
              onClick={fetchData}
              className="flex items-center gap-2"
            >
              <RefreshCwIcon />
              <span>Recargar</span>
            </Button>
          </section>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex justify-between ga-4 flex-wrap mb-6 w-full bg-blue-200">
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
                    {!medicalData && (
                      <CreateUserMedicalData
                        user={userData}
                        fetchData={fetchData}
                      />
                    )}
                    {medicalData && (
                      <UpdateMedicalData
                        mediacalData={medicalData}
                        fetchData={fetchData}
                      />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {medicalData ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium">
                            Fecha de Nacimiento:
                          </span>
                          <span>
                            {getLocalDateTime(
                              medicalData.dateOfBirth,
                              ["es-CO"],
                              true
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium">Tipo de Sangre:</span>
                          <span>
                            {getEnumValue(
                              UserBloodTypeOptions,
                              medicalData.bloodType
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium">Sexo:</span>
                          <span>
                            {getEnumValue(UserSexOptions, medicalData.sex)}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium">País:</span>
                          <span>{medicalData.country}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium">Ciudad:</span>
                          <span>{medicalData.city}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium">Dirección:</span>
                          <span>{medicalData.address}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium">Teléfono:</span>
                          <span>{medicalData.phone}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium">
                            Contacto de Emergencia:
                          </span>
                          <span>{medicalData.emergencyContactName}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium">
                            Teléfono de Emergencia:
                          </span>
                          <span>{medicalData.emergencyContactPhone}</span>
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
                patientDataPk={medicalData?.pk}
                allergiesData={medicalData?.allergies}
                fetchData={fetchData}
              />
            </TabsContent>

            {/* Citas previas */}
            <TabsContent value="appointments">
              <AppointmentsPage
                patientDataPk={medicalData?.pk}
                appointmentsData={medicalData?.appointments}
                fetchData={fetchData}
              />
            </TabsContent>

            {/* Cirugías */}
            <TabsContent value="surgeries">
              <SurgeriesPage
                patientDataPk={medicalData?.pk}
                surgeriesData={medicalData?.surgeries}
                fetchData={fetchData}
              />
            </TabsContent>

            {/* Condiciones Crónicas */}
            <TabsContent value="conditions">
              <ChronicConditionsPage
                patientDataPk={medicalData?.pk}
                chrConditionsData={medicalData?.chronicConditions}
                fetchData={fetchData}
              />
            </TabsContent>

            {/* Medicamentos */}
            <TabsContent value="medications">
              <MedicationsPage
                patientDataPk={medicalData?.pk}
                medicationsData={medicalData?.medications}
                fetchData={fetchData}
              />
            </TabsContent>

            {/* Vacunas */}
            <TabsContent value="vaccines">
              <VaccinesPage
                patientDataPk={medicalData?.pk}
                vaccinesData={medicalData?.vaccines}
                fetchData={fetchData}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}

export default ManageUserData;
