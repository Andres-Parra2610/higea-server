const { Router } = require('express')
const { getAllSpeciality, getMedicalHours, getDoctorDatesWork } = require('../controllers/doctors_controllers')
const { addSpeciality, deleteSpeciality, changeSpeciality } = require('../controllers/speciality_controller')
const { addSpecialityValidator } = require('../validations/speciality_validations')


const router = Router()

router.get('/', getAllSpeciality)
router.get('/doctors', getMedicalHours)
router.get('/doctor/:ci', getDoctorDatesWork)

router.post('/new', addSpecialityValidator, addSpeciality)
router.put('/remove/:id', deleteSpeciality)
router.put('/update/:id', addSpecialityValidator, changeSpeciality)

module.exports = router