import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

interface PaperInfo {
  year: number;
  month: number;
  setCount: number;
}

interface AggregateResult {
  _id: null;
  years: number[];
  months: number[];
  papers: PaperInfo[];
}

if (!process.env.MONGODB_URI) {
  throw new Error('请在 .env.local 文件中设置 MONGODB_URI');
}

const uri = process.env.MONGODB_URI;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const examType = searchParams.get('type'); // CET4 or CET6

  try {
    const client = await MongoClient.connect(uri);
    const db = client.db('EnglishExams');
    const collection = db.collection(examType || 'CET4');

    const result = await collection.aggregate<AggregateResult>([
      {
        $group: {
          _id: null,
          years: { $addToSet: '$year' },
          months: { $addToSet: '$month' },
          papers: {
            $push: {
              year: '$year',
              month: '$month',
              setCount: { $sum: 1 }
            }
          }
        }
      }
    ]).toArray();

    await client.close();
    return NextResponse.json(result);
  } catch (err) {
    console.error('数据获取失败:', err);
    return NextResponse.json({ error: '数据获取失败' }, { status: 500 });
  }
} 
