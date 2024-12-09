import { useLocation } from "react-router-dom";

import { ColorPicker } from "@/components/color/ColorPicker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MOCK_MEMBER } from "../_mock/data/member";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import UnderlineInput from "@/components/input/UnderlineInput";
import { COLOR_CODE_LIST } from "@/constant/color";
import { answerAPI } from "@/api/answer";
import { DirectLogin } from "@/components/display/DirectLogin";
import { memberAPI } from "@/api/member";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function AnswerCreate() {
  const query = useQuery();
  // const memberId = query.get("memberId") as string;
  const questionId = query.get("questionId") as string;

  const [colorCode, setColorCode] = useState<string | undefined>(undefined);
  const [content, setContent] = useState<string>("");
  const [userNickname, setUserNicname] = useState<string>("");
  const [senderName, setSenderName] = useState<string>("");

  const storedId = localStorage.getItem("userId");

  if (!storedId) {
    return <DirectLogin />;
  }

  const sendAnswer = async () => {
    await memberAPI.search(storedId).then((res) => {
      const userInfo = res.data.data;
      setUserNicname(userInfo.nickname);

      answerAPI.create({
        memberId: Number(storedId),
        questionId: questionId,
        nickname: userNickname,
        sender: senderName,
        content,
        colorCode: colorCode ?? COLOR_CODE_LIST[0],
      });
    });
  };

  return (
    <section className="h-screen flex justify-evenly flex-col items-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-bold text-2xl">
          {MOCK_MEMBER.nickname}님이 쪽지를 기다려요!
        </h1>
        <div className="flex items-center justify-center w-80 h-10 text-center bg-gray-400 rounded-md">
          <span className="text-white">난 올해 어떤 사람이였어?</span>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-4">
        <p className="font-bold text-center">
          마음을 담은 쪽지를 넣은 뒤 <br /> 보따리에 넣어 볼까요?
        </p>

        <Popover>
          <PopoverTrigger>
            <Button
              style={{
                backgroundColor: colorCode ?? "white",
                color: colorCode ? "white" : "black",
              }}
            >
              <p>
                <b>{MOCK_MEMBER.nickname}</b>와 어울리는 색상은?
              </p>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <ColorPicker
              colorCode={colorCode}
              colorCodes={COLOR_CODE_LIST}
              onChange={(code) => setColorCode(code)}
            />
          </PopoverContent>
        </Popover>

        <Textarea
          className="min-h-64"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="w-full flex flex-col items-center gap-4">
        <span>
          <b>구슬 주인의 이름을 알려주세요</b>
        </span>
        <UnderlineInput
          value={senderName}
          placeholder="이름을 입력해주세요."
          onChange={(value) => setSenderName(value)}
        />
      </div>
      <Button
        className="bg-gray-400"
        disabled={!senderName || !content}
        children="보따리에 넣기"
        onClick={sendAnswer}
      />
    </section>
  );
}
