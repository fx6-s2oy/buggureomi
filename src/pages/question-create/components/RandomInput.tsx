import { Button } from "@/components/ui/button";
import { getRandomIndex } from "@/lib/utils";
import { MOCK_QUESTION_LIST } from "../mock";
import { IoReload } from "react-icons/io5";
import TextFieldWrapper from "@/components/common/TextFieldWrapper";

interface RandomInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RandomInput({ value, onChange }: RandomInputProps) {
  const handleChangeInput = (value: string) => {
    onChange(value);
  };

  return (
    <div className="flex gap-2 flex-col">
      <div className="flex items-end gap-2">
        <TextFieldWrapper
          value={value}
          title="질문하기"
          placeholder="문구를 입력해주세요"
          onChange={handleChangeInput}
          maxLength={50}
        />
        <Button
          className="h-10 w-12"
          onClick={() => {
            const randomQuestion =
              MOCK_QUESTION_LIST[getRandomIndex(MOCK_QUESTION_LIST)];
            handleChangeInput(randomQuestion);
          }}
        >
          <IoReload />
        </Button>
      </div>
      <span className="text-center text-sm text-[#CFD2E4] font-extralight">
        만들기 어렵다면 준비된 질문을 활용해보세요!
      </span>
    </div>
  );
}
