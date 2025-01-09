import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
        <DialogDescription>
          <h2 className="text-h2 font-medium text-gray-900">
            신중하게 돌아보셨나요?
            <br />
            <span className="text-primary font-bold"> 수정이 불가능</span>
            해요.
          </h2>
        </DialogDescription>
        <DialogFooter>
          <Button variant="default" className="w-full" onClick={onConfirm}>
            확인했어요.
          </Button>
          <Button variant="secondary" className="w-full" onClick={onClose}>
            다시 돌아볼게요.
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
