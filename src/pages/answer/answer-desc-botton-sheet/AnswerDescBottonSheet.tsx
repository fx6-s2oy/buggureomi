import pouch from "@/shared/assets/pouch/pouch.svg";
import { Button } from "@/components/ui/button";
import { Question } from "../question/Question";
import { Bead } from "@/components/bead/Bead";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AnswerDescButtonSheetProps {
  open: boolean;
  onClose: () => void;
  onStart: () => void;
}

export function AnswerDescButtonSheet({
  open,
  onClose,
  onStart,
}: AnswerDescButtonSheetProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#D6D8E1] p-10">
        <DialogHeader>
          <DialogTitle className="text-sm text-[#333333] text-left">
            설명
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-center mt-4">
          <div className="w-[17.5rem] h-[17.1875rem] bg-[#C9CCDA] rounded-[1.25rem]">
            <div className="flex items-center justify-center flex-col p-[1.25rem]">
              <div className="flex w-full justify-between">
                <Question align="LEFT">
                  <img src={pouch} className="h-[3.75rem]" alt="bundle" />
                  <p className="text-center text-[#667EF5]">
                    구슬을 담는
                    <br />
                    <b>질문 보따리</b>야
                  </p>
                </Question>
                <Question align="RIGHT">
                  <div className="flex items-center justify-center w-[60px] h-[60px]">
                    <Bead color="#EF4C4D" size={24} />
                  </div>
                  <p className="text-center text-[#667EF5]">
                    <b>답변</b>이 담길
                    <br />
                    너의 <b>구슬</b>이야
                  </p>
                </Question>
              </div>
              <div className="flex items-center justify-center">
                <img src="/images/image1.png" alt="head" />
                <p className="text-center text-[#667EF5] text-xl font-nanum-dahaengce">
                  나는
                  <br />
                  북극곰 부꾸
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-8">
          <Button className="w-full h-12" onClick={onStart}>
            시작하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
