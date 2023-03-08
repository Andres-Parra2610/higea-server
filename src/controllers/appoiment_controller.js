const { response, request } = require('express')
const { getAppoimentsByDoc } = require('../models/appoiments')


const getAppoiments = async (req = request, res = response) => {

    const { doctor, date, hour } = req.params


    if (!doctor || !date || !hour) {
        return res.status(400).send({
            ok: false,
            msg: 'Los parametros son obligatorios',
            results: []
        })
    }

    await getAppoimentsByDoc(doctor, date, hour)

    return res.status(200).send({
        ok: true,
        msg: 'Ta bn la petición'
    })
}

module.exports = {
    getAppoiments
}