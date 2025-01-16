import { useCallback, useState } from "react";
import { examStorage } from "@/app/utils/common/storage";

const INITIAL_SCROLL_POSITIONS = {
  writing: 0,
  listening: 0,
  reading: 0,
  translation: 0,
} as const;

export function useTabControl(
  selectedYear: number,
  selectedMonth: number,
  selectedSet: number
) {
  const [activeTab, setActiveTab] = useState("writing");
  const [scrollPositions, setScrollPositions] = useState(
    INITIAL_SCROLL_POSITIONS
  );

  const handleTabChange = useCallback(
    (tab: string) => {
      setScrollPositions((prev) => ({
        ...prev,
        [activeTab]: window.scrollY,
      }));

      setActiveTab(tab);
      examStorage.saveState({
        year: selectedYear,
        month: selectedMonth,
        set: selectedSet,
        showControls: true,
        activeTab: tab,
      });

      requestAnimationFrame(() => {
        window.scrollTo(
          0,
          scrollPositions[tab as keyof typeof scrollPositions]
        );
      });
    },
    [activeTab, selectedYear, selectedMonth, selectedSet, scrollPositions]
  );

  return {
    activeTab,
    setActiveTab,
    handleTabChange,
  };
}
