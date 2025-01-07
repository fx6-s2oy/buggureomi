import WORKING_MASCOT_GIF from "@/assets/image/answer-create-complete/working_mascot.gif";
import { Button } from "@/components/ui/button";
import { useQuery } from "@/hooks/useQuery";
import { useQuestionInfo } from "@/hooks/useQuestionInfo";
import POUCH_WITH_ANSWER_IMAGE from "@/shared/assets/pouch/pouch_with_answer.png";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function AnswerCreateComplete() {
  const query = useQuery();
  const sqidsId = query.get("question") as string;
  const count = query.get("count") as string;
  const history = useHistory();

  if (!sqidsId) history.push("/answer");

  const { questionInfo } = useQuestionInfo({
    sqidsId,
    redirectTo: "/answer",
  });

  const [isGifVisible, setIsGifVisible] = useState(true);
  const [isPngVisible, setIsPngVisible] = useState(false);

  useEffect(() => {
    const duration = 3000;

    const gifTimer = setTimeout(() => {
      setIsGifVisible(false);
    }, duration);

    const delay = 1000;

    const pngTimer = setTimeout(() => {
      setIsPngVisible(true);
    }, duration + delay);

    return () => {
      clearTimeout(gifTimer);
      clearTimeout(pngTimer);
    };
  }, []);

  const handleGoToFriendPouch = () => {
    history.push(`/answer-result?question=${sqidsId}`);
  };
  const handleGoToMakePouch = () => {
    history.push("/main");
    /**
     * 비로그인 유저면 로그인 유도됨
     * 로그인 유저일 경우
     * - 보따리가 만들어져 있으면 일반 메인
     * - 보따리가 안만들어져 있으면 보따리 만들기로 유도
     */
  };

  return (
    <section className="flex flex-col h-full">
      <AnimatePresence>
        {isGifVisible && (
          <div className="mt-[50%]">
            <motion.img
              key="gif"
              src={WORKING_MASCOT_GIF}
              alt="GIF"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}
        {isPngVisible && (
          <>
            <div className="flex flex-col my-auto">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-white text-2xl text-center"
              >
                <p>
                  <span className="font-bold">{questionInfo?.nickname}님</span>
                  의 보따리에
                </p>
                <p className="mb-6">
                  {count === "n" ? (
                    "마음이 담긴 구슬이 담겼어요!"
                  ) : (
                    <span>
                      <span className="font-bold">{count}번째</span> 구슬이
                      담겼어요!
                    </span>
                  )}
                </p>
              </motion.p>
              <div className="flex flex-col items-center gap-5">
                <motion.img
                  key="png"
                  src={POUCH_WITH_ANSWER_IMAGE}
                  alt="PNG"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-1/2"
                />

                {questionInfo?.isPublicVisible && (
                  <Button
                    onClick={handleGoToFriendPouch}
                    className="bg-[#414B79]"
                  >
                    친구 보따리 열어보기
                  </Button>
                )}
              </div>
            </div>
            <div className="pb-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-6"
              >
                <Button onClick={handleGoToMakePouch} className="w-full">
                  나도 보따리 만들러가기
                </Button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
