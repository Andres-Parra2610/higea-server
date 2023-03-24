const { Router } = require('express')
const {
    getAppoiments,
    newAppoiment, cancelAppoiment,
    registerExisteAppoiment,
    finishAppoiment,
    getHistoryById
} = require('../controllers/appoiment_controller')

const { insetAppoimentValidation, finishAppoimentValidation } = require('../validations/appoiment_validations')


const router = Router()

router.get('/history', getHistoryById)

router.get('/:doctor', getAppoiments)

router.post('/new', insetAppoimentValidation, newAppoiment)

router.put('/cancel/:id', cancelAppoiment)

router.put('/update/:id/:ciPatient', registerExisteAppoiment)

router.put('/finish/:id', finishAppoimentValidation, finishAppoiment)

module.exports = router