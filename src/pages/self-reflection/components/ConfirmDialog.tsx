import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>제출 확인</DialogTitle>
          <DialogDescription>
            정말로 제출하시겠습니까? 제출 후에는 수정이 불가능합니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:gap-0 sm:justify-end">
          <Button onClick={onClose} variant="outline">
            취소
          </Button>
          <Button onClick={onConfirm} className="bg-primary text-white">
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
