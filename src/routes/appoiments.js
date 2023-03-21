const { Router } = require('express')
const { getAppoiments, newAppoiment, cancelAppoiment, registerExisteAppoiment } = require('../controllers/appoiment_controller')
const { insetAppoimentValidation } = require('../validations/appoiment_validations')


const router = Router()

router.get('/:doctor', getAppoiments)

router.post('/new', insetAppoimentValidation, newAppoiment)

router.put('/cancel/:id', cancelAppoiment)

router.put('/update/:id/:ciPatient', registerExisteAppoiment)

module.exports = router