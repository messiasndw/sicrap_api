import { body, validationResult } from 'express-validator'

export const userValidatorRules = (method) => {

    switch (method) {
        case "create":
            return [
                body('name').notEmpty().withMessage("Name cannot be empty!"),
                body('email').isEmail().withMessage("Email must be valid!"),
                body('gender').isIn(['male', 'female', 'other']).withMessage('Gender must be valid!').notEmpty().withMessage("Gender cannot be empty!")
            ]
        case "update":
            return [
                body('name').notEmpty().withMessage("Name cannot be empty!"),
                body('email').notEmpty().withMessage("Email cannot be empty!").isEmail().withMessage("Email must be valid!"),
                body('gender').notEmpty().withMessage("Gender cannot be empty!").isIn(['male','female','other']).withMessage("Gender must be valid!")
            ]
        default:
            break;
    }

}

export const userValidate = (req, res, next) => {

    const errors = validationResult(req)

    if (errors.isEmpty()) return next()

    return res.status(422).send(errors)

}