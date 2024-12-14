import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
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
        <ArrowLeft size={32} color="#F0F0F0" />
      </button>
      {children}
    </header>
  );
}
