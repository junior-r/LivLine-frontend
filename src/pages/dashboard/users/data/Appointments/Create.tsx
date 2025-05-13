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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Loader } from "@/components/ui/loader";
import { useState, type Dispatch, type SetStateAction } from "react";
import { toast } from "sonner";
import { useResponseStatusStore } from "@/store/api/useResponseStatus";
import { PlusIcon } from "lucide-react";
import ErrorForm from "@/components/pages/ErrorForm";
import type { Appointment } from "@/types/dashboard/medicalData";
import { Textarea } from "@/components/ui/textarea";
import { AppointmentSchema } from "@/schemas/dashboard/medicalData/appointment";
import { createAppointment } from "@/actions/dashboard/medicalData/appointment";

type Props = {
  patientDataPk: string;
  appointments: Appointment[] | undefined;
  setAppointments: Dispatch<SetStateAction<Appointment[] | undefined>>;
};

function CreateAppointment({
  patientDataPk,
  appointments,
  setAppointments,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const errorStatus = useResponseStatusStore((state) => state.errorStatus);
  const setError = useResponseStatusStore((state) => state.setError);

  const form = useForm<z.infer<typeof AppointmentSchema>>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      reason: "",
      diagnosis: "",
      doctorName: "",
      appointmentDate: undefined,
      notes: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof AppointmentSchema>> = async (
    data
  ) => {
    setIsLoading(true);
    try {
      const res = await createAppointment(patientDataPk, data);
      if (res.error) {
        setError(res.error);
      }

      if (res.status === 201) {
        const { appointment, message } = res.data;
        toast.success(message);
        form.reset();
        setIsOpen(false);
        if (appointments) {
          setAppointments([appointment, ...appointments]);
        } else {
          setAppointments([appointment]);
        }
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
        <SheetHeader>Registrar una cita previa</SheetHeader>
        <section className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="reason">Razón</FormLabel>
                    <Input
                      id="reason"
                      type="text"
                      placeholder="Dolor de cabeza persistente"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="diagnosis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="diagnosis">Diagnóstico</FormLabel>
                    <Input
                      id="diagnosis"
                      type="text"
                      placeholder="Migraña"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="doctorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="doctorName">
                      Nombre del doctor
                    </FormLabel>
                    <Input
                      id="doctorName"
                      type="text"
                      placeholder="Dr. Juan Pérez"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="appointmentDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="appointmentDate">
                      Fecha de la cita
                    </FormLabel>
                    <Input
                      className="w-full block"
                      autoComplete="off"
                      id="appointmentDate"
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
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notas</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Se recomienda seguimiento neurológico"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
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

export default CreateAppointment;
