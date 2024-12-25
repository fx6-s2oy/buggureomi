import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { AnswerDescButtonSheet } from "./answer-desc-botton-sheet/AnswerDescBottonSheet";
import { AnswerStartButton } from "./answer-start-botton-sheet/AnswerStartBottonSheet";
import { useUserStore } from "@/store/userStore";
import { useHistory, useLocation } from "react-router-dom";
import { questionAPI } from "@/api/question";
import mascot_front_standing from "@/shared/assets/mascot/mascot-front-standing.svg";
import { useToast } from "@/hooks/use-toast";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export function Answer() {
  const query = useQuery();
  const { toast } = useToast();
  const history = useHistory();

  const sqidsId = query.get("question") as string;
  const [isAuthRequired, setIsAuthRequired] = useState<boolean>(false);
  const [questionId, setQuestionId] = useState<number | null>(null);

  const [selectedType, setSelectedType] = useState<"DESC" | "START" | null>(
    null
  );

  const { userInfo } = useUserStore();

  const getQuestionInfo = async () => {
    if (!sqidsId) return;

    try {
      const res = await questionAPI.getQuestion(sqidsId);
      setIsAuthRequired(res.data.data.is_Auth_Required === 1);
      setQuestionId(res.data.data.questionId);
    } catch {
      toast({
        description: "질문 정보를 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getQuestionInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sqidsId, history]);

  useEffect(() => {
    if (selectedType === "START") {
      if (!isAuthRequired || (isAuthRequired && userInfo?.id)) {
        // MEMO: 로그인이 필요없거나, 필요하지만 이미 로그인된 경우
        history.push({
          pathname: "/answer-create",
          state: { questionId },
        });
      }
    }
  }, [selectedType, isAuthRequired, userInfo, questionId, history]);

  // if (!userInfo?.id) {
  //   // TODO: 질문에 설정된 옵션에 따라 login 체크 여부 나뉘도록 설정 필요
  //   return <DirectLogin />;
  // }

  return (
    <>
      <div className="flex flex-col items-center mt-20 text-white overflow-hidden min-h-[30rem]">
        <div className="text-center mb-2">
          <p className="text-lg font-light">OOO에게서</p>
          <p className="text-lg font-light">질문 보따리가 왔어!</p>
        </div>
        <div className="relative w-full flex justify-center items-center">
          {/* MEMO: 말풍선 디자인 논의 필요 */}
          {/* <div className="absolute  md:w-96 lg:w-[30rem] top-36 z-[auto]">
            <img
              src="/images/arrow.png"
              alt="arrow"
              className="w-full h-auto"
            />
          </div> */}
          {/* MEMO: 마스코트 디자인 논의 필요 */}
          <div className="relative w-96 h-96">
            <img
              src={mascot_front_standing}
              alt="Bear"
              className="w-full h-full rotate-[35deg]"
            />
          </div>
        </div>
      </div>
      <div className="p-[2.5rem]">
        <div className="flex flex-col gap-4 w-full">
          <Button
            className="w-full"
            onClick={() => setSelectedType("DESC")}
            children={"보따리와 구슬 알기"}
          />
          <Button
            variant="secondary"
            onClick={() => setSelectedType("START")}
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
          onClose={() => setSelectedType(null)}
          onStart={() => {
            setSelectedType("START");
          }}
        />
      )}
      {selectedType === "START" && isAuthRequired && !userInfo?.id && (
        <AnswerStartButton
          onClose={() => setSelectedType(null)}
          onBack={() => {
            setSelectedType("DESC");
          }}
          onClick={() => {
            history.push("/member-login");
          }}
        />
      )}
    </>
  );
}
