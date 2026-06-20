import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface BookingStepperProps {
  currentStep: number;
  steps: { label: string }[];
  locale: string;
}

export function BookingStepper({ currentStep, steps }: BookingStepperProps) {
  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center">
          {/* Step Circle */}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors",
                i < currentStep
                  ? "bg-primary text-primary-foreground"
                  : i === currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
              )}
            >
              {i < currentStep ? (
                <Check className="h-4 w-4" />
              ) : (
                i + 1
              )}
            </div>
            <span
              className={cn(
                "text-xs mt-1.5",
                i <= currentStep ? "text-foreground font-medium" : "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
          </div>

          {/* Connector Line */}
          {i < steps.length - 1 && (
            <div
              className={cn(
                "w-12 sm:w-20 h-0.5 mx-2 mt-[-1rem]",
                i < currentStep ? "bg-primary" : "bg-muted"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
