import { NextResponse } from "next/server";
import crypto from "crypto";
import { v1 as uuidv1 } from "uuid";

const APP_KEY = process.env.YOUDAO_APP_KEY;
const APP_SECRET = process.env.YOUDAO_APP_SECRET;
const API_URL = "https://openapi.youdao.com/v2/correct_writing_text";

interface AuthParams {
  q: string;
  grade: string;
  appKey?: string;
  salt?: string;
  curtime?: string;
  signType?: string;
  sign?: string;
}

function addAuthParams(appKey: string, appSecret: string, params: AuthParams) {
  const q = params.q;
  const salt = uuidv1();
  const curtime = Math.floor(Date.now() / 1000).toString();
  
  const input = q.length <= 20 
    ? q 
    : q.substring(0, 10) + q.length + q.substring(q.length - 10);
    
  const strSrc = appKey + input + salt + curtime + appSecret;
  const sign = crypto.createHash("sha256").update(strSrc).digest("hex");

  params.appKey = appKey;
  params.salt = salt;
  params.curtime = curtime;
  params.signType = "v3";
  params.sign = sign;
}

export async function POST(request: Request) {
  try {
    const { essay, examType } = await request.json();
    
    if (!APP_KEY || !APP_SECRET) {
      return NextResponse.json(
        { error: "API 密钥未配置" },
        { status: 500 }
      );
    }

    const params = {
      q: essay,
      grade: examType.toLowerCase(),
    };

    addAuthParams(APP_KEY, APP_SECRET, params);

    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: queryString,
    });

    const data = await response.json();

    if (data.errorCode === "0") {
      return NextResponse.json({
        score: data.Result.totalScore,
        details: data.Result,
      });
    } else {
      return NextResponse.json(
        { error: `API错误: ${data.errorCode}` },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("写作评分失败:", error);
    return NextResponse.json(
      { error: "写作评分失败" },
      { status: 500 }
    );
  }
}
