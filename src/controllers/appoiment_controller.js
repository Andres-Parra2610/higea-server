const { response, request } = require('express')
const { getAppoimentsByDoc, getAppoiment, insertAppoiment } = require('../models/appoiments')
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


const newAppoiment = async (req = request, res = response) => {

    const appoimentBody = req.body

    const appoiment = await getAppoiment(appoimentBody)

    if (appoiment.length >= 1) {
        return res.status(401).send({
            ok: false,
            msg: 'La cita ya está ocupada',
        })
    }

    const resultAppoiment = await insertAppoiment(appoimentBody)


    return res.status(200).send({
        ok: true,
        msg: 'Se ha agregado la cita correctamente',
        result: {
            id_cita: resultAppoiment.insertId,
            cedula_medico: appoimentBody.doctorCi,
            cedula_paciente: appoimentBody.patientCi,
            fecha_cita: appoimentBody.appoimentDate,
            hora_cita: appoimentBody.appoimentHour,
        }
    })
}


module.exports = {
    getAppoiments,
    newAppoiment
}