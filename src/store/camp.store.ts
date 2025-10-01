import {
  CampForm,
  ICampRegistration,
  IGetQuestionsResponse,
} from "@/models/camp-form";
import getQuestions from "@/services/api/camp.api";
import { toast } from "sonner";
import { create } from "zustand";

type State = {
  campQuestionData: CampForm | null;
  loading: boolean;
  error: string | null;
  campYear: number;
  campSubmissionData: ICampRegistration | null;
};
type Actions = {
  fetchCampQuestions: () => Promise<void>;
  setCampYear: (year: number) => void;
  setCampSubmissionData: (data: ICampRegistration) => void;
  clearError: () => void;
  reset: () => void;
};

export const useCampStore = create<State & Actions>((set) => ({
  campQuestionData: null,
  loading: false,
  error: null,
  campYear: new Date().getFullYear() + 1,
  campSubmissionData: null,

  setCampYear: (year: number) => set({ campYear: year }),

  fetchCampQuestions: async () => {
    set({ loading: true, error: null });
    try {
      const response: IGetQuestionsResponse = await getQuestions();
      if (response.responseCode !== "000") {
        set({ error: response.message, loading: false });
        return;
      }
      set({
        campQuestionData: response.data,
        loading: false,
        error: null,
        campYear: response.data.year,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load camp registration";

      toast.error(errorMessage);
      set({
        error: errorMessage || "Failed to fetch camp questions",
        loading: false,
      });
    }
  },
  clearError: () => set({ error: null }),

  setCampSubmissionData: (data: ICampRegistration) =>
    set({ campSubmissionData: data }),

  reset: () =>
    set({
      campQuestionData: null,
      loading: false,
      error: null,
      campYear: new Date().getFullYear() + 1,
      campSubmissionData: null,
    }),
}));
