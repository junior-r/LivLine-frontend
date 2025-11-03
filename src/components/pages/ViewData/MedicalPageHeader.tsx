import { Skeleton } from "@/components/ui/skeleton";
import { useValidatePinStore } from "@/store/medicalData/useValidatePinStore";
import type { UserData } from "@/types/dashboard/user";
import { Lock } from "lucide-react";

interface Props {
  isLoading: boolean;
  userBaseData: UserData | undefined;
}

function MedicalPageHeader({ isLoading, userBaseData }: Props) {
  const isPinValidated = useValidatePinStore((state) => state.isPinValidated);

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              Registro Médico
            </h1>
            <p className="text-slate-600 mt-1">
              Panel de información de salud personal
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-medium text-slate-900">
                {isLoading ? (
                  <Skeleton className="h-5 w-32 rounded-md" />
                ) : (
                  <p>
                    {userBaseData?.name} {userBaseData?.lastName}
                  </p>
                )}
              </div>
              {isPinValidated ? (
                <div className="flex items-center gap-1 mt-1">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <p className="text-xs text-emerald-600 font-medium">
                    Acceso completo
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-1 mt-1">
                  <Lock className="w-3 h-3 text-red-600" />
                  <p className="text-xs text-red-600 font-medium">
                    Acceso restringido
                  </p>
                </div>
              )}
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg shadow-md">
              {isLoading ? (
                <Skeleton className="w-8 h-8 rounded-full" />
              ) : (
                userBaseData?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default MedicalPageHeader;
