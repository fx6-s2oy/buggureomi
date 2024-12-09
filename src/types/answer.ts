export interface Answer {
  answerId: string;
  sender: string;
  content: string;
  colorCode: string;
  regDate: Date | string;
}

export interface Answers {
  answers: Answer[];
}
