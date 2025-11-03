import { usePinSessionTimer } from "@/hooks/usePinSessionTimer";

// Helper: Formats seconds to M:SS
const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  // padStart ensures we see "1:05" instead of "1:5"
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

/**
 * Component that displays the countdown
 * for the PIN session expiration.
 * It renders as a fixed 'portal' or 'toast'.
 */
export default function PinSessionTimerDisplay() {
  const secondsLeft = usePinSessionTimer();

  // If there's no active session (0 seconds),
  // this component simply renders nothing.
  if (secondsLeft <= 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-gray-800 px-4 py-2 text-white shadow-lg">
      <p className="text-sm">
        Datos visibles por:{" "}
        <strong className="font-mono text-base">
          {formatTime(secondsLeft)}
        </strong>
      </p>
    </div>
  );
}
