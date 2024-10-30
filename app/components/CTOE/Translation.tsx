"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface TranslationData {
  translation: {
    ChinesePassage: string;
  };
}

const Translation = ({
  year,
  month,
  set
}: {
  year: string;
  month: string;
  set: string;
}) => {
  const pathname = usePathname();
  const examType = pathname.includes('cet4') ? 'CET4' : 'CET6';
  const [translationData, setTranslationData] = useState<TranslationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTranslationData = async () => {
      if (!year || !month || !set) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/translation?type=${examType}&year=${year}&month=${month}&set=${set}`
        );
        const data = await response.json();
        setTranslationData(data);
      } catch (error) {
        console.error('获取翻译数据失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTranslationData();
  }, [year, month, set, examType]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-600">加载中...</span>
      </div>
    );
  }

  if (!translationData) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Part IV Translation</h2>
        
        <div className="mb-6">
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {translationData.translation.ChinesePassage}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <textarea
            id="translation"
            rows={10}
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="在此输入你的翻译..."
          />
        </div>
      </div>
    </div>
  );
};

export default Translation;
