import { useState, useEffect, CSSProperties } from "react";

interface BottomSheetProps {
  isVisible: boolean;
  style?: {
    background: CSSProperties["backgroundColor"];
  };
  onClose: () => void;
  children: React.ReactNode;
}

export const BottomSheet = ({
  isVisible,
  style,
  onClose,
  children,
}: BottomSheetProps) => {
  const [animation, setAnimation] = useState("translate-y-full");

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setAnimation("translate-y-0");
      }, 50);
    } else {
      setAnimation("translate-y-full");
    }
  }, [isVisible]);

  const handleOverlayClick = () => {
    onClose();
  };

  const handleSheetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 transition-opacity"
      onClick={handleOverlayClick}
    >
      <div
        onClick={handleSheetClick}
        style={{ backgroundColor: style?.background }}
        className={`
          fixed bottom-0 w-screen
          transform transition-transform duration-300 ease-out ${animation} rounded-t-3xl
        `}
      >
        {children}
      </div>
    </div>
  );
};
