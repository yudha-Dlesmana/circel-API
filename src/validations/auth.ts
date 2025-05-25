import Joi from "joi";

export const registerSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required()
})

export const fotgotSchema = Joi.object({
  email: Joi.string().email().required()
})

export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.ref("password")
})
