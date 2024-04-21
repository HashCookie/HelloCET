interface YearData {
  year: string;
  monthsAndSets: { [month: string]: string[] };
}

export function filterMonths(data: YearData[], year: string): string[] {
  const selectedYearData = data.find((item) => item.year === year);
  return Object.keys(selectedYearData?.monthsAndSets || {});
}

export function filterSets(
  data: YearData[],
  year: string,
  month: string
): string[] {
  const selectedYearData = data.find((item) => item.year === year);
  return selectedYearData?.monthsAndSets[month] || [];
}
