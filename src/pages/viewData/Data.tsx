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
import type { UserData } from "@/types/dashboard/user";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { MedicalData } from "@/types/dashboard/medicalData";
import { getEnumValue, getLocalDateTime } from "@/lib/utils";
import { UserBloodType, UserSexOptions } from "@/schemas/dashboard/medicalData";
import { CopyButton } from "@/components/blocks/CopyBtn";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, RefreshCwIcon } from "lucide-react";
import AllergiesPage from "../dashboard/users/data/Allegies";
import AppointmentsPage from "../dashboard/users/data/Appointments";
import SurgeriesPage from "../dashboard/users/data/Surgeries";
import ChronicConditionsPage from "../dashboard/users/data/ChronicConditions";
import MedicationsPage from "../dashboard/users/data/Medications";
import VaccinesPage from "../dashboard/users/data/Vaccines";

function ViewDataPage() {
  const params = useParams();
  const pk = params.pk as string;
  const [userBaseData, setUserBaseData] = useState<UserData>();
  const [userMedicalData, setUserMedicalData] = useState<MedicalData>();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const res = await getUser(pk);
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

  const accessUrl = import.meta.env.VITE_DOMAIN_URL + "/viewData/" + pk;

  return (
    <section className="container mx-auto py-6">
      <Button
        variant={"outline"}
        className="flex items-center gap-2 w-fit mb-4"
        asChild
      >
        <Link to={"/viewData"}>
          <ArrowLeftIcon />
          <span>Volver</span>
        </Link>
      </Button>
      <Card className="py-0">
        <CardHeader className="bg-blue-100 py-4 flex justify-between gap-2 items-start">
          <section>
            <CardTitle className="text-2xl">Expediente Médico</CardTitle>
            <CardDescription>
              Información médica completa del paciente
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
          <section className="flex gap-2 items-center flex-wrap justify-end">
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
            <TabsList className="flex justify-between gap-4 flex-wrap h-auto mb-6 w-full bg-blue-200 overflow-auto">
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
                              ["es-CO"],
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
                fetchData={fetchData}
                canExecuteCrud={false}
              />
            </TabsContent>

            {/* Citas previas */}
            <TabsContent value="appointments">
              <AppointmentsPage
                patientDataPk={userMedicalData?.pk}
                appointmentsData={userMedicalData?.appointments}
                fetchData={fetchData}
                canExecuteCrud={false}
              />
            </TabsContent>

            {/* Cirugías */}
            <TabsContent value="surgeries">
              <SurgeriesPage
                patientDataPk={userMedicalData?.pk}
                surgeriesData={userMedicalData?.surgeries}
                fetchData={fetchData}
                canExecuteCrud={false}
              />
            </TabsContent>

            {/* Condiciones Crónicas */}
            <TabsContent value="conditions">
              <ChronicConditionsPage
                patientDataPk={userMedicalData?.pk}
                chrConditionsData={userMedicalData?.chronicConditions}
                fetchData={fetchData}
                canExecuteCrud={false}
              />
            </TabsContent>

            {/* Medicamentos */}
            <TabsContent value="medications">
              <MedicationsPage
                patientDataPk={userMedicalData?.pk}
                medicationsData={userMedicalData?.medications}
                fetchData={fetchData}
                canExecuteCrud={false}
              />
            </TabsContent>

            {/* Vacunas */}
            <TabsContent value="vaccines">
              <VaccinesPage
                patientDataPk={userMedicalData?.pk}
                vaccinesData={userMedicalData?.vaccines}
                fetchData={fetchData}
                canExecuteCrud={false}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}

export default ViewDataPage;
