function AboutSection() {
  return (
    <section id="about-us" className="py-16 md:py-24 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-600">
              Sobre Nosotros
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
              En Livline, nos dedicamos a revolucionar la forma en que los
              profesionales de la salud acceden y utilizan los datos médicos.
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
                información, buscando la seguridad y facilidad de las personas
                para poder llevar su información médica a todas partes, estamos
                ubicados en el municipio de Tuluá, Valle del Cauca, para
                asegurar el bienestar de las personas en casos de emergencia.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-blue-600">
                Nuestra Visión
              </h3>
              <p className="text-gray-600">
                Para el año 2030 Livline será una empresa reconocida a nivel
                municipal por la producción de manillas con placas de
                información, distinguiéndonos por la facilidad que le ofrecemos
                a nuestros clientes de portar su información médica a todas
                partes y una excelente atención al cliente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
