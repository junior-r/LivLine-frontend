import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Medication } from "@/types/dashboard/medicalData";
import { getLocalDateTime } from "@/lib/utils";
import CreateMedication from "./Create";
import DeleteDialog from "@/components/blocks/DeleteDialog";
import { destroy } from "@/actions/dashboard/medicalData/medication";

type Props = {
  patientDataPk: string | undefined;
  medicationsData: Medication[] | undefined;
  fetchData: () => void;
  canExecuteCrud?: boolean;
};

function MedicationsPage({
  patientDataPk,
  medicationsData,
  fetchData,
  canExecuteCrud = true,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between gap-4">
          <span>Medicamentos</span>

          {patientDataPk && canExecuteCrud ? (
            <CreateMedication
              patientDataPk={patientDataPk}
              fetchData={fetchData}
            />
          ) : (
            canExecuteCrud && (
              <>
                <p>
                  Para crear primero registra{" "}
                  <span className="underline">Información General</span>
                </p>
              </>
            )
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Dosis</TableHead>
              <TableHead>Frecuencia</TableHead>
              <TableHead>Fecha de inicio</TableHead>
              <TableHead>Fecha de fin</TableHead>
              <TableHead>Nota</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicationsData && medicationsData.length > 0 ? (
              medicationsData.map((medication) => (
                <TableRow key={medication.pk}>
                  <TableCell className="font-medium">
                    {medication.name}
                  </TableCell>
                  <TableCell>{medication.dosage}</TableCell>
                  <TableCell>{medication.frequency}</TableCell>
                  <TableCell>
                    {medication.startDate &&
                      getLocalDateTime(medication.startDate, ["es-CO"])}
                  </TableCell>
                  <TableCell>
                    {medication.endDate &&
                      getLocalDateTime(medication.endDate, ["es-CO"])}
                  </TableCell>
                  <TableCell>
                    <p>{medication.notes}</p>
                  </TableCell>
                  <TableCell>
                    {canExecuteCrud && (
                      <DeleteDialog
                        action={() => destroy(medication.pk)}
                        callback={fetchData}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No se han registrado medicamentos
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default MedicationsPage;
