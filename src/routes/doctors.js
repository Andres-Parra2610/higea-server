const { Router } = require('express')
const { getAllSpeciality, getMecialHours, getDoctorDatesWork } = require('../controllers/doctors_controllers')


const router = Router()

router.get('/', getAllSpeciality)
router.get('/doctors', getMecialHours)
router.get('/doctor', getDoctorDatesWork)

module.exports = router