import { useState, useEffect } from "react";

import { getRandomIndex } from "@/lib/utils";
import { Answer } from "@/types/answer";

import WithoutAnswer from "./components/WithoutAnswer";
import WithAnswer from "./components/WithAnswer";
import NonLoggedSection from "./components/NonLoggedSection";
import { answerAPI } from "../../api/answer";
import { MEMBER_ID_KEY } from "@/constant/keys";

export default function Main() {
  const [memberId, setMemberId] = useState<string>();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [nickname, setNickname] = useState<string>("");

  useEffect(() => {
    const checkLocalStorage = () => {
      const userId = localStorage.getItem(MEMBER_ID_KEY);

      if (userId) {
        setMemberId(userId);
      }
    };

    checkLocalStorage();
  }, []);

  useEffect(() => {
    if (memberId) {
      answerAPI.list({ memberId: Number(memberId) }).then((res) => {
        const data = res.data;
        if (data.data.list?.length) {
          setAnswers(data.data.list);
        }
        setNickname(data.data.nickname);
      });
    }
  }, [memberId]);

  const answerCount = answers.length;
  const previewMessage = answers[getRandomIndex(answers)];
  const hasUserId = memberId != null;

  return (
    <>
      {!hasUserId ? (
        <NonLoggedSection />
      ) : (
        <section className="flex flex-col justify-center items-center h-screen">
          <h2 className="font-bold text-2xl mb-2">{nickname}님의 보따리</h2>
          {answerCount < 1 ? (
            <WithoutAnswer memberId={memberId} />
          ) : (
            <WithAnswer
              memberId={memberId}
              answerCount={answerCount}
              previewMessage={previewMessage}
            />
          )}
        </section>
      )}
    </>
  );
}
