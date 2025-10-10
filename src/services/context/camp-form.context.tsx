import { Details, ICampRegistration } from "@/models/camp-form";
import { useCampStore } from "@/store/camp.store";
import { createContext, useContext, useState } from "react";

type CampFormContextType = {
  campFormData: Partial<Details> | null;
  setCampFormData: (data: Partial<Details> | null) => void;
  updateFormData: (updates: Partial<Details>) => void;
  submitForm: () => Promise<void>;
  isSubmitting: boolean;
  hasUnsavedChanges: boolean;
  resetForm: () => void;
};

const CampFormContext = createContext<CampFormContextType | undefined>(undefined);

export const CampFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [campFormData, setCampFormData] = useState<Partial<Details> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const { submitCampRegistration, resetSubmissionData, campQuestionData, campYear } = useCampStore();

  const updateFormData = (updates: Partial<Details>) => {
    setCampFormData((prev: Partial<Details> | null) => {
      if (!prev) return updates;
      const updated = { ...prev, ...updates };
      console.table(updated);
      setHasUnsavedChanges(true);
      return updated;
    });
  };

  const submitForm = async () => {
    const data: ICampRegistration = {
      formId: campQuestionData?.formId || "",
      year: campYear || 0,
      details: {
        ...(campFormData as Details),
      },
    };

    if (!data || !isCompleteRegistration(data)) {
      console.table();
      throw new Error("Form data is incomplete");
    }

    setIsSubmitting(true);
    try {
      await submitCampRegistration(data);
      setHasUnsavedChanges(false);
    } catch (error) {
      //add toast error notification here
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCompleteRegistration = (data: Partial<ICampRegistration>): data is ICampRegistration => {
    return !!(data.formId && data.year && data.details);
  };

  const resetForm = () => {
    resetSubmissionData();
    setCampFormData(null);
    setHasUnsavedChanges(false);
  };

  return (
    <CampFormContext.Provider
      value={{
        campFormData,
        setCampFormData,
        updateFormData,
        submitForm,
        isSubmitting,
        hasUnsavedChanges,
        resetForm,
      }}
    >
      {children}
    </CampFormContext.Provider>
  );
};

export const useCampContext = () => {
  const context = useContext(CampFormContext);
  if (context === undefined) {
    throw new Error("useCampForm must be used within a CampFormProvider");
  }
  return context;
};
