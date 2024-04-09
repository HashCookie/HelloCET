import { useState, useEffect } from "react";
import { Table } from "@radix-ui/themes";

// 定义记录的类型
interface ScoreRecord {
  date: string;
  type: string;
  score: number;
  completedQuestions: number;
  duration: string;
  attemptId: string;
  seconds: number; //
}

// 格式化持续时间为 "X小时Y分钟Z秒" 的格式
const formatDurationFromSeconds = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds}秒`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}分钟${remainingSeconds.toString().padStart(2, "0")}秒`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}小时${minutes
      .toString()
      .padStart(2, "0")}分钟${remainingSeconds.toString().padStart(2, "0")}秒`;
  }
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
    const combinedDurationInSeconds = new Map<string, number>();
    const combinedScoresMap = new Map<string, ScoreRecord>();

    // 如果scoresString存在，它通过JSON.parse将JSON字符串转换为JavaScript对象数组；如果不存在，返回一个空数组。
    const transformScores = (scoresString: string | null): ScoreRecord[] => {
      return scoresString ? JSON.parse(scoresString) : [];
    };

    const readingScores: ScoreRecord[] = transformScores(
      localStorage.getItem("readingScores")
    );

    const listeningScores: ScoreRecord[] = transformScores(
      localStorage.getItem("listeningScores")
    );
    console.log("readingScores", readingScores);
    console.log("listeningScores", listeningScores);

    // 遍历并合并成绩
    [...readingScores, ...listeningScores].forEach((record) => {
      // 获取已合并的记录，或创建一个新的初始记录
      const combinedRecord = combinedScoresMap.get(record.attemptId) || {
        date: record.date,
        type: record.type,
        score: 0,
        completedQuestions: 0,
        duration: "0分钟0秒",
        seconds: 0, // 新记录初始化秒数为0
        attemptId: record.attemptId,
      };

      // console.log(`处理attemptId为${record.attemptId}的记录`);
      // console.log(`合并记录中添加前的秒数：${combinedRecord.seconds}`);

      // 累加分数和完成题目数
      combinedRecord.score += record.score;
      combinedRecord.score = parseFloat(combinedRecord.score.toFixed(1));
      combinedRecord.completedQuestions += record.completedQuestions;

      // 计算并累加持续时间的秒数
      const currentTotalSeconds =
        combinedDurationInSeconds.get(record.attemptId) || 0;
      const newSeconds = record.seconds || 0; // 使用记录中的秒数，如果不存在则默认为0
      const updatedTotalSeconds = currentTotalSeconds + newSeconds;
      combinedDurationInSeconds.set(record.attemptId, updatedTotalSeconds);

      // console.log(`记录中的新秒数：${newSeconds}`);
      // console.log(`添加后的更新总秒数：${updatedTotalSeconds}`);

      // 更新合并记录中的持续时间
      combinedRecord.duration = formatDurationFromSeconds(updatedTotalSeconds);
      combinedRecord.seconds = updatedTotalSeconds; // 跟踪原始总秒数

      // 将更新后的合并记录放回映射中
      combinedScoresMap.set(record.attemptId, combinedRecord);
    });

    // 设置状态以重新渲染UI
    // 将合并的记录从Map转换为数组
    const combinedRecordsArray = Array.from(combinedScoresMap.values());

    // 对记录按照日期进行排序
    combinedRecordsArray.sort((a, b) => {
      // 转换为日期对象并比较时间戳
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    // 设置状态以重新渲染UI
    setRecords(combinedRecordsArray);
  }, []);

  // 清空旧的localStorage数据
  // localStorage.removeItem("listeningScores");
  // localStorage.removeItem("readingScores");

  return (
    <div className="max-w-4xl mx-auto my-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        成绩记录
      </h2>
      {records.length > 0 ? (
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>日期</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>卷子</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>分数</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>已完成</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>耗时</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {records.map((record, index) => (
              <Table.Row key={index}>
                <Table.Cell>{formatDateToBeijingTime(record.date)}</Table.Cell>
                <Table.Cell>{record.type}</Table.Cell>
                <Table.Cell>{record.score}分</Table.Cell>
                <Table.Cell>{record.completedQuestions}</Table.Cell>
                <Table.Cell>{record.duration}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      ) : (
        <p className="text-center text-gray-600">暂无成绩记录</p>
      )}
    </div>
  );
};

export default ScoresHistory;
