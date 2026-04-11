export type TDocument = {
  id: string;
  name: string;
  url: string;
  totalQuizzes: number;
  sizeBytes: number | undefined;
  createdAt: string | null;
  updatedAt: string | null;
};

export type DocumentContext = { doc: TDocument | undefined };

export type TChat = {
  prompt: string;
  response: string;
};

export type TQuizResult = {
  checkedIndexes: number[];
  secondsTaken: number;
  score: number;
  checkedRight: number;
  checkedWrong: number;
};

export type TQuiz = {
  id: string;
  title: string;
  document: string;
  questions: [
    {
      question: string;
      options: string[];
      correctAnswerIndex: number;
      explanation: string;
    }
  ];

  result?: TQuizResult;

  createdAt?: string;
  updatedAt?: string;
};

export type TQuizzes = TQuiz[];
