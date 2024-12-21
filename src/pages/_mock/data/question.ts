import { Question } from "@/types/question";
import { MOCK_MEMBER } from "./member";

export const MOCK_QUESTION: Question = {
  questionId: 1,
  nickname: MOCK_MEMBER.nickname,
  content: "난 올해 어떤 사람이였어?",
  is_public_visible: 0,
  is_count_visible: 0,
  is_Auth_Required: 0,
};
