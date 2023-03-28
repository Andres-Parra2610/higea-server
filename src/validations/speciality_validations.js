const { body } = require('express-validator')
const checkErrors = require('../helpers/check_erros')


const addSpecialityValidator = [
    body('nombre_especialidad')
        .notEmpty().withMessage('El nombre de la especialidad no puede ser vacio')
        .isString().withMessage('Debe contener sólo letras'),
    checkErrors
]


module.exports = {
    addSpecialityValidator
}