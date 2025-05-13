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
import { ChronicConditionSchema } from "@/schemas/dashboard/medicalData/chronicCondition";
import { createChronicCondition } from "@/actions/dashboard/medicalData/chronicCondition";

type Props = {
  patientDataPk: string;
  fetchData: () => void;
};

function CreateCondition({ patientDataPk, fetchData }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const errorStatus = useResponseStatusStore((state) => state.errorStatus);
  const setError = useResponseStatusStore((state) => state.setError);

  const form = useForm<z.infer<typeof ChronicConditionSchema>>({
    resolver: zodResolver(ChronicConditionSchema),
    defaultValues: {
      name: "",
      diagnosisDate: undefined,
      notes: "",
    },
  });

  const onSubmit: SubmitHandler<
    z.infer<typeof ChronicConditionSchema>
  > = async (data) => {
    setIsLoading(true);
    try {
      const res = await createChronicCondition(patientDataPk, data);
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
        <SheetHeader>Registrar una condición crónica</SheetHeader>
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
                      placeholder="Hipertensión"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="diagnosisDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="diagnosisDate">
                      Fecha del diagnóstico
                    </FormLabel>
                    <Input
                      className="w-full block"
                      autoComplete="off"
                      id="diagnosisDate"
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

export default CreateCondition;
