import fs from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

interface RequestParams {
  filename: string;
}

export async function GET(
  request: Request,
  { params }: { params: RequestParams }
) {
  try {
    const url = new URL(request.url);
    const year = url.searchParams.get("year");
    const month = url.searchParams.get("month");
    const setCount = url.searchParams.get("setCount");
    const examType = url.searchParams.get("type");
    const questionRange = url.searchParams.get("range");

    if (params.filename !== `${questionRange}.mp3`) {
      return new NextResponse("文件名不匹配", { status: 400 });
    }

    if (!year || !month || !setCount || !examType || !questionRange) {
      return new NextResponse("缺少必要参数", { status: 400 });
    }

    const audioPath = path.join(
      process.cwd(),
      "public",
      "audio",
      examType,
      year,
      month.padStart(2, "0"),
      `set${setCount}`,
      `${questionRange}.mp3`
    );

    try {
      const file = await fs.readFile(audioPath);
      const stats = await fs.stat(audioPath);

      return new Response(file, {
        headers: {
          "Content-Type": "audio/mpeg",
          "Content-Length": stats.size.toString(),
          "Accept-Ranges": "bytes",
          "Cache-Control": "public, max-age=31536000",
        },
      });
    } catch (error) {
      console.error("音频文件读取失败:", error);
      return new NextResponse("音频文件不存在", { status: 404 });
    }
  } catch (error) {
    console.error("获取音频失败:", error);
    return new NextResponse("服务器内部错误", { status: 500 });
  }
}
