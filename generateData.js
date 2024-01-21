// 1. 引入 fs 和 path 模块
// 2. 使用 path.join 方法将目录名和子目录名拼接成完整的路径，并将其赋值给 dataDir
// 3. 使用 fs.readdirSync 方法读取 dataDir 目录下的所有文件和文件夹名，并将结果赋值给数组 years
// 4. 定义 formatJson 函数，用于将传入的数据格式化为 JSON 数据
// 5. 在 formatJson 函数内部，遍历传入的数据数组 data，并根据特定的规则生成 JSON 字符串
// 6. 在 data 函数内部，使用 map 方法遍历 years 数组，将每个年份对应的数据格式化为对象，存储到数组 data 中
// 7. 使用 formatJson 函数将 data 数组转换为格式化的 JSON 字符串，存储到变量 formattedJson 中
// 8. 使用 fs.writeFileSync 方法将 formattedJson 写入到指定文件路径中

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'public/data');
const years = fs.readdirSync(dataDir);

const formatJson = (data) => {
  return '[\n' + data.map(item => {
    const monthsAndSetsStr = Object.entries(item.monthsAndSets).map(([month, sets]) => {
      return `      "${month}": ["${sets.join('", "')}"]`;
    }).join(',\n');

    return `  {\n    "year": "${item.year}",\n    "monthsAndSets": {\n${monthsAndSetsStr}\n    }\n  }`;
  }).join(',\n') + '\n]';
};

const data = years.map(year => {
  const monthsAndSets = {};
  const yearPath = path.join(dataDir, year);
  const testSets = fs.readdirSync(yearPath);

  testSets.forEach(testSet => {
    const parts = testSet.split('英语四级真题');
    const month = parts[0].slice(5); // "2017年12月" 中的 "12月"
    const set = parts[1].split('_')[1]; // "_第1套" 中的 "第1套"

    if (!monthsAndSets[month]) {
      monthsAndSets[month] = [];
    }
    monthsAndSets[month].push(set);
  });

  return { year, monthsAndSets };
});

const formattedJson = formatJson(data);
fs.writeFileSync(path.join(__dirname, 'public/data.json'), formattedJson);
