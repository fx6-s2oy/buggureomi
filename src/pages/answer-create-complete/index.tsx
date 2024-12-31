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

  const handleClick = () => {
    history.push("/question-create");
  };

  return (
    <section className="flex flex-col h-full">
      <AnimatePresence>
        {isGifVisible && (
          <motion.img
            key="gif"
            src={WORKING_MASCOT_GIF}
            alt="GIF"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
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
                  <span className="font-bold">{count}번째</span> 구슬이
                  담겼어요!
                </p>
              </motion.p>
              <div className="flex justify-center">
                <motion.img
                  key="png"
                  src={POUCH_WITH_ANSWER_IMAGE}
                  alt="PNG"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-1/2"
                />
              </div>
            </div>
            <div className="py-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-6"
              >
                <Button className="w-full" onClick={handleClick}>
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
