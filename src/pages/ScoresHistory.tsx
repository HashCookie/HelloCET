import React, { useState, useEffect } from "react";

// 定义记录的类型
interface ScoreRecord {
  date: string;
  type: string;
  score: number;
  completedQuestions: number;
  duration: string;
}

// 将持续时间字符串转换为秒数
const convertDurationToSeconds = (duration: string): number => {
  const [hours = "0", minutes = "0", seconds = "0"] =
    duration.match(/\d+/g) || [];
  return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
};

// 格式化持续时间为 "X小时Y分钟Z秒" 的格式
const formatDurationFromSeconds = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${
    hours > 0 ? hours + "小时" : ""
  }${minutes}分钟${remainingSeconds}秒`;
};

//将给定的日期字符串转换为北京时间。由于北京时间是UTC+8，函数考虑了时区差异，并格式化日期和时间。
const formatDateToBeijingTime = (dateString: string): string => {
  const date = new Date(dateString);
  const beijingTimeOffset = 8 * 60; // 北京时间偏移量，以分钟为单位
  const localTimeOffset = date.getTimezoneOffset(); // 本地时间与UTC的偏移量，以分钟为单位
  date.setMinutes(date.getMinutes() + beijingTimeOffset + localTimeOffset);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() 返回的月份是从0开始的
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${year}年${month}月${day}日 ${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};

const ScoresHistory = () => {
  const [records, setRecords] = useState<ScoreRecord[]>([]);

  useEffect(() => {
    const readingScoresString = localStorage.getItem("readingScores");
    const listeningScoresString = localStorage.getItem("listeningScores");
    console.log("readingScores1", readingScoresString);
    console.log("listeningScores1", listeningScoresString);

    // 如果scoresString存在，它通过JSON.parse将JSON字符串转换为JavaScript对象数组；如果不存在，返回一个空数组。
    const transformScores = (scoresString: string | null): ScoreRecord[] => {
      return scoresString ? JSON.parse(scoresString) : [];
    };

    const readingScores: ScoreRecord[] = transformScores(
      localStorage.getItem("readingScores")
    );
    console.log("readingScores2", readingScores);

    const listeningScores: ScoreRecord[] = transformScores(
      localStorage.getItem("listeningScores")
    );
    console.log("listeningScores2", listeningScores);

    const combinedRecords = readingScores.map((readingRecord) => {
      //查找满足特定条件的第一个元素，并返回该元素。在这个上下文中，find方法被用来从listeningScores数组中查找与当前readingRecord具有相同日期的听力成绩记录。
      const listeningRecord = listeningScores.find(
        (ls) => ls.date === readingRecord.date
      );

      console.log("listeningRecord", listeningRecord);
      if (listeningRecord) {
        const totalScore = readingRecord.score + listeningRecord.score;
        const totalCompletedQuestions =
          readingRecord.completedQuestions + listeningRecord.completedQuestions;

        const totalDurationSeconds =
          convertDurationToSeconds(readingRecord.duration) +
          convertDurationToSeconds(listeningRecord.duration);

        const totalDurationFormatted =
          formatDurationFromSeconds(totalDurationSeconds);

        return {
          ...readingRecord,
          score: totalScore,
          completedQuestions: totalCompletedQuestions,
          duration: totalDurationFormatted,
        };
      }
      return readingRecord; // 如果没有找到匹配的听力记录，返回阅读记录本身
    });

    setRecords(combinedRecords);
  }, []);

  // 清空旧的localStorage数据
  // localStorage.removeItem("listeningScores");
  // localStorage.removeItem("readingScores");

  console.log("records", records);

  return (
    <div className="max-w-4xl mx-auto my-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        成绩记录
      </h2>
      {records.length > 0 ? (
        <ul className="list-disc pl-5 space-y-2">
          {records.map((record, index) => (
            <li key={index} className="text-gray-600">
              <span className="font-medium">
                {formatDateToBeijingTime(record.date)}
              </span>{" "}
              <span className="font-medium">{record.type}</span>, 分数:{" "}
              <span className="font-medium">{record.score}</span>分, 完成题目:{" "}
              <span className="font-medium">{record.completedQuestions}</span>,
              耗时: <span className="font-medium">{record.duration}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">暂无成绩记录</p>
      )}
    </div>
  );
};

export default ScoresHistory;
