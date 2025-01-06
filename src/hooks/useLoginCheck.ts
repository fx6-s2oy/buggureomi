import { useEffect, useMemo } from "react";

import { useUserStore } from "@/store/userStore";
import { useSnowStore } from "@/store/snowStore";

import { tokenCookie } from "@/lib/authToken";

export function useLoginCheck() {
  const { userInfo, clearUserInfo } = useUserStore();
  const { clearColorCodeList } = useSnowStore();

  const isLogin = useMemo(() => {
    return Boolean(
      userInfo?.id &&
        (tokenCookie.getCookie("accessToken") ||
          tokenCookie.getCookie("refreshToken"))
    );
  }, [userInfo?.id]);

  useEffect(() => {
    if (!isLogin) {
      clearUserInfo();
      clearColorCodeList();
      tokenCookie.deleteCookie("accessToken");
      tokenCookie.deleteCookie("refreshToken");
    }
  }, [isLogin]);

  return { isLogin };
}
