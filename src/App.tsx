import {
  ArrowRight,
  CheckCircle,
  Handshake,
  HeartHandshake,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  Scale,
  ShieldCheck,
  Smile,
} from "lucide-react";
import Navbar from "./components/pages/HomeNavbar";
import { Button } from "./components/ui/button";
import textFiles from "@/assets/images/home/textFiles.svg";
import avatarMan1 from "@/assets/images/home/avatars/avatar-man1.svg";
import avatarMan2 from "@/assets/images/home/avatars/avatar-man2.svg";
import avatarWoman1 from "@/assets/images/home/avatars/avatar-woman1.svg";
import avatarWoman2 from "@/assets/images/home/avatars/avatar-woman2.svg";
import avatarWoman3 from "@/assets/images/home/avatars/avatar-woman3.svg";
import product1 from "@/assets/images/product/pulsera1.webp";
import product2 from "@/assets/images/product/pulsera2.webp";
import { Link } from "react-router-dom";

function App() {
  const currentYear = new Date().getFullYear();
  const team = [
    {
      name: "Ana Sofía Varela Rodríguez",
      role: "Integrante",
      img: avatarWoman1,
    },
    {
      name: "Ana Sofía Vargas Gómez",
      role: "Integrante",
      img: avatarWoman2,
    },
    {
      name: "María José Velasquez Atehortua",
      role: "Integrante",
      img: avatarWoman3,
    },
    {
      name: "Alan David Cervera Trujillo",
      role: "Integrante",
      img: avatarMan1,
    },
    {
      name: "Juan Esteban Ruiz",
      role: "Integrante",
      img: avatarMan2,
    },
  ];
  const productFeatures = [
    "Material hipoalergénico resistente al agua",
    "Código QR único vinculado a historial médico completo",
    "Información médica crítica visible para personal sanitario",
    "Cierre seguro con sistema anti-pérdida",
    "En colores blanco y negro",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-blue-800">
                    Transformando la Gestión de Datos Médicos
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    LivLine es una plataforma segura y eficiente para registrar,
                    gestionar y consultar datos médicos con la más alta
                    confidencialidad.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                    <Link to={"/viewData"}>
                      Consultar datos
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src={textFiles}
                  alt="Plataforma de datos médicos"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about-us" className="py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-700">
                  Sobre Nosotros
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  En LivLine, nos dedicamos a revolucionar la forma en que los
                  profesionales de la salud acceden y utilizan los datos
                  médicos.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-blue-600">
                    Nuestra Misión
                  </h3>
                  <p className="text-gray-600">
                    Livline se dedica a la elaboración de manillas con placas de
                    información, buscando la seguridad y facilidad de las
                    personas para poder llevar su información médica a todas
                    partes, estamos ubicados en el municipio de Tuluá, Valle del
                    Cauca, para asegurar el bienestar de las personas en casos
                    de emergencia.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-purple-600">
                    Nuestra Visión
                  </h3>
                  <p className="text-gray-600">
                    Para el año 2030 Livline será una empresa reconocida a nivel
                    municipal por la producción de manillas con placas de
                    información, distinguiéndonos por la facilidad que le
                    ofrecemos a nuestros clientes de portar su información
                    médica a todas partes y una excelente atención al cliente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Section */}
        <section id="product" className="py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-700">
                  Nuestro Producto
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  Pulsera LivLine con código QR para acceso inmediato a
                  información médica vital
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-12 lg:grid-cols-2">
              {/* Product Images */}
              <div className="flex flex-col space-y-6">
                <div className="overflow-hidden rounded-lg border border-blue-100 shadow-sm">
                  <img
                    src={product1}
                    alt="Pulsera LivLine - Vista frontal"
                    width={600}
                    height={400}
                    className="w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-lg border border-blue-100 shadow-sm">
                  <img
                    src={product2}
                    alt="Pulsera MediData - Vista en mano"
                    width={600}
                    height={400}
                    className="w-full object-cover"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col justify-center space-y-8">
                {/* Features */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-blue-700">
                    Características
                  </h3>
                  <ul className="space-y-3">
                    {productFeatures.map((feature, idx) => (
                      <li className="flex items-start space-x-3" key={idx}>
                        <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Measurements */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-purple-700">
                    Medidas Disponibles
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-purple-100 bg-purple-50 p-4">
                      <h4 className="font-medium text-purple-700">Adulto</h4>
                      <ul className="mt-2 space-y-1 text-sm text-gray-600">
                        <li>Pequeña: 15-17 cm</li>
                        <li>Mediana: 17-19 cm</li>
                        <li>Grande: 19-21 cm</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                      <h4 className="font-medium text-blue-700">Pediátrica</h4>
                      <ul className="mt-2 space-y-1 text-sm text-gray-600">
                        <li>Bebé: 10-12 cm</li>
                        <li>Infantil: 12-14 cm</li>
                        <li>Juvenil: 14-16 cm</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 md:py-24 bg-blue-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-700">
                  Valores y principios corporativos
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  Queremos que te sientas seguro
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-blue-100 bg-white p-6 shadow-sm">
                <div className="rounded-full bg-blue-100 p-3">
                  <Handshake className="h-6 w-6 text-blue-600" />
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold text-blue-700">Confianza</h3>
                  <p className="text-sm text-gray-600">
                    En livline la confianza es fundamental para construir una
                    relación sólida con nuestros clientes y trabajadores, dentro
                    y fuera de la empresa.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-purple-100 bg-white p-6 shadow-sm">
                <div className="rounded-full bg-purple-100 p-3">
                  <Scale className="h-6 w-6 text-purple-600" />
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold text-purple-700">
                    Ética personal
                  </h3>
                  <p className="text-sm text-gray-600">
                    En Livline tomamos el valor de la ética personal como un
                    valor fundamental ya que parte desde la calidad humana y la
                    responsabilidad social, ayudándonos a tener un mejor enfoque
                    para nuestros clientes.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-blue-100 bg-white p-6 shadow-sm">
                <div className="rounded-full bg-blue-100 p-3">
                  <HeartHandshake className="h-6 w-6 text-blue-600" />
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold text-blue-700">Respeto</h3>
                  <p className="text-sm text-gray-600">
                    En livline el respeto es La base para tener una convivencia
                    equilibrada en nuestro entorno laboral y con nuestros
                    clientes.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-blue-100 bg-white p-6 shadow-sm">
                <div className="rounded-full bg-blue-100 p-3">
                  <Smile className="h-6 w-6 text-blue-600" />
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold text-blue-700">
                    Bien común
                  </h3>
                  <p className="text-sm text-gray-600">
                    En livline El bien común impulsa las decisiones responsables
                    y éticas, garantizando que el crecimiento de nuestra empresa
                    también favorezca a los empleados, clientes, proveedores y
                    las comunidades beneficiadas por nuestro servicio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-700">
                  Nuestro Equipo
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  Profesionales dedicados a transformar la gestión de datos
                  médicos
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="flex flex-col items-center space-y-4"
                >
                  <div className="relative h-40 w-40 overflow-hidden rounded-full">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold text-blue-700">
                      {member.name}
                    </h3>
                    <p className="text-sm text-purple-600 font-medium">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
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
                  Estamos aquí para responder tus preguntas y ayudarte a
                  comenzar
                </p>
              </div>
            </div>
            {/* <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 lg:grid-cols-2"> */}
            <div className="mx-auto flex justify-center max-w-5xl gap-6 py-12">
              <div className="flex flex-col space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-blue-700">
                    Información de Contacto
                  </h3>
                  <p className="text-gray-600">
                    Estamos disponibles para atenderte de lunes a viernes de
                    9:00 a 18:00 horas.
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
                      <p className="text-sm text-gray-600">
                        livlinetulua@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-blue-100 p-2">
                      <MapPinIcon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Dirección</p>
                      <p className="text-sm text-gray-600">
                        Calle Innovación 123, 28001 Madrid, España
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="flex flex-col space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-blue-700">
                    Envíanos un Mensaje
                  </h3>
                  <p className="text-gray-600">
                    Completa el formulario y nos pondremos en contacto contigo
                    lo antes posible.
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Nombre
                      </label>
                      <input
                        id="name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Asunto
                    </label>
                    <input
                      id="subject"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Asunto de tu mensaje"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tu mensaje"
                    ></textarea>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                    Enviar Mensaje
                  </Button>
                </div>
              </div> */}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t bg-white py-6 md:py-8">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-6 w-6 text-blue-600" />
                  <span className="text-xl font-bold text-blue-600">
                    LivLine
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Transformando la gestión de datos médicos con tecnología de
                  vanguardia y los más altos estándares de seguridad.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-700">
                  Enlaces Rápidos
                </h3>
                <nav className="flex flex-col space-y-2">
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Inicio
                  </a>
                  <a
                    href="#about-us"
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Nosotros
                  </a>
                  <a
                    href="#team"
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Equipo
                  </a>
                  <a
                    href="#contact"
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Contacto
                  </a>
                </nav>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-700">Servicios</h3>
                <nav className="flex flex-col space-y-2">
                  <Link
                    to="/viewData"
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Consulta de Datos
                  </Link>
                </nav>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-700">Legal</h3>
                <nav className="flex flex-col space-y-2">
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Política de Privacidad
                  </a>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Términos de Servicio
                  </a>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Política de Cookies
                  </a>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    RGPD
                  </a>
                </nav>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600">
              <p>
                © {currentYear === 2025 ? currentYear : `2025 - ${currentYear}`}{" "}
                LivLine. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
