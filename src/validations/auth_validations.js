const { body } = require('express-validator')
const checkErrors = require('../helpers/check_erros')


const loginUserValidator = [
    body('ci')
        .notEmpty().withMessage('La cédula no puede estar vacia')
        .isNumeric().withMessage('Sólo acepta números')
        .isLength({ min: 7, max: 8 }).withMessage('Cédula inválida'),
    body('password')
        .notEmpty().withMessage('La contraseña no puede ser vacía'),
    checkErrors
]

const registerUserValidator = [
    body('name')
        .notEmpty().withMessage('El campo nombre no puede estar vacio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener más de 3 caracteres')
        .isString().withMessage('El campo nombre solo debe contener letras'),
    body('lastName')
        .notEmpty().withMessage('El campo apellido no puede estar vacio')
        .isLength({ min: 3 }).withMessage('El apellido debe tener más de 3 caracteres')
        .isString().withMessage('El campo apellido solo debe contener letras'),
    body('ci')
        .notEmpty().withMessage('El campo cédula no puede estar vacio')
        .isNumeric().withMessage('El campo cédula sólo acepta números')
        .isLength({ min: 7, max: 8 }).withMessage('Ingrese una cédula válida'),
    body('email')
        .notEmpty().withMessage('El campo email no puede estar vacio')
        .isEmail().withMessage('Debe ser un email'),
    body('phone')
        .notEmpty().withMessage('El campo teléfono no puede estar vacio')
        .isNumeric().withMessage('El campo teléfono sólo acepta números')
        .isLength({ min: 10 }).withMessage('Ingrese una teléfono válido válida'),
    body('birthDate')
        .notEmpty().withMessage('El campo fecha no puede estar vacio'),
    checkErrors,
]



module.exports = {
    loginUserValidator,
    registerUserValidator
}