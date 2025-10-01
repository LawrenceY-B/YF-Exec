import { useCampStepperStore } from "@/store/camp-stepper.store";
import { useCampStore } from "@/store/camp.store";
import { CheckIcon } from "lucide-react";
import { useEffect } from "react";

interface StepButtonProps {
  stepNumber: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

const StepButton = ({ stepNumber, title, isActive, isCompleted, isDisabled, onClick }: StepButtonProps) => {
  const getStepStyles = () => {
    if (isActive) {
      return "bg-blue-500";
    }
    if (isCompleted) {
      return "bg-green-500 hover:bg-green-600";
    }
    return "bg-gray-400 hover:bg-gray-500";
  };

  return (
    <div className="relative mb-1 flex items-center">
      <button
        className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-white transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${getStepStyles()} `}
        disabled={isDisabled}
        onClick={onClick}
        aria-label={`Step ${stepNumber}: ${title}`}
        aria-current={isActive ? "step" : undefined}
      >
        {isCompleted ? <CheckIcon className="h-4 w-4" /> : <span>{stepNumber}</span>}
      </button>

      <span className="absolute top-1/2 left-12 hidden -translate-y-1/2 text-sm font-medium whitespace-nowrap text-gray-700 sm:block">
        {title}
      </span>
    </div>
  );
};

const CampStepper = () => {
  const { section, currentStep, goToStep, getSections } = useCampStepperStore();
  const { campQuestionData } = useCampStore();

  useEffect(() => {
    if (campQuestionData && !section) {
      getSections(campQuestionData.sections);
    }
  }, [campQuestionData, section, getSections]);

  if (!section || section.length === 0) {
    return <div>No steps available</div>;
  }

  return (
    <aside role="navigation" aria-label="Form steps" className="no-scrollbar h-fit overflow-x-auto">
      <div className="flex items-center justify-between rounded-2xl bg-blue-100/50 p-6 sm:w-fit sm:flex-col sm:p-1">
        {section.map((sec, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isDisabled = index > currentStep;

          return (
            <StepButton
              key={sec.id}
              stepNumber={index + 1}
              title={sec.title}
              isActive={isActive}
              isCompleted={isCompleted}
              isDisabled={isDisabled}
              onClick={() => goToStep(index)}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default CampStepper;
