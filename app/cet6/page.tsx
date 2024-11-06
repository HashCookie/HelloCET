import { Suspense } from "react";
import YearAndSetSelector from "../components/YearAndSetSelector";
import LoadingSpinner from "../components/Common/LoadingSpinner";

export default function CET6() {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <YearAndSetSelector />
      </Suspense>
    </div>
  );
}
