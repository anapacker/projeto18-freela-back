import Joi from "joi";

export const userSchema = Joi.object({
    name: Joi.string().trim().min(3).required(),
    email: Joi.string().email().trim().min(5).required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.ref('password')
})