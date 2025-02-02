import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

async function getYearsAndPapers(examType: string) {
  try {
    const basePath = path.join(
      process.cwd(),
      "public",
      "papers",
      examType.toLowerCase()
    );

    const years = await fs.readdir(basePath);
    const papers = [];
    const monthSet = new Set<number>();

    for (const year of years) {
      if (year.startsWith(".")) continue;

      const yearPath = path.join(basePath, year);
      const months = await fs.readdir(yearPath);

      for (const month of months) {
        if (month.startsWith(".")) continue;

        const monthPath = path.join(yearPath, month);
        const files = await fs.readdir(monthPath);

        const jsonFiles = files.filter((f) => f.endsWith(".json"));
        monthSet.add(parseInt(month));
        papers.push({
          year: parseInt(year),
          month: parseInt(month),
          setCount: jsonFiles.length,
        });
      }
    }

    return [
      {
        _id: null,
        years: years.filter((y) => !y.startsWith(".")).map((y) => parseInt(y)),
        months: Array.from(monthSet),
        papers,
      },
    ];
  } catch (error) {
    throw error;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const examType = searchParams.get("type") || "CET4";

  try {
    const result = await getYearsAndPapers(examType);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "未知错误" },
      { status: 500 }
    );
  }
}
