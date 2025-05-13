import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChronicCondition } from "@/types/dashboard/medicalData";
import { getLocalDateTime } from "@/lib/utils";
import { useState } from "react";
import CreateCondition from "./Create";

type Props = {
  patientDataPk: string | undefined;
  chrConditionsData: ChronicCondition[] | undefined;
};

function ChronicConditionsPage({ patientDataPk, chrConditionsData }: Props) {
  const [data, setData] = useState(chrConditionsData);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between gap-4">
          <span>Condiciones crónicas</span>

          {patientDataPk ? (
            <CreateCondition
              patientDataPk={patientDataPk}
              conditions={data}
              setConditions={setData}
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
              <TableHead>Fecha</TableHead>
              <TableHead>Nota</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((condition) => (
                <TableRow key={condition.pk}>
                  <TableCell className="font-medium">
                    {condition.name}
                  </TableCell>
                  <TableCell>
                    {condition.diagnosisDate &&
                      getLocalDateTime(condition.diagnosisDate, ["es-co"])}
                  </TableCell>
                  <TableCell>
                    <p>{condition.notes}</p>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No se han registrado condiciones crónicas
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ChronicConditionsPage;
