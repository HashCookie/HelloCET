import { Suspense } from "react";
import ExamDashboardWrapper from "@/app/components/ExamDashboard";
import LoadingSpinner from "@/app/components/Common/LoadingSpinner";

export default function CET6() {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <ExamDashboardWrapper />
      </Suspense>
    </div>
  );
}
