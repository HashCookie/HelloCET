"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface Option {
  A: string;
  B: string;
  C: string;
  D: string;
}

interface SectionAQuestion {
  number: number;
  statement: string;
}

interface SectionBCQuestion {
  number: number;
  statement: string;
  options: Option;
}

interface ReadingData {
  readingComprehension: {
    sectionA: {
      passages: string[];
      options: {
        [key: string]: string;
      };
    };
    sectionB: {
      passageTitle: string;
      passages: string[];
      questions: SectionAQuestion[];
    };
    sectionC: {
      passagesOne: string[];
      questionsOne: SectionBCQuestion[];
      passagesTwo: string[];
      questionsTwo: SectionBCQuestion[];
    };
  };
}

const ReadingComprehension = ({
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
  const [readingData, setReadingData] = useState<ReadingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchReadingData = async () => {
      if (!year || !month || !set) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/reading?type=${examType}&year=${year}&month=${month}&set=${set}`
        );
        const data = await response.json();
        console.log('Reading Data:', data); // 用于调试
        setReadingData(data);
      } catch (error) {
        console.error('获取阅读数据失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReadingData();
  }, [year, month, set, examType]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-600">加载中...</span>
      </div>
    );
  }

  if (!readingData?.readingComprehension) {
    return null;
  }

  const { sectionA, sectionB, sectionC } = readingData.readingComprehension;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Part III Reading Comprehension</h2>

        {/* Section A */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Section A</h3>
          <div className="space-y-4 mb-6">
            {sectionA?.passages.map((passage, index) => (
              <p key={index} className="text-gray-700 leading-relaxed">
                {passage}
              </p>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(sectionA?.options || {}).map(([key, value]) => (
              <div key={key} className="flex items-start space-x-2">
                <span className="font-semibold">{key}.</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section B */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Section B</h3>
          <h4 className="text-md font-medium mb-4">{sectionB?.passageTitle}</h4>
          <div className="space-y-4 mb-6">
            {sectionB?.passages.map((passage, index) => (
              <p key={index} className="text-gray-700 leading-relaxed">
                {passage}
              </p>
            ))}
          </div>
          <div className="space-y-6">
            {sectionB?.questions.map((question) => (
              <div key={question.number} className="border-b pb-4">
                <p className="font-medium mb-3">
                  {question.number}. {question.statement}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section C */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Section C</h3>
          
          {/* 第一篇文章 (46-50) */}
          <div className="mb-8">
            <div className="space-y-4 mb-6">
              {sectionC?.passagesOne.map((passage, index) => (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {passage}
                </p>
              ))}
            </div>
            <div className="space-y-6">
              {sectionC?.questionsOne.map((question) => (
                <div key={question.number} className="border-b pb-4">
                  <p className="font-medium mb-3">
                    {question.number}. {question.statement}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(question.options).map(([key, value]) => (
                      <div key={key} className="flex items-start space-x-2">
                        <input
                          type="radio"
                          name={`question-${question.number}`}
                          id={`question-${question.number}-${key}`}
                          value={key}
                          className="mt-1"
                        />
                        <label htmlFor={`question-${question.number}-${key}`}>
                          {key}. {value}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 第二篇文章 (51-55) */}
          <div className="mb-8">
            <div className="space-y-4 mb-6">
              {sectionC?.passagesTwo.map((passage, index) => (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {passage}
                </p>
              ))}
            </div>
            <div className="space-y-6">
              {sectionC?.questionsTwo.map((question) => (
                <div key={question.number} className="border-b pb-4">
                  <p className="font-medium mb-3">
                    {question.number}. {question.statement}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(question.options).map(([key, value]) => (
                      <div key={key} className="flex items-start space-x-2">
                        <input
                          type="radio"
                          name={`question-${question.number}`}
                          id={`question-${question.number}-${key}`}
                          value={key}
                          className="mt-1"
                        />
                        <label htmlFor={`question-${question.number}-${key}`}>
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
      </div>
    </div>
  );
};

export default ReadingComprehension;
