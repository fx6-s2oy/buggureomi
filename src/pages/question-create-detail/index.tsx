import { useHistory, useLocation } from "react-router-dom";
import { DirectLogin } from "@/components/display/DirectLogin";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { QuestionBundle } from "@/components/question/QuestionBundle";
import { questionAPI } from "@/api/question";
import { useUserStore } from "@/store/userStore";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface QuestionContent {
  content: string; // question의 타입에 따라 변경
}

export default function QuestionCreateDetail() {
  const history = useHistory();
  const location = useLocation<QuestionContent>();
  const content = (location.state as QuestionContent)?.content;
  const { userInfo } = useUserStore();
  const { toast } = useToast();

  const [settings, setSettings] = useState({
    isCountVisible: 1,
    isAuthRequired: 1,
    isPublicVisible: 1,
  });

  const handleUpdateSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: prev[key] === 1 ? 0 : 1,
    }));
  };

  if (!userInfo?.id) {
    return <DirectLogin />;
  }

  const handleClick = async () => {
    try {
      const res = await questionAPI.create({
        memberId: userInfo?.id,
        content: location.state.content,
        ...settings,
      });

      toast({
        description: "질문이 생성되었습니다.",
      });
      history.push({
        pathname: "/question-complete",
        state: { questionId: res.data.data.questionId },
      });
    } catch {
      toast({
        description: "질문 생성에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="flex flex-col justify-between h-full">
      <div className="flex flex-col my-auto">
        <p className="text-center text-white text-2xl">
          <b>거의 다 왔어요!</b>
          <br />
          디테일을 잡아볼까요?
        </p>
        <QuestionBundle value={content} />
        <div className="flex w-full flex-col gap-5">
          <div className="flex items-center gap-x-2 justify-between">
            <Label
              htmlFor="show-answer-counts"
              className="font-bold text-sm text-white"
            >
              구슬(답변) 개수 공개
            </Label>
            <Switch
              id="show-answer-counts"
              checked={settings.isCountVisible === 1}
              onCheckedChange={() => handleUpdateSetting("isCountVisible")}
            />
          </div>
          <div className="flex items-center gap-x-2 justify-between">
            <Label
              htmlFor="is-auth-required"
              className="font-bold text-sm text-white"
            >
              로그인 유저만 답변 가능
            </Label>
            <Switch
              id="is-auth-required"
              checked={settings.isAuthRequired === 1}
              onCheckedChange={() => handleUpdateSetting("isAuthRequired")}
            />
          </div>
          <div className="flex items-center gap-x-2 justify-between">
            <Label
              htmlFor="is-public-visible"
              className="font-bold text-sm text-white"
            >
              다른 유저 조회 가능
            </Label>
            <Switch
              id="is-public-visible"
              checked={settings.isPublicVisible === 1}
              onCheckedChange={() => handleUpdateSetting("isPublicVisible")}
            />
          </div>
        </div>
      </div>
      <div className="py-10">
        <Button className="w-full" onClick={handleClick} children={"만들기"} />
      </div>
    </section>
  );
}
