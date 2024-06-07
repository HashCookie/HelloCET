export const scoreTranslation = async (
  ChinesePassage: string,
  userTranslation: string
): Promise<string> => {
  try {
    const response = await fetch(
      "https://api.moonshot.cn/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer sk-sVCo4m4VhPql8CrIxaFzFdr6wsiB5mrgkkab3AKe6TMgtTIH`,
        },
        body: JSON.stringify({
          model: "moonshot-v1-32k",
          messages: [
            {
              role: "system",
              content: `你是一个专业你的任务是根据用户提供的翻译内容打分。请确保一定用户输入的翻译 ${userTranslation} 是英文，如果不是英文则直接给0分。请根据翻译的准确性、流畅性和用词得的大学生四六级考试翻译评分助手。当性进行评分，满分为106.5。请只返回一个整数分数，不需要任何解释。`,
            },
            {
              role: "user",
              content: `${ChinesePassage} \n\n用户的翻译是：${userTranslation}\n\n,请确保一定用户输入的翻译 ${userTranslation} 是英文，如果不是英文则直接给0分。请为此翻译打分，只返回评分分数。`,
            },
          ],
          temperature: 0.3,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content.trim();
    } else {
      throw new Error("无法从API获取有效分数。");
    }
  } catch (error) {
    console.error("翻译评分请求失败:", error);
    throw new Error("无法获取翻译评分，请检查网络或配置。");
  }
};
