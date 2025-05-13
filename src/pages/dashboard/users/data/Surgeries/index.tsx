import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Surgery } from "@/types/dashboard/medicalData";
import { getLocalDateTime } from "@/lib/utils";
import { useState } from "react";
import CreateSurgery from "./Create";

type Props = {
  patientDataPk: string | undefined;
  surgeriesData: Surgery[] | undefined;
};

function SurgeriesPage({ patientDataPk, surgeriesData }: Props) {
  const [data, setData] = useState(surgeriesData);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between gap-4">
          <span>Cirugías</span>

          {patientDataPk ? (
            <CreateSurgery
              patientDataPk={patientDataPk}
              surgeries={data}
              setSurgeries={setData}
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
              data.map((surgery) => (
                <TableRow key={surgery.pk}>
                  <TableCell className="font-medium">{surgery.name}</TableCell>
                  <TableCell>
                    {surgery.date && getLocalDateTime(surgery.date, ["es-co"])}
                  </TableCell>
                  <TableCell>
                    <p>{surgery.notes}</p>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No se han registrado cirugías
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default SurgeriesPage;
