import pouch from "@/shared/assets/pouch/pouch.svg";
import { BottomSheet } from "@/components/bottom-sheet/BottomSheet";
import { Button } from "@/components/ui/button";
import { Question } from "../question/Question";
import { Bead } from "@/components/bead/Bead";

interface AnswerDescButtonSheetProps {
  onClose: () => void;
  onStart: () => void;
}

export function AnswerDescButtonSheet({
  onClose,
  onStart,
}: AnswerDescButtonSheetProps) {
  return (
    <BottomSheet isVisible onClose={onClose} style={{ background: "#D6D8E1" }}>
      <div className="h-[30rem] p-[2.5rem]">
        {/* MEMO: 팝오버 타이틀에 '설명' 이라는 단어가 적절한지 논의 필요  */}
        <div className="text-sm text-[#333333] mb-4">설명</div>
        <div className="flex w-full justify-center">
          <div className="w-[17.5rem] h-[17.1875rem] bg-[#C9CCDA] rounded-[1.25rem]">
            <div className="flex items-center justify-center flex-col p-[1.25rem]">
              <div className="flex w-full	justify-between	">
                <Question align="LEFT">
                  <img src={pouch} className="h-[3.75rem]" alt="bundle" />
                  <p className="text-center text-[#667EF5] ">
                    구슬을 담는
                    <br />
                    <b>질문 보따리</b>야
                  </p>
                </Question>
                <Question align="RIGHT">
                  <div className="flex items-center justify-center w-[60px] h-[60px]">
                    <Bead color="#EF4C4D" size={24} />
                  </div>
                  <p className="text-center text-[#667EF5] ">
                    <b>답변</b>이 담길
                    <br />
                    너의 <b>구슬</b>이야
                  </p>
                </Question>
              </div>
              <div className="flex items-center justify-center ">
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
        <div className="flex w-full	justify-center">
          <Button
            className="w-72 h-12 mt-[2rem]"
            children={"시작하기"}
            onClick={onStart}
          />
        </div>
      </div>
    </BottomSheet>
  );
}
