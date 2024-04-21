export function buildBasePath(
  testType: string,
  year: string,
  month: string,
  set: string
): string {
  return `/data/${testType}/${year}/${year}年${month}英语${
    testType === "CET4" ? "四" : "六"
  }级真题_${set}/`;
}
