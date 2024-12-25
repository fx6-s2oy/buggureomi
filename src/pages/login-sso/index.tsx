import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { memberAPI } from "@/api/member";
import { useUserStore } from "@/store/userStore";

import { Button } from "@/components/ui/button";
import kakao_login_button from "@/assets/image/login/kakao_login_medium_wide.png";
import mascot_front_standing from "@/shared/assets/mascot/mascot-front-standing.svg";

export default function MemberLogin() {
  const { userInfo } = useUserStore();

  const history = useHistory();

  function goToJoinPage() {
    history.push("/member-join");
  }

  useEffect(() => {
    if (userInfo) {
      history.push("/main");
    }
  });

  return (
    <>
      <div className="text-center pt-20 pb-10 mb-3 text-white">
        <h2 className="text-h2">로그인</h2>
        <h3 className="mt-3">login</h3>
      </div>

      <div>
        <div className="w-[30%] mx-auto">
          <img
            src={mascot_front_standing}
            alt="부꾸 캐릭터"
            className="w-[100%]"
          />
        </div>

        <div className="text-center my-10 text-white font-nanum-dahaengce text-[23px]">
          <p>올해의 나에 대해</p>
          <p>되돌아보러 갈까요?</p>
        </div>
      </div>

      <Button
        onClick={() => memberAPI.ssoLogin()}
        className="bg-[#FEE500] w-full"
      >
        <img src={kakao_login_button} alt="카카오 로그인" />
      </Button>

      <Button
        onClick={goToJoinPage}
        type="submit"
        variant="link"
        className="mx-auto block mt-4"
      >
        일반 회원가입
      </Button>
    </>
  );
}
