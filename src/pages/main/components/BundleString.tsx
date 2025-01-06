import { cn } from "@/lib/utils";

type Props = {
  questionContent: string;
  className?: string;
};

export default function BundleString({ questionContent, className }: Props) {
  const questionContentLength = questionContent.length;
  return (
    <span
      className={cn(
        "text-primary bg-white py-1 px-4 rounded-xl border-2 border-primary",
        {
          "text-nowrap": questionContentLength < 25,
          "w-[20rem]": questionContentLength >= 25,
        },
        className
      )}
    >
      {questionContent}
    </span>
  );
}
