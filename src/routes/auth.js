const { Router } = require('express')
const { signUp } = require('../controllers/auth_controller')
const { signUpValidator } = require('../validations/auth_validations')

const router = Router()

/**
 * @endpoint REGISTRO DE USUARIOS
 * @body {name, lastName, ci, email, phone, birthDate}
 */
router.post('/signUp', signUpValidator, signUp)



module.exports = router