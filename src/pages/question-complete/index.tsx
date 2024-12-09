import { Button } from "@/components/ui/button";
import { COLOR_CODE_LIST } from "@/constant/color";
import { BUNDEL_IMAGE_URL } from "@/constant/image";
import { MOCK_MEMBER } from "@/pages/_mock/data/member";
import { useHistory } from "react-router-dom";

export default function QuestionComplete() {
  const history = useHistory();

  return (
    <section className="h-screen flex flex-col">
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-h2 text-gray-dark text-center">
          {MOCK_MEMBER.nickname}님의 보따리에
          <br />
          마음이 담긴 구슬이 담겼어요!
        </h2>
        <div
          className="w-20 h-20 rounded-full"
          style={{ backgroundColor: COLOR_CODE_LIST[0] }}
        />
      </div>
      <div className="w-full max-w-md">
        <img
          src={BUNDEL_IMAGE_URL}
          alt="보따리 이미지"
          className="w-full h-full"
        />
      </div>
      <Button
        className="w-full"
        variant="default"
        size="lg"
        onClick={() => history.push("/main")}
      >
        메인 이동
      </Button>
    </section>
  );
}
