import fs from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const examType = searchParams.get("type");
  const year = Number.parseInt(searchParams.get("year") || "0");
  const month = Number.parseInt(searchParams.get("month") || "0");
  const setCount = Number.parseInt(searchParams.get("setCount") || "0");
  const field = searchParams.get("field");

  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "papers",
      examType?.toLowerCase() || "cet4",
      year.toString(),
      month.toString().padStart(2, "0"),
      `${year}-${month}-${setCount}.answers.json`
    );

    const fileContent = await fs.readFile(filePath, "utf-8");
    const result = JSON.parse(fileContent);

    if (!result) {
      return NextResponse.json({ error: "未找到相关答案" }, { status: 404 });
    }

    if (field) {
      return NextResponse.json({ [field]: result[field] });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("答案获取失败:", err);
    return NextResponse.json({ error: "答案获取失败" }, { status: 500 });
  }
}
