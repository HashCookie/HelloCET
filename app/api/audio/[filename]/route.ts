import { NextResponse } from "next/server";
import { MongoClient, GridFSBucket } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

export async function GET(
  request: Request,
  { params }: { params: { filename: string } }
) {
  try {
    const url = new URL(request.url);
    const year = url.searchParams.get("year");
    const month = url.searchParams.get("month");
    const set = url.searchParams.get("set");
    const examType = url.searchParams.get("type");
    const questionRange = params.filename.replace(".mp3", "");

    if (!year || !month || !set || !examType || !questionRange) {
      return new NextResponse("缺少必要参数", { status: 400 });
    }

    await client.connect();
    const db = client.db("EnglishExams");
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
      (file: { title: string }) => file.title === `${questionRange}.mp3`
    );

    if (!audioFile) {
      return new NextResponse("未找到音频文件", { status: 404 });
    }

    const bucket = new GridFSBucket(db);

    const file = await bucket.find({ _id: audioFile.fileId }).next();

    if (!file) {
      return new NextResponse("未在 GridFS 中找到音频文件", { status: 404 });
    }

    const downloadStream = bucket.openDownloadStream(audioFile.fileId);
    const chunks: Buffer[] = [];

    for await (const chunk of downloadStream) {
      chunks.push(chunk);
    }

    const fileData = Buffer.concat(chunks);

    return new NextResponse(fileData, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": file.length.toString(),
      },
    });
  } catch (error) {
    console.error("获取音频失败:", error);
    return new NextResponse("服务器内部错误", { status: 500 });
  } finally {
    await client.close();
  }
}
