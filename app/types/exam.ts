// 基础选项接口
interface Option {
  A: string;
  B: string;
  C: string;
  D: string;
}

// 听力题目接口
interface ListeningQuestion {
  number: number;
  options: Option;
}

// 阅读理解 Section A 接口
interface SectionA {
  passages: string[];
  options: {
    [key: string]: string;
  };
}

// 阅读理解 Section B 接口
interface SectionB {
  passageTitle: string;
  passages: string[];
  questions: {
    number: number;
    statement: string;
  }[];
}

// 阅读理解 Section C 接口
interface SectionC {
  passagesOne: string[];
  questionsOne: {
    number: number;
    statement: string;
    options: Option;
  }[];
  passagesTwo: string[];
  questionsTwo: {
    number: number;
    statement: string;
    options: Option;
  }[];
}

// 阅读理解完整接口
interface ReadingComprehension {
  sectionA: SectionA;
  sectionB: SectionB;
  sectionC: SectionC;
}

// 完整试卷数据接口
interface ExamPaper {
  _id: string; // MongoDB ObjectId
  year: number;
  month: number;
  set: number;

  // 写作部分
  writing: {
    Directions: string;
  };

  // 听力部分
  listeningComprehension: ListeningQuestion[];

  // 阅读理解部分
  readingComprehension: ReadingComprehension;

  // 翻译部分
  translation: {
    ChinesePassage: string;
  };
}

export type {
  Option,
  ListeningQuestion,
  SectionA,
  SectionB,
  SectionC,
  ReadingComprehension,
  ExamPaper,
};
