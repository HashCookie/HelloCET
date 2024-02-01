import React, { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: string;
}

interface TimeLeft {
  天?: number;
  小时?: number;
  分钟?: number;
  秒?: number;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        天: Math.floor(difference / (1000 * 60 * 60 * 24)),
        小时: Math.floor((difference / (1000 * 60 * 60)) % 24),
        分钟: Math.floor((difference / 1000 / 60) % 60),
        秒: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    const key = interval as keyof TimeLeft;
    const value = timeLeft[key];

    if (!value) {
      return;
    }

    timerComponents.push(
      <span className="text-lg font-semibold" key={key}>
        {value} {key}{" "}
      </span>
    );
  });

  return (
    <div className="flex flex-col items-center justify-center p-5 bg-gray-200 rounded shadow-md">
      <h1 className="text-xl font-bold mb-2">倒计时至 {targetDate}</h1>
      <div className="flex space-x-3">
        {timerComponents.length ? timerComponents : <span>时间到!</span>}
      </div>
    </div>
  );
};

export default Countdown;
