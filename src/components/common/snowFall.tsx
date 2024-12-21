import { useEffect, useState } from "react";
import { answerAPI } from "@/api/answer";

import { useUserStore } from "@/store/userStore";

const Snowfall = () => {
  const snowflakes = Array.from({ length: 50 });

  const [snowColorArray, setSnowColorArray] = useState<string[]>([]);

  const handleSnowflakeColor = async () => {
    await answerAPI.list().then((res) => {
      const data = res.data.data;

      const colorArr = data.list?.map((answer) => answer.colorCode);
      if (colorArr?.length) {
        setSnowColorArray(colorArr);
      }
    });
  };

  const { userInfo } = useUserStore();
  useEffect(() => {
    handleSnowflakeColor();
  }, [userInfo]);

  return (
    <>
      {snowflakes.map((_, index) => (
        <div
          key={index}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}vw`,
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

export default Snowfall;
