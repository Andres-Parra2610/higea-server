const { Router } = require('express')
const { getAppoiments, newAppoiment } = require('../controllers/appoiment_controller')
const { insetAppoimentValidation } = require('../validations/appoiment_validations')


const router = Router()

router.get('/:doctor/:date/', getAppoiments)

router.post('/new', insetAppoimentValidation, newAppoiment)

module.exports = router