import LoadingSection from "./LoadingSection";
import LockedSection from "./LockedSection";

interface MedicalSectionProps<T> {
  userPk: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  items: T[];
  shouldLock?: boolean;
  isLocked: boolean;
  isLoading: boolean;
  renderItem: (item: T) => React.ReactNode;
}

export default function MedicalSection<T>({
  userPk,
  icon,
  title,
  description,
  bgColor,
  items,
  shouldLock = true,
  isLocked,
  isLoading,
  renderItem,
}: MedicalSectionProps<T>) {
  if (isLoading) return <LoadingSection />;
  if (shouldLock && isLocked) return <LockedSection pk={userPk} />;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center`}
        >
          {icon}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>
      <div className="space-y-4">
        {items.length === 0 && (
          <p className="text-sm text-slate-500 text-center">
            No hay datos disponibles.
          </p>
        )}
        {items.map((item, index) => (
          <div
            key={index}
            className="pb-4 border-b border-slate-100 last:border-0 last:pb-0"
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
