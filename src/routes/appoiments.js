const { Router } = require('express')
const { getAppoiments } = require('../controllers/appoiment_controller')


const router = Router()

router.get('/:doctor/:date/', getAppoiments)


module.exports = router