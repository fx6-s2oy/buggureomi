import { useHistory } from "react-router-dom";
import { cn } from "@/lib/utils";
import { IoMdHome } from "react-icons/io";

type Props = {
  className?: string;
};

export default function BackHeader({ className }: Props) {
  const history = useHistory();
  const handleBack = () => {
    history.push("/main");
  };

  return (
    <button onClick={handleBack} className={cn("relative", className)}>
      <IoMdHome size={36} color="#F0F0F0" />
    </button>
  );
}
