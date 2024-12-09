import * as z from "zod";

export const selfReflectionSchema = z.object({
  regret: z.string().trim().min(1, { message: "이 필드는 필수입니다" }),
  bestThing: z.string().trim().min(1, { message: "이 필드는 필수입니다" }),
  nextYearGoal: z.string().trim().min(1, { message: "이 필드는 필수입니다" }),
  message2024: z.string().trim().min(1, { message: "이 필드는 필수입니다" }),
  message2025: z.string().trim().min(1, { message: "이 필드는 필수입니다" }),
});

export type SelfReflectionFormType = z.infer<typeof selfReflectionSchema>;
