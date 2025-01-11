import { NextResponse } from "next/server";
import { GridFSBucket } from "mongodb";
import { Readable } from "stream";
import clientPromise from "@/app/utils/api/mongodb";

// 定义请求参数的接口
interface RequestParams {
  filename: string;
}

// 定义音频文件的接口
interface AudioFile {
  title: string;
  fileId: string;
}

function nodeStreamToWebStream(nodeStream: Readable) {
  return new ReadableStream({
    start(controller) {
      nodeStream.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      nodeStream.on("end", () => {
        controller.close();
      });
      nodeStream.on("error", (err) => {
        controller.error(err);
      });
    },
  });
}

export async function GET(
  request: Request,
  { params }: { params: RequestParams }
) {
  try {
    const client = await clientPromise;
    const url = new URL(request.url);
    const year = url.searchParams.get("year");
    const month = url.searchParams.get("month");
    const set = url.searchParams.get("set");
    const examType = url.searchParams.get("type");
    const questionRange = url.searchParams.get("range");

    // 使用 params.filename 进行验证
    if (params.filename !== `${questionRange}.mp3`) {
      return new NextResponse("文件名不匹配", { status: 400 });
    }

    if (!year || !month || !set || !examType || !questionRange) {
      return new NextResponse("缺少必要参数", { status: 400 });
    }

    const db = client.db("EnglishExams");
    const bucket = new GridFSBucket(db);
    const collection = db.collection(`${examType}_Listening`);

    const exam = await collection.findOne({
      year: parseInt(year),
      month: parseInt(month),
      set: parseInt(set),
    });

    if (!exam) {
      return new NextResponse("未找到试卷", { status: 404 });
    }

    const audioFile = exam.files.find(
      (file: AudioFile) => file.title === `${questionRange}.mp3`
    );

    if (!audioFile) {
      return new NextResponse("未找到音频文件", { status: 404 });
    }

    const downloadStream = bucket.openDownloadStream(audioFile.fileId);
    const webStream = nodeStreamToWebStream(downloadStream);

    return new Response(webStream, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=31536000",
        ETag: `"${audioFile.fileId}"`,
      },
    });
  } catch (error) {
    console.error("获取音频失败:", error);
    return new NextResponse("服务器内部错误", { status: 500 });
  }
}
