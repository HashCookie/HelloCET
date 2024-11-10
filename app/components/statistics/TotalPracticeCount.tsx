"use client";

import { useScoreRecords } from "@/app/hooks/useScoreRecords";

export default function TotalPracticeCount() {
  const { records } = useScoreRecords();
  return <div>{records.length}</div>;
}
