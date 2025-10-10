import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import textFiles from "@/assets/images/home/textFiles.svg";

function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-blue-800">
                Transformando la Gestión de Datos Médicos
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl">
                Livline es una plataforma segura y eficiente para registrar,
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
  );
}

export default HeroSection;
