"use client";

import { formatDateToBeijingTime } from "../../utils/dateConversion";
import { useScoreRecords, type ScoreRecord } from "../hooks/useScoreRecords";

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
  const { records, clearRecords } = useScoreRecords();

  return (
    <div className="max-w-4xl mx-auto my-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        成绩记录
      </h2>
      {records.length > 0 ? (
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
                  {records.map((record, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
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
          <div className="text-center mt-8">
            <button
              onClick={clearRecords}
              className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-sm"
            >
              清除数据
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p>暂无成绩记录</p>
        </div>
      )}
    </div>
  );
}
