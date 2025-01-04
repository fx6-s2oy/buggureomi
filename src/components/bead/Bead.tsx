import { CSSProperties } from "react";

interface BeadProps {
  color?: CSSProperties["color"];
  size?: number;
  selected?: boolean;
  onClick?: () => void;
}

export const Bead = ({
  color = "#FF6B6B",
  size = 60,
  selected = false,
  onClick,
}: BeadProps) => {
  const gradientId = `marble-gradient-${color.replace("#", "")}`;
  const highlightId = `marble-highlight-${color.replace("#", "")}`;

  return (
    <div
      className={`rounded-full`}
      style={{ width: size, height: size }}
      onClick={() => onClick && onClick()}
    >
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        className={`${selected ? "bg-[#DDE3FF] rounded-md" : ""}`}
      >
        <defs>
          <radialGradient id={gradientId} cx="40%" cy="40%">
            <stop
              offset="0%"
              style={{ stopColor: "white", stopOpacity: 0.6 }}
            />
            <stop offset="30%" style={{ stopColor: color, stopOpacity: 0.9 }} />
            <stop offset="100%" style={{ stopColor: color, stopOpacity: 1 }} />
          </radialGradient>
          <radialGradient id={highlightId} cx="35%" cy="35%">
            <stop
              offset="0%"
              style={{ stopColor: "white", stopOpacity: 0.5 }}
            />
            <stop
              offset="60%"
              style={{ stopColor: "white", stopOpacity: 0.2 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "white", stopOpacity: 0 }}
            />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill={`url(#${gradientId})`} />
        <circle cx="40" cy="40" r="30" fill={`url(#${highlightId})`} />
      </svg>
    </div>
  );
};
