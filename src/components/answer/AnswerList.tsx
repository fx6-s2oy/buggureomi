import AnswerCard from "./AnswerCard";

import { Answer } from "@/types/answer";

interface Props {
  listData: Answer[];
  onDialogOpen: (marble: Answer) => void;
}

export default function AnswerList({ listData, onDialogOpen }: Props) {
  return (
    <div className="flex flex-col gap-4 px-3">
      {listData.map((marble) => (
        <AnswerCard
          key={marble.answerId}
          answer={marble}
          onDialogOpen={() => onDialogOpen(marble)}
        />
      ))}
    </div>
  );
}
