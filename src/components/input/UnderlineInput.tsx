interface UnderlineInputProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export default function UnderlineInput({
  value = "",
  placeholder = "값을 입력해주세요.",
  disabled = false,
  onChange,
}: UnderlineInputProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        disabled={disabled}
        onChange={({ target: { value } }) => onChange?.(value)}
        placeholder={placeholder}
        className="border-b-2 border-gray-500 focus:border-gray-500 focus:border-2 focus:rounded-md outline-none px-2 py-1 w-64 bg-transparent transition-all duration-300 ease-in-out focus:w-72"
      />
    </div>
  );
}
