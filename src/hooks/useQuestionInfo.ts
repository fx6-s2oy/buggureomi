import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { questionAPI } from "@/api/question";
import { useUserStore } from "@/store/userStore";
import { useToast } from "@/hooks/use-toast";

interface QuestionInfo {
  questionId: number;
  nickname: string;
  content: string;
  isPublicVisible: boolean;
  isCountVisible: boolean;
  isAuthRequired: boolean;
}

interface UseQuestionInfoProps {
  sqidsId: string;
  redirectTo?: string;
}

export function useQuestionInfo({
  sqidsId,
  redirectTo = "/answer",
}: UseQuestionInfoProps) {
  const [questionInfo, setQuestionInfo] = useState<QuestionInfo | null>(null);

  const history = useHistory();
  const { toast } = useToast();
  const { userInfo } = useUserStore();

  const fetchQuestionInfo = async () => {
    if (!sqidsId?.trim()) {
      history.push(redirectTo);
      return;
    }

    try {
      const res = await questionAPI.getQuestion(sqidsId);
      const { data } = res.data;

      const questionInfo = {
        questionId: data.questionId,
        nickname: data.nickname,
        content: data.content,
        isPublicVisible: data.isPublicVisible === 1,
        isCountVisible: data.isCountVisible === 1,
        isAuthRequired: data.isAuthRequired === 1,
      };

      setQuestionInfo(questionInfo);

      if (questionInfo.isAuthRequired && !userInfo?.id) {
        history.push(`/answer?question=${sqidsId}`);
      }
    } catch (err) {
      toast({
        description: "질문 정보를 불러오는데 실패했습니다.",
        variant: "destructive",
      });
      history.push(redirectTo);
    }
  };

  useEffect(() => {
    if (!sqidsId) return;
    fetchQuestionInfo();
  }, [sqidsId]);

  return {
    questionInfo,
  };
}
