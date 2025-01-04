import { useHistory } from "react-router-dom";
import { cn } from "@/lib/utils";
import { FaArrowLeft } from "react-icons/fa";

type Props = {
  className?: string;
};

export default function BackHeader({ className }: Props) {
  const history = useHistory();
  const handleBack = () => {
    history.goBack();
  };

  return (
    <button onClick={handleBack} className={cn("relative", className)}>
      <FaArrowLeft size={32} color="#F0F0F0" />
    </button>
  );
}
