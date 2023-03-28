const { Router } = require('express')
const { getAllSpeciality, getMedicalHours, getDoctorDatesWork } = require('../controllers/doctors_controllers')
const { addSpeciality } = require('../controllers/speciality_controller')
const { addSpecialityValidator } = require('../validations/speciality_validations')


const router = Router()

router.get('/', getAllSpeciality)
router.get('/doctors', getMedicalHours)
router.get('/doctor/:ci', getDoctorDatesWork)

router.post('/new', addSpecialityValidator, addSpeciality)

module.exports = router