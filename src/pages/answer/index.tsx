import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { AnswerDescButtonSheet } from "./answer-desc-botton-sheet/AnswerDescBottonSheet";
import { AnswerStartButton } from "./answer-start-botton-sheet/AnswerStartBottonSheet";
import { useUserStore } from "@/store/userStore";
import { useHistory } from "react-router-dom";
import pouch_with_mascot from "@/shared/assets/pouch/pouch_with_mascot.svg";
import { useQuestionInfo } from "@/hooks/useQuestionInfo";
import { useQuery } from "@/hooks/useQuery";

export function Answer() {
  const query = useQuery();

  const history = useHistory();
  const sqidsId = query.get("question") as string;

  const [selectedType, setSelectedType] = useState<"DESC" | "START" | null>(
    null
  );

  const { userInfo } = useUserStore();

  const { questionInfo } = useQuestionInfo({
    sqidsId,
  });

  const handleStartClick = () => {
    if (!questionInfo) return;

    if (
      !questionInfo.isAuthRequired ||
      (questionInfo.isAuthRequired && userInfo?.id)
    ) {
      history.push(`/answer-create?question=${sqidsId}`);
    } else {
      setSelectedType("START");
    }
  };

  const handleLogin = () => {
    localStorage.setItem("redirectPath", `/answer?question=${sqidsId}`);
    history.push("/member-login");
  };

  // 로그인 후 접근했을 때 삭제
  useEffect(() => {
    if (userInfo?.id) localStorage.removeItem("redirectPath");
  }, [userInfo?.id]);

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col my-auto">
        <div className="text-center mb-2 text-white">
          <p className="text-lg font-light">{questionInfo?.nickname}에게서</p>
          <p className="text-lg font-light">질문 보따리가 왔어!</p>
        </div>
        <div className="relative w-full flex justify-center items-center">
          <div className="relative w-96 h-96">
            <img src={pouch_with_mascot} alt="mascot" />
          </div>
        </div>
      </div>
      <div className="pb-10">
        <div className="flex flex-col gap-4 w-full">
          <Button
            className="w-full"
            onClick={() => setSelectedType("DESC")}
            children={"보따리와 구슬 알기"}
          />
          <Button
            variant="secondary"
            onClick={handleStartClick}
            children={
              <div className="w-full flex flex-row items-center justify-center gap-2">
                <span className="text-[#667EF5]">그냥 시작하기</span>
              </div>
            }
          />
        </div>
      </div>
      {selectedType === "DESC" && (
        <AnswerDescButtonSheet
          open={selectedType === "DESC"}
          onClose={() => setSelectedType(null)}
          onStart={handleStartClick}
        />
      )}
      {selectedType === "START" &&
        questionInfo?.isAuthRequired &&
        !userInfo?.id && (
          <AnswerStartButton
            isOpen={selectedType === "START"}
            onClose={() => setSelectedType(null)}
            onBack={() => {
              setSelectedType(null);
            }}
            onClick={handleLogin}
          />
        )}
    </div>
  );
}
