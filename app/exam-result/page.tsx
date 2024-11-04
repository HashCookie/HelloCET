"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ScoreSummary from "@/app/components/ScoreSummary";
import type { ExamResultData } from "@/app/types/score";

export default function ExamResultPage() {
  const [examData, setExamData] = useState<ExamResultData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedResults = sessionStorage.getItem("examResults");
    if (!savedResults) {
      router.push("/");
      return;
    }

    const data = JSON.parse(savedResults) as ExamResultData;
    setExamData(data);
    // 清除数据,防止刷新页面重复显示
    // sessionStorage.removeItem("examResults");
  }, [router]);

  if (!examData) {
    return null;
  }

  return (
    <ScoreSummary results={examData.results} duration={examData.duration} />
  );
}
