"use client";

import { useRouter } from "next/navigation";

interface ControlButtonsProps {
  onReset: () => void;
}

const ControlButtons = ({ onReset }: ControlButtonsProps) => {
  const router = useRouter();

  return (
    <div className="flex justify-end space-x-4 pr-4">
      <button className="blue-button mt-4" onClick={onReset}>
        重新选择
      </button>
      <button className="blue-button mt-4" onClick={() => router.push("/")}>
        返回
      </button>
    </div>
  );
};

export default ControlButtons;
