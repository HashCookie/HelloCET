export const extractPaperName = (basePath: string): string => {
  const regex = /(\d{4})年(\d+)月英语(四级|六级)真题_第(\d+)套/;
  const match = basePath.match(regex);
  if (match) {
    const [, year, month, level, setNumber] = match;
    const levelName = level === "四级" ? "英语四级" : "英语六级";
    return `${levelName}${year}年${month}月第${setNumber}套`;
  }
  return "未知试卷";
};

export const calculateDuration = (start: Date, end: Date): string => {
  const durationInSeconds = Math.round(
    (end.getTime() - start.getTime()) / 1000
  );

  let formattedDuration = "";
  if (durationInSeconds < 60) {
    formattedDuration = `${durationInSeconds}秒`;
  } else if (durationInSeconds < 3600) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    formattedDuration = `${minutes}分钟${seconds
      .toString()
      .padStart(2, "0")}秒`;
  } else {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;
    formattedDuration = `${hours}小时${minutes
      .toString()
      .padStart(2, "0")}分钟${seconds.toString().padStart(2, "0")}秒`;
  }

  return formattedDuration;
};
