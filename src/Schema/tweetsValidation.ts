import Joi from "joi";

export const tweetsSchema = Joi.object({
  username: Joi.string().required(),
  text: Joi.string().required().allow(""),
  image: Joi.string().uri().optional(),
});
