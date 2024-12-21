import { Input } from "@/components/ui/input";
import { Textarea, TextareaSize } from "@/components/ui/textarea";

type Props = {
  title: string;
  rightText?: string;
  value: string;
  onChange?: (value: string) => void;
  maxLength?: number;
  multiline?: boolean;
  placeholder?: string;
  size?: TextareaSize;
  isReadOnly?: boolean;
};

export default function TextFieldWrapper({
  title,
  rightText,
  value,
  onChange,
  maxLength,
  multiline = false,
  placeholder,
  size,
  isReadOnly,
}: Props) {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    if (maxLength && newValue.length > maxLength) return;
    onChange?.(newValue);
  };

  const getLengthDisplay = () => {
    if (!maxLength) return rightText;
    return `(${value.length}/${maxLength})`;
  };

  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between items-center">
        <p className="text-body text-white font-semibold">{title}</p>
        {(rightText || maxLength) && (
          <p className="text-body text-white font-extralight">
            {getLengthDisplay()}
          </p>
        )}
      </div>

      {multiline ? (
        <Textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          size={size}
          className="resize-none"
          readOnly={isReadOnly}
        />
      ) : (
        <Input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
