const { body } = require('express-validator')
const checkErrors = require('../helpers/check_erros')


const insetAppoimentValidation = [
    body('doctorCi')
        .notEmpty().withMessage('La cédula del doctor no puede estar vacia')
        .isNumeric().withMessage('Solo acepta números')
        .isLength({ min: 7, max: 8 }).withMessage('Cédula inválida'),
    body('patientCi')
        .notEmpty().withMessage('La cédula del doctor no puede estar vacia')
        .isNumeric().withMessage('Solo acepta números')
        .isLength({ min: 7, max: 8 }).withMessage('Cédula inválida'),
    body('appoimentDate')
        .notEmpty().withMessage('La fecha de la cita no puede estar vacia'),
    body('appoimentHour')
        .notEmpty().withMessage('La hora de la cita no puede estar vacia'),
    checkErrors
]


const finishAppoimentValidation = [
    body('note')
        .notEmpty().withMessage('La nota no puede estar vacia'),
    body('observation')
        .notEmpty().withMessage('El campo de observaciones no puede estar vacio'),
    checkErrors
]

module.exports = {
    insetAppoimentValidation,
    finishAppoimentValidation
}