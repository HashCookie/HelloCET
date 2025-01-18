import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { ApiError, handleApiError } from "@/app/utils/api/errorHandler";

if (!process.env.MONGODB_URI) {
  throw new Error("请在 .env.local 文件中设置 MONGODB_URI");
}

const uri = process.env.MONGODB_URI;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const examType = searchParams.get("type");
  const year = parseInt(searchParams.get("year") || "0");
  const month = parseInt(searchParams.get("month") || "0");
  const setCount = parseInt(searchParams.get("setCount") || "0");
  const field = searchParams.get("field");

  if (!field) {
    return NextResponse.json({ error: "缺少查询字段参数" }, { status: 400 });
  }

  try {
    const client = await MongoClient.connect(uri);
    const db = client.db("EnglishExams");
    const collection = db.collection(`${examType || "CET4"}_Papers`);

    const result = await collection.findOne(
      { year, month, setCount },
      { projection: { [field]: 1, _id: 0 } }
    );

    if (!result) {
      throw new ApiError(404, `未找到${year}年${month}月第${setCount}套试卷`);
    }

    await client.close();

    return NextResponse.json({ [field]: result[field] });
  } catch (err) {
    const { error, statusCode } = handleApiError(err);
    return NextResponse.json({ error }, { status: statusCode });
  }
}
