import { useHistory } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function NonLoggedSection() {
  const history = useHistory();

  function goToLoginPage() {
    history.push("/member-login");
  }
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-center pt-20 pb-5 mb-3">
        <h2 className="text-h2 text-primary">부꾸러미</h2>

        <div className="text-base font-bold mt-3">
          <p>키워드를 통해 올 한해를 돌아보세요!</p>
          <p>나는 과연 올해 어떤 사람이었나요?</p>
        </div>
      </div>

      <div className="mb-10">
        {/** 구역을 잡기위한 임시 영역입니다. 삭제 예정 */}
        <div className="w-36 h-36 border-2">image</div>
      </div>

      <div className="flex flex-col items-center">
        <Button onClick={goToLoginPage} className="w-[50vw]">
          이메일로 계속하기
        </Button>
      </div>
    </div>
  );
}
