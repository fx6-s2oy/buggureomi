import { useLocation, useHistory } from "react-router-dom";

import { DirectLogin } from "@/components/display/DirectLogin";
import ShareButton from "@/components/share/ShareButton";
import { Button } from "@/components/ui/button";

import { BUNDEL_IMAGE_URL } from "@/constant/image";

import { useUserStore } from "@/store/userStore";
import { ShareDialog } from "@/components/share/ShareDialog";

export default function QuestionCreateComplete() {
  const { state } = useLocation<{ questionId: number }>();
  const history = useHistory();

  const { userInfo } = useUserStore();

  if (!userInfo?.id || !state.questionId) {
    return <DirectLogin />;
  }

  return (
    <div className="flex flex-col items-center gap-3 h-screen justify-evenly">
      <div className="text-center">
        <p className="font-bold text-xl">짜잔!!</p>
        <p className="font-bold text-sm">질문 보따리가 완성됐어요!</p>
      </div>

      <div className="flex flex-col items-center gap-1">
        <img src={BUNDEL_IMAGE_URL} />
        <p className="font-bold text-xs">
          답변 구슬을 받고 싶은 사람에게 공유해 보세요!
        </p>
      </div>

      <div className="flex gap-1">
        <Button onClick={() => history.push("/main")}>메인 이동</Button>
        <ShareButton />
      </div>
      <ShareDialog userId={userInfo.id} />
    </div>
  );
}
