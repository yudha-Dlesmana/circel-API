import z from "zod";

export const profileSchema = z.object({
  bio: z
    .string()
    .max(50, "Bio must be at most 50 characters")
    .nullable()
    .optional(),
  image: z.string().url("Invalid image URL").nullable().optional(),
});
export type Profile = z.infer<typeof profileSchema>;

export const editProfileSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  username: z
    .string({ required_error: "Name is required" })
    .max(15, "username must be at most 15 characters")
    .regex(/^@/, "username must be start with @")
    .nonempty("Username cannot be empty"),
  bio: z
    .string()
    .max(50, "bio must be at most 50 characters")
    .nullable()
    .optional(),
  image: z.string().url("Invalid image URL").nullable().optional(),
  deleteImage: z.boolean().optional(),
  background: z.string().url("Invalid image URL").nullable().optional(),
  deleteBackground: z.boolean().optional(),
});
export type EditProfile = z.infer<typeof editProfileSchema>;
