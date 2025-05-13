import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Allergy } from "@/types/dashboard/medicalData";
import { useState } from "react";
import CreateAllergy from "./Create";
import { getEnumValue } from "@/lib/utils";
import { AllergySeverityOptions } from "@/schemas/dashboard/medicalData/allergy";

type Props = {
  patientDataPk: string | undefined;
  allergiesData: Allergy[] | undefined;
};

function AllergiesPage({ patientDataPk, allergiesData }: Props) {
  const [data, setData] = useState(allergiesData);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Leve":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Moderada":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "Severa":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between gap-4">
          <span>Alergias</span>

          {patientDataPk ? (
            <CreateAllergy
              patientDataPk={patientDataPk}
              allergies={data}
              setAllergies={setData}
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
              <TableHead>Alergia</TableHead>
              <TableHead>Severidad</TableHead>
              <TableHead>Reacción</TableHead>
              <TableHead>Nota</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((allergy) => (
                <TableRow key={allergy.pk}>
                  <TableCell className="font-medium">{allergy.name}</TableCell>
                  <TableCell>
                    <Badge className={getSeverityColor(allergy.severity)}>
                      {getEnumValue(AllergySeverityOptions, allergy.severity)}
                    </Badge>
                  </TableCell>
                  <TableCell>{allergy.reaction}</TableCell>
                  <TableCell>
                    <p>{allergy.notes}</p>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No se han registrado alergias
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AllergiesPage;
