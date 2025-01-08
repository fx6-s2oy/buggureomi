import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

import { useLoginCheck } from "@/hooks/useLoginCheck";

type Props = {
  className?: string;
};

export default function LogoutButton({ className }: Props) {
  const { userLogClear } = useLoginCheck();

  const logout = () => {
    userLogClear();
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
