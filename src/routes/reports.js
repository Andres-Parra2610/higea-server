const { Router } = require('express')
const { getPatientMostVisits } = require('../controllers/reports_controller')


const router = Router()


router.get('/paciente-frecuente', getPatientMostVisits)


module.exports = router