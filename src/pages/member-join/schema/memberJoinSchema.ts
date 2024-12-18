import { z } from "zod";

export const memberJoin = z.object({
  nickname: z
    .string()
    .min(2, { message: "닉네임은 최소 2자 입니다." })
    .max(5, { message: "닉네임은 최대 5자 입니다." }),
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
  password: z.string().regex(/^\d{4,}$/, {
    message: "비밀번호는 4자리 이상의 숫자로만 구성되어야 합니다.",
  }),
  terms1: z.boolean().refine((value) => value === true, {
    message: "약관1에 동의해야 합니다.",
  }),
  terms2: z.boolean().refine((value) => value === true, {
    message: "약관2에 동의해야 합니다.",
  }),
});

export type MemberJoinFormType = z.infer<typeof memberJoin>;
