import { ScrollArea } from "../ui/scroll-area";

import AnswerCard from "./AnswerCard";

import { Answer } from "@/types/answer";

// TODO: 임시 선언이므로 업데이트 필요
interface Props {
  listData: Answer[];
  onDialogOpen: (marble: Answer) => void;
}

export default function AnswerList({ listData, onDialogOpen }: Props) {
  const Answer: Answer[] = listData;

  return (
    <ScrollArea className="h-[580px]">
      <div className="flex flex-col gap-3 px-3">
        {Answer &&
          Answer.map((marble) => {
            return (
              <AnswerCard
                key={marble.answerId}
                answer={marble}
                onDialogOpen={() => onDialogOpen(marble)}
              />
            );
          })}
      </div>
    </ScrollArea>
  );
}
