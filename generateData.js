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
