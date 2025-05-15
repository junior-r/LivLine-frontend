import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { capitalizeWords } from "@/lib/utils";
import {
  UserUpdateSchema,
  UserIdType,
  UserRole,
} from "@/schemas/dashboard/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Loader } from "@/components/ui/loader";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { User } from "@/types/auth/user";
import { toast } from "sonner";
import { useResponseStatusStore } from "@/store/api/useResponseStatus";
import { updateUser } from "@/actions/dashboard/user";
import { EditIcon } from "lucide-react";
import ErrorForm from "@/components/pages/ErrorForm";
import { validateUserUpdateData } from "@/utils/dashboard/user";
import { useAuthStore } from "@/store/auth/useAuthStore";

type Props = {
  user: User;
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
};

function UpdateUser({ user, users, setUsers }: Props) {
  const currentUser = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const errorStatus = useResponseStatusStore((state) => state.errorStatus);
  const setError = useResponseStatusStore((state) => state.setError);

  const form = useForm<z.infer<typeof UserUpdateSchema>>({
    resolver: zodResolver(UserUpdateSchema),
    defaultValues: validateUserUpdateData(user),
  });

  const onSubmit: SubmitHandler<z.infer<typeof UserUpdateSchema>> = async (
    data
  ) => {
    setIsLoading(true);
    try {
      const res = await updateUser(user.pk, data);
      if (res.error) {
        setError(res.error);
      }

      if (res.status === 200) {
        const { updatedUser, message } = res.data;
        const newData = users.map((u) => (u.pk === user.pk ? updatedUser : u));
        setUsers(newData);
        toast.success(message);
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Register error:", error);
      toast.error(
        "Un error ocurrio durante el registro. Por favor intenta de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className="bg-blue-500 text-black hover:text-white"
          size={"icon"}
        >
          <EditIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          {user.pk === currentUser?.pk ? (
            <>Actualizar mi información</>
          ) : (
            <>
              Actualizar información de{" "}
              <span className="text-blue-500">
                {user.name} {user.lastName}
              </span>
            </>
          )}
        </SheetHeader>
        <section className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Nombre(s)</FormLabel>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John"
                      {...field}
                      onChange={(e) => {
                        const formatted = capitalizeWords(e.target.value);
                        field.onChange(formatted);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="lastName">Apellido(s)</FormLabel>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      {...field}
                      onChange={(e) => {
                        const formatted = capitalizeWords(e.target.value);
                        field.onChange(formatted);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Correo electrónico</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="johndoe@example.com"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="role">Rol</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona un rol de usuario" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(UserRole).map(([key, label]) => (
                          <SelectItem value={key} key={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage>
                      {field.value === UserRole.admin.toLowerCase() && (
                        <>
                          Estás dandole permisos de administrador a este usuario
                        </>
                      )}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="idDocType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="idDocType">
                      Documento de identificación
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona un tipo de identificación" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(UserIdType).map(([key, label]) => (
                          <SelectItem value={key} key={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="idNumber">
                      Número de identificación
                    </FormLabel>
                    <Input
                      id="idNumber"
                      type="text"
                      placeholder="xxxxxxxx"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {errorStatus.error && <ErrorForm message={errorStatus.message} />}

              <Button
                type="submit"
                disabled={isLoading || !form.formState.isValid}
                className={`${
                  isLoading || !form.formState.isValid
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                {isLoading ? <Loader size="sm" variant="spinner" /> : "Guardar"}
              </Button>
            </form>
          </Form>
        </section>
      </SheetContent>
    </Sheet>
  );
}

export default UpdateUser;
