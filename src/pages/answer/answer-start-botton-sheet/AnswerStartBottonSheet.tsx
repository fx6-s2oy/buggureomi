import { BottomSheet } from "@/components/bottom-sheet/BottomSheet";
import { Button } from "@/components/ui/button";

interface AnswerStartButtonProps {
  onClose: () => void;
  onClick: () => void;
  onBack: () => void;
}

export function AnswerStartButton({
  onClose,
  onClick,
  onBack,
}: AnswerStartButtonProps) {
  return (
    <BottomSheet
      isVisible={true}
      onClose={onClose}
      style={{ background: "#FFFFFF" }}
    >
      <div className="h-[18.125rem] p-[2.5rem] ">
        <p className="text-center text-[#333333] text-xl">
          <b>로그인</b>을 해야
          <br />
          답할 수 있는 질문이에요!
        </p>
        <div className="flex w-full	justify-center">
          <Button
            className="w-72 h-12 mt-[2rem]"
            children={"로그인"}
            onClick={onClick}
          />
        </div>
        <div className="flex w-full	justify-center">
          <Button
            className="w-72 h-12 mt-[0.5rem] text-[#667EF5] bg-[#F3F3F3]"
            children={"뒤로가기"}
            onClick={onBack}
          />
        </div>
      </div>
    </BottomSheet>
  );
}
