import { usePathname } from "next/navigation";
import { useState } from "react";

interface SubmitButtonProps {
  section: "writing" | "listening" | "reading" | "translation";
}

const SubmitButton = ({ section }: SubmitButtonProps) => {
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
