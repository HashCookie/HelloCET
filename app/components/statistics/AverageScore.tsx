"use client";

import { useScoreRecords } from "@/app/hooks/useScoreRecords";

export default function AverageScore() {
  const { records } = useScoreRecords();

  if (records.length === 0) return <div>0</div>;

  const average =
    records.reduce((sum, record) => sum + record.score, 0) / records.length;
  return <div>{average.toFixed(1)}</div>;
}
