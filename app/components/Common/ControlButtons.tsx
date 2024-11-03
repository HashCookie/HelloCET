"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  handleListeningSubmit,
  handleReadingSubmit,
  handleTranslationSubmit,
} from "@/app/utils/submitHandlers";

interface ControlButtonsProps {
  onReset: () => void;
  activeTab: string;
  year?: string;
  month?: string;
  set?: string;
  answers: {
    writing: string;
    listening: Record<number, string>;
    reading: Record<number, string>;
    translation: string;
  };
}

const ControlButtons = ({
  onReset,
  activeTab,
  year,
  month,
  set,
  answers,
}: ControlButtonsProps) => {
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const examType = pathname.includes("cet4") ? "CET4" : "CET6";

  const handleSubmit = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      switch (activeTab) {
        case "writing": {
          if (!answers.writing?.trim()) {
            alert("请输入作文内容");
            return;
          }

          const response = await fetch("/api/writing", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              essay: answers.writing,
              examType,
            }),
          });

          const data = await response.json();

          if (response.ok) {
            console.log("作文评分结果:", data);
          } else {
            throw new Error(data.error || "提交失败");
          }
          break;
        }

        case "listening": {
          if (!year || !month || !set) {
            alert("缺少试卷信息");
            return;
          }

          if (Object.keys(answers.listening).length === 0) {
            alert("请至少回答一道题目");
            return;
          }

          const result = await handleListeningSubmit(
            answers.listening,
            examType,
            parseInt(year),
            parseInt(month),
            parseInt(set)
          );

          if (result.success) {
            console.log(result.data);
          } else {
            throw new Error(result.error);
          }
          break;
        }

        case "reading": {
          if (!year || !month || !set) {
            alert("缺少试卷信息");
            return;
          }

          if (Object.keys(answers.reading).length === 0) {
            alert("请至少回答一道题目");
            return;
          }

          const result = await handleReadingSubmit(
            answers.reading,
            examType,
            parseInt(year),
            parseInt(month),
            parseInt(set)
          );

          if (result.success) {
            console.log(result.data);
          } else {
            throw new Error(result.error);
          }
          break;
        }

        case "translation": {
          if (!answers.translation?.trim()) {
            alert("请输入翻译内容");
            return;
          }

          const originalText = document.querySelector(".prose p")?.textContent;
          if (!originalText) {
            alert("获取原文失败");
            return;
          }

          const result = await handleTranslationSubmit(
            answers.translation,
            originalText
          );

          if (result.success) {
            console.log(result.data);
          } else {
            throw new Error(result.error);
          }
          break;
        }
      }
    } catch (error) {
      console.error("提交失败:", error);
      alert("提交失败,请重试");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-end space-x-4 pr-4">
      <button
        className={`px-6 py-2 text-white rounded-md transition-colors ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "提交中..." : "提交试卷"}
      </button>
      <button
        className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
        onClick={onReset}
      >
        重新选择
      </button>
    </div>
  );
};

export default ControlButtons;
