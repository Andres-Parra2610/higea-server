const { body } = require('express-validator')
const checkErrors = require('../helpers/check_erros')


const codeValidation = [
    body('codeVerification')
        .notEmpty().withMessage('El código no puede estar vacio')
        .isNumeric().withMessage('Sólo acepta números'),
    checkErrors
]


const newPasswordValidations = [
    body('newPassword')
        .notEmpty().withMessage('La contraseña no puede estar vacia'),
    body('userCi')
        .notEmpty().withMessage('El campo cédula no puede estar vacio')
        .isNumeric().withMessage('El campo cédula sólo acepta números')
        .isLength({ min: 7, max: 8 }).withMessage('Ingrese una cédula válida'),
    checkErrors
]



module.exports = {
    codeValidation,
    newPasswordValidations
}