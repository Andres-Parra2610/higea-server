const { Router } = require('express')
const { historyByPatient } = require('../controllers/histoy_controller')


const router = Router()


router.get('/patient/:ci', historyByPatient)

module.exports = router