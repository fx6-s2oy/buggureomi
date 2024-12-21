import ShareButton from "@/components/share/ShareButton";
import { BUNDEL_IMAGE_URL } from "@/constant/image";
import { ReflectionButton } from "@/pages/main/components/ReflectionButton";

type Props = {
  userId: number;
};

export default function WithoutAnswer({ userId }: Props) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-h2 text-white mb-6">아직은 답변이 없어요.</span>
      <div className="w-40 mb-4">
        <img src={BUNDEL_IMAGE_URL} className="w-full h-full" />
      </div>
      <span className="font-nanum-dahaengce text-white">조금만 더 답변을</span>
      <span className="font-nanum-dahaengce text-white mb-10">
        기다려 볼까요?
      </span>
      <span className="text-white font-nanum-dahaengce mb-2">
        다시 한번 공유해볼까요?
      </span>
      <ReflectionButton userId={userId} />
      <ShareButton className="w-full mt-2" userId={userId}>
        공유
      </ShareButton>
    </div>
  );
}
