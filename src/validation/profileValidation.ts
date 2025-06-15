import Joi from "joi";

export const profileSchema = Joi.object({
  name: Joi.string().required(),
  bio: Joi.string().optional().allow(""),
  image: Joi.string().uri().optional().allow(""),
});
