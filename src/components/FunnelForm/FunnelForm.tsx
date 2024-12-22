import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { FieldValues, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

type FunnelFormProps<T extends FieldValues> = {
  currentStep: number;
  totalSteps: number;
  form: UseFormReturn<T>;
  onNext: () => void;
  onSubmit: (data: T) => void;
  onPrev: () => void;
  isReadOnly?: boolean;
  children: React.ReactNode;
};

export function FunnelForm<T extends FieldValues>({
  currentStep,
  totalSteps,
  form,
  onNext,
  onSubmit,
  onPrev,
  isReadOnly,
  children,
}: FunnelFormProps<T>) {
  const isLastStep = currentStep === totalSteps;
  const handleSubmit = isReadOnly ? () => {} : form.handleSubmit(onSubmit);

  return (
    <Form {...form}>
      <div className="flex flex-col">
        <div className="flex-grow space-y-6">{children}</div>
        <div className="flex justify-between gap-2 py-10">
          {isLastStep && (
            <Button
              type="button"
              variant="secondary"
              className="w-full relative"
              onClick={onPrev}
            >
              <IoIosArrowBack
                className="absolute left-4"
                color="#667EF5"
                size={14}
              />
              이전
            </Button>
          )}
          {isLastStep ? (
            <Button onClick={handleSubmit} className="w-full">
              {`완료(${currentStep}/${totalSteps})`}
            </Button>
          ) : (
            <Button type="button" onClick={onNext} className="w-full relative">
              {`다음(${currentStep}/${totalSteps})`}
              <IoIosArrowForward
                className="absolute right-4"
                size={132}
                color="#FFFFFF"
              />
            </Button>
          )}
        </div>
      </div>
    </Form>
  );
}
