import { Loader2Icon } from "lucide-react";

function LoadingCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center bg-slate-100 animate-pulse`}
        >
          <Loader2Icon className="animate-spin h-6 w-6 text-slate-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-600">Cargando...</p>
          <p className="text-xl font-semibold text-slate-900 mt-0.5">
            Por favor, espere.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoadingCard;
