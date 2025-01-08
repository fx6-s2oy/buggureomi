import { z } from "zod";

export const termsSchema = z.object({
  agreeTerms: z.boolean().refine((value) => value === true, {
    message: "서비스 약관을 확인해주세요.",
  }),
});
export type TermsAgreementType = z.infer<typeof termsSchema>;
