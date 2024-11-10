"use client";

import { useScoreRecords } from "@/app/hooks/useScoreRecords";

export default function TotalPracticeTime() {
  const { records } = useScoreRecords();

  const totalMinutes = records.reduce((total, record) => {
    const duration = record.duration || "0秒";

    let minutes = 0;

    const hoursMatch = duration.match(/(\d+)小时/);
    if (hoursMatch) {
      minutes += parseInt(hoursMatch[1]) * 60;
    }

    const minutesMatch = duration.match(/(\d+)分钟/);
    if (minutesMatch) {
      minutes += parseInt(minutesMatch[1]);
    }

    const secondsMatch = duration.match(/(\d+)秒/);
    if (secondsMatch) {
      minutes += parseInt(secondsMatch[1]) / 60;
    }

    return total + minutes;
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);

  return (
    <div className="flex items-baseline gap-1">
      <span className="text-2xl font-bold">{hours}</span>
      <span className="text-sm text-gray-600">小时</span>
      <span className="text-2xl font-bold">{minutes}</span>
      <span className="text-sm text-gray-600">分钟</span>
    </div>
  );
}
