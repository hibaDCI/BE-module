import createError from 'http-errors';

//404
export const notFoundMW = async (req, res, next) => {
    //create error
    next(createError.NotFound('Route Not Defined!'))
}

//generic error handler
export const mainErrHandler = async (err, req, res, next) => {
    if (err) {
        res
            .status(err.status || 500)
            .send(err.message)
    }

    next();
}