import { Skeleton } from "@/components/ui/skeleton";

/**
 * A simple "ghost" component that simulates a locked content card.
 * It uses blur and a gradient to give the effect of "more hidden content".
 */
export const LockedContentHint = ({
  className = "",
}: {
  className?: string;
}) => {
  return (
    <div
      className={`relative h-48 overflow-hidden rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-6 opacity-70 blur-[2px] dark:border-gray-700 dark:bg-gray-800/20 ${className}`}
      aria-hidden="true"
    >
      <Skeleton className="mt-6 h-8 w-1/4 rounded-md bg-gray-400" />
      <Skeleton className="mt-2 h-6 w-3/4 rounded-md bg-gray-400" />
      <Skeleton className="mt-2 h-6 w-5/6 rounded-md bg-gray-400" />
      <Skeleton className="mt-4 h-6 w-2/3 rounded-md bg-gray-400" />

      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-gray-900 dark:via-gray-900/80"></div>
    </div>
  );
};

// No olvides exportarlo desde donde lo necesites
