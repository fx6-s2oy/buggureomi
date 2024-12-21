import { useState, useEffect } from "react";

import { answerAPI } from "../../api/answer";

import { getRandomIndex } from "@/lib/utils";
import { Answer } from "@/types/answer";

import WithoutAnswer from "./components/WithoutAnswer";
import WithAnswer from "./components/WithAnswer";
import NonLoggedSection from "./components/NonLoggedSection";

import { useUserStore } from "@/store/userStore";
import { Question } from "@/types/question";
import { questionAPI } from "@/api/question";
import { useHistory } from "react-router-dom";

export default function Main() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [question, setQuestion] = useState<Question>();
  const [nickname, setNickname] = useState<string>("");

  const { userInfo } = useUserStore();

  useEffect(() => {
    if (userInfo?.id) {
      answerAPI.list({ userId: userInfo.id }).then((res) => {
        const data = res.data;
        if (data.data.list?.length) {
          setAnswers(data.data.list);
        }
        setNickname(data.data.nickname);
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo?.id) {
      questionAPI.getQuestion(userInfo.id).then((res) => {
        const data = res.data.data;
        if (data) {
          setQuestion(data);
        }
      });
    }
  }, [userInfo]);

  const answerCount = answers.length;
  const previewMessage = answers[getRandomIndex(answers)];
  const hasUserId = userInfo?.id != null;

  const history = useHistory();

  if (!question) {
    history.replace("/question-create");
    return null;
  }

  return (
    <>
      {!hasUserId ? (
        <NonLoggedSection />
      ) : (
        <section className="flex flex-col justify-center items-center h-screen">
          <h2 className="font-bold text-h2 mb-2 text-white">
            {nickname}님의 보따리에
          </h2>
          {answerCount < 1 ? (
            <WithoutAnswer userId={userInfo.id} />
          ) : (
            <WithAnswer
              userId={userInfo.id}
              answerCount={answerCount}
              previewMessage={previewMessage}
            />
          )}
        </section>
      )}
    </>
  );
}
