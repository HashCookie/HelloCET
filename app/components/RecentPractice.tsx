"use client";

import { useRouter, usePathname } from "next/navigation";
import { formatDateToBeijingTime } from "../../utils/dateConversion";
import { useScoreRecords } from "../hooks/useScoreRecords";
import { examStorage } from "@/app/utils/storage";

interface PracticeRecord {
  type: string;
  score: number;
  date: string;
  duration: string;
  year?: string;
  month?: string;
  set?: string;
  attemptId: string;
}

interface ScoreRecord {
  attemptId: string;
  answer?: string;
  answers?: Record<number, string>;
  date: string;
  type: string;
  score: number;
  completedQuestions: number;
  duration: string;
  seconds: number;
}

export default function RecentPractice() {
  const router = useRouter();
  const pathname = usePathname();
  const examType = pathname.includes("cet4") ? "CET4" : "CET6";
  const { records } = useScoreRecords(5, examType);

  const handleRecordClick = async (record: PracticeRecord) => {
    const yearMatch = record.type.match(/(\d{4})年/);
    const monthMatch = record.type.match(/(\d{1,2})月/);
    const setMatch = record.type.match(/卷(\d+)/);

    const year = yearMatch ? yearMatch[1] : "";
    const month = monthMatch ? monthMatch[1] : "";
    const set = setMatch ? setMatch[1] : "1";

    if (!year || !month) {
      console.warn("无法从试卷标题解析出年份或月份");
      return;
    }

    // 获取所有分数记录
    const allScores = {
      writing: JSON.parse(localStorage.getItem('writingScores') || '[]'),
      listening: JSON.parse(localStorage.getItem('listeningScores') || '[]'),
      reading: JSON.parse(localStorage.getItem('readingScores') || '[]'),
      translation: JSON.parse(localStorage.getItem('translationScores') || '[]')
    };

    // 根据试卷信息和attemptId找到对应的答案记录
    const matchRecord = (scores: ScoreRecord[]) => {
      return scores.find((s: ScoreRecord) => 
        s.attemptId === record.attemptId && 
        s.type === record.type
      );
    };

    const writingRecord = matchRecord(allScores.writing);
    const listeningRecord = matchRecord(allScores.listening);
    const readingRecord = matchRecord(allScores.reading);
    const translationRecord = matchRecord(allScores.translation);

    const answers = {
      writing: writingRecord?.answer || '',
      listening: listeningRecord?.answers || {},
      reading: readingRecord?.answers || {},
      translation: translationRecord?.answer || ''
    };

    if (!answers.writing && 
        Object.keys(answers.listening).length === 0 && 
        Object.keys(answers.reading).length === 0 && 
        !answers.translation) {
      console.warn('未找到任何答案记录');
      return;
    }

    // 保存试卷状态
    await examStorage.saveState({
      year,
      month,
      set,
      showControls: true,
      activeTab: 'writing'
    });

    // 保存答案到 examStorage
    await examStorage.saveAnswers(answers);

    // 跳转到对应试卷页面
    const lowerCaseExamType = examType.toLowerCase();
    router.push(`/${lowerCaseExamType}?year=${year}&month=${month}&set=${set}`);
  };

  if (records.length === 0) {
    return <div className="text-center text-gray-500 py-8">暂无练习记录</div>;
  }

  return (
    <div className="space-y-4">
      {records.map((record, index) => (
        <div
          key={index}
          onClick={() => handleRecordClick(record)}
          className="p-4 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">{record.type}</h4>
            <span className="text-blue-600 font-medium">
              {record.score.toFixed(1)}分
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {formatDateToBeijingTime(record.date)} | 用时: {record.duration}
          </div>
        </div>
      ))}
    </div>
  );
}
