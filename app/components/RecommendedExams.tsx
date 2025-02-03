"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { usePaperStore } from "@/app/hooks/usePaperData";
import type { ExamPaperBase } from "@/app/types/exam";

interface Paper extends ExamPaperBase {
  tag: string;
  practiceCount: string;
  borderColor: string;
  hoverBg: string;
}

export default function RecommendedExams() {
  const pathname = usePathname();
  const examType = pathname.includes("cet4") ? "CET4" : "CET6";
  const [recommendedPapers, setRecommendedPapers] = useState<Paper[]>([]);

  const { paperData, loading } = usePaperStore();

  useEffect(() => {
    if (paperData?.papers) {
      const selectedPapers = getRandomPapers(paperData.papers, 5);
      const formattedPapers = selectedPapers.map((paper, index) => ({
        ...paper,
        tag: getTag(index),
        practiceCount: generatePracticeCount(),
        borderColor: getBorderColor(index),
        hoverBg: getHoverBg(index),
      }));
      setRecommendedPapers(formattedPapers);
    }
  }, [paperData]);

  const getRandomPapers = (papers: ExamPaperBase[], count: number) => {
    // 为每份试卷生成一个随机套数（在其实际拥有的套数范围内）
    const papersWithRandomSet = papers.map((paper) => ({
      ...paper,
      setCount: Math.floor(Math.random() * paper.setCount) + 1, // 1 到 actual setCount 之间的随机数
    }));

    // 随机打乱并选择指定数量的试卷
    const shuffled = [...papersWithRandomSet].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // 根据索引获取标签
  const getTag = (index: number) => {
    const tags = ["最新", "高分率", "经典", "热门", "推荐"];
    return tags[index];
  };

  // 生成随机练习人数
  const generatePracticeCount = () => {
    const count = Math.floor(Math.random() * 8000 + 2000);
    return `${(count / 1000).toFixed(1)}k`;
  };

  // 获取边框颜色
  const getBorderColor = (index: number) => {
    const colors = [
      "border-blue-500",
      "border-green-500",
      "border-yellow-500",
      "border-purple-500",
      "border-pink-500",
    ];
    return colors[index];
  };

  // 获取悬停背景色
  const getHoverBg = (index: number) => {
    const colors = [
      "hover:bg-blue-50",
      "hover:bg-green-50",
      "hover:bg-yellow-50",
      "hover:bg-purple-50",
      "hover:bg-pink-50",
    ];
    return colors[index];
  };

  return (
    <div className="space-y-4">
      {loading
        ? [...Array(5)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded border-l-4 border-gray-200 p-4 pl-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="h-5 w-2/3 rounded bg-gray-200"></div>
                <div className="h-4 w-16 rounded bg-gray-200"></div>
              </div>
              <div className="h-4 w-24 rounded bg-gray-200"></div>
            </div>
          ))
        : recommendedPapers.map((paper, index) => (
            <Link
              key={index}
              href={`/${examType.toLowerCase()}?year=${paper.year}&month=${paper.month}&setCount=${paper.setCount}`}
              className={`border-l-4 ${paper.borderColor} p-4 pl-4 ${paper.hoverBg} block cursor-pointer rounded transition-colors`}
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-medium text-gray-900">
                  {paper.year}年{paper.month}月大学英语{examType.toUpperCase()}
                  真题（卷{paper.setCount}）
                </h3>
                <span className="text-sm font-medium text-blue-600">
                  {paper.tag}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                {paper.practiceCount}人已练习
              </p>
            </Link>
          ))}
    </div>
  );
}
