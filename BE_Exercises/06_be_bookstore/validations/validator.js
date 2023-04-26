import {validationResult} from 'express-validator'

export const validate = function (validations) {
    return async (req, res, next) => {
        
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty) {
            req.status(400).json({
                message: 'Validation Errors',
                errors: errors.array()
            })
        }

        return next()
    }
}