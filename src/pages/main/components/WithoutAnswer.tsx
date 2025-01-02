import BUNDLE_WITHOUT_ANSWER from "@/assets/image/main/bundle_without_answer.png";
import ShareButton from "@/components/share/ShareButton";
import { ReflectionButton } from "@/pages/main/components/ReflectionButton";
import Bundle from "./Bundle";

type Props = {
  userId: number;
  nickname: string;
  questionContent: string;
};

export default function WithoutAnswer({
  userId,
  nickname,
  questionContent,
}: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col my-auto">
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-h2 mb-2 text-center text-white">
            {nickname}님의 보따리에
          </h2>
          <span className="text-h2 text-white mb-6">아직은 답변이 없어요.</span>
          <Bundle
            bundleImageSrc={BUNDLE_WITHOUT_ANSWER}
            className="w-40 mb-4"
            questionContent={questionContent}
          />
          <span className="font-nanum-dahaengce text-white">
            조금만 더 답변을
          </span>
          <span className="font-nanum-dahaengce text-white mb-10">
            기다려 볼까요?
          </span>
          <span className="text-white font-nanum-dahaengce mb-2">
            다시 한번 공유해볼까요?
          </span>
        </div>
      </div>
      <footer className="w-full py-10">
        <ReflectionButton userId={userId} />
        <ShareButton className="w-full mt-2">공유</ShareButton>
      </footer>
    </div>
  );
}
