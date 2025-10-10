import { CheckCircle } from "lucide-react";
import product1 from "@/assets/images/product/pulsera1.webp";

function ProductSection() {
  const productFeatures = [
    "Material hipoalergénico resistente al agua",
    "Código QR único vinculado a historial médico completo",
    "Información médica crítica visible para personal sanitario",
    "Cierre seguro con sistema anti-pérdida",
    "Talla única ajustable para todas las edades",
  ];

  return (
    <section id="product" className="py-16 md:py-24 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-700">
              Nuestro Producto
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
              Pulsera Livline con código QR para acceso inmediato a información
              médica vital
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-12 lg:grid-cols-2">
          {/* Product Images */}
          <div className="flex flex-col space-y-6">
            <div className="overflow-hidden rounded-lg border border-blue-100 shadow-sm">
              <img
                src={product1}
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductSection;
