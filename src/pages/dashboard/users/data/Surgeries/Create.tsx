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
import type { Surgery } from "@/types/dashboard/medicalData";
import { Textarea } from "@/components/ui/textarea";
import { SurgerySchema } from "@/schemas/dashboard/medicalData/surgery";
import { createSurgery } from "@/actions/dashboard/medicalData/surgery";

type Props = {
  patientDataPk: string;
  surgeries: Surgery[] | undefined;
  setSurgeries: Dispatch<SetStateAction<Surgery[] | undefined>>;
};

function CreateSurgery({ patientDataPk, surgeries, setSurgeries }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const errorStatus = useResponseStatusStore((state) => state.errorStatus);
  const setError = useResponseStatusStore((state) => state.setError);

  const form = useForm<z.infer<typeof SurgerySchema>>({
    resolver: zodResolver(SurgerySchema),
    defaultValues: {
      name: "",
      date: undefined,
      notes: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof SurgerySchema>> = async (
    data
  ) => {
    setIsLoading(true);
    try {
      const res = await createSurgery(patientDataPk, data);
      if (res.error) {
        setError(res.error);
      }

      if (res.status === 201) {
        const { surgery, message } = res.data;
        toast.success(message);
        form.reset();
        setIsOpen(false);
        if (surgeries) {
          setSurgeries([surgery, ...surgeries]);
        } else {
          setSurgeries([surgery]);
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
        <SheetHeader>Registrar una cirugía</SheetHeader>
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
                      placeholder="Apendicectomía"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="date">Fecha de la cirugía</FormLabel>
                    <Input
                      className="w-full block"
                      autoComplete="off"
                      id="date"
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
                        placeholder="Sin complicaciones"
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

export default CreateSurgery;
