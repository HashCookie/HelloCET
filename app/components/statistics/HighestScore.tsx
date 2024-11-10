"use client";

import { useScoreRecords } from "@/app/hooks/useScoreRecords";

export default function HighestScore() {
  const { records } = useScoreRecords();

  if (records.length === 0) return <div>0</div>;

  const highest = Math.max(...records.map((record) => record.score));
  return <div>{highest.toFixed(1)}</div>;
}
