import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { supabase } from "../Utils/SupabaseClient";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 500 * 1024 },
});

export const uploadField = (fieldNames: string[]) => [
  upload.fields(fieldNames.map((name) => ({ name, maxCount: 1 }))),

  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user.id;
    const files = req.files as Record<string, Express.Multer.File[]>;

    try {
      for (const fieldName of fieldNames) {
        const file = files?.[fieldName]?.[0];
        if (!file) continue;

        const buffer: Buffer = file.buffer;
        const fileName = `${Date.now()}_img`;
        const filePath = `${userId}/${fileName}`;

        const { error } = await supabase.storage
          .from(fieldName)
          .upload(filePath, buffer, { contentType: file.mimetype });
        if (error) throw new Error(error.message);

        const { publicUrl } = supabase.storage
          .from(fieldName)
          .getPublicUrl(filePath).data;
        (req as any)[`${fieldName}Url`] = publicUrl;
        (req as any)[`${fieldName}Path`] = filePath;
      }
      next();
    } catch (error) {
      next(error);
    }
  },
];
