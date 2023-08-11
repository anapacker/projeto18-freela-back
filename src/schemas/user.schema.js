import Joi from "joi";

export const userSchema = Joi.object({
    name: Joi.string().trim().min(3).required(),
    email: Joi.string().email().trim().min(5).required(),
    password: Joi.string().min(6).required(),
    cpf: Joi.string().min(11).required(),
    phone: Joi.string().min(11).required(),
    confirmPassword: Joi.string().min(6).required().valid(Joi.ref("password"))
})