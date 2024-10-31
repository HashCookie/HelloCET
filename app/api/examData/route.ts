import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("请在 .env.local 文件中设置 MONGODB_URI");
}

const uri = process.env.MONGODB_URI;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const examType = searchParams.get("type");
  const year = parseInt(searchParams.get("year") || "0");
  const month = parseInt(searchParams.get("month") || "0");
  const set = parseInt(searchParams.get("set") || "0");
  const field = searchParams.get("field");

  if (!field) {
    return NextResponse.json({ error: "缺少查询字段参数" }, { status: 400 });
  }

  try {
    const client = await MongoClient.connect(uri);
    const db = client.db("EnglishExams");
    const collection = db.collection(`${examType || "CET4"}_Papers`);

    const result = await collection.findOne(
      { year, month, set },
      { projection: { [field]: 1, _id: 0 } }
    );

    await client.close();

    if (!result) {
      return NextResponse.json({ error: "未找到相关试卷" }, { status: 404 });
    }

    return NextResponse.json({ [field]: result[field] });
  } catch (err) {
    console.error("数据获取失败:", err);
    return NextResponse.json({ error: "数据获取失败" }, { status: 500 });
  }
}
