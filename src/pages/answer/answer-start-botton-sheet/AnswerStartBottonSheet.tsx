import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface AnswerStartButtonProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  onBack: () => void;
}

export function AnswerStartButton({
  isOpen,
  onClose,
  onClick,
  onBack,
}: AnswerStartButtonProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-[18.125rem] p-[2.5rem]">
        <p className="text-center text-[#333333] text-xl">
          <b>로그인</b>을 해야
          <br />
          답할 수 있는 질문이에요!
        </p>
        <div className="flex flex-col gap-2 mt-[30px]">
          <Button className="w-full" onClick={onClick}>
            로그인
          </Button>
          <Button className="w-full" variant="secondary" onClick={onBack}>
            뒤로가기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
