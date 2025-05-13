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
import { useState } from "react";
import CreateMedication from "./Create";

type Props = {
  patientDataPk: string | undefined;
  medicationsData: Medication[] | undefined;
};

function MedicationsPage({ patientDataPk, medicationsData }: Props) {
  const [data, setData] = useState(medicationsData);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between gap-4">
          <span>Medicamentos</span>

          {patientDataPk ? (
            <CreateMedication
              patientDataPk={patientDataPk}
              medications={data}
              setMedications={setData}
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
            {data && data.length > 0 ? (
              data.map((medication) => (
                <TableRow key={medication.pk}>
                  <TableCell className="font-medium">
                    {medication.name}
                  </TableCell>
                  <TableCell>{medication.dosage}</TableCell>
                  <TableCell>{medication.frequency}</TableCell>
                  <TableCell>
                    {medication.startDate &&
                      getLocalDateTime(medication.startDate, ["es-co"])}
                  </TableCell>
                  <TableCell>
                    {medication.endDate &&
                      getLocalDateTime(medication.endDate, ["es-co"])}
                  </TableCell>
                  <TableCell>
                    <p>{medication.notes}</p>
                  </TableCell>
                  <TableCell></TableCell>
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
