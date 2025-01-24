import { Metadata } from "next";
import { Suspense } from "react";
import LoadingSpinner from "@/app/components/Common/LoadingSpinner";
import ExamDashboardWrapper from "@/app/components/ExamDashboard";

export const metadata: Metadata = {
  title: "大学英语四级(CET4)在线模拟考试",
  description:
    "提供最新大学英语四级考试真题练习，包含听力、阅读、写作和翻译等完整题型",
};

export default function CET4() {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <ExamDashboardWrapper />
      </Suspense>
    </div>
  );
}
