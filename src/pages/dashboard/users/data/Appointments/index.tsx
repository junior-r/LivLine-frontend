import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Appointment } from "@/types/dashboard/medicalData";
import { getLocalDateTime } from "@/lib/utils";
import CreateAppointment from "./Create";
import DeleteDialog from "@/components/blocks/DeleteDialog";
import { destroy } from "@/actions/dashboard/medicalData/appointment";

type Props = {
  patientDataPk: string | undefined;
  appointmentsData: Appointment[] | undefined;
  fetchData: () => void;
};

function AppointmentsPage({
  patientDataPk,
  appointmentsData,
  fetchData,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between gap-4">
          <span>Citas previas</span>

          {patientDataPk ? (
            <CreateAppointment
              patientDataPk={patientDataPk}
              fetchData={fetchData}
            />
          ) : (
            <>
              <p>
                Para crear primero registra{" "}
                <span className="underline">Información General</span>
              </p>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rasón</TableHead>
              <TableHead>Diagnóstico</TableHead>
              <TableHead>Nombre del Doctor</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Nota</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointmentsData && appointmentsData.length > 0 ? (
              appointmentsData.map((appt) => (
                <TableRow key={appt.pk}>
                  <TableCell className="font-medium">{appt.reason}</TableCell>
                  <TableCell>{appt.diagnosis}</TableCell>
                  <TableCell>{appt.doctorName}</TableCell>
                  <TableCell>
                    {getLocalDateTime(appt.appointmentDate, ["es-co"])}
                  </TableCell>
                  <TableCell>
                    <p>{appt.notes}</p>
                  </TableCell>
                  <TableCell>
                    <DeleteDialog
                      action={() => destroy(appt.pk)}
                      callback={fetchData}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No se han registrado citas previas
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AppointmentsPage;
