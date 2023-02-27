const { Router } = require('express')
const { registerUser, verifyCode } = require('../controllers/auth_controller')
const { registerUserValidator } = require('../validations/auth_validations')

const router = Router()

/**
 * @endpoint ENVIÓ DE CÓDIGO DE VERIFICACIÓN
 * @body {name, lastName, ci, email, phone, birthDate, gender}
 */
router.post('/register-user', registerUserValidator, registerUser)

/**
 * @endpoint VERIFICAR CÓDIGO Y REGISTRAR USUARIO EN LA BD
 * @body {name, lastName, ci, email, phone, birthDate, gender}
 */
router.post('/verify-code', verifyCode)



module.exports = router