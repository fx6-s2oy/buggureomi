import { answerAPI } from "@/api/answer";
import { useEffect, useState } from "react";

const Snowfall = () => {
  const snowflakes = Array.from({ length: 50 });

  const [snowColorArray, setSnowColorArray] = useState<string[]>([]);

  const handleSnowflakeColor = async (memberId: number) => {
    await answerAPI.list({ memberId }).then((res) => {
      const data = res.data.data;

      const colorArr = data.list?.map((answer) => answer.colorCode);
      if (colorArr?.length) {
        setSnowColorArray(colorArr);
      }
    });
  };

  const userId = Number(localStorage.getItem("userId"));
  useEffect(() => {
    handleSnowflakeColor(userId);
  }, [userId]);

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
