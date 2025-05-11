import { LoginSchema } from "@/schemas/auth";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useResponseStatusStore } from "@/store/api/useResponseStatus";
import { useNavigate } from "react-router";
import { login } from "@/actions/auth/login";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import ErrorForm from "@/components/pages/ErrorForm";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { togglePasswordVisibility } from "@/lib/utils";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const errorStatus = useResponseStatusStore((state) => state.errorStatus);
  const setError = useResponseStatusStore((state) => state.setError);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = async (data) => {
    setIsLoading(true);
    try {
      const res = await login(data);
      if (res.error) {
        setError(res.error);
      }

      if (res.status === 200) {
        const { user, message } = res.data;
        toast.success(message);
        setUser(user);
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Un error inesperado ocurrió");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="relative w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          <span style={{ viewTransitionName: "loginTransitionTitle" }}>
            Ingresar
          </span>
        </CardTitle>
        <CardDescription className="text-center">
          Inicia sesión con tus credenciales para acceder a tu cuenta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Correo electrónico</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Correo electrónico"
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
                <FormItem>
                  <FormLabel htmlFor="password">Contraseña</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Contraseña"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <div className="items-top flex space-x-2">
              <Checkbox
                id="showPassword"
                onCheckedChange={(checked) =>
                  togglePasswordVisibility({ checked, inputIds: ["password"] })
                }
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="showPassword"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Mostrar contraseña
                </label>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !form.formState.isValid}
              className={`${
                isLoading || !form.formState.isValid
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              {isLoading ? <Loader size="sm" variant="spinner" /> : "Ingresar"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        {errorStatus.error && <ErrorForm message={errorStatus.message} />}
      </CardFooter>
    </Card>
  );
}

export default Login;
