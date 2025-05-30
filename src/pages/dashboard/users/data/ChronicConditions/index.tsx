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
import CreateCondition from "./Create";
import DeleteDialog from "@/components/blocks/DeleteDialog";
import { destroy } from "@/actions/dashboard/medicalData/chronicCondition";

type Props = {
  patientDataPk: string | undefined;
  chrConditionsData: ChronicCondition[] | undefined;
  fetchData: () => void;
  canExecuteCrud?: boolean;
};

function ChronicConditionsPage({
  patientDataPk,
  chrConditionsData,
  fetchData,
  canExecuteCrud = true,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between gap-4">
          <span>Condiciones crónicas</span>

          {patientDataPk && canExecuteCrud ? (
            <CreateCondition
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
              <TableHead>Fecha</TableHead>
              <TableHead>Nota</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {chrConditionsData && chrConditionsData.length > 0 ? (
              chrConditionsData.map((condition) => (
                <TableRow key={condition.pk}>
                  <TableCell className="font-medium">
                    {condition.name}
                  </TableCell>
                  <TableCell>
                    {condition.diagnosisDate &&
                      getLocalDateTime(condition.diagnosisDate, ["es-CO"])}
                  </TableCell>
                  <TableCell>
                    <p>{condition.notes}</p>
                  </TableCell>
                  <TableCell>
                    {canExecuteCrud && (
                      <DeleteDialog
                        action={() => destroy(condition.pk)}
                        callback={fetchData}
                      />
                    )}
                  </TableCell>
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
