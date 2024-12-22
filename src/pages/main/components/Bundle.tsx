import { cn } from "@/lib/utils";
import BundleString from "./BundleString";

type Props = {
  bundleImageSrc: string;
  className?: string;
  questionContent: string;
};

export default function Bundle({
  bundleImageSrc,
  className,
  questionContent,
}: Props) {
  return (
    <div className={cn("relative", className)}>
      <img src={bundleImageSrc} className="w-full h-full" />
      <BundleString
        questionContent={questionContent}
        className="absolute bottom-[15%] left-1/2 -translate-x-1/2"
      />
    </div>
  );
}
