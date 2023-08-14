import Joi from "joi";

export const updateMiaudelosSchema = Joi.object({
    name: Joi.string().min(2).required(),
    race: Joi.number().required(),
    age: Joi.number().required(),
    personality: Joi.string().min(3).required(),
    weight: Joi.number().required(),
    vacancy: Joi.boolean().required()
})