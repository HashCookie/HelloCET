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
      <div className="py-12 text-center text-gray-500">
        <p>暂无成绩记录</p>
      </div>
    );
  }

  return (
    <>
      <div className="pr-[17px]">
        <div className="overflow-x-auto">
          <div className="h-[600px] overflow-y-auto">
            <table className="min-w-full table-fixed divide-y divide-gray-200">
              <thead className="sticky top-0 z-10 bg-gray-50">
                <tr>
                  <th className="w-[200px] bg-gray-50 px-6 py-3 text-center text-sm font-medium tracking-wider text-gray-500">
                    日期
                  </th>
                  <th className="w-[360px] bg-gray-50 px-6 py-3 text-center text-sm font-medium tracking-wider text-gray-500">
                    卷子
                  </th>
                  <th className="w-[100px] bg-gray-50 px-6 py-3 text-center text-sm font-medium tracking-wider text-gray-500">
                    分数
                  </th>
                  <th className="w-[100px] bg-gray-50 px-6 py-3 text-center text-sm font-medium tracking-wider text-gray-500">
                    已完成
                  </th>
                  <th className="w-[140px] bg-gray-50 px-6 py-3 text-center text-sm font-medium tracking-wider text-gray-500">
                    耗时
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {getCurrentPageData().map((record, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRecordClick(record)}
                    className="cursor-pointer transition-colors hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                      {formatDateToBeijingTime(record.date)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-900">
                      {record.type}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                      <span className="font-medium text-blue-600">
                        {record.score}分
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                      {formatCompletedQuestions(record)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                      {record.duration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mb-8 mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">共 {records.length} 条记录</div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            上一页
          </button>
          <span className="px-3 py-1">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            下一页
          </button>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={clearRecords}
          className="rounded-lg bg-red-600 px-6 py-2.5 text-white shadow-sm transition-colors duration-200 hover:bg-red-700"
        >
          清除数据
        </button>
      </div>
    </>
  );
}
