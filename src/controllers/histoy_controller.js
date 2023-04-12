const { response, request } = require('express')
const { findPatient } = require('../models/patient')
const { getHistoryByPatient } = require('../models/history')


const historyByPatient = async (req = request, res = response) => {

    const patientCi = req.params.ci
    const patient = await findPatient(patientCi)

    if (!patient) {
        return res.status(400).send({
            ok: false,
            msg: 'Ups, ocurrió un error y no se pudo encontrar la paciente'
        })
    }

    const history = await getHistoryByPatient(patientCi)

    return res.status(200).send({
        ok: true,
        msg: 'Resultado de la historia por paciente',
        results: history
    })
}


module.exports = {
    historyByPatient
}