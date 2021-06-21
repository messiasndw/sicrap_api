import { body, validationResult } from 'express-validator'

export const productValidatorRules = (method) => {

    switch (method) {
        case "index":
            return [
            ]
        case "store":
            return [
                body('name').notEmpty().withMessage("Name is required!"),
                body('code').notEmpty().withMessage('Code is required!'),
                body('active').notEmpty().withMessage('Active is required!').isIn(['1', '0']).withMessage('Active must be yes or no!')
            ]
        case "destroy":
            return [
                body('ids').notEmpty().withMessage("You must select an item to delete!").isArray().withMessage('Items must be arrays!'),
            ]
        default:
            return []
            break;
    }

}

export const productValidate = (req, res, next) => {

    const errors = validationResult(req)

    if (errors.isEmpty()) return next()

    return res.status(422).send(errors)

}