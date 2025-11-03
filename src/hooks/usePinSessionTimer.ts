import {
  TTL_IN_MS,
  useValidatePinStore,
} from "@/store/medicalData/useValidatePinStore";
import { useState, useEffect, useCallback } from "react";

/**
 * Hook to manage the PIN session timer logic.
 * Subscribes to the Zustand store and returns the remaining seconds.
 * Handles resetting the 'isPinValidated' state upon expiration.
 */
export const usePinSessionTimer = () => {
  // 1. Subscription to the global state
  const isPinValidated = useValidatePinStore((state) => state.isPinValidated);
  const validationTime = useValidatePinStore((state) => state.validationTime);
  const setPinValidated = useValidatePinStore((state) => state.setPinValidated);

  // 2. Local state for the countdown timer
  const [secondsLeft, setSecondsLeft] = useState(0);

  // 3. Helper to calculate the remaining time
  const getRemainingTime = useCallback(() => {
    if (!validationTime) return 0;

    const now = Date.now();
    const expirationTime = validationTime + TTL_IN_MS;
    const remainingMs = Math.max(0, expirationTime - now);
    return Math.ceil(remainingMs / 1000);
  }, [validationTime]);

  useEffect(() => {
    // If the session is not active, ensure the counter is at 0
    if (!isPinValidated || !validationTime) {
      setSecondsLeft(0);
      return;
    }

    // Set the initial value on load
    setSecondsLeft(getRemainingTime());

    // The timer 'tick'
    const timerId = setInterval(() => {
      const remaining = getRemainingTime();
      setSecondsLeft(remaining);

      // If the time reaches 0, clear the interval and reset the store
      if (remaining === 0) {
        clearInterval(timerId);
        console.log("PIN expired (from hook). Resetting state...");
        setPinValidated(false);
      }
    }, 1000);

    // Effect cleanup
    return () => clearInterval(timerId);
  }, [isPinValidated, validationTime, setPinValidated, getRemainingTime]);

  // 3. The hook only exposes the remaining seconds
  return secondsLeft;
};
