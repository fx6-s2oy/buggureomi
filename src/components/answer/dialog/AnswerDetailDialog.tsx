import { FaTrashAlt } from "react-icons/fa";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";

import { Button } from "../../ui/button";
import { useState } from "react";
import AnswerDeleteDialog from "./AnswerDeleteDialog";

import { Answer } from "@/types/answer";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: Answer;
  onDeleteSuccess: () => void;
  isGuestAccess: boolean;
};

export default function AnswerDetailDialog({
  isOpen,
  onClose,
  data,
  onDeleteSuccess,
  isGuestAccess,
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
        <DialogContent className="bg-[#D6D8E1]">
          <div className="flex flex-row items-center justify-between mb-3">
            <h2 className="flex gap-2 font-semibold">
              <div
                style={{ backgroundColor: data.colorCode }}
                className="w-[24px] h-[24px] rounded-full"
              ></div>
              {data.sender}님의 구슬
            </h2>

            <span>{date}</span>
          </div>

          <p className="bg-[#F3F3F3] shadow-custom-inner rounded-xl py-2 px-4 min-h-[200px] mb-10 font-nanum-dahaengce text-xl">
            {data.content}
          </p>

          <DialogFooter>
            <Button onClick={handleDialogToggle}>닫기</Button>
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
