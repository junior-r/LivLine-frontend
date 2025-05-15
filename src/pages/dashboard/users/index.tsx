import { destroy, getAll } from "@/actions/dashboard/user";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/ui/loader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEnumValue, getLocalDateTime } from "@/lib/utils";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { usePaginationStore } from "@/store/pagination/usePaginationStore";
import type { User } from "@/types/auth/user";
import { ReceiptTextIcon, RefreshCwIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "./Pagination";
import CreateUser from "./Create";
import { UserRole } from "@/schemas/dashboard/user";
import UpdateUser from "./Update";
import DeleteDialog from "@/components/blocks/DeleteDialog";

function UsersDashboard() {
  const currentUser = useAuthStore((state) => state.user) as User;
  const [data, setData] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const paginationData = usePaginationStore((state) => state.paginationData);
  const setPaginationData = usePaginationStore(
    (state) => state.setPaginationData
  );

  const fetchData = useCallback(
    async (pageNumber: number, search: string) => {
      setIsLoading(true);
      const res = await getAll({ page: pageNumber, search });
      const {
        objects,
        page,
        totalItems,
        totalPages,
        hasNextPage,
        hasPreviousPage,
        nextPage,
        previousPage,
      } = res.data;
      setData(objects);
      setPaginationData({
        page,
        totalItems,
        totalPages,
        hasNextPage,
        hasPreviousPage,
        nextPage,
        previousPage,
      });

      setIsLoading(false);
    },
    [setPaginationData]
  );

  useEffect(() => {
    fetchData(page, "");
  }, [fetchData, page]);

  const debounced = useDebouncedCallback((value) => {
    fetchData(1, value);
  }, 500);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    debounced(value);
  };

  const handleDelete = (userDeletedPk: string) => {
    const newData = data.filter((user) => user.pk !== userDeletedPk);
    setData(newData);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full gap-2">
        <Loader size="md" />
        <span>Cargando...</span>
      </div>
    );
  }

  return (
    <>
      <section className="w-full flex justify-between gap-4 mb-4">
        <div className="pt-4 flex-1">
          <form>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="search" className="sr-only">
                Buscar
              </Label>
              <Input
                type="search"
                id="search"
                placeholder="Buscar usuarios"
                value={search}
                autoFocus
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="flex items-center gap-2">
          <CreateUser users={data} setUsers={setData} />
          <Button
            variant={"outline"}
            onClick={() => fetchData(page, search)}
            className="flex items-center gap-2"
          >
            <RefreshCwIcon />
            <span>Recargar</span>
          </Button>
        </div>
      </section>

      <Table className="my-4">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead className="w-[100px]">Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Identificación</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Creado</TableHead>
            <TableHead>Actualizado</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((user) => (
              <TableRow key={user.pk}>
                <TableCell>
                  {user.pk === currentUser.pk && (
                    <Badge variant={"outline"}>Yo</Badge>
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {user.name} {user.lastName}
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <span>{user.email}</span>
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex flex-col items-start">
                    <span>{user.idNumber}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge>{getEnumValue(UserRole, user.role)}</Badge>
                </TableCell>
                <TableCell>
                  {getLocalDateTime(user.createdAt, ["es-CO"])}
                </TableCell>
                <TableCell>
                  {getLocalDateTime(user.updatedAt, ["es-CO"])}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center gap-2">
                    <UpdateUser user={user} users={data} setUsers={setData} />
                    <Button asChild size={"icon"}>
                      <Link
                        to={`/dashboard/users/${user.pk}`}
                        title="Datos médicos"
                      >
                        <ReceiptTextIcon className="w-5 h-5" />
                      </Link>
                    </Button>
                    <DeleteDialog
                      action={() => destroy(user.pk)}
                      callback={() => handleDelete(user.pk)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No existen usuarios
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {paginationData && (
        <Pagination
          paginationData={paginationData}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}
    </>
  );
}

export default UsersDashboard;
