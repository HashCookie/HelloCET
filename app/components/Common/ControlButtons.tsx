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
}

const ControlButtons = ({ onReset, activeTab, year, month, set }: ControlButtonsProps) => {
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const examType = pathname.includes("cet4") ? "CET4" : "CET6";

  const handleSubmit = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      switch (activeTab) {
        case "writing": {
          const essay = (
            document.getElementById("writing") as HTMLTextAreaElement
          )?.value;

          if (!essay?.trim()) {
            alert("请输入作文内容");
            return;
          }

          const response = await fetch("/api/writing", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              essay,
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

          const answers: Record<number, string> = {};
          const inputs = document.querySelectorAll('input[type="radio"]:checked');

          inputs.forEach((input) => {
            const name = input.getAttribute("name");
            if (name?.startsWith("question-")) {
              const number = parseInt(name.replace("question-", ""));
              answers[number] = (input as HTMLInputElement).value;
            }
          });

          if (Object.keys(answers).length === 0) {
            alert("请至少回答一道题目");
            return;
          }

          const result = await handleListeningSubmit(
            answers,
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

          const answers: Record<number, string> = {};

          // 获取 Section A 的文本输入
          const textInputs = document.querySelectorAll('input[type="text"]');
          textInputs.forEach((input) => {
            const name = input.getAttribute("name");
            if (name?.startsWith("question-")) {
              const number = parseInt(name.replace("question-", ""));
              const value = (input as HTMLInputElement).value;
              if (value) {
                answers[number] = value.toUpperCase();
              }
            }
          });

          // 获取 Section B 和 C 的单选答案
          const radioInputs = document.querySelectorAll(
            'input[type="radio"]:checked'
          );
          radioInputs.forEach((input) => {
            const name = input.getAttribute("name");
            if (name?.startsWith("question-")) {
              const number = parseInt(name.replace("question-", ""));
              answers[number] = (input as HTMLInputElement).value;
            }
          });

          if (Object.keys(answers).length === 0) {
            alert("请至少回答一道题目");
            return;
          }

          const result = await handleReadingSubmit(
            answers,
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
          const translationText = (
            document.getElementById("translation") as HTMLTextAreaElement
          )?.value;

          if (!translationText?.trim()) {
            alert("请输入翻译内容");
            return;
          }

          const originalText = document.querySelector(".prose p")?.textContent;
          if (!originalText) {
            alert("获取原文失败");
            return;
          }

          const result = await handleTranslationSubmit(
            translationText,
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
