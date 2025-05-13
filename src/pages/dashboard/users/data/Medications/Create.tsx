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
import type { Medication } from "@/types/dashboard/medicalData";
import { Textarea } from "@/components/ui/textarea";
import { MedicationSchema } from "@/schemas/dashboard/medicalData/medication";
import { createMedication } from "@/actions/dashboard/medicalData/medication";

type Props = {
  patientDataPk: string;
  medications: Medication[] | undefined;
  setMedications: Dispatch<SetStateAction<Medication[] | undefined>>;
};

function CreateMedication({
  patientDataPk,
  medications,
  setMedications,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const errorStatus = useResponseStatusStore((state) => state.errorStatus);
  const setError = useResponseStatusStore((state) => state.setError);

  const form = useForm<z.infer<typeof MedicationSchema>>({
    resolver: zodResolver(MedicationSchema),
    defaultValues: {
      name: "",
      dosage: "",
      frequency: "",
      startDate: undefined,
      endDate: undefined,
      notes: "",
    },
  });

  const { watch } = form;
  const startDate = watch("startDate");

  const onSubmit: SubmitHandler<z.infer<typeof MedicationSchema>> = async (
    data
  ) => {
    setIsLoading(true);
    try {
      const res = await createMedication(patientDataPk, data);
      if (res.error) {
        setError(res.error);
      }

      if (res.status === 201) {
        const { medication, message } = res.data;
        toast.success(message);
        form.reset();
        setIsOpen(false);
        if (medications) {
          setMedications([medication, ...medications]);
        } else {
          setMedications([medication]);
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
        <SheetHeader>Registrar un medicamento</SheetHeader>
        <section className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Nombre</FormLabel>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Losartán"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dosage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="dosage">Dosis</FormLabel>
                    <Input
                      id="dosage"
                      type="text"
                      placeholder="50mg"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="frequency">Frecuencia</FormLabel>
                    <Input
                      id="frequency"
                      type="text"
                      placeholder="1 vez al día"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="startDate">Fecha de inicio</FormLabel>
                    <Input
                      className="w-full block"
                      autoComplete="off"
                      id="startDate"
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
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="endDate">Fecha de fin</FormLabel>
                    <Input
                      className="w-full block"
                      autoComplete="off"
                      id="endDate"
                      type="date"
                      value={field.value?.toString()}
                      onChange={field.onChange}
                      min={startDate ? startDate.toString() : undefined}
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
                        placeholder="Control mensual"
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

export default CreateMedication;
