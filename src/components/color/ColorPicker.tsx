interface ColorPickerProps {
  colorCodes: string[];
  colorCode?: string;
  onChange: (colorCode: string) => void;
}

export function ColorPicker({
  colorCode,
  colorCodes,
  onChange,
}: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      {colorCodes.map((code) => (
        <div
          key={code}
          className={"w-8 h-8 rounded-md cursor-pointer"}
          style={{
            backgroundColor: code,
            ...(colorCode === code
              ? {
                  filter: `drop-shadow(0 0 1px ${colorCode}) drop-shadow(0 0 4px ${colorCode})`,
                }
              : {}),
          }}
          onClick={() => onChange(code)}
        ></div>
      ))}
    </div>
  );
}
