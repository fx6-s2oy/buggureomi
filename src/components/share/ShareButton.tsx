import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { getLink } from "@/api/link";
import { useToast } from "@/hooks/use-toast";
import { SHARE_LINK_PARAM } from "@/constant/link";

type Props = {
  className?: string;
  memberId: string;
};

export default function ShareButton({ className, memberId }: Props) {
  const { toast } = useToast();

  const copyShareLinkAddress = () => {
    getLink(memberId, SHARE_LINK_PARAM).then((data) => {
      navigator.clipboard.writeText(data.data.url).then(() => {
        toast({
          description: "링크가 복사되었습니다",
        });
      });
    });
  };

  return (
    <Button onClick={copyShareLinkAddress} className={cn(className)}>
      공유하기
    </Button>
  );
}
