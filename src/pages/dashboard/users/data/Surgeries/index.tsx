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
import CreateSurgery from "./Create";

type Props = {
  patientDataPk: string | undefined;
  surgeriesData: Surgery[] | undefined;
  fetchData: () => void;
};

function SurgeriesPage({ patientDataPk, surgeriesData, fetchData }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between gap-4">
          <span>Cirugías</span>

          {patientDataPk ? (
            <CreateSurgery
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
              <TableHead>Nombre</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Nota</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {surgeriesData && surgeriesData.length > 0 ? (
              surgeriesData.map((surgery) => (
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
