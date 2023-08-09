import { userSchema } from "../schemas/user.schema.js"

export function userSchemaValidation(req, res, next) {

    const validationUser = userSchema.validate(req.body, { abortEarly: false })
    if (validationUser.error) {
        const errors = validationUser.error.details.map((detail) => detail.message)
        return res.status(422).send(errors)
    }
    next()
}