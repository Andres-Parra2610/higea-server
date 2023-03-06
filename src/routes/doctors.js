const { Router } = require('express')
const { getAllSpeciality, getDoctorsSpeciality } = require('../controllers/doctors_controllers')


const router = Router()

router.get('/', getAllSpeciality)
router.get('/doctors', getDoctorsSpeciality)

module.exports = router