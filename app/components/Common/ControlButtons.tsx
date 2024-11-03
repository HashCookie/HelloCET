"use client";

import { useRouter } from "next/navigation";

interface ControlButtonsProps {
  onReset: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

const ControlButtons = ({ onReset, onSubmit, isSubmitting }: ControlButtonsProps) => {
  const router = useRouter();

  return (
    <div className="flex justify-end space-x-4 pr-4">
      <button 
        className={`px-6 py-2 text-white rounded-md transition-colors ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
        onClick={onSubmit}
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
