import { questionAPI } from "@/api/question";
import { DirectLogin } from "@/components/display/DirectLogin";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { BUNDEL_IMAGE_URL } from "@/constant/image";
import { MEMBER_ID_KEY } from "@/constant/keys";
import { useLocation, useHistory } from "react-router-dom";

export default function QuestionCreateDetail() {
  const { state } = useLocation<{ content: string }>();
  const memberId = localStorage.getItem(MEMBER_ID_KEY);
  const history = useHistory();

  if (!memberId) {
    return <DirectLogin />;
  }

  const handleClick = () => {
    questionAPI
      .create({
        memberId: Number(memberId),
        content: state?.content ?? "",
        isPublicVisible: 1,
        isCountVisible: 1,
        isAuthRequired: 1,
        isCommonQuestion: 1,
      })
      .then(() => {
        history.push({ pathname: "/question-create-complete" });
      });
  };

  return (
    // section or form submit
    <section className="flex flex-col items-center justify-center h-screen">
      <div className="font-bold text-center mb-2">
        <p>거의 다 왔어요!</p>
        <p>디테일을 잡아볼까요?</p>
      </div>
      <div className="w-36 mb-2">
        <img src={BUNDEL_IMAGE_URL} className="w-full h-full" />
      </div>

      <span className="text-sm text-gray-500 mb-6 border border-gray-500 rounded-md p-2">
        해당 기능은 추후 개발 예정이에요!
      </span>
      <div className="flex items-center mb-6 gap-x-2">
        <Label htmlFor="is-auth-required" className="font-bold">
          회원만 답을 넣을 수 있게 할까요?
        </Label>
        <Switch id="is-auth-required" checked={true} disabled={true} />
      </div>
      <div className="flex items-center mb-6 gap-x-2">
        <Label htmlFor="is-public-visible" className="font-bold">
          다른 사람도 내 보따리를 열어볼 수 있게 할까요?
        </Label>
        <Switch id="is-public-visible" checked={true} disabled={true} />
      </div>
      <div className="flex items-center mb-6 gap-x-2">
        <Label htmlFor="show-answer-counts" className="font-bold">
          내 보따리에 담긴 답변 갯수가 보이게 할까요?
        </Label>
        <Switch id="show-answer-counts" checked={true} disabled={true} />
      </div>
      <Button onClick={handleClick}>질문 생성</Button>
    </section>
  );
}
