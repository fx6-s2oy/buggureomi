import ShareButton from "@/components/share/ShareButton";
import { Button } from "@/components/ui/button";
import { BUNDEL_IMAGE_URL } from "@/constant/image";
import { useHistory } from "react-router-dom";

type Props = {
  memberId: string;
};

export default function WithoutAnswer({ memberId }: Props) {
  const history = useHistory();

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
      <Button onClick={() => history.push("/self-reflection")}>
        먼저 올 한해의 나를 돌아볼까요?
      </Button>
    </div>
  );
}
