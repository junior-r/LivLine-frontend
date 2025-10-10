import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-white py-6 md:py-8">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-blue-600">Livline</span>
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
            Livline. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
