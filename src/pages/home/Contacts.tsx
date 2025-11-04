import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import ContactForm from "@/components/pages/Home/ContactForm";

function ContactsSection() {
  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-700">
              Contáctanos
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
              Estamos aquí para responder tus preguntas y ayudarte a comenzar
            </p>
          </div>
        </div>
        <div className="mx-auto flex justify-center max-w-5xl gap-6 py-12">
          <div className="flex flex-col space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-blue-700">
                Información de Contacto
              </h3>
              <p className="text-gray-600">
                Estamos disponibles para atenderte de lunes a viernes de 9:00 a
                18:00 horas.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-blue-100 p-2">
                  <PhoneIcon className="h-4 w-4 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Teléfono</p>
                  <p className="text-sm text-gray-600">+57 317 373 6169</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-blue-100 p-2">
                  <MailIcon className="h-4 w-4 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-gray-600">support@livline.org</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-blue-100 p-2">
                  <MapPinIcon className="h-4 w-4 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Dirección</p>
                  <p className="text-sm text-gray-600">
                    Cl 25 #17-26, Tuluá, Valle del Cauca, Colombia
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-blue-700">
                Envíanos un Mensaje
              </h3>
              <p className="text-gray-600">
                Completa el formulario y nos pondremos en contacto contigo lo
                antes posible.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactsSection;
