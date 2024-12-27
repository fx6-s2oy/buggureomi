import WORKING_MASCOT_GIF from "@/assets/image/answer-create-complete/working_mascot.gif";
import { Button } from "@/components/ui/button";
import POUCH_WITH_ANSWER_IMAGE from "@/shared/assets/pouch/pouch_with_answer.png";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function AnswerCreateComplete() {
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

  const history = useHistory();
  const handleClick = () => {
    history.push("/question-create");
  };

  return (
    <section className="flex justify-center items-center h-screen">
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
          <div className="relative w-full h-full flex flex-col justify-center items-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute top-[15%] text-white text-2xl text-center"
            >
              {/* todo:누구 보따리인지 가져오기  */}
              <p>
                <span className="font-bold">ooo님</span>의 보따리에
              </p>
              <p>
                <span className="font-bold">oo번째</span> 구슬이 담겼어요!
              </p>
            </motion.p>
            <motion.img
              key="png"
              src={POUCH_WITH_ANSWER_IMAGE}
              alt="PNG"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-1/2"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <Button onClick={handleClick}>나도 보따리 만들러가기</Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
