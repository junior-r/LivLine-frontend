import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Turnstile from "react-turnstile";
import { Loader } from "@/components/ui/loader";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import { ContactSchema } from "@/schemas/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactSendMessage } from "@/actions/home/contact";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";

function ContactForm() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [description, setDescription] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      fullname: "",
      message: "",
      email: "",
      subject: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof ContactSchema>> = async (
    data
  ) => {
    setIsLoading(true);
    if (!captchaToken) {
      toast.error("Por favor valida el captcha antes de enviar");
      setIsLoading(false);
      return;
    }

    try {
      const response = await contactSendMessage({
        contactData: data,
        captchaToken,
      });

      if (!response.success) {
        toast.error(response.error);
        return;
      }

      toast.success(response.message || "Mensaje enviado con éxito");
      form.reset();
      setCharCount(0);
      setDescription("");
      setCaptchaToken(null);
      return;
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Ocurrió un error. Por favor intenta de nuevo.";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="col-span-1 row-span-full py-6">
      <CardHeader className="hidden">
        <CardTitle className="text-2xl text-foreground">
          {/* Envíanos un mensaje */}
        </CardTitle>
        <CardDescription>
          {/* Completa el formulario y nos pondremos en contacto contigo lo antes */}
          {/* posible. */}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-0">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-col-1 md:grid-cols-2 gap-4 items-baseline">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="fullname">Nombre completo</FormLabel>
                    <Input
                      id="fullname"
                      type="text"
                      maxLength={180}
                      className="font-serif"
                      placeholder="Tu nombre completo"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="subject">Asunto</FormLabel>
                    <Input
                      id="subject"
                      type="text"
                      maxLength={180}
                      className="font-serif"
                      placeholder="Elige un asunto"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                    maxLength={180}
                    className="font-serif"
                    placeholder="Tu correo electrónico"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="message">Mensaje</FormLabel>
                  <div className="flex flex-col">
                    <FormControl className="rounded-lg">
                      <Textarea
                        placeholder="Escribe un mensaje"
                        className="resize-none font-serif"
                        maxLength={800}
                        {...field}
                        value={description}
                        onChange={(e) => {
                          setCharCount(e.target.value.length);
                          setDescription(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                  </div>
                  <p
                    className="text-sm text-muted-foreground"
                    id="description-count"
                  >
                    {charCount}/800
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Turnstile
                sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY!}
                onSuccess={(token: string | null) => setCaptchaToken(token)}
                onExpire={() => setCaptchaToken(null)}
                theme={theme === "dark" ? "dark" : "light"}
              />
            </div>

            <Button
              type="submit"
              disabled={!form.formState.isValid || isLoading}
              className={`${
                !form.formState.isValid || isLoading
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              } w-full bg-blue-600 hover:bg-blue-700`}
            >
              {isLoading ? (
                <Loader size="sm" variant="spinner" />
              ) : (
                <div className="flex items-center gap-2">
                  <SendIcon size={16} />
                  <span>Enviar mensaje</span>
                </div>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default ContactForm;
