"use client";

import { useState } from "react";

interface ConfirmSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  unfinishedSections: string[];
}

const ConfirmSubmitModal = ({
  isOpen,
  onClose,
  onConfirm,
  unfinishedSections,
}: ConfirmSubmitModalProps) => {
  const [neverShowAgain, setNeverShowAgain] = useState(false);

  const handleConfirm = () => {
    if (neverShowAgain) {
      localStorage.setItem("neverShowSubmitConfirm", "true");
    }
    onConfirm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">确认提交</h3>
        {unfinishedSections.length > 0 && (
          <div className="mb-4">
            <p className="text-yellow-600 font-medium mb-2">
              以下部分尚未完成：
            </p>
            <ul className="list-disc list-inside space-y-1">
              {unfinishedSections.map((section) => (
                <li key={section} className="text-gray-600">
                  {section}
                </li>
              ))}
            </ul>
          </div>
        )}
        <p className="mb-4">确定要提交试卷吗？</p>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={neverShowAgain}
              onChange={(e) => setNeverShowAgain(e.target.checked)}
              className="mr-2"
            />
            不再显示此提示
          </label>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            确认提交
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSubmitModal;
