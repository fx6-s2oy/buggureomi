import { useEffect, useState } from "react";

import { useSnowStore } from "@/store/snowStore";
import "./snowFall.css";

const SnowfallBackground = () => {
  const snowflakes = Array.from({ length: 50 });
  const [snowColorArray, setSnowColorArray] = useState<string[]>([]);

  const { colorCodeList } = useSnowStore();

  useEffect(() => {
    const colorSet = new Set(["#FFFFFF"]);

    colorCodeList?.forEach((answer) => {
      colorSet.add(answer.colorCode);
    });

    setSnowColorArray([...colorSet]);
  }, [colorCodeList]);

  return (
    <>
      {snowflakes.map((_, index) => (
        <div
          key={index}
          className="snowflake"
          style={{
            left: `${Math.random() * 95}vw`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 5}s`,
            background:
              snowColorArray[Math.floor(Math.random() * snowColorArray.length)],
          }}
        ></div>
      ))}
    </>
  );
};

export default SnowfallBackground;
