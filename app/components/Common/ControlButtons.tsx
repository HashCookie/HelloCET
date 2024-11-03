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

interface ScoreData {
  score: number;
  totalQuestions?: number;
  accuracy?: number;
  totalScore?: number;
  details?: unknown;
}

const ControlButtons = ({
  onReset,
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
      const submissionResults = [];
      const attemptId = new Date().getTime().toString();

      // 检查并提交写作部分
      if (answers.writing?.trim()) {
        try {
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
            submissionResults.push({ section: "写作", data });
            saveScoreToLocalStorage("writing", data, examType, attemptId);
          }
        } catch {
          submissionResults.push({ section: "写作", error: "提交失败" });
        }
      }

      // 检查并提交听力部分
      if (Object.keys(answers.listening).length > 0 && year && month && set) {
        try {
          const result = await handleListeningSubmit(
            answers.listening,
            examType,
            parseInt(year),
            parseInt(month),
            parseInt(set)
          );

          if (result.success && result.data) {
            submissionResults.push({ section: "听力", data: result.data });
            saveScoreToLocalStorage(
              "listening",
              result.data,
              examType,
              attemptId
            );
          } else {
            submissionResults.push({ section: "听力", error: result.error });
          }
        } catch {
          submissionResults.push({ section: "听力", error: "提交失败" });
        }
      }

      // 检查并提交阅读部分
      if (Object.keys(answers.reading).length > 0 && year && month && set) {
        try {
          const result = await handleReadingSubmit(
            answers.reading,
            examType,
            parseInt(year),
            parseInt(month),
            parseInt(set)
          );

          if (result.success && result.data) {
            submissionResults.push({ section: "阅读", data: result.data });
            saveScoreToLocalStorage(
              "reading",
              result.data,
              examType,
              attemptId
            );
          } else {
            submissionResults.push({ section: "阅读", error: result.error });
          }
        } catch {
          submissionResults.push({ section: "阅读", error: "提交失败" });
        }
      }

      // 检查并提交翻译部分
      if (answers.translation?.trim()) {
        try {
          const originalText = document.querySelector(".prose p")?.textContent;
          if (originalText) {
            const result = await handleTranslationSubmit(
              answers.translation,
              originalText
            );

            if (result.success && result.data) {
              submissionResults.push({ section: "翻译", data: result.data });
              saveScoreToLocalStorage(
                "translation",
                result.data,
                examType,
                attemptId
              );
            } else {
              submissionResults.push({ section: "翻译", error: result.error });
            }
          }
        } catch {
          submissionResults.push({ section: "翻译", error: "提交失败" });
        }
      }

      // 检查提交结果
      if (submissionResults.length === 0) {
        alert("请至少完成一个部分的答题");
        return;
      }

      // 显示提交结果
      console.log("提交结果:", submissionResults);
    } catch (error) {
      console.error("提交失败:", error);
      alert("提交失败,请重试");
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveScoreToLocalStorage = (
    section: string,
    data: ScoreData,
    examType: string,
    attemptId: string
  ) => {
    const storageKey = `${section}Scores`;
    const existingScores = localStorage.getItem(storageKey);
    const scores = existingScores ? JSON.parse(existingScores) : [];

    const scoreRecord = {
      date: new Date().toISOString(),
      type: examType,
      score:
        section === "writing" || section === "translation"
          ? data.score
          : data.score * 7.1,
      completedQuestions:
        section === "writing" || section === "translation"
          ? 1
          : data.totalQuestions,
      duration: "计时功能待实现",
      seconds: 0,
      attemptId,
    };

    scores.push(scoreRecord);
    localStorage.setItem(storageKey, JSON.stringify(scores));
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
