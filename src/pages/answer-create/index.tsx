import { useState } from "react";
// import { useLocation } from "react-router-dom";

import { answerAPI } from "@/api/answer";

import { Button } from "@/components/ui/button";

import { DirectLogin } from "@/components/display/DirectLogin";

import { COLOR_CODE_LIST } from "@/constant/color";

import { useUserStore } from "@/store/userStore";
import { Bead } from "@/components/bead/Bead";
import { IoChevronForward } from "react-icons/io5";
import TextFieldWrapper from "@/components/common/TextFieldWrapper";
import { useToast } from "@/hooks/use-toast";

const colorGroups = [
  ["EF4C4D", "FF884D", "FFC44E", "89C94D", "0A8403"],
  ["4DC3FF", "3451E3", "A071FF", "832AFE", "FF4DA5"],
  ["FFC088", "BD6C41", "FFFFFF", "8E8E8E", "000000"],
];

/** @todo 라우트 작업 후 questionId로 질문 정보 조회하는 api 연결 시 주석 해제*/
//interface QuestionId {
//   questionId: string;
// }

export default function AnswerCreate() {
  const { toast } = useToast();
  const { userInfo } = useUserStore();
  // const location = useLocation<QuestionId>();

  // const questionId = location.state?.questionId;

  const [colorCode, setColorCode] = useState<string | undefined>(undefined);
  const [content, setContent] = useState<string>("");
  const [senderName, setSenderName] = useState<string>("");

  if (!userInfo?.id) {
    // TODO: 질문에 설정된 옵션에 따라 login 체크 여부 나뉘도록 설정 필요
    return <DirectLogin />;
  }
  const sendAnswer = async () => {
    // if (!questionId) return;

    await answerAPI
      .create({
        memberId: 24, // MOCK, memberId 할당 필요
        questionId: 24, // MOCK, questionId 할당 필요
        nickname: userInfo.nickname,
        sender: senderName,
        content,
        colorCode: colorCode ?? COLOR_CODE_LIST[0],
      })
      .then(() => {
        // todo: answer-create-complete 페이지로 redirect
      })
      .catch(() => {
        toast({
          description: "구슬 생성에 실패했습니다.",
          variant: "destructive",
        });
      });
  };

  return (
    <section className="h-screen flex flex-col gap-[24px]">
      <div className="flex flex-col items-center ">
        <p className="text-center text-white text-xl">
          {/* TODO: MOCK, 라우트 작업 후 조회한 닉네임으로 변경 필요*/}
          000님이
          <br />
          답변을 기다려요!
        </p>
        <div className="flex items-center justify-center w-full h-10 text-center rounded-md text-xs">
          <span className="text-[#CFD2E4]">난 올해 어떤 사람이였어?</span>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-4">
        {colorGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="flex gap-1">
            {group.map((color) => (
              <Bead
                key={color}
                color={`#${color}`}
                size={36}
                selected={colorCode === color}
                onClick={() => setColorCode(color)}
              />
            ))}
          </div>
        ))}

        <p className="text-center text-white text-xl font-nanum-dahaengce">
          어떤 색상의 구슬로
          <br />
          답변을 할까요?
        </p>
      </div>
      <div className="space-y-4">
        <TextFieldWrapper
          title="답변 작성"
          value={content}
          onChange={setContent}
          maxLength={300}
          multiline
          placeholder="답변 작성"
          size="l"
        />
        <TextFieldWrapper
          title="보내는 사람"
          value={senderName}
          onChange={setSenderName}
          placeholder="이름 입력"
        />
      </div>
      <div className="flex w-full	justify-center">
        <Button
          className="w-full"
          children={
            <div className="w-full flex flex-row items-center">
              <span className="grow">다음</span>
              <IoChevronForward className="shrink-0" />
            </div>
          }
          onClick={sendAnswer}
        />
      </div>
    </section>
  );
}
