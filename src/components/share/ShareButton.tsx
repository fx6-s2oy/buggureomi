import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "../ui/button";
import { FaLink } from "react-icons/fa";
import { useDialog } from "@/contexts/DialogContext";

type Props = {
  icon?: {
    style?: {
      color: React.CSSProperties["color"];
    };
  };
} & ButtonProps;

export default function ShareButton({ icon, className, children }: Props) {
  const { onOpen } = useDialog();

  return (
    <Button className={cn(className)} onClick={onOpen}>
      <FaLink style={{ ...icon?.style, width: "24px", height: "auto" }} />
      {children}
    </Button>
  );
}
