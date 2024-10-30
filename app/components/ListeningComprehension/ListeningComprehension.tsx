"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface Option {
  A: string;
  B: string;
  C: string;
  D: string;
}

interface Question {
  number: number;
  options: Option;
}

interface ListeningData {
  listeningComprehension: Question[];
}

const ListeningComprehension = ({ 
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
  const [listeningData, setListeningData] = useState<ListeningData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchListeningData = async () => {
      if (!year || !month || !set) return;
      
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/examData?type=${examType}&year=${year}&month=${month}&set=${set}&field=listeningComprehension`
        );
        const data = await response.json();
        setListeningData(data);
      } catch (error) {
        console.error('获取听力数据失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListeningData();
  }, [year, month, set, examType]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-600">加载中...</span>
      </div>
    );
  }

  if (!listeningData) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Part I Listening Comprehension</h2>
        
        <div className="space-y-8">
          {listeningData.listeningComprehension.map((question) => (
            <div key={question.number} className="border-b pb-6">
              <h3 className="font-semibold mb-4">Question {question.number}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(question.options).map(([key, value]) => (
                  <div key={key} className="flex items-start space-x-2">
                    <div className="flex items-center h-6">
                      <input
                        type="radio"
                        name={`question-${question.number}`}
                        id={`question-${question.number}-${key}`}
                        value={key}
                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <label 
                      htmlFor={`question-${question.number}-${key}`}
                      className="text-sm font-medium text-gray-700"
                    >
                      {key}. {value}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListeningComprehension;
