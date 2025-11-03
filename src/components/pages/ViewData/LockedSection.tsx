import { PinVerification } from "@/pages/viewData/PinVerification";
import { Lock } from "lucide-react";

interface LockedSectionProps {
  pk: string;
}

export default function LockedSection({ pk }: LockedSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 flex flex-col items-center justify-center min-h-64">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <Lock className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">
        Información restringida
      </h3>
      <p className="text-slate-600 text-center mb-6 max-w-sm">
        Esta sección contiene información médica sensible y requiere
        verificación
      </p>
      <PinVerification userPk={pk} />
    </div>
  );
}
