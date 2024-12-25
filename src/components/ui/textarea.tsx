import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaSize = "s" | "m" | "l";

const sizeMap: Record<TextareaSize, string> = {
  s: "h-[70px]",
  m: "h-[100px]",
  l: "h-[130px]",
};

type TextareaProps = React.ComponentProps<"textarea"> & {
  size?: TextareaSize;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size = "s", ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex h-[100px] w-full rounded-[12px] bg-[#F3F3F3] p-4 text-base placeholder:font-nanum-dahaengce transition-colors placeholder:text-gray-700 placeholder:opacity-60 focus-visible:outline-none focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          sizeMap[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
