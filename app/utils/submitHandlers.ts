interface ListeningAnswer {
  number: number;
  answer: string;
}

export async function handleListeningSubmit(
  answers: Record<number, string>,
  examType: string,
  year: number,
  month: number,
  set: number
) {
  try {
    const response = await fetch(
      `/api/answers?type=${examType}&year=${year}&month=${month}&set=${set}&field=listeningAnswers`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "获取答案失败");
    }

    const correctAnswers = data.listeningAnswers as ListeningAnswer[];
    let score = 0;
    const totalQuestions = correctAnswers.length;
    const wrongAnswers: number[] = [];

    // 计算得分
    correctAnswers.forEach(({ number, answer }) => {
      if (answers[number]?.toUpperCase() === answer.toUpperCase()) {
        score++;
      } else {
        wrongAnswers.push(number);
      }
    });

    return {
      success: true,
      data: {
        score,
        totalQuestions,
        wrongAnswers,
        accuracy: (score / totalQuestions) * 100,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "提交失败",
    };
  }
}
