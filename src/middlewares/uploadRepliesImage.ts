import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { supabase } from "../utils/supabaseClient";

const upload = multer({ storage: multer.memoryStorage() });

export const uploadReplies = (fieldName: string) => [
  upload.single(fieldName),

  async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;
    const { tweetId } = req.params;
    try {
      if (!file) return next();

      const buffer: Buffer = file.buffer;
      const fileName = `${Date.now()}_images`;
      const filePath = `uploads/${tweetId}/${fileName}`;

      const { error } = await supabase.storage
        .from("comments")
        .upload(filePath, buffer, { contentType: file.mimetype });
      if (error) throw new Error(error.message);

      const { publicUrl } = supabase.storage
        .from("comments")
        .getPublicUrl(filePath).data;

      (req as any).ImagePublicUrl = publicUrl;
      (req as any).filePath = filePath;

      next();
    } catch (error) {
      next(error);
    }
  },
];
