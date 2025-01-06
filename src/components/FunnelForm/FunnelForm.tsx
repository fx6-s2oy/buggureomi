import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { FieldValues, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  const isLastStep = currentStep === totalSteps;

  const handleSubmit = () => {
    if (isReadOnly) {
      history.push("/main");
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <Form {...form}>
      <div className="flex flex-col h-full">
        <div className="my-auto">
          <h2 className="text-h2 text-white text-center mb-6">나 돌아보기</h2>
          <div className="flex flex-col gap-6">{children}</div>
        </div>
        <div className="py-10 mt-auto">
          <div className="flex justify-between gap-2">
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
                {`${
                  isReadOnly ? "닫기" : "완료"
                }(${currentStep}/${totalSteps})`}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={onNext}
                className="w-full relative"
              >
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
      </div>
    </Form>
  );
}
