import { useLocation, useHistory } from "react-router-dom";
import { memberAPI } from "@/api/member";

import { tokenCookie } from "@/lib/authToken";

import { Skeleton } from "@/components/ui/skeleton";
import { useUserStore } from "@/store/userStore";

export default function OAuth() {
  const history = useHistory();
  const location = useLocation();
  const code = new URLSearchParams(location.search).get("code");

  const { setUserInfo } = useUserStore();

  if (code) {
    memberAPI.getToken({ code }).then((res) => {
      const data = res.data;
      if (res.data.status === "OK") {
        if (data) {
          tokenCookie.setCookie("accessToken", data.data.accessToken, 0.25);
          tokenCookie.setCookie("refreshToken", data.data.refreshToken, 1);
        }
      }

      memberAPI.search().then((res) => {
        const data = res.data;

        if (data.status === "OK") {
          setUserInfo(data.data);
        }

        history.push("/main");
      });
    });
  }

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
