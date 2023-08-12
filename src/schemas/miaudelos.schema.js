import Joi from "joi";

export const miaudelosSchema = Joi.object({
    name: Joi.string().min(2).required(),
    photos: Joi.array().items(Joi.string().uri()).required().min(1).max(10),
    race: Joi.string().trim().min(3).required(),
    age: Joi.number().required(),
    personality: Joi.string().min(3).required(),
    weight: Joi.number().required(),
    vacancy: Joi.boolean().required()
})