import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

import { Answer } from "@/types/answer";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import { Bead } from "@/components/bead/Bead";
import AnswerDeleteDialog from "./AnswerDeleteDialog";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: Answer;
  onDeleteSuccess: () => void;
  isGuestAccess?: boolean;
};

export default function AnswerDetailDialog({
  isOpen,
  onClose,
  data,
  onDeleteSuccess,
  isGuestAccess = false,
}: Props) {
  const [isDeleteAlertOpen, setIsDeleteDialogOpen] = useState(false);
  const date = data.regDate as string;

  const handleDialogToggle = () => {
    setIsDeleteDialogOpen(!isDeleteAlertOpen);
  };
  const handleDeleteSuccess = () => {
    setIsDeleteDialogOpen(false);
    onDeleteSuccess();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-[#D6D8E1]" aria-describedby={undefined}>
          <div className="flex flex-row items-center justify-between mb-3">
            <DialogTitle className="flex items-center gap-2 font-semibold">
              <Bead color={data.colorCode} size={25} />
              <span>{data.sender}님의 구슬</span>
            </DialogTitle>

            <span>{date}</span>
          </div>

          <p className="bg-[#F3F3F3] shadow-custom-inner rounded-xl py-2 px-4 min-h-[200px] mb-10 font-nanum-dahaengce text-xl">
            {data.content}
          </p>

          <DialogFooter>
            <Button onClick={onClose}>닫기</Button>
            {!isGuestAccess && (
              <Button
                onClick={handleDialogToggle}
                className="bg-white text-primary"
              >
                <FaTrashAlt style={{ width: "20px", height: "auto" }} />{" "}
                삭제하기
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AnswerDeleteDialog
        isOpen={isDeleteAlertOpen}
        onClose={handleDialogToggle}
        targetId={Number(data.answerId)}
        onSuccess={handleDeleteSuccess}
      />
    </>
  );
}
