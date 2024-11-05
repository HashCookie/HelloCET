"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Paper {
  year: string;
  month: string;
  set: string;
  tag: string;
  practiceCount: string;
  borderColor: string;
  hoverBg: string;
}

interface PaperInfo {
  year: number;
  month: number;
  setCount: number;
}

export default function RecommendedExams() {
  const router = useRouter();
  const pathname = usePathname();
  const examType = pathname.includes("cet4") ? "CET4" : "CET6";
  const [recommendedPapers, setRecommendedPapers] = useState<Paper[]>([]);

  useEffect(() => {
    const fetchPaperInfo = async () => {
      try {
        const response = await fetch(`/api/papers?type=${examType}`);
        const data = await response.json();
        if (data && data[0]?.papers) {
          const selectedPapers = getRandomPapers(data[0].papers, 3); // 从所有试卷中随机选择3套
          const formattedPapers = selectedPapers.map((paper, index) => ({
            year: paper.year.toString(),
            month: paper.month.toString(),
            set: "1",
            tag: getTag(index),
            practiceCount: generatePracticeCount(),
            borderColor: getBorderColor(index),
            hoverBg: getHoverBg(index),
          }));
          setRecommendedPapers(formattedPapers);
        }
      } catch (error) {
        console.error("获取推荐试卷失败:", error);
      }
    };

    fetchPaperInfo();
  }, [examType]);

  // 随机选择指定数量的试卷
  const getRandomPapers = (papers: PaperInfo[], count: number) => {
    const shuffled = [...papers].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // 根据索引获取标签
  const getTag = (index: number) => {
    const tags = ["最新", "高分率", "经典"];
    return tags[index];
  };

  // 生成随机练习人数
  const generatePracticeCount = () => {
    const count = Math.floor(Math.random() * 8000 + 2000);
    return `${(count / 1000).toFixed(1)}k`;
  };

  // 获取边框颜色
  const getBorderColor = (index: number) => {
    const colors = ["border-blue-500", "border-green-500", "border-yellow-500"];
    return colors[index];
  };

  // 获取悬停背景色
  const getHoverBg = (index: number) => {
    const colors = [
      "hover:bg-blue-50",
      "hover:bg-green-50",
      "hover:bg-yellow-50",
    ];
    return colors[index];
  };

  const handlePaperClick = (paper: Paper) => {
    const lowerCaseExamType = examType.toLowerCase();
    router.push(
      `/${lowerCaseExamType}?year=${paper.year}&month=${paper.month}&set=${paper.set}`
    );
  };

  return (
    <div className="space-y-4">
      {recommendedPapers.map((paper, index) => (
        <div
          key={index}
          onClick={() => handlePaperClick(paper)}
          className={`border-l-4 ${paper.borderColor} pl-4 p-4 ${paper.hoverBg} transition-colors cursor-pointer rounded`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-gray-900">
              {paper.year}年{paper.month}月大学英语{examType.toUpperCase()}
              真题（卷{paper.set}）
            </h3>
            <span className="text-sm text-blue-600 font-medium">
              {paper.tag}
            </span>
          </div>
          <p className="text-sm text-gray-500">{paper.practiceCount}人已练习</p>
        </div>
      ))}
    </div>
  );
}
