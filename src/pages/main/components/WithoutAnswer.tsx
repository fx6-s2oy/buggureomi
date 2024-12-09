import ShareButton from "@/components/share/ShareButton";
import { BUNDEL_IMAGE_URL } from "@/constant/image";
import { ReflectionButton } from "@/pages/main/components/ReflectionButton";

type Props = {
  memberId: string;
};

export default function WithoutAnswer({ memberId }: Props) {
  return (
    <div className="flex flex-col items-center">
      <span>어떤 쪽지들이 담길까요?</span>
      <div className="w-56 mb-2">
        <img src={BUNDEL_IMAGE_URL} className="w-full h-full" />
      </div>
      <span className="font-bold mb-2">
        쪽지를 넣어줄 친구에게 공유해보아요!
      </span>
      <ShareButton memberId={memberId} className="mb-2" />
      <ReflectionButton memberId={memberId} />
    </div>
  );
}
