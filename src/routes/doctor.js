const { Router } = require('express')
const { getDoctors, newDoctor, editDoctor, removeDoctor } = require('../controllers/doctors_controllers')
const { doctorBodyValidator } = require('../validations/doctor_validations')



const router = Router()

router.get('/all', getDoctors)

router.post('/new', doctorBodyValidator, newDoctor)

router.put('/edit', doctorBodyValidator, editDoctor)

router.put('/delete/:ci', removeDoctor)

module.exports = router