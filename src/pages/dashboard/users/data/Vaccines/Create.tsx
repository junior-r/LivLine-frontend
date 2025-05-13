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
import { useState } from "react";
import { toast } from "sonner";
import { useResponseStatusStore } from "@/store/api/useResponseStatus";
import { PlusIcon } from "lucide-react";
import ErrorForm from "@/components/pages/ErrorForm";
import { Textarea } from "@/components/ui/textarea";
import { VaccineSchema } from "@/schemas/dashboard/medicalData/vaccine";
import { createVaccine } from "@/actions/dashboard/medicalData/vaccine";

type Props = {
  patientDataPk: string;
  fetchData: () => void;
};

function CreateVaccine({ patientDataPk, fetchData }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const errorStatus = useResponseStatusStore((state) => state.errorStatus);
  const setError = useResponseStatusStore((state) => state.setError);

  const form = useForm<z.infer<typeof VaccineSchema>>({
    resolver: zodResolver(VaccineSchema),
    defaultValues: {
      name: "",
      doseNumber: 1,
      vaccinationDate: undefined,
      notes: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof VaccineSchema>> = async (
    data
  ) => {
    setIsLoading(true);
    try {
      const res = await createVaccine(patientDataPk, data);
      if (res.error) {
        setError(res.error);
      }

      if (res.status === 201) {
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

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="flex items-center gap-2 bg-yellow-400 text-black hover:text-white">
          <PlusIcon />
          <span>Crear</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>Registrar una vacuna</SheetHeader>
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
                      placeholder="Hepatitis B"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="doseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="dosage"># Dosis</FormLabel>
                    <Input
                      id="dosage"
                      type="number"
                      placeholder="1"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vaccinationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="vaccinationDate">
                      Fecha de vacunación
                    </FormLabel>
                    <Input
                      className="w-full block"
                      autoComplete="off"
                      id="vaccinationDate"
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
                        placeholder="Primera dosis aplicada sin reacciones adversas."
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

export default CreateVaccine;
