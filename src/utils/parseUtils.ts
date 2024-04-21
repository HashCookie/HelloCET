// utils/parseUtils.ts

export function extractPaperDetails(basePath: string): string {
  const regex =
    /\/data\/(CET[46])\/(\d{4})\/\d{4}年(\d+)月英语[四六]级真题_第(\d+)套\//;
  const matches = basePath.match(regex);
  if (!matches) {
    return "未知试卷";
  }
  const [, testType, year, month, set] = matches;
  const testName = testType === "CET4" ? "四级" : "六级";
  return `${year}年${month}月大学英语${testName}真题（卷${set}）`;
}
