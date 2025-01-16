import { Suspense } from "react";
import LoadingSpinner from "@/app/components/Common/LoadingSpinner";
import ExamDashboardWrapper from "@/app/components/ExamDashboard";

export default function CET4() {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <ExamDashboardWrapper />
      </Suspense>
    </div>
  );
}
