interface FormStepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const FormStepIndicator = ({ currentStep, totalSteps }: FormStepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i + 1}
          className={`w-3 h-3 rounded-full ${
            currentStep === i + 1 ? "bg-primary" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
};