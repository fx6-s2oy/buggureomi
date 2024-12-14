import {
  ReflectionAnswer,
  ReflectionQuestion,
} from "@/api/self-reflection/type";

interface ReadOnlyReflectionProps {
  answers: ReflectionAnswer[];
  questions: ReflectionQuestion[];
}

export default function ReadOnlyReflection({
  answers,
  questions,
}: ReadOnlyReflectionProps) {
  return (
    <div className="space-y-8">
      {questions.map((question) => {
        const answer = answers.find((a) => a.commonQuestionsId === question.id);
        return (
          <div key={question.id} className="space-y-2">
            <h4 className="text-h6 text-gray-900">{question.content}</h4>
            <p className="text-body p-4 bg-gray-50 rounded-md">
              {answer?.content}
            </p>
          </div>
        );
      })}
    </div>
  );
}
