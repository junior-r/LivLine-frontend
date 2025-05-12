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
  UserBloodType,
  UserCreateSchema,
  UserRole,
  UserSexOptions,
} from "@/schemas/dashboard/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Loader } from "@/components/ui/loader";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { User } from "@/types/auth/user";
import { toast } from "sonner";
import { useResponseStatusStore } from "@/store/api/useResponseStatus";
import { createUser } from "@/actions/dashboard/user";
import { PlusIcon } from "lucide-react";
import ErrorForm from "@/components/pages/ErrorForm";

type Props = {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
};

function CreateUser({ users, setUsers }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const errorStatus = useResponseStatusStore((state) => state.errorStatus);
  const setError = useResponseStatusStore((state) => state.setError);

  const form = useForm<z.infer<typeof UserCreateSchema>>({
    resolver: zodResolver(UserCreateSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      dateOfBirth: undefined,
      sex: undefined,
      bloodType: undefined,
      country: "",
      city: "",
      phone: "",
      role: "patient",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof UserCreateSchema>> = async (
    data
  ) => {
    setIsLoading(true);
    try {
      const res = await createUser(data);
      if (res.error) {
        setError(res.error);
      }

      if (res.status === 201) {
        const { user, message } = res.data;
        setUsers([user, ...users]);
        toast.success(message);
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
        <Button className="flex items-center gap-2 bg-yellow-400 text-black hover:text-white">
          <PlusIcon />
          <span>Crear</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>Crear un nuevo usuario</SheetHeader>
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="phone">Número de teléfono</FormLabel>
                    <Input
                      id="phone"
                      type="text"
                      placeholder="+XXXXXXXXXXX"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="country">País</FormLabel>
                    <Input
                      id="country"
                      type="text"
                      placeholder="Colombia"
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
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="city">Ciudad</FormLabel>
                    <Input
                      id="city"
                      type="text"
                      placeholder="Bogotá"
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
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="dateOfBirth">
                      Fecha de nacimiento
                    </FormLabel>
                    <Input
                      className="w-full block"
                      autoComplete="off"
                      id="dateOfBirth"
                      type="date"
                      value={field.value?.toString()}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="sex">Sexo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona un tipo de sangre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(UserSexOptions).map(([key, label]) => (
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
                name="bloodType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="bloodType">Tipo de sangre</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona un tipo de sangre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(UserBloodType).map(([key, label]) => (
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

export default CreateUser;
