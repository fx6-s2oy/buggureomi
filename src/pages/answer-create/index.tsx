import { useState } from "react";
import { useHistory } from "react-router-dom";

import { answerAPI } from "@/api/answer";

import { Button } from "@/components/ui/button";

import { COLOR_CODE_LIST } from "@/constant/color";

import { Bead } from "@/components/bead/Bead";
import { IoChevronForward } from "react-icons/io5";
import TextFieldWrapper from "@/components/common/TextFieldWrapper";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@/hooks/useQuery";
import { useQuestionInfo } from "@/hooks/useQuestionInfo";

const colorGroups = [
  ["EF4C4D", "FF884D", "FFC44E", "89C94D", "0A8403"],
  ["4DC3FF", "3451E3", "A071FF", "832AFE", "FF4DA5"],
  ["FFC088", "BD6C41", "FFFFFF", "8E8E8E", "000000"],
];

export default function AnswerCreate() {
  const { toast } = useToast();
  const history = useHistory();
  const query = useQuery();
  const sqidsId = query.get("question") as string;

  const { questionInfo } = useQuestionInfo({
    sqidsId,
    redirectTo: "/answer",
  });

  const [colorCode, setColorCode] = useState<string | undefined>(undefined);
  const [content, setContent] = useState<string>("");
  const [senderName, setSenderName] = useState<string>("");

  if (!questionInfo) return null;

  const sendAnswer = async () => {
    try {
      const { data } = await answerAPI.create({
        questionId: questionInfo.questionId,
        sender: senderName.trim(),
        content: content.trim(),
        colorCode: colorCode ?? COLOR_CODE_LIST[0],
      });
      history.push(
        `/answer-create-complete?question=${sqidsId}&count=${
          data.data.totalCount === -1 ? "n" : data.data.totalCount
        }`
      );
    } catch {
      toast({
        description: "구슬 생성에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="flex flex-col h-full gap-6 justify-between">
      <div className="flex flex-col my-auto gap-4">
        <div className="flex flex-col items-center ">
          <p className="text-center text-white text-xl">
            {questionInfo.nickname}님이
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
      </div>
      <div className="flex w-full py-10">
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
