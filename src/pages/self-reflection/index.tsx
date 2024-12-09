import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ConfirmDialog } from "@/pages/self-reflection/components/ConfirmDialog";
import { selfReflectionSchema } from "@/pages/self-reflection/schemas/reflectionSchema";
import { useToast } from "@/hooks/use-toast";
import { selfReflection } from "@/api/self-reflection";
import { useHistory } from "react-router-dom";
import {
  ReflectionAnswer,
  ReflectionQuestion,
} from "@/api/self-reflection/type";
import ReadOnlyReflection from "@/pages/self-reflection/ReadOnlyReflection";

const DESCRIPTION = {
  WRITE: "수정이 불가능하니 나를 깊게 돌아봐주세요",
  READ: "이전에 작성한 나의 회고입니다",
} as const;

const FORM_FIELDS = [
  {
    name: "regret",
    label: "올해 가장 후회되는 일은?",
    placeholder: "후회되는 일을 적어주세요",
    type: "input",
  },
  {
    name: "bestThing",
    label: "올해 가장 잘한 일은?",
    placeholder: "잘한 일을 적어주세요",
    type: "input",
  },
  {
    name: "nextYearGoal",
    label: "내년에는 이것만큼은 꼭 해내야지!",
    placeholder: "내년의 목표를 적어주세요",
    type: "input",
  },
  {
    name: "message2024",
    label: "2024년의 나에게 하고싶은 한마디",
    placeholder: "2024년의 나에게 메시지를 남겨주세요",
    type: "textarea",
  },
  {
    name: "message2025",
    label: "2025년의 나에게 하고 싶은 한마디",
    placeholder: "2025년의 나에게 메시지를 남겨주세요",
    type: "textarea",
  },
] as const;

export default function SelfReflection() {
  const { toast } = useToast();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [questions, setQuestions] = useState<ReflectionQuestion[]>([]);
  const [existingAnswers, setExistingAnswers] = useState<ReflectionAnswer[]>(
    []
  );

  const history = useHistory();
  const userId = localStorage.getItem("userId");

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

  const fetchQuestions = async () => {
    if (!userId) return;
    try {
      const [questionsRes, answersRes] = await Promise.all([
        selfReflection.getCommonQuestions(userId),
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

  function onSubmit() {
    setShowConfirmModal(true);
  }

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
    if (userId) {
      fetchQuestions();
    }
  }, [userId]);

  return (
    <div className="w-full">
      <h3 className="text-h3 text-gray-dark">나 돌아보기</h3>
      <p className="text-body text-destructive">
        {existingAnswers.length > 0 ? DESCRIPTION.READ : DESCRIPTION.WRITE}
      </p>
      {existingAnswers.length > 0 ? (
        <ReadOnlyReflection answers={existingAnswers} questions={questions} />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {FORM_FIELDS.map(({ name, label, placeholder, type }) => (
              <FormField
                key={name}
                control={form.control}
                name={name as keyof z.infer<typeof selfReflectionSchema>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-dark">{label}</FormLabel>
                    <FormControl>
                      {type === "input" ? (
                        <Input placeholder={placeholder} {...field} />
                      ) : (
                        <Textarea placeholder={placeholder} {...field} />
                      )}
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
            ))}
            <Button
              size="lg"
              type="submit"
              className="w-full"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
            >
              제출하기
            </Button>
          </form>
        </Form>
      )}
      <ConfirmDialog
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmSubmission}
      />
    </div>
  );
}
