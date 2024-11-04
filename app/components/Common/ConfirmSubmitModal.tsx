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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl relative animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">确认提交</h3>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            ✕
          </button>
        </div>

        {unfinishedSections.length > 0 && (
          <div className="mb-6 bg-yellow-50/50 p-4 rounded-lg border border-yellow-200/70 backdrop-blur-sm">
            <p className="text-yellow-700 font-medium mb-3 flex items-center">
              <span className="inline-block w-1.5 h-4 bg-yellow-400 rounded-full mr-2" />
              以下部分尚未完成：
            </p>
            <ul className="space-y-2 pl-3">
              {unfinishedSections.map((section) => (
                <li key={section} className="flex items-center text-gray-700">
                  <span className="w-1 h-1 bg-yellow-400 rounded-full mr-2" />
                  {section}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mb-6 text-gray-600">确定要提交试卷吗？</p>

        <label className="flex items-center mb-6 select-none cursor-pointer group">
          <span className="relative flex items-center">
            <input
              type="checkbox"
              checked={neverShowAgain}
              onChange={(e) => setNeverShowAgain(e.target.checked)}
              className="sr-only peer"
            />
            <span className="w-4 h-4 border-2 border-gray-300 rounded transition-colors peer-checked:border-blue-500 peer-checked:bg-blue-500 flex items-center justify-center">
              {neverShowAgain && <span className="text-white text-xs">✓</span>}
            </span>
          </span>
          <span className="ml-2 text-gray-600 group-hover:text-gray-900 transition-colors">
            不再显示此提示
          </span>
        </label>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
          >
            确认提交
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSubmitModal;
