"use client";

import { useRouter } from "next/navigation";
import { formatDateToBeijingTime } from "../../utils/dateConversion";
import { useScoreRecords, type ScoreRecord } from "../hooks/useScoreRecords";
import { examStorage } from "@/app/utils/storage";
import { useState } from "react";

const ITEMS_PER_PAGE = 10;

const formatCompletedQuestions = (record: ScoreRecord) => {
  const type = record.type.toLowerCase();
  if (type.includes("writing")) {
    return record.completedQuestions ? "写作1篇" : "写作0篇";
  } else if (type.includes("translation")) {
    return record.completedQuestions ? "翻译1篇" : "翻译0篇";
  } else if (type.includes("listening")) {
    return `听力${record.completedQuestions}/25题`;
  } else if (type.includes("reading")) {
    return `阅读${record.completedQuestions}/30题`;
  }
  return `${record.completedQuestions}题`;
};

export default function ScoresHistory() {
  const router = useRouter();
  const { records, clearRecords } = useScoreRecords();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(records.length / ITEMS_PER_PAGE);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return records.slice(startIndex, endIndex);
  };

  const handleRecordClick = async (record: ScoreRecord) => {
    const yearMatch = record.type.match(/(\d{4})年/);
    const monthMatch = record.type.match(/(\d{1,2})月/);
    const setMatch = record.type.match(/卷(\d+)/);
    const examTypeMatch = record.type.match(/(CET4|CET6)/i);

    const year = yearMatch ? yearMatch[1] : "";
    const month = monthMatch ? monthMatch[1] : "";
    const set = setMatch ? setMatch[1] : "1";
    const examType = examTypeMatch ? examTypeMatch[1].toLowerCase() : "";

    if (!year || !month || !examType) {
      console.warn("无法从试卷标题解析出年份、月份或考试类型");
      return;
    }

    const allScores = {
      writing: JSON.parse(localStorage.getItem("writingScores") || "[]"),
      listening: JSON.parse(localStorage.getItem("listeningScores") || "[]"),
      reading: JSON.parse(localStorage.getItem("readingScores") || "[]"),
      translation: JSON.parse(
        localStorage.getItem("translationScores") || "[]"
      ),
    };

    const matchRecord = (scores: ScoreRecord[]) => {
      return scores.find(
        (s: ScoreRecord) =>
          s.attemptId === record.attemptId && s.type === record.type
      );
    };

    const writingRecord = matchRecord(allScores.writing);
    const listeningRecord = matchRecord(allScores.listening);
    const readingRecord = matchRecord(allScores.reading);
    const translationRecord = matchRecord(allScores.translation);

    const answers = {
      writing: writingRecord?.answer || "",
      listening: listeningRecord?.answers || {},
      reading: readingRecord?.answers || {},
      translation: translationRecord?.answer || "",
    };

    await examStorage.saveState({
      year,
      month,
      set,
      showControls: true,
      activeTab: "writing",
      readOnly: true,
    });

    await examStorage.saveAnswers(answers);

    router.push(
      `/${examType}?year=${year}&month=${month}&set=${set}&readOnly=true`
    );
  };

  if (records.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>暂无成绩记录</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <div className="max-h-[600px] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 tracking-wider bg-gray-50">
                  日期
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 tracking-wider bg-gray-50">
                  卷子
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 tracking-wider bg-gray-50">
                  分数
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 tracking-wider bg-gray-50">
                  已完成
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 tracking-wider bg-gray-50">
                  耗时
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getCurrentPageData().map((record, index) => (
                <tr
                  key={index}
                  onClick={() => handleRecordClick(record)}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    {formatDateToBeijingTime(record.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {record.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                    <span className="text-blue-600 font-medium">
                      {record.score}分
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    {formatCompletedQuestions(record)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    {record.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 mb-8">
        <div className="text-sm text-gray-500">共 {records.length} 条记录</div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            上一页
          </button>
          <span className="px-3 py-1">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            下一页
          </button>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={clearRecords}
          className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-sm"
        >
          清除数据
        </button>
      </div>
    </>
  );
}
