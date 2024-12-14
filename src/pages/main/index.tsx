import { useState, useEffect } from "react";

import { answerAPI } from "../../api/answer";

import { getRandomIndex } from "@/lib/utils";
import { Answer } from "@/types/answer";

import WithoutAnswer from "./components/WithoutAnswer";
import WithAnswer from "./components/WithAnswer";
import NonLoggedSection from "./components/NonLoggedSection";

import { useUserStore } from "@/store/userStore";

export default function Main() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [nickname, setNickname] = useState<string>("");

  const { userId } = useUserStore();

  useEffect(() => {
    if (userId) {
      answerAPI.list({ userId }).then((res) => {
        const data = res.data;
        if (data.data.list?.length) {
          setAnswers(data.data.list);
        }
        setNickname(data.data.nickname);
      });
    }
  }, [userId]);

  const answerCount = answers.length;
  const previewMessage = answers[getRandomIndex(answers)];
  const hasUserId = userId != null;

  return (
    <>
      {!hasUserId ? (
        <NonLoggedSection />
      ) : (
        <section className="flex flex-col justify-center items-center h-screen">
          <h2 className="font-bold text-2xl mb-2">{nickname}님의 보따리</h2>
          {answerCount < 1 ? (
            <WithoutAnswer userId={userId} />
          ) : (
            <WithAnswer
              userId={userId}
              answerCount={answerCount}
              previewMessage={previewMessage}
            />
          )}
        </section>
      )}
    </>
  );
}
