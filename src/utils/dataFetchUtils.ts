// 用于获取不同类型的测试数据
export async function fetchData(testType: string): Promise<any> {
  try {
    const response = await fetch("/data.json");
    const allData = await response.json();
    const testData = allData[testType];
    return testData;
  } catch (error) {
    console.error("Error loading data:", error);
    throw error; // 抛出错误以允许调用者处理
  }
}
