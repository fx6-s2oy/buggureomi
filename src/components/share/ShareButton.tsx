import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "../ui/button";
import { FaLink } from "react-icons/fa";
import { useDialog } from "@/contexts/DialogContext";

type Props = {} & ButtonProps;

export default function ShareButton({ className, children }: Props) {
  const { onOpen } = useDialog();
  return (
    <Button className={cn(className)} onClick={onOpen}>
      <FaLink style={{ width: "24px", height: "auto" }} />
      {children}
    </Button>
  );
}
