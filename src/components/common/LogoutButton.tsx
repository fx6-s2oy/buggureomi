import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

import { useUserStore } from "@/store/userStore";
import { tokenCookie } from "@/lib/authToken";

type Props = {
  className?: string;
};

export default function LogoutButton({ className }: Props) {
  const { clearUserInfo } = useUserStore();

  const logout = () => {
    clearUserInfo();
    tokenCookie.deleteCookie("accessToken");
    tokenCookie.deleteCookie("refreshToken");
  };

  return (
    <Button
      onClick={logout}
      className={cn(className, "w-20 h-11 bg-[#484B5E]")}
    >
      로그아웃
    </Button>
  );
}
