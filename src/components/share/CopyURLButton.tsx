import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "lucide-react";

type Props = {
  url: string;
} & ButtonProps;

export default function CopyURLButton({ className, url }: Props) {
  const { toast } = useToast();

  const copyShareLinkAddress = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast({
          description: "링크가 복사되었습니다",
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
      URL 복사하기
    </Button>
  );
}
