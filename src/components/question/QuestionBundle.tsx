import pouch from "@/shared/assets/pouch/pouch.svg";

interface QuestionBundlesLayoutProps {
  value: string;
}

export function QuestionBundle({ value }: QuestionBundlesLayoutProps) {
  return (
    <div className="relative h-[10rem] flex justify-center">
      <img src={pouch} className="w-40 h-40" alt="bundle" />
      <textarea
        value={value}
        className="absolute w-[15.625rem] pointer-events-none resize-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 border border-dashed rounded-lg h-[2.375rem] border-[0.0625rem] border-[#667EF5] text-center text-[#667EF5] px-2 py-1 overflow-y-auto"
        readOnly
      />
    </div>
  );
}
