import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getRandomIndex } from "@/lib/utils";
import { MOCK_QUESTION_LIST } from "../mock";

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
    <div className="flex gap-2">
      <Input
        value={value}
        className="w-64"
        placeholder="문구를 입력해주세요"
        onChange={({ target: { value } }) => handleChangeInput(value)}
      />
      <Button onClick={() => handleChangeInput(randomQuestion)}>랜덤</Button>
    </div>
  );
}
