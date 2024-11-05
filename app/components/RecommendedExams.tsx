"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RecommendedExams() {
  const pathname = usePathname();
  const examType = pathname.includes("cet4") ? "cet4" : "cet6";

  const recommendedPapers = [
    {
      year: "2023",
      month: "12",
      set: "1",
      tag: "最新",
      practiceCount: "3.2k",
      borderColor: "border-blue-500",
      hoverBg: "hover:bg-blue-50"
    },
    {
      year: "2023",
      month: "6",
      set: "2",
      tag: "高分率",
      practiceCount: "5.6k",
      borderColor: "border-green-500",
      hoverBg: "hover:bg-green-50"
    },
    {
      year: "2022",
      month: "12",
      set: "1",
      tag: "经典",
      practiceCount: "4.8k",
      borderColor: "border-yellow-500",
      hoverBg: "hover:bg-yellow-50"
    }
  ];

  return (
    <div className="space-y-4">
      {recommendedPapers.map((paper, index) => (
        <Link 
          key={index}
          href={`/${examType}?year=${paper.year}&month=${paper.month}&set=${paper.set}`}
        >
          <div className={`border-l-4 ${paper.borderColor} pl-4 p-4 ${paper.hoverBg} transition-colors cursor-pointer rounded`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">
                {paper.year}年{paper.month}月第{paper.set}套
              </h3>
              <span className="text-sm text-blue-600 font-medium">
                {paper.tag}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {paper.practiceCount}人已练习
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
