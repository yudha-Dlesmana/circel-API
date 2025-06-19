import Joi from "joi";

export const profileSchema = Joi.object({
  name: Joi.string().required(),
  bio: Joi.string().max(50).required().allow(""),
  image: Joi.string().uri().optional(),
});

export const editProfileSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().max(15).regex(/^@/).required(),
  bio: Joi.string().max(50).required().allow(""),
  image: Joi.string().uri().optional(),
  deleteImage: Joi.boolean().optional(),
});
