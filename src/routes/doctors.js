const { Router } = require('express')
const { getAllSpeciality, getMecialHours } = require('../controllers/doctors_controllers')


const router = Router()

router.get('/', getAllSpeciality)
router.get('/doctors', getMecialHours)

module.exports = router