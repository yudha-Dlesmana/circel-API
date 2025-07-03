import z from "zod";

export const registerSchema = z.object({
  email: z.string().email().nonempty(),
  name: z.string().nonempty(),
  password: z.string().min(6).nonempty(),
});
export type register = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(6).nonempty(),
});
export type login = z.infer<typeof loginSchema>;

export const fotgotSchema = z.object({
  email: z.string().email().nonempty(),
});
export type forgot = z.infer<typeof fotgotSchema>;

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6).nonempty(),
    confirmPassword: z.string().nonempty(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        path: [confirmPassword],
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
      });
    }
  });
export type resetPassword = z.infer<typeof resetPasswordSchema>;

// next update gunakan validasi async untuk email cek ke db
