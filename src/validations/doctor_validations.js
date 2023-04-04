const { body } = require('express-validator')
const moment = require('moment')
const checkErrors = require('../helpers/check_erros')

const doctorBodyValidator = [
    body('cedula_medico')
        .notEmpty().withMessage('La cédula no puede estar vacia')
        .isNumeric().withMessage('Sólo acepta números')
        .isLength({ min: 7, max: 8 }).withMessage('Cédula inválida'),
    body('nombre_medico')
        .notEmpty().withMessage('El campo nombre no puede estar vacio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener más de 3 caracteres')
        .isString().withMessage('El campo nombre solo debe contener letras'),
    body('apellido_medico')
        .notEmpty().withMessage('El campo apellido no puede estar vacio')
        .isLength({ min: 3 }).withMessage('El apellido debe tener más de 3 caracteres')
        .isString().withMessage('El campo apellido solo debe contener letras'),
    body('telefono_medico')
        .notEmpty().withMessage('El campo teléfono no puede estar vacio')
        .isNumeric().withMessage('El campo teléfono sólo acepta números')
        .isLength({ min: 10 }).withMessage('Ingrese una teléfono válido'),
    body('correo_medico')
        .notEmpty().withMessage('El campo email no puede estar vacio')
        .isEmail().withMessage('Debe ser un email'),
    body('sexo_medico')
        .notEmpty().withMessage('El campo de sexo no puede estar vacio')
        .isString().withMessage('El campo sexo debe ser un string'),
    body('fecha_nacimiento')
        .notEmpty().withMessage('La fecha de nacimiento no puede estar vacia')
        .custom((value) => {
            if (!moment(value).isValid()) throw new Error('Debe ser una fecha válida')
            return true
        }),
    body('nombre_especialidad')
        .notEmpty().withMessage('La especialidad no puede ser vacia'),
    body('fechas')
        .notEmpty().withMessage('Las fechas no pueden estar vacias')
        .isArray().withMessage('Debe venir en formato de arreglo')
        .isArray().notEmpty().withMessage('El arreglo no puede venir vacio'),
    body('hora_inicio')
        .notEmpty().withMessage('La hora de inicio no puede estar vacia'),
    body('hora_fin')
        .notEmpty().withMessage('La hora de fin no puede estar vacia')
        .custom((value, { req }) => {
            const startHour = moment(req.body.hora_inicio, 'HH:mm:ss')
            const endHour = moment(value, 'HH:mm:ss')
            if (endHour.isBefore(startHour)) throw new Error('La hora de inicio debe ser mayor que la hora de fin')
            return true
        }),
    checkErrors
]


module.exports = {
    doctorBodyValidator
}