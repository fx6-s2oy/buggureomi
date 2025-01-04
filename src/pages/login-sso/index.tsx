import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { memberAPI } from "@/api/member";
import { useLoginCheck } from "@/hooks/useLoginCheck";

import { Button } from "@/components/ui/button";
import mascot_front_standing from "@/shared/assets/mascot/mascot-front-standing.svg";
import { BsChatFill } from "react-icons/bs";

export default function MemberLogin() {
  const { isLogin } = useLoginCheck();

  const history = useHistory();

  const handleOauthLogin = (type: "kakao") => {
    // COMMENT & TODO: google, naver 등 추가 가능성 있음
    sessionStorage.setItem("sso_type", type);
    memberAPI.ssoLogin(type);
  };

  useEffect(() => {
    sessionStorage.removeItem("sso_type");
    if (isLogin) {
      history.push("/main");
    }
  });

  return (
    <>
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col my-auto">
          <div className="text-center mb-3 text-white">
            <h2 className="text-h2">로그인</h2>
            <h3 className="mt-2 font-extralight">login</h3>
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
        </div>
        <div className="py-10">
          <Button
            onClick={() => handleOauthLogin("kakao")}
            className="bg-[#FEE500] w-full text-[#3C1E1E]"
          >
            <BsChatFill fill="#3C1E1E" size={48} />
            <p className="text-[18px]">카카오톡으로 로그인</p>
          </Button>
        </div>
      </div>
      {/* 
      <Button
        onClick={goToJoinPage}
        type="submit"
        variant="link"
        className="mx-auto block mt-4"
      >
        일반 회원가입
      </Button> */}
    </>
  );
}
