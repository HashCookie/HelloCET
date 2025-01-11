import { Suspense } from "react";
import YearAndSetSelector from "@/app/components/YearAndSetSelector";
import LoadingSpinner from "@/app/components/Common/LoadingSpinner";

export default function CET4() {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <YearAndSetSelector />
      </Suspense>
    </div>
  );
}
