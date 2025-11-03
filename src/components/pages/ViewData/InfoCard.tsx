import LoadingCard from "./LoadingCard";

type Props = {
  title: string;
  description?: string;
  bgColor: string;
  icon: React.ReactNode;
  iconColor: string;
  isLoading: boolean;
};

function InfoCard({
  title,
  description,
  bgColor,
  icon,
  iconColor,
  isLoading,
}: Props) {
  if (isLoading) return <LoadingCard />;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center ${iconColor}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-xl font-semibold text-slate-900 mt-0.5">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
