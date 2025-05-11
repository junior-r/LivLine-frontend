import { RegisterSchema } from "@/schemas/auth";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useResponseStatusStore } from "@/store/api/useResponseStatus";
import { useNavigate } from "react-router";
import { signUp } from "@/actions/auth/signUp";
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

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const errorStatus = useResponseStatusStore((state) => state.errorStatus);
  const setError = useResponseStatusStore((state) => state.setError);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof RegisterSchema>> = async (
    data
  ) => {
    setIsLoading(true);
    try {
      const res = await signUp(data);
      if (res.error) {
        setError(res.error);
      }

      if (res.status === 201) {
        const { message } = res.data;
        toast.success(message);
        navigate("/");
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
    <Card className="relative w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          <span style={{ viewTransitionName: "loginTransitionTitle" }}>
            Registro
          </span>
        </CardTitle>
        <CardDescription className="text-center">
          Crea una cuenta para acceder a todas las funcionalidades
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-start gap-4">
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
                    <FormLabel htmlFor="lastName">Appellido(s)</FormLabel>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Nombre(s)"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>
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
            <div className="flex items-start gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex-1">
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
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel htmlFor="passwordConfirm">
                      Contraseña (confirmar)
                    </FormLabel>
                    <Input
                      id="passwordConfirm"
                      type="password"
                      placeholder="Contraseña"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>

            <div className="items-top flex space-x-2">
              <Checkbox
                id="showPassword"
                onCheckedChange={(checked) =>
                  togglePasswordVisibility({
                    checked,
                    inputIds: ["password", "passwordConfirm"],
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

            <Button
              type="submit"
              disabled={isLoading || !form.formState.isValid}
              className={`${
                isLoading || !form.formState.isValid
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              {isLoading ? (
                <Loader size="sm" variant="spinner" />
              ) : (
                "Crear cuenta"
              )}
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

export default Register;
