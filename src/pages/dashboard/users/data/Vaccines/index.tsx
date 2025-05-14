import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Vaccine } from "@/types/dashboard/medicalData";
import { getLocalDateTime } from "@/lib/utils";
import CreateVaccine from "./Create";
import DeleteDialog from "@/components/blocks/DeleteDialog";
import { destroy } from "@/actions/dashboard/medicalData/vaccine";

type Props = {
  patientDataPk: string | undefined;
  vaccinesData: Vaccine[] | undefined;
  fetchData: () => void;
  canExecuteCrud?: boolean;
};

function VaccinesPage({
  patientDataPk,
  vaccinesData,
  fetchData,
  canExecuteCrud = true,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between gap-4">
          <span>Vacunas</span>

          {patientDataPk && canExecuteCrud ? (
            <CreateVaccine
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
              <TableHead># Dosis</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Nota</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vaccinesData && vaccinesData.length > 0 ? (
              vaccinesData.map((vaccine) => (
                <TableRow key={vaccine.pk}>
                  <TableCell className="font-medium">{vaccine.name}</TableCell>
                  <TableCell>{vaccine.doseNumber}</TableCell>
                  <TableCell>
                    {vaccine.vaccinationDate &&
                      getLocalDateTime(vaccine.vaccinationDate, ["es-co"])}
                  </TableCell>
                  <TableCell>
                    <p>{vaccine.notes}</p>
                  </TableCell>
                  <TableCell>
                    {canExecuteCrud && (
                      <DeleteDialog
                        action={() => destroy(vaccine.pk)}
                        callback={fetchData}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No se han registrado vacunas
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default VaccinesPage;
