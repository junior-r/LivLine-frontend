import { Skeleton } from "@/components/ui/skeleton";
import { Loader2Icon } from "lucide-react";

export default function LoadingSection() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center`}
        >
          <Loader2Icon className="animate-spin h-6 w-6 text-slate-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Cargando información médica...
          </h2>
          <p className="text-sm text-slate-500">Por favor, espere.</p>
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
