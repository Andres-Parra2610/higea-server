const { Router } = require('express')
const { getAllSpeciality, getMedicalHours, getDoctorDatesWork } = require('../controllers/doctors_controllers')


const router = Router()

router.get('/', getAllSpeciality)
router.get('/doctors', getMedicalHours)
router.get('/doctor/:ci', getDoctorDatesWork)

module.exports = router