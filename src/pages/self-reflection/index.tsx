import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ConfirmDialog } from "@/pages/self-reflection/components/ConfirmDialog";
import { selfReflectionSchema } from "@/pages/self-reflection/schemas/reflectionSchema";
import { useToast } from "@/hooks/use-toast";
import { selfReflection } from "@/api/self-reflection";
import { useHistory } from "react-router-dom";
import {
  ReflectionAnswer,
  ReflectionQuestion,
} from "@/api/self-reflection/type";

import { useUserStore } from "@/store/userStore";
import TextFieldWrapper from "@/components/common/TextFieldWrapper";
import { FunnelForm } from "@/components/FunnelForm/FunnelForm";

const FORM_FIELDS = [
  {
    name: "regret",
    label: "올해 가장 후회되는 일은?",
    placeholder: "후회되는 일을 적어주세요",
    type: "textarea",
    size: "s",
  },
  {
    name: "bestThing",
    label: "올해 가장 잘한 일은?",
    placeholder: "잘한 일을 적어주세요",
    type: "textarea",
    size: "s",
  },
  {
    name: "nextYearGoal",
    label: "내년에는 이것만큼은 꼭 해내야지!",
    placeholder: "내년의 목표를 적어주세요",
    type: "textarea",
    size: "s",
  },
  {
    name: "message2024",
    label: "2024년의 나에게 하고싶은 한마디",
    placeholder: "2024년의 나에게 메시지를 남겨주세요",
    type: "textarea",
    size: "l",
  },
  {
    name: "message2025",
    label: "2025년의 나에게 하고 싶은 한마디",
    placeholder: "2025년의 나에게 메시지를 남겨주세요",
    type: "textarea",
    size: "l",
  },
] as const;

type Step = 1 | 2;
type FormField = (typeof FORM_FIELDS)[number];
type StepNumber = 1 | 2;
type StepFields = {
  [K in StepNumber]: FormField[];
};

export default function SelfReflection() {
  const { toast } = useToast();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [questions, setQuestions] = useState<ReflectionQuestion[]>([]);
  const [existingAnswers, setExistingAnswers] = useState<ReflectionAnswer[]>(
    []
  );
  const [step, setStep] = useState(1);

  const history = useHistory();
  const { userId } = useUserStore();

  const form = useForm<z.infer<typeof selfReflectionSchema>>({
    resolver: zodResolver(selfReflectionSchema),
    defaultValues: {
      regret: "",
      bestThing: "",
      nextYearGoal: "",
      message2024: "",
      message2025: "",
    },
  });

  const STEP_FIELDS: StepFields = {
    1: FORM_FIELDS.slice(0, 3),
    2: FORM_FIELDS.slice(3),
  };

  const handlePrev = () => {
    setStep(1);
  };

  const handleNext = () => {
    const currentFields = ["regret", "bestThing", "nextYearGoal"] as const;
    form.trigger(currentFields).then((isValid) => {
      if (isValid) {
        setStep(2);
      }
    });
  };

  const handleSubmit = () => {
    setShowConfirmModal(true);
  };

  const confirmSubmission = async () => {
    if (!userId) return;
    const formData = form.getValues();

    const reflections = [
      { questionId: questions[0]?.id, content: formData.regret },
      { questionId: questions[1]?.id, content: formData.bestThing },
      { questionId: questions[2]?.id, content: formData.nextYearGoal },
      { questionId: questions[3]?.id, content: formData.message2024 },
      { questionId: questions[4]?.id, content: formData.message2025 },
    ].filter((item) => item.questionId);

    try {
      await selfReflection.submitReflections(userId, reflections);
      toast({
        title: "제출 완료",
        description: "회고가 성공적으로 저장되었습니다.",
      });
      history.push("/main");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "제출 실패",
        description: "회고 저장에 실패했습니다. 다시 시도해주세요.",
      });
    } finally {
      setShowConfirmModal(false);
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!userId) return;
      try {
        const [questionsRes, answersRes] = await Promise.all([
          selfReflection.getCommonQuestions(),
          selfReflection.getSelfReflection(userId),
        ]);
        setQuestions(questionsRes.data.data);
        setExistingAnswers(answersRes.data.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "질문 로딩 실패",
          description: "질문을 불러오는데 실패했습니다. 다시 시도해주세요.",
        });
      }
    };

    if (userId) {
      fetchQuestions();
    }
  }, [userId, toast]);

  return (
    <div className="w-full h-screen">
      <h2 className="text-h2 text-white text-center mb-6">나 돌아보기</h2>

      <FunnelForm
        currentStep={step}
        totalSteps={2}
        form={form}
        onNext={handleNext}
        onSubmit={handleSubmit}
        onPrev={handlePrev}
        isReadOnly={existingAnswers.length > 0}
      >
        {STEP_FIELDS[step as Step].map(
          ({ name, label, placeholder, size, type }) => (
            <FormField
              key={name}
              control={form.control}
              name={name as keyof z.infer<typeof selfReflectionSchema>}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextFieldWrapper
                      title={label}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={placeholder}
                      size={size}
                      multiline={type === "textarea"}
                      maxLength={300}
                      isReadOnly={existingAnswers.length > 0}
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />
          )
        )}
      </FunnelForm>
      <ConfirmDialog
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmSubmission}
      />
    </div>
  );
}
