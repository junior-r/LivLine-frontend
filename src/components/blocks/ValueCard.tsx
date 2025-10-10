import type { Value } from "@/types/data/value";

interface Props {
  value: Value;
}

function ValueCard({ value }: Props) {
  return (
    <div className="flex flex-col items-center space-y-4 rounded-lg border border-blue-100 bg-white p-6 shadow-sm transition hover:scale-105">
      <div className="rounded-full bg-blue-100 p-3">
        <value.icon className="h-6 w-6 text-blue-600" />
      </div>
      <div className="space-y-2 text-center">
        <h3 className="text-xl font-bold text-blue-700">{value.title}</h3>
        <p className="text-sm text-gray-600">{value.description}</p>
      </div>
    </div>
  );
}

export default ValueCard;
