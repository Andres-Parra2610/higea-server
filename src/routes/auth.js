const { Router } = require('express')
const { loginUser, registerUser, verifyCode } = require('../controllers/auth_controller')
const { registerUserValidator, loginUserValidator } = require('../validations/auth_validations')

const router = Router()



/**
 * @endpoint LOGIN DE ACCESO A LA APP
 * @body {ci, password}
 */
router.post('/login', loginUserValidator, loginUser)

/**
 * @endpoint ENVIÓ DE CÓDIGO DE VERIFICACIÓN
 * @body {name, lastName, ci, email, phone, birthDate, gender}
 */
router.post('/register-user', registerUserValidator, registerUser)

/**
 * @endpoint VERIFICAR CÓDIGO Y REGISTRAR USUARIO EN LA BD
 * @body {name, lastName, ci, email, phone, birthDate, gender, codeVerification}
 */
router.post('/verify-code', registerUserValidator, verifyCode)




module.exports = router