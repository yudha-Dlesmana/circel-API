import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { supabase } from "../utils/supabaseClient";

const upload = multer({ storage: multer.memoryStorage() });

export const supabaseUpload = (fieldName: string) => [
  upload.single(fieldName),

  async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;
    const id = (req as any).user.id;
    try {
      if (!file) return next();

      const buffer: Buffer = file.buffer;
      const fileName = `${Date.now()}_images`;
      const filePath = `uploads/${id}/${fileName}`;

      const { error } = await supabase.storage
        .from("profileimg")
        .upload(filePath, buffer, { contentType: file.mimetype });
      if (error) throw new Error(error.message);

      const { publicUrl } = supabase.storage
        .from("profileimg")
        .getPublicUrl(filePath).data;

      (req as any).publicUrl = publicUrl;
      (req as any).filePath = filePath;

      next();
    } catch (error) {
      next(error);
    }
  },
];
