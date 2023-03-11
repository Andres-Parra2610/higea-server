const { response, request } = require('express')
const { getAppoimentsByDoc } = require('../models/appoiments')
const avilableAppoiments = require('../helpers/avilable_appoiments')


const getAppoiments = async (req = request, res = response) => {

    const { doctor, date } = req.params


    if (!doctor || !date) {
        return res.status(400).send({
            ok: false,
            msg: 'Los parametros son obligatorios',
            results: []
        })
    }

    const appoiments = await getAppoimentsByDoc(doctor, date)

    const result = avilableAppoiments(appoiments, doctor, date)

    return res.status(200).send({
        ok: true,
        results: result
    })
}

module.exports = {
    getAppoiments
}