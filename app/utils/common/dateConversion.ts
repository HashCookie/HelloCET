// 格式化持续时间为 "X小时Y分钟Z秒" 的格式
export const formatDurationFromSeconds = (seconds: number): string => {
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

// 将给定的日期字符串转换为北京时间
export const formatDateToBeijingTime = (dateString: string): string => {
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
