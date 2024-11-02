import { usePathname } from "next/navigation";
import { useState } from "react";
import { handleListeningSubmit } from "@/app/utils/submitHandlers";

interface SubmitButtonProps {
  section: "writing" | "listening" | "reading" | "translation";
  year?: string;
  month?: string;
  set?: string;
}

const SubmitButton = ({ section, year, month, set }: SubmitButtonProps) => {
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const examType = pathname.includes("cet4") ? "CET4" : "CET6";

  const handleSubmit = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      if (section === "writing") {
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
      } else if (section === "listening") {
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
      }
    } catch (error) {
      console.error("提交失败:", error);
      alert("提交失败,请重试");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-end mt-8">
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`px-6 py-2 text-white rounded-md transition-colors ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isSubmitting ? "提交中..." : "提交答案"}
      </button>
    </div>
  );
};

export default SubmitButton;
