export interface Question {
  questionId: number;
  nickname: string;
  content: string;
  is_public_visible: 0 | 1;
  is_count_visible: 0 | 1;
  is_Auth_Required: 0 | 1;
}
