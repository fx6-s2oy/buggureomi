import { Button } from "@/components/ui/button";
import { BUNDEL_IMAGE_URL } from "@/constant/image";
import { ReflectionButton } from "@/pages/main/components/ReflectionButton";

type Props = {
  userId: number;
};

export default function WithoutAnswer({ userId }: Props) {
  return (
    <div className="flex flex-col items-center">
      <span>어떤 쪽지들이 담길까요?</span>
      <div className="w-56 mb-2">
        <img src={BUNDEL_IMAGE_URL} className="w-full h-full" />
      </div>
      <span className="font-bold mb-2">
        쪽지를 넣어줄 친구에게 공유해보아요!
      </span>
      <span className="text-gray-300">
        공유하기 버튼은 추후 개발 예정이에요!
      </span>
      <Button disabled className="mb-2 w-24" children="공유" />
      <ReflectionButton userId={userId} />
    </div>
  );
}
