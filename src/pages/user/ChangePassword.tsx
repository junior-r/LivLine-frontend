import { changePassword } from "@/actions/user";
import ErrorForm from "@/components/pages/ErrorForm";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { togglePasswordVisibility } from "@/lib/utils";
import { ChangePasswordSchema } from "@/schemas/user";
import { useResponseStatusStore } from "@/store/api/useResponseStatus";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

function ChangePasswordPage() {
  useRequireAuth();

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const errorStatus = useResponseStatusStore((state) => state.errorStatus);
  const setError = useResponseStatusStore((state) => state.setError);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof ChangePasswordSchema>> = async (
    data
  ) => {
    if (!user) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await changePassword(user.pk, data);
      if (res.error) {
        setError(res.error);
        return;
      }

      if (res.status === 200) {
        const { message } = res.data;
        toast.success(message);
        setUser(null);
      }
    } catch (error) {
      console.error("Update change paswword error:", error);
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
              name="currentPassword"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel htmlFor="currentPassword">
                    Contraseña actual
                  </FormLabel>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="••••••"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel htmlFor="password">Nueva contraseña</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel htmlFor="passwordConfirm">
                    Nueva contraseña (confirmar)
                  </FormLabel>
                  <Input
                    id="passwordConfirm"
                    type="password"
                    placeholder="••••••"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>

          {errorStatus.error && <ErrorForm message={errorStatus.message} />}

          <div className="items-top flex space-x-2">
            <Checkbox
              id="showPassword"
              onCheckedChange={(checked) =>
                togglePasswordVisibility({
                  checked,
                  inputIds: ["currentPassword", "password", "passwordConfirm"],
                })
              }
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="showPassword"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Mostrar contraseñas
              </label>
            </div>
          </div>

          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Actualizar"}
          </Button>
        </form>
      </Form>
    </section>
  );
}

export default ChangePasswordPage;
