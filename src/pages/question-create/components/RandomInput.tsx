import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getRandomIndex } from "@/lib/utils";
import { MOCK_QUESTION_LIST } from "../mock";
import { IoReload } from "react-icons/io5";

interface RandomInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RandomInput({ value, onChange }: RandomInputProps) {
  const randomQuestion = MOCK_QUESTION_LIST[getRandomIndex(MOCK_QUESTION_LIST)];

  const handleChangeInput = (value: string) => {
    onChange(value);
  };

  return (
    <div className="flex gap-2 flex-col">
      <div className="flex gap-2">
        <Input
          value={value}
          className="w-full"
          placeholder="문구를 입력해주세요"
          onChange={({ target: { value } }) => handleChangeInput(value)}
        />
        <Button
          className="h-10 w-12"
          onClick={() => handleChangeInput(randomQuestion)}
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
