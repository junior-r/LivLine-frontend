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
import { MedicalDataSchema } from "@/schemas/dashboard/medicalData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Loader } from "@/components/ui/loader";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useResponseStatusStore } from "@/store/api/useResponseStatus";
import { FilePenLine } from "lucide-react";
import ErrorForm from "@/components/pages/ErrorForm";
import {
  UserBloodTypeOptions,
  UserSexOptions,
  type MedicalData,
} from "@/types/dashboard/medicalData";
import { validateMedicalData } from "@/utils/medical";
import { updateMedicalData } from "@/actions/dashboard/medicalData";

type Props = {
  mediacalData: MedicalData;
  fetchData: () => void;
};

function UpdateMedicalData({ mediacalData, fetchData }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const errorStatus = useResponseStatusStore((state) => state.errorStatus);
  const setError = useResponseStatusStore((state) => state.setError);

  const form = useForm<z.infer<typeof MedicalDataSchema>>({
    resolver: zodResolver(MedicalDataSchema),
    defaultValues: validateMedicalData(mediacalData),
  });

  const onSubmit: SubmitHandler<z.infer<typeof MedicalDataSchema>> = async (
    data
  ) => {
    setIsLoading(true);
    try {
      const res = await updateMedicalData(mediacalData.pk, data);
      if (res.error) {
        setError(res.error);
      }

      if (res.status === 200) {
        const { message } = res.data;
        toast.success(message);
        form.reset();
        setIsOpen(false);
        fetchData();
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

  useEffect(() => {
    if (!isOpen) form.reset();
  }, [isOpen, form]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="flex items-center gap-2 bg-blue-500 text-white">
          <FilePenLine />
          <span>Actualizar</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>Actualizar datos generales</SheetHeader>
        <section className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="address">Dirección</FormLabel>
                    <Input
                      id="address"
                      type="text"
                      placeholder="Street 21th"
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
                name="emergencyContactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="emergencyContactName">
                      Contacto de emergencia
                    </FormLabel>
                    <Input
                      id="emergencyContactName"
                      type="text"
                      placeholder="Jane Doe"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emergencyContactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="emergencyContactPhone">
                      Contacto de emergencia
                    </FormLabel>
                    <Input
                      id="emergencyContactPhone"
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
                      value={field.value}
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
                          <SelectValue placeholder="Selecciona un sexo" />
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
                        {Object.entries(UserBloodTypeOptions).map(
                          ([key, label]) => (
                            <SelectItem value={key} key={key}>
                              {label}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
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

export default UpdateMedicalData;
