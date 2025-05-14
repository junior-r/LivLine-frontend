import { updateUser } from "@/actions/user";
import ErrorForm from "@/components/pages/ErrorForm";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { ProfileSchema } from "@/schemas/user";
import { useResponseStatusStore } from "@/store/api/useResponseStatus";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

function ProfilePage() {
  useRequireAuth();

  const user = useAuthStore((state) => state.user);
  const errorStatus = useResponseStatusStore((state) => state.errorStatus);
  const setError = useResponseStatusStore((state) => state.setError);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user?.name,
      lastName: user?.lastName,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof ProfileSchema>> = async (
    data
  ) => {
    if (!user) {
      return;
    }
    setIsLoading(true);
    try {
      const res = await updateUser(user.pk, data);
      if (res.error) {
        setError(res.error);
        return;
      }

      if (res.status === 200) {
        const { message } = res.data;
        toast.success(message);
        window.location.reload();
        return;
      }
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error("Un error inesperado ocurrió");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="w-full h-full py-6">
      <Form {...form}>
        <form
          className="w-full max-w-screen-2xl mx-auto space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex gap-6 items-start justify-center flex-wrap">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel htmlFor="name">Nombre(s)</FormLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nombre(s)"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel htmlFor="lastName">Apellido(s)</FormLabel>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Apellido(s)"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>

          {errorStatus.error && <ErrorForm message={errorStatus.message} />}

          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Actualizar"}
          </Button>
        </form>
      </Form>
    </section>
  );
}

export default ProfilePage;
