const { Router } = require('express')
const { getAllPatient } = require('../controllers/patient_controller')


const router = Router()

console.log('otro ?')

router.get('/all', getAllPatient)


module.exports = router
