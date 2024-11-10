import { NextResponse } from "next/server";

const API_URL = "https://api.moonshot.cn/v1/chat/completions";
const API_KEY = process.env.MOONSHOT_API_KEY;

export async function POST(request: Request) {
  try {
    const { essay, examType } = await request.json();

    if (!API_KEY) {
      return NextResponse.json({ error: "API 密钥未配置" }, { status: 500 });
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "moonshot-v1-32k",
        messages: [
          {
            role: "system",
            content: `你是一个专业的${examType}考试写作评分助手。你的任务是根据用户提供的写作内容打分。请根据写作的内容相关性、语言准确性、结构完整性和表达流畅性进行评分，满分为106.5。如果用户的输入是中文或其他非英文语言，请给出0分。请只返回一个整数分数，不需要任何解释。`,
          },
          {
            role: "user",
            content: `用户的写作内容是：${essay}\n\n请为此${examType}写作打分，只返回评分分数。如果用户的输入是中文或其他非英文语言，请给出0分。`,
          },
        ],
        temperature: 0.3,
      }),
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      const score = parseInt(data.choices[0].message.content.trim());
      return NextResponse.json({
        score,
        totalScore: 106.5,
      });
    } else {
      return NextResponse.json(
        { error: "无法从API获取有效分数" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("写作评分失败:", error);
    return NextResponse.json({ error: "写作评分失败" }, { status: 500 });
  }
}
