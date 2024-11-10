"use client";

import { useScoreRecords } from "@/app/hooks/useScoreRecords";

export default function TotalPracticeTime() {
  const { records } = useScoreRecords();

  const totalMinutes = records.reduce((total, record) => {
    const duration = record.duration;
    const [minutes] = duration.split(":").map(Number);
    return total + minutes;
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <div>
      {hours}小时{minutes}分钟
    </div>
  );
}
