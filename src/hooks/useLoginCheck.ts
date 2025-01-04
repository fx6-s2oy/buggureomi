import { useMemo } from "react";
import { useUserStore } from "@/store/userStore";
import { tokenCookie } from "@/lib/authToken";

export function useLoginCheck() {
  const { userInfo } = useUserStore();

  const isLogin = useMemo(() => {
    return Boolean(
      userInfo?.id &&
        (tokenCookie.getCookie("accessToken") ||
          tokenCookie.getCookie("refreshToken"))
    );
  }, [userInfo?.id]);

  return { isLogin };
}
