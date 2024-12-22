import { Answer } from "@/types/answer";

interface Props {
  answer: Answer;
  onDialogOpen: () => void;
}

export default function AnswerCard({ answer, onDialogOpen }: Props) {
  const date = answer.regDate as string;

  return (
    <div>
      <div className="flex justify-between  mb-1 text-white">
        <span className="flex gap-2 font-semibold">
          <div
            style={{ backgroundColor: answer.colorCode }}
            className="w-[24px] h-[24px] rounded-full"
          ></div>
          {answer.sender}님의 구슬
        </span>
        <span>{date}</span>
      </div>

      <div
        onClick={onDialogOpen}
        className="rounded-md border-2 min-h-20 p-3 bg-[#F3F3F3] font-nanum-dahaengce text-xl"
      >
        <p>{answer.content}</p>
      </div>
    </div>
  );
}
