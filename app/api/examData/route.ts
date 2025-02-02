import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

interface PaperQueryParams {
  examType: string;
  year: number;
  month: number;
  setCount: number;
  field: string;
}

async function getExamData(params: PaperQueryParams) {
  const { examType, year, month, setCount, field } = params;
  try {
    const basePath = path.join(
      process.cwd(),
      "public",
      "papers",
      examType.toLowerCase(),
      year.toString(),
      month.toString().padStart(2, "0"),
      `${year}-${month}-${setCount}.json`
    );

    const fileContent = await fs.readFile(basePath, "utf-8");
    const examData = JSON.parse(fileContent);

    if (!examData[field]) {
      throw new Error(`未找到字段: ${field}`);
    }

    return { [field]: examData[field] };
  } catch (error) {
    throw error;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params: PaperQueryParams = {
    examType: searchParams.get("type") || "CET4",
    year: parseInt(searchParams.get("year") || "0"),
    month: parseInt(searchParams.get("month") || "0"),
    setCount: parseInt(searchParams.get("setCount") || "0"),
    field: searchParams.get("field") || "",
  };

  if (!params.field) {
    return NextResponse.json({ error: "缺少查询字段参数" }, { status: 400 });
  }

  try {
    const result = await getExamData(params);
    return NextResponse.json(result);
  } catch (err) {
    console.error("获取试卷数据失败:", err);
    return NextResponse.json(
      {
        error: `未找到${params.year}年${params.month}月第${params.setCount}套试卷`,
      },
      { status: 404 }
    );
  }
}
