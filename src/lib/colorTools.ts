export function hexToRgba(hexColor: string, opacity: number = 1) {
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

  const rgb = hexToRgb(hexColor);
  const backgroundColor = rgb
    ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
    : hexColor;

  return backgroundColor;
}
