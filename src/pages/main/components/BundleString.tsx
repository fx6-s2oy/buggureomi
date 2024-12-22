import { cn } from "@/lib/utils";

type Props = {
  questionContent: string;
  className?: string;
};

export default function BundleString({ questionContent, className }: Props) {
  return (
    <span
      className={cn(
        "text-primary bg-white text-nowrap py-1 px-4 rounded-xl border-2 border-primary",
        className
      )}
    >
      {questionContent}
    </span>
  );
}
