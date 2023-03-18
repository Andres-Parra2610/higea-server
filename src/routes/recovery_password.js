const { Router } = require('express')
const { codeValidation, newPasswordValidations } = require('../validations/recovery_password_validations')
const { getPatient, verifyRevoceryPasswordCode, newPassword } = require('../controllers/recovery_password_controller')

const router = Router()


router.post('/code', codeValidation, verifyRevoceryPasswordCode)

router.put('/new-password', newPasswordValidations, newPassword)

router.get('/patient/:ci', getPatient)


module.exports = router