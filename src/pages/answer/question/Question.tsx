interface QuestionProps {
  align: "LEFT" | "RIGHT";
  children: React.ReactNode;
}

export const Question = ({ align = "RIGHT", children }: QuestionProps) => {
  return (
    <div className="relative">
      <div className="flex flex-col items-center bg-white shadow-lg rounded-2xl h-36 w-28 p-2">
        {children}
      </div>
      <div
        className={`absolute -bottom-[0.9rem] ${
          align === "LEFT" ? "left-[20px]" : "right-[20px]"
        }`}
      >
        <div
          className="w-0 h-0 border-solid border-transparent border-t-white"
          style={{ borderWidth: "1rem 1rem 0 1rem" }}
        />
      </div>
    </div>
  );
};
