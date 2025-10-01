import { Section } from "@/models/camp-form";
import { create } from "zustand";

type State = {
  section: Section[] | null;
  currentStep: number;
  totalSteps: number;
  currentSection: Section | null;
};
type Actions = {
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetStepper: () => void;
  setCurrentSection: () => void;

  getSections: (sections: Section[]) => void;
};

export const useCampStepperStore = create<State & Actions>((set, get) => ({
  section: null,
  currentStep: 0,
  totalSteps: 0,
  currentSection: null,

  nextStep: () => {
    const { currentStep, totalSteps } = get();
    if (currentStep < totalSteps - 1) {
      set({ currentStep: currentStep + 1 });
    }
  },
  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 0) {
      set({ currentStep: currentStep - 1 });
    }
  },
  goToStep: (step: number) => {
    const { totalSteps } = get();
    if (step >= 0 && step < totalSteps) {
      set({ currentStep: step });
    }
  },
  resetStepper: () => set({ currentStep: 0, section: null, totalSteps: 0 }),

  getSections: (sections: Section[]) => {
    set({ section: sections, totalSteps: sections.length });
  },
  setCurrentSection: () => {
    const { section, currentStep } = get();
    if (section) {
      set({ currentSection: section[currentStep] });
    }
  },
}));
