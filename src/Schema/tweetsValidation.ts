import z from "zod";

export const tweetsSchema = z.object({
  text: z.string(),
  image: z.string().url().optional(),
});
export type Tweet = z.infer<typeof tweetsSchema>;
