import { Loader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { useResponseStatusStore } from "@/store/api/useResponseStatus";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon, ArrowRight, Search } from "lucide-react";
import ErrorForm from "@/components/pages/ErrorForm";
import { getUserByEmailOrPk } from "@/actions/user";

function SearchMedicalDataPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const errorStatus = useResponseStatusStore((state) => state.errorStatus);
  const setError = useResponseStatusStore((state) => state.setError);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setError("Por favor, ingresa un ID o email para buscar");
      return;
    }

    setIsLoading(true);
    const res = await getUserByEmailOrPk(searchQuery);

    if (res.error) {
      setError("No se encontró ningún usuario con ese ID o email");
      setIsLoading(false);
      return;
    }

    if ("user" in res.data) {
      const { pk } = res.data.user;
      navigate(`/viewData/${pk}`);
      setIsLoading(false);
      return;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full gap-2">
        <Loader size="md" />
        <span>Cargando...</span>
      </div>
    );
  }

  return (
    <section className="py-12 md:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <div className="container px-4 md:px-6 mx-auto">
        <Button
          variant={"outline"}
          className="flex items-center gap-2 w-fit mb-4"
          asChild
        >
          <Link to={"/"}>
            <ArrowLeftIcon />
            <span>Volver</span>
          </Link>
        </Button>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-800">
                Consulta de Datos Médicos
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl">
                Accede de forma segura a la información médica utilizando el ID
                o email del paciente.
              </p>
            </div>

            <div className="space-y-4 mt-6">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="search"
                    className="text-sm font-medium text-gray-700"
                  >
                    ID o Email del Paciente
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="search"
                      type="text"
                      placeholder="Ingresa ID o email"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1"
                      readOnly={isLoading}
                    />
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          <span>Buscando...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Search className="h-4 w-4" />
                          <span>Buscar</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </div>

                {errorStatus.error && (
                  <ErrorForm message={errorStatus.message} />
                )}
              </form>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-100 rounded-full opacity-70"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-100 rounded-full opacity-70"></div>
              <div className="relative bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-center mb-6">
                  <div className="rounded-full bg-blue-100 p-3">
                    <Search className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center text-blue-700 mb-4">
                  Acceso Seguro
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                      <ArrowRight className="h-3 w-3 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-600">
                      Verificación de identidad para proteger la privacidad del
                      paciente
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                      <ArrowRight className="h-3 w-3 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-600">
                      Acceso instantáneo a historiales médicos y resultados de
                      pruebas
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                      <ArrowRight className="h-3 w-3 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-600">
                      Conexión cifrada de extremo a extremo para máxima
                      seguridad
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="rounded-full bg-purple-100 p-1 mt-0.5">
                      <ArrowRight className="h-3 w-3 text-purple-600" />
                    </div>
                    <span className="text-sm text-gray-600">
                      Cumplimiento con todas las normativas de protección de
                      datos médicos
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchMedicalDataPage;
