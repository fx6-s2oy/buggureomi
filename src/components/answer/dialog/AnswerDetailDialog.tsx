import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "../../ui/button";
import { useState } from "react";
import AnswerDeleteDialog from "./AnswerDeleteDialog";

import { Answer } from "@/types/answer";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: Answer;
  onDeleteSuccess: () => void;
};

export default function AnswerDetailDialog({
  isOpen,
  onClose,
  data,
  onDeleteSuccess,
}: Props) {
  const [isDeleteAlertOpen, setIsDeleteDialogOpen] = useState(false);

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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{data.sender}님의 구슬</DialogTitle>
          </DialogHeader>
          <p>{data.content}</p>
          <Button onClick={handleDialogToggle} className="w-16 ml-auto">
            삭제
          </Button>
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
