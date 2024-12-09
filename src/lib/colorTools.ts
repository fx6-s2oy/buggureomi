const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};
const rgbToHex = (r: number, g: number, b: number): string => {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};

export function hexToRgba(hexColor: string, opacity: number = 1) {
  const rgb = hexToRgb(hexColor);
  const convertedCode = rgb
    ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
    : hexColor;

  return convertedCode;
}

export function calculateMedianColor(
  hexColors: string[],
  isRgba?: boolean
): string {
  const calculateMedian = (numbers: number[]): number => {
    const sorted = numbers.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
  };

  const rgbColors = hexColors
    .map((hex) => {
      const rgba = hexToRgba(hex);
      const match = rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
      return match
        ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])]
        : null;
    })
    .filter((rgb): rgb is number[] => rgb !== null);

  if (rgbColors.length === 0) {
    throw new Error("No valid colors provided");
  }

  const rs = rgbColors.map((rgb) => rgb[0]);
  const gs = rgbColors.map((rgb) => rgb[1]);
  const bs = rgbColors.map((rgb) => rgb[2]);

  // 각 채널의 중앙값 계산
  const medianR = Math.round(calculateMedian(rs));
  const medianG = Math.round(calculateMedian(gs));
  const medianB = Math.round(calculateMedian(bs));

  // 결과를 hex 코드로 변환하여 반환
  return isRgba
    ? `rgb(${medianR}, ${medianG}, ${medianB})`
    : rgbToHex(medianR, medianG, medianB);
}
