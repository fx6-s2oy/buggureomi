import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHistory } from "react-router-dom";

type Props = {
  children?: ReactNode;
  className?: string;
};

export default function BackHeader({ children, className }: Props) {
  const history = useHistory();
  const handleBack = () => {
    history.push("/main");
  };

  return (
    <header className={cn("relative", className)}>
      <button onClick={handleBack}>
        <ArrowLeft size={32} color="#F0F0F0" />
      </button>
      {children}
    </header>
  );
}
