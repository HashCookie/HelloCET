"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  handleListeningSubmit,
  handleReadingSubmit,
  handleTranslationSubmit,
} from "@/app/utils/submitHandlers";
import { formatDurationFromSeconds } from "@/utils/dateConversion";
import ConfirmSubmitModal from "./ConfirmSubmitModal";
import { examStorage } from "@/app/utils/storage";
import type { Answers } from "@/app/types/answers";

interface ControlButtonsProps {
  onReset: () => void;
  year?: string;
  month?: string;
  set?: string;
  answers: Answers;
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
  const [startTime] = useState(Date.now());
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const examType = pathname.includes("cet4") ? "CET4" : "CET6";

  const calculateDuration = () => {
    const endTime = Date.now();
    return {
      durationInSeconds: Math.floor((endTime - startTime) / 1000),
      endTime,
    };
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const submissionResults = [];
      const attemptId = new Date().getTime().toString();
      const { durationInSeconds: duration } = calculateDuration();

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
            console.log("写作提交成功", data);
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

      // 保存成绩数据到 sessionStorage
      sessionStorage.setItem(
        "examResults",
        JSON.stringify({
          results: submissionResults,
          duration,
          examType,
        })
      );

      // 使用统一的方法清除考试状态
      examStorage.clearExamData();

      // 跳转到成绩统计页面
      window.location.href = "/exam-result";
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

    const { durationInSeconds } = calculateDuration();

    const scoreRecord = {
      date: new Date().toISOString(),
      type: `${year}年${month}月大学英语${examType}真题（卷${set}）`,
      score: data.score,
      completedQuestions: getCompletedQuestions(section, answers),
      duration: formatDurationFromSeconds(durationInSeconds),
      seconds: durationInSeconds,
      attemptId,
      answer:
        section === "writing" || section === "translation"
          ? answers[section]
          : undefined,
      answers:
        section === "listening" || section === "reading"
          ? answers[section]
          : undefined,
    };

    scores.push(scoreRecord);
    localStorage.setItem(storageKey, JSON.stringify(scores));
  };

  const getCompletedQuestions = (section: string, answers: Answers) => {
    switch (section) {
      case "writing":
        return answers.writing?.trim() ? 1 : 0;
      case "translation":
        return answers.translation?.trim() ? 1 : 0;
      case "listening":
        return Object.keys(answers.listening).length;
      case "reading":
        return Object.keys(answers.reading).length;
      default:
        return 0;
    }
  };

  const getUnfinishedSections = () => {
    const unfinished: string[] = [];
    if (!answers.writing?.trim()) unfinished.push("写作");

    const listeningAnswered = Object.keys(answers.listening).length;
    if (listeningAnswered < 25) {
      unfinished.push(`听力(已完成${listeningAnswered}/25题)`);
    }

    const readingAnswered = Object.keys(answers.reading).length;
    if (readingAnswered < 30) {
      unfinished.push(`阅读(已完成${readingAnswered}/30题)`);
    }

    if (!answers.translation?.trim()) unfinished.push("翻译");
    return unfinished;
  };

  const handleSubmitClick = () => {
    const neverShow = localStorage.getItem("neverShowSubmitConfirm");
    const unfinishedSections = getUnfinishedSections();

    if (unfinishedSections.length > 0 && !neverShow) {
      setShowConfirmModal(true);
    } else {
      handleSubmit();
    }
  };

  return (
    <div className="flex justify-end space-x-4 pr-4">
      <ConfirmSubmitModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => {
          setShowConfirmModal(false);
          handleSubmit();
        }}
        unfinishedSections={getUnfinishedSections()}
      />
      <button
        className={`px-6 py-2 text-white rounded-md transition-colors ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
        onClick={handleSubmitClick}
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
