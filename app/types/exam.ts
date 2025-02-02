export interface Option {
  A: string;
  B: string;
  C: string;
  D: string;
}

export interface ListeningQuestion {
  number: number;
  options: Option;
}

// Section A
export interface SectionA {
  passages: string[];
  options: {
    [key: string]: string;
  };
}

// Section B
export interface SectionB {
  passageTitle: string;
  passages: string[];
  questions: {
    number: number;
    statement: string;
  }[];
}

// Section C
export interface SectionC {
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

// 阅读理解
export interface ReadingComprehension {
  sectionA: SectionA;
  sectionB: SectionB;
  sectionC: SectionC;
}

// 试卷基础信息
export interface ExamPaperBase {
  year: number;
  month: number;
  setCount: number;
}

// 写作
export interface Writing {
  Directions: string;
}

// 翻译
export interface Translation {
  ChinesePassage: string;
}

// 试卷
export interface ExamPaper extends ExamPaperBase {
  _id: string;
  // 写作
  writing: Writing;

  // 听力
  listeningComprehension: ListeningQuestion[];

  // 阅读理解
  readingComprehension: ReadingComprehension;

  // 翻译
  translation: Translation;
}
