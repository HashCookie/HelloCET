import React from "react";

export interface TableRecord {
  category: string;
  writingTest: string;
  listeningTest: string;
  listeningTimestamp?: string;
  readingTest: string;
  readingTimestamp?: string;
  translationTest: string;
  writingTimestamp?: string;
  translationTimestamp?: string;
}

interface DataComponentProps {
  records: TableRecord[];
}

const ScoreStatistics: React.FC<DataComponentProps> = ({ records }) => {
  return (
    <div className="container mx-auto px-30 mt-20 mb-3">
      <table className="min-w-full divide-y divide-gray-200 shadow-sm border-2 border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              分类
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
              作文测试
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
              听力测试
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
              阅读测试
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
              翻译测试
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {records.map((record, idx) => (
            <tr
              key={idx}
              className={`${
                idx % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100`}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {record.category}
              </td>
              <td className="text-center text-sm text-gray-700 font-light">
                {record.writingTest}
              </td>
              <td className="text-center text-sm text-gray-700 font-light">
                {record.listeningTest}
              </td>
              <td className="text-center text-sm text-gray-700 font-light">
                {record.readingTest}
              </td>
              <td className="text-center text-sm text-gray-700 font-light">
                {record.translationTest}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreStatistics;
