import { create } from "zustand";
import { persist } from "zustand/middleware";

export const TTL_IN_MS = 5 * 60 * 1000; // 5 minutes

type PinState = {
  isPinValidated: boolean;
  validationTime: number | null;
  setPinValidated: (validated: boolean) => void;
};

export const useValidatePinStore = create(
  persist<PinState>(
    (set) => ({
      validationTime: null,
      isPinValidated: false,
      setPinValidated: (validated) =>
        set({
          isPinValidated: validated,
          validationTime: validated ? Date.now() : null,
        }),
    }),
    {
      name: "pin-validation-storage",

      onRehydrateStorage: () => (state) => {
        if (!state?.validationTime) return;

        const now = Date.now();
        const timePassed = now - state.validationTime;

        if (timePassed > TTL_IN_MS) {
          console.log("PIN validation expired. Resetting state...");
          state.isPinValidated = false;
          state.validationTime = null;
        }
      },
    }
  )
);
