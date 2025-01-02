import BUNDLE_WITH_ANSWER_IMAGE from "@/shared/assets/pouch/pouch_with_answer.png";
import Bundle from "./Bundle";
import { MainPageInfo } from "@/types/main-page";
import { Button } from "@/components/ui/button";
import { ReflectionButton } from "./ReflectionButton";
import ShareButton from "@/components/share/ShareButton";
import { useHistory } from "react-router-dom";

type Props = {
  userId: number;
  mainPageInfo: MainPageInfo;
};

export default function WithAnswer({
  userId,
  mainPageInfo: {
    totalCount: answerCount,
    answerContent: previewMessage,
    content: questionContent,
    nickname,
  },
}: Props) {
  const history = useHistory();
  const handleClick = () => {
    history.push("/answer-result");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col my-auto">
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-h2 mb-2 text-center text-white">
            {nickname}님의 보따리에
          </h2>
          <span className="text-white text-h2 mb-6">
            {answerCount}개의 답변이 담겨 있어요!
          </span>
          <Bundle
            bundleImageSrc={BUNDLE_WITH_ANSWER_IMAGE}
            className="w-40 mb-6"
            questionContent={questionContent}
          />
          <h3 className="font-bold mb-2 w-full text-left text-white">
            담긴 쪽지 미리보기
          </h3>
          <p className="bg-[#F3F3F3] w-full px-4 py-3 rounded-md mb-10 h-24 overflow-y-auto font-nanum-dahaengce">
            {previewMessage}
          </p>
          <span className="font-nanum-dahaengce mb-4 text-white text-xl">
            누구의 쪽지일까요? 지금 열어보세요!
          </span>
        </div>
      </div>

      <footer className="w-full py-10">
        <Button
          className="mb-2 w-full"
          children="열어보기"
          onClick={handleClick}
        />
        <div className="flex w-full">
          <ReflectionButton userId={userId} />
          <ShareButton variant={"outline"} className="w-full ml-2">
            공유
          </ShareButton>
        </div>
      </footer>
    </div>
  );
}
