const fs = require("fs");
const path = require("path");

// 获取 data 目录的路径
const dataDir = path.join(__dirname, "public/data");
const monthOrder = [
  "1月", "2月", "3月", "4月", "5月", "6月",
  "7月", "8月", "9月", "10月", "11月", "12月",
];
const testTypes = fs.readdirSync(dataDir).filter((item) => {
  const itemPath = path.join(dataDir, item);
  return fs.statSync(itemPath).isDirectory();
});

// 自定义 JSON 字符串格式化函数
function customStringify(data) {
  const jsonString = [];

  jsonString.push("{\n");
  Object.entries(data).forEach(
    ([testType, yearsData], testTypeIndex, testTypeArray) => {
      jsonString.push(`  "${testType}": [\n`);
      yearsData.forEach((yearObj, yearIndex, yearArray) => {
        jsonString.push(`    {\n`);
        jsonString.push(`      "year": "${yearObj.year}",\n`);
        jsonString.push(`      "monthsAndSets": {\n`);
        Object.entries(yearObj.monthsAndSets).forEach(
          ([month, sets], monthIndex, monthArray) => {
            jsonString.push(`        "${month}": ["${sets.join('", "')}"]`);
            if (monthIndex < monthArray.length - 1) jsonString.push(",\n");
          }
        );
        jsonString.push("\n      }\n    }");
        if (yearIndex < yearArray.length - 1) jsonString.push(",\n");
      });
      jsonString.push("\n  ]");
      if (testTypeIndex < testTypeArray.length - 1) jsonString.push(",\n");
    }
  );
  jsonString.push("\n}\n");

  return jsonString.join("");
}

// 处理数据
const processData = (testType) => {
  const testTypePath = path.join(dataDir, testType);
  const years = fs.readdirSync(testTypePath).filter((item) => {
    const itemPath = path.join(testTypePath, item);
    return fs.statSync(itemPath).isDirectory();
  });

  return years.map((year) => {
    const monthsAndSets = {};
    const yearPath = path.join(testTypePath, year);
    const testSets = fs.readdirSync(yearPath);

    testSets.forEach((testSet) => {
      const match = testSet.match(/(\d+年)?(\d+月)英语.+真题_第(\d+)套/);
      if (match) {
        const month = match[2]; // "6月"
        const set = `第${match[3]}套`; // "第1套"

        if (!monthsAndSets[month]) {
          monthsAndSets[month] = [];
        }
        monthsAndSets[month].push(set);
      }
    });

    // 对月份进行排序
    const sortedMonths = Object.keys(monthsAndSets).sort(
      (a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b)
    );

    const sortedMonthsAndSets = {};
    sortedMonths.forEach((month) => {
      sortedMonthsAndSets[month] = monthsAndSets[month];
    });

    return { year, monthsAndSets: sortedMonthsAndSets };
  });
};

// 汇总数据
const formattedData = testTypes.reduce((acc, testType) => {
  acc[testType] = processData(testType);
  return acc;
}, {});

// 将结果转换为自定义格式的 JSON 字符串
const formattedJson = customStringify(formattedData);

// 将 JSON 字符串写入文件
fs.writeFileSync(path.join(__dirname, "public/data.json"), formattedJson);
