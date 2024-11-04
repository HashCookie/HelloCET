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

    // 根据题号计算不同部分的分值
    correctAnswers.forEach(({ number, answer }) => {
      if (answers[number]?.toUpperCase() === answer.toUpperCase()) {
        // Section A (1-7) 和 Section B (8-15): 7.1分/题
        if (number <= 15) {
          score += 7.1;
        }
        // Section C (16-25): 14.2分/题
        else {
          score += 14.2;
        }
      } else {
        wrongAnswers.push(number);
      }
    });

    // 四舍五入到一位小数
    score = Math.round(score * 10) / 10;

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

    // Section A (36-45): 每题3.55分
    correctAnswers.sectionA.forEach(({ number, answer }) => {
      if (answers[number]?.toUpperCase() === answer.toUpperCase()) {
        score += 3.55;
      } else {
        wrongAnswers.push(number);
      }
    });

    // Section B (46-55): 每题7.1分
    correctAnswers.sectionB.forEach(({ number, answer }) => {
      if (answers[number]?.toUpperCase() === answer.toUpperCase()) {
        score += 7.1;
      } else {
        wrongAnswers.push(number);
      }
    });

    // Section C (46-55): 每题14.2分
    [...correctAnswers.sectionC.passageOne, ...correctAnswers.sectionC.passageTwo].forEach(
      ({ number, answer }) => {
        if (answers[number]?.toUpperCase() === answer.toUpperCase()) {
          score += 14.2;
        } else {
          wrongAnswers.push(number);
        }
      }
    );

    // 四舍五入到一位小数
    score = Math.round(score * 10) / 10;

    const totalQuestions = 
      correctAnswers.sectionA.length + 
      correctAnswers.sectionB.length + 
      correctAnswers.sectionC.passageOne.length + 
      correctAnswers.sectionC.passageTwo.length;

    return {
      success: true,
      data: {
        score,
        totalQuestions,
        wrongAnswers,
        accuracy: (wrongAnswers.length / totalQuestions) * 100,
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
