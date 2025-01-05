import { useLocation, useHistory, Redirect } from "react-router-dom";
import { memberAPI } from "@/api/member";

import { tokenCookie } from "@/lib/authToken";

import { Skeleton } from "@/components/ui/skeleton";
import { useUserStore } from "@/store/userStore";

export default function OAuth() {
  const history = useHistory();
  const location = useLocation();
  const code = new URLSearchParams(location.search).get("code");

  const { setUserInfo } = useUserStore();

  // URL 직접 접근 여부 확인
  const allowedReferers = import.meta.env.VITE_ALLOWED_REFERRERS.split(",");
  const ssoType = sessionStorage.getItem("sso_type");
  const referrer = document.referrer;

  const checkProperAccess = () => {
    if (!ssoType) {
      return false;
    } else {
      if (!referrer) {
        return true;
      } else {
        return allowedReferers.includes(referrer);
      }
    }
  };

  if (code && checkProperAccess()) {
    memberAPI.getToken({ code }).then((res) => {
      const data = res.data;

      try {
        if (res.data.status === "OK") {
          if (data.data) {
            tokenCookie.setCookie("accessToken", data.data.accessToken, 0.25);
            tokenCookie.setCookie("refreshToken", data.data.refreshToken, 1);
          }

          if (tokenCookie.getCookie("accessToken")) {
            memberAPI.search().then((res) => {
              const data = res.data;

              if (data.status === "OK") {
                // Case0: 토큰 발행 O & 유저 정보 호출 O
                setUserInfo(data.data);
                history.push("/main");
              } else {
                // Case1: 토큰 API O & 유저 정보 API X
                throw new Error("Fail to get user information");
              }
            });
          } else {
            // Case2: 토큰 발행 O but 토큰 저장 실패
            // e.g. 서버에선 200을 보냈으나 리턴된 토큰이 없는 경우
            throw new Error(
              "Token API call is 'OK', but there is no accessToken"
            );
          }
        } else {
          // Case3: 토큰 발행 X
          throw new Error("Fail to receive user token");
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === "Fail to get user information") {
            // Case 1
            history.push("/main");
          } else if (
            // Case 2 & 3
            error.message === "Fail to receive user token" ||
            error.message ===
              "Token API call is 'OK', but there is no accessToken"
          ) {
            history.push("/member-login");
          }
        }
      } finally {
        sessionStorage.clear(); // SSO 타입 초기
      }
    });
  }

  if (!code && !checkProperAccess()) return <Redirect to="/member-login" />;
  return (
    <div className="flex flex-col gap-4 mt-8">
      <Skeleton className="w-full h-10 bg-gray-400" />
      <Skeleton className="w-full h-52 bg-gray-400" />
      <Skeleton className="w-full h-8 bg-gray-400" />
      <Skeleton className="w-full h-8 bg-gray-400" />
      <Skeleton className="w-full h-36 bg-gray-400" />
      <Skeleton className="w-full h-36 bg-gray-400" />
      <Skeleton className="w-full h-8 bg-gray-400" />
    </div>
  );
}
