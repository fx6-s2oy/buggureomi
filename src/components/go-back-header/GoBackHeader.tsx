import { ReactNode } from "react";
import { MoveLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  onBack: () => void;
  children?: ReactNode;
  className?: string;
};

export default function GoBackHeader({ onBack, children, className }: Props) {
  return (
    <header className={cn("relative", className)}>
      <button
        onClick={() => {
          onBack();
        }}
      >
        <MoveLeft />
      </button>
      {children}
    </header>
  );
}
