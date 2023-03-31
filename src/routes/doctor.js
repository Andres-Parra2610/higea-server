const { Router } = require('express')
const { getDoctors } = require('../controllers/doctors_controllers')



const router = Router()

router.get('/all', getDoctors)

module.exports = router