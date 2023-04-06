const { Router } = require('express')
const { getPatientMostVisits,
    getAppoimentsByMonth,
    allDoctors,
    getMedicalMostPatientTreated,
    allSpecialities
} = require('../controllers/reports_controller')


const router = Router()


router.get('/paciente-frecuente', getPatientMostVisits)

router.get('/cita/:mes', getAppoimentsByMonth)

router.get('/doctors', allDoctors)

router.get('/doctor-more-visited', getMedicalMostPatientTreated)

router.get('/specialities', allSpecialities)


module.exports = router