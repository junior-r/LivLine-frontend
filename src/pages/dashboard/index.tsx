import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useEffect, useMemo, useState } from "react";
import {
  getTotalActiveUsers,
  getTotalUsers,
  getUserGrowth,
  getUserSexDist,
  getTotalPatientsWithAllergies,
  getBloodTypeDist,
  getMostCommonChConditions,
  getMostAdministeredVaccines,
} from "@/actions/dashboard";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  UserDataBloodType,
  UserChConditionsType,
  UserGrowthType,
  UserSexType,
  UserVaccinesType,
} from "@/types/dashboard";
import { Loader } from "@/components/ui/loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserBloodType } from "@/schemas/dashboard/medicalData";
import { Activity, Users } from "lucide-react";

function DashboardPage() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalActiveUsers, setTotalActiveUsers] = useState(0);
  const [userGrowthData, setUserGrowthData] = useState<UserGrowthType[]>([]);
  const [userSexData, setUserSexData] = useState<UserSexType[]>([]);
  const [usersAllergiesData, setUsersAllergiesData] = useState(0);
  const [usersBloodTypeData, setUsersBloodTypeData] = useState<
    UserDataBloodType[]
  >([]);
  const [mostCommonConditions, setMostCommonConditions] = useState<
    UserChConditionsType[]
  >([]);
  const [mostAdministeredVaccines, setMostAdministeredVaccines] = useState<
    UserVaccinesType[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f"];

  const transformedData = useMemo(
    () => [
      {
        name: "Sexo",
        Masculinos: userSexData.find((d) => d.sex === "M")?.total || 0,
        Femeninos: userSexData.find((d) => d.sex === "F")?.total || 0,
        Otros: userSexData.find((d) => d.sex === "O")?.total || 0,
      },
    ],
    [userSexData]
  );

  const transformedBloodTypeData = usersBloodTypeData.map((item) => ({
    ...item,
    label: UserBloodType[item.type as keyof typeof UserBloodType] || item.type,
  }));

  const fetchUserGrowth = async () => {
    setIsLoading(true);

    try {
      const [
        resTotalUsers,
        resTotalActiveUsers,
        resUserGrowth,
        resUserSexDist,
        resUserWithAllergies,
        resUsersBloodType,
        resMostCommonConditions,
        resMostAdministeredVaccines,
      ] = await Promise.all([
        getTotalUsers(),
        getTotalActiveUsers(),
        getUserGrowth(),
        getUserSexDist(),
        getTotalPatientsWithAllergies(),
        getBloodTypeDist(),
        getMostCommonChConditions(),
        getMostAdministeredVaccines(),
      ]);

      setTotalUsers(resTotalUsers.data.total);
      setTotalActiveUsers(resTotalActiveUsers.data.total);
      setUserGrowthData(resUserGrowth.data.growth);
      setUserSexData(resUserSexDist.data.distribution);
      setUsersAllergiesData(resUserWithAllergies.data.total);
      setUsersBloodTypeData(resUsersBloodType.data.distribution);
      setMostCommonConditions(resMostCommonConditions.data.conditions);
      setMostAdministeredVaccines(resMostAdministeredVaccines.data.vaccines);
    } catch (error) {
      console.error("Error fetching user stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserGrowth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full gap-2">
        <Loader size="md" />
        <span>Cargando...</span>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="analytics">Analíticas</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Cards */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Usuarios
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalUsers}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Usuarios Activos
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalActiveUsers}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Usuarios Inactivos
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.max(0, totalUsers - totalActiveUsers)}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Chart Users per month */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Crecimiento de Usuarios</CardTitle>
                <CardDescription>
                  Número de usuarios registrados por mes
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    total: {
                      label: "Total Usuarios",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="aspect-[4/3]"
                >
                  <LineChart
                    data={userGrowthData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 0,
                    }}
                  >
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={10}
                    />
                    <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="total"
                      strokeWidth={2}
                      activeDot={{
                        r: 6,
                        style: { fill: "var(--color-total)" },
                      }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
            {/* Chart Genre */}
            <Card className="col-span-4 md:col-span-3">
              <CardHeader>
                <CardTitle>Género</CardTitle>
                <CardDescription>Distribución de género</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    Masculinos: {
                      label: "Masculinos",
                      color: "hsl(var(--chart-1))",
                    },
                    Femeninos: {
                      label: "Femeninos",
                      color: "hsl(var(--chart-2))",
                    },
                    Otros: {
                      label: "Otros",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="aspect-[4/3]"
                >
                  <BarChart
                    data={transformedData}
                    margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                  >
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={10}
                    />
                    <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="Masculinos"
                      radius={4}
                      className="fill-[var(--color-Masculinos)]"
                    />
                    <Bar
                      dataKey="Femeninos"
                      radius={4}
                      className="fill-[var(--color-Femeninos)]"
                    />
                    <Bar
                      dataKey="Otros"
                      radius={4}
                      className="fill-[var(--color-Otros)]"
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Cards */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pacientes con alergias
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{usersAllergiesData}</div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
            {/* Pie Chart */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Tipo de sangre</CardTitle>
                <CardDescription>
                  Distribución de tipo de sangre
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    total: {
                      label: "Total Usuarios",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="aspect-[4/3]"
                >
                  <PieChart width={100} height={100}>
                    <Pie
                      data={transformedBloodTypeData}
                      dataKey="total"
                      nameKey="label"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="hsl(var(--chart-1))"
                      label
                    >
                      {transformedBloodTypeData.map((_, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <div className="flex flex-col gap-4 col-span-4">
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Condiciones crónicas</CardTitle>
                  <CardDescription>
                    Lista de condiciones crónicas
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <Table>
                    <TableCaption>
                      Solo se muestra el{" "}
                      <span className="text-blue-500">Top 5</span>
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="">Nombre</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mostCommonConditions.length > 0 ? (
                        mostCommonConditions.map((condition) => (
                          <TableRow>
                            <TableCell className="font-medium">
                              {condition.name}
                            </TableCell>
                            <TableCell>{condition.total}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell className="font-medium">
                            No existen regístros
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Vacunas</CardTitle>
                  <CardDescription>Lista de vacunas</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <Table>
                    <TableCaption>
                      Solo se muestra el{" "}
                      <span className="text-blue-500">Top 5</span>
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="">Nombre</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mostAdministeredVaccines.length > 0 ? (
                        mostAdministeredVaccines.map((vaccine) => (
                          <TableRow>
                            <TableCell className="font-medium">
                              {vaccine.name}
                            </TableCell>
                            <TableCell>{vaccine.total}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell className="font-medium">
                            No existen regístros
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DashboardPage;
