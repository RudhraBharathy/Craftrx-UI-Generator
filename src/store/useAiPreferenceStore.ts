import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AiPreferenceStore {
  currAiPreference: string;
  setAiPreference: (preference: string) => void;
}

export const useAiPreferenceStore = create<AiPreferenceStore>()(
  persist(
    (set) => ({
      currAiPreference: "gemini",
      setAiPreference: (preference) => set({ currAiPreference: preference }),
    }),
    {
      name: "AiChatPreference",
    }
  )
);
