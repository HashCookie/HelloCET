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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="animate-fadeIn relative mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800">确认提交</h3>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {unfinishedSections.length > 0 && (
          <div className="mb-6 rounded-lg border border-yellow-200/70 bg-yellow-50/50 p-4 backdrop-blur-sm">
            <p className="mb-3 flex items-center font-medium text-yellow-700">
              <span className="mr-2 inline-block h-4 w-1.5 rounded-full bg-yellow-400" />
              以下部分尚未完成：
            </p>
            <ul className="space-y-2 pl-3">
              {unfinishedSections.map((section) => (
                <li key={section} className="flex items-center text-gray-700">
                  <span className="mr-2 h-1 w-1 rounded-full bg-yellow-400" />
                  {section}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mb-6 text-gray-600">确定要提交试卷吗？</p>

        <label className="group mb-6 flex cursor-pointer select-none items-center">
          <span className="relative flex items-center">
            <input
              type="checkbox"
              checked={neverShowAgain}
              onChange={(e) => setNeverShowAgain(e.target.checked)}
              className="peer sr-only"
            />
            <span className="flex h-4 w-4 items-center justify-center rounded border-2 border-gray-300 transition-colors peer-checked:border-blue-500 peer-checked:bg-blue-500">
              {neverShowAgain && <span className="text-xs text-white">✓</span>}
            </span>
          </span>
          <span className="ml-2 text-gray-600 transition-colors group-hover:text-gray-900">
            不再显示此提示
          </span>
        </label>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200 hover:text-gray-900"
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            确认提交
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSubmitModal;
