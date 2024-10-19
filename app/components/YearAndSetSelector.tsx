"use client";

import { useState } from "react";

const YearAndSetSelector = () => {
  const [showControls, setShowControls] = useState(false);

  const handleSubmit = () => {
    setShowControls(true);
  };

  return (
    <div className="font-[sans-serif] space-x-4 space-y-4 text-center">
      {showControls ? (
        <div className="flex justify-end space-x-4 pr-4">
          <button className="blue-button mt-4">重新选择</button>
          <button className="blue-button mt-4">返回</button>
        </div>
      ) : (
        <div className="flex-wrap justify-center items-center space-x-4 space-y-4">
          <select className="blue-select">
            <option value="">选择年份</option>
          </select>
          <select className="blue-select">
            <option value="">选择月份</option>
          </select>
          <select className="blue-select">
            <option value="">选择套数</option>
          </select>
          <button
            onClick={handleSubmit}
            className="blue-button"
          >
            加载数据
          </button>
        </div>
      )}
    </div>
  );
};

export default YearAndSetSelector;
