"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ScoreSummary from "@/app/components/ScoreSummary";
import type { ExamResult } from "@/app/types/score";

export default function ExamResultPage() {
  const [examData, setExamData] = useState<ExamResult | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedResults = sessionStorage.getItem("examResults");
    if (!savedResults) {
      router.push("/");
      return;
    }

    const data = JSON.parse(savedResults) as ExamResult;
    setExamData(data);
  }, [router]);

  if (!examData) {
    return null;
  }

  return (
    <ScoreSummary
      results={examData.results}
      duration={examData.duration}
      examType={examData.examType}
    />
  );
}
