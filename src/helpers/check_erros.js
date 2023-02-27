const { response, request } = require('express')
const { validationResult } = require('express-validator')


const checkErrors = (req = request, res = response, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(401).send({
            ok: false,
            error: errors.mapped(),
            result: []
        })
    }

    next()
}


module.exports = checkErrors