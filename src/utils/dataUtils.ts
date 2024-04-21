import { TableRecord } from "../components/ScoreStatistics";

// 这个函数是异步的并且返回一个Promise，它解析为TableRecord类型的数组
export async function fetchRecords(): Promise<TableRecord[]> {
  // 模拟异步获取数据
  return [
    {
      category: "时间",
      writingTest: "",
      listeningTest: "",
      readingTest: "",
      translationTest: "",
    },
    {
      category: "题目",
      writingTest: "0 | 1",
      listeningTest: "0 | 25",
      readingTest: "0 | 30",
      translationTest: "0 | 1",
    },
    {
      category: "分数",
      writingTest: "0 | 106.5",
      listeningTest: "0 | 248.5",
      readingTest: "0 | 248.5",
      translationTest: "0 | 106.5",
    },
  ];
}
