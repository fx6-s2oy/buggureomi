export interface MainPageInfo {
  questionId: number;
  nickname: string;
  content: string;
  isPublicVisible: 0 | 1;
  isCountVisible: 0 | 1;
  isAuthRequired: 0 | 1;
  totalCount: number;
  colorCodeList:
    | {
        colorCode: string;
      }[]
    | null;
  answerContent: string | null;
  answerColorCode: string | null;
}
