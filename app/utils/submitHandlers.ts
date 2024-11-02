interface ListeningAnswer {
  number: number;
  answer: string;
}

interface ReadingAnswer {
  number: number;
  answer: string;
}

interface ReadingAnswers {
  sectionA: ReadingAnswer[];
  sectionB: ReadingAnswer[];
  sectionC: {
    passageOne: ReadingAnswer[];
    passageTwo: ReadingAnswer[];
  };
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

export async function handleReadingSubmit(
  answers: Record<number, string>,
  examType: string,
  year: number,
  month: number,
  set: number
) {
  try {
    const response = await fetch(
      `/api/answers?type=${examType}&year=${year}&month=${month}&set=${set}&field=readingAnswers`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "获取答案失败");
    }

    const correctAnswers = data.readingAnswers as ReadingAnswers;
    let score = 0;
    const wrongAnswers: number[] = [];

    // 合并所有答案进行检查
    const allAnswers = [
      ...correctAnswers.sectionA,
      ...correctAnswers.sectionB,
      ...correctAnswers.sectionC.passageOne,
      ...correctAnswers.sectionC.passageTwo,
    ];

    const totalQuestions = allAnswers.length;

    allAnswers.forEach(({ number, answer }) => {
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

export async function handleTranslationSubmit(
  translation: string,
  originalText: string
) {
  try {
    const response = await fetch("/api/translation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        translation,
        originalText,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: {
          score: data.score,
          totalScore: data.totalScore,
          accuracy: (data.score / data.totalScore) * 100,
        },
      };
    } else {
      throw new Error(data.error || "提交失败");
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "提交失败",
    };
  }
}
