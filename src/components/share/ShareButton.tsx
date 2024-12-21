import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "../ui/button";
import { getLink } from "@/api/link";
import { useToast } from "@/hooks/use-toast";
import { Link } from "lucide-react";
import { SHARE_LINK_PARAM } from "@/constant/link";

type Props = {
  userId: number;
} & ButtonProps;

export default function ShareButton({ className, userId, children }: Props) {
  const { toast } = useToast();

  const copyShareLinkAddress = () => {
    getLink(userId, SHARE_LINK_PARAM)
      .then((data) => {
        navigator.clipboard.writeText(data.data.url).then(() => {
          toast({
            description: "링크가 복사되었습니다",
          });
        });
      })
      .catch(() => {
        toast({
          description: "링크를 복사하는데 실패했습니다",
          variant: "destructive",
        });
      });
  };

  return (
    <Button onClick={copyShareLinkAddress} className={cn(className)}>
      <Link />
      {children}
    </Button>
  );
}
