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

  try {
    const client = await MongoClient.connect(uri);
    const db = client.db("EnglishExams");
    const collection = db.collection(`${examType || "CET4"}_Answers`);

    const projection = field ? { [field]: 1, _id: 0 } : { _id: 0 };
    
    const result = await collection.findOne(
      { year, month, set },
      { projection }
    );

    await client.close();

    if (!result) {
      return NextResponse.json({ error: "未找到相关答案" }, { status: 404 });
    }

    return NextResponse.json(field ? { [field]: result[field] } : result);
  } catch (err) {
    console.error("答案获取失败:", err);
    return NextResponse.json({ error: "答案获取失败" }, { status: 500 });
  }
}
