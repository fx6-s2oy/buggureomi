import ShareButton from "@/components/share/ShareButton";
import { BUNDEL_IMAGE_URL } from "@/constant/image";
import { Answer } from "@/types/answer";
import { ReflectionButton } from "@/pages/main/components/ReflectionButton";

type Props = {
  answerCount: number;
  previewMessage: Answer;
  memberId: string;
};

export default function WithAnswer({
  answerCount,
  previewMessage,
  memberId,
}: Props) {
  return (
    <div className="flex flex-col items-center">
      <span>{answerCount}개의 답변이 담겨 있어요!</span>
      <div className="w-56 mb-2">
        <img src={BUNDEL_IMAGE_URL} className="w-full h-full" />
      </div>
      <h3 className="font-bold mb-2">담긴 쪽지 미리보기</h3>
      <p className="bg-gray-300 w-full text-center mb-2">
        {previewMessage.content}
      </p>
      <span className="font-bold mb-4 ">
        누구의 쪽지일까요? 지금 열어보세요!
      </span>
      <ShareButton memberId={memberId} className="mb-2" />
      <ReflectionButton memberId={memberId} />
    </div>
  );
}
