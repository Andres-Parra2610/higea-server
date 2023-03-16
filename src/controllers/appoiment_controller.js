const { response, request } = require('express')
const {
    getAppoimentsByDoc,
    getAppoiment,
    insertAppoiment,
    changeAppoimentStatus,
    getAppoimentById,
    insertExistAppoiment
} = require('../models/appoiments')

const avilableAppoiments = require('../helpers/avilable_appoiments')


const getAppoiments = async (req = request, res = response) => {
    const { doctor, date } = req.params

    if (!doctor || !date) {
        return res.status(401).send({
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
            cedula_medico: Number(appoimentBody.doctorCi),
            cedula_paciente: Number(appoimentBody.patientCi),
            fecha_cita: appoimentBody.appoimentDate,
            hora_cita: appoimentBody.appoimentHour,
        }
    })
}

const cancelAppoiment = async (req = request, res = response) => {

    const idAppoiment = req.params.id

    if (!idAppoiment) {
        return res.status(401).send({
            ok: false,
            msg: 'El id de la cita es obligatorio'
        })
    }

    const appoiment = await changeAppoimentStatus(idAppoiment)

    if (appoiment.affectedRows <= 0) {
        return res.status(500).send({
            ok: false,
            msg: 'Ups! un error ha ocurrido al cancelar la cita'
        })
    }

    return res.status(200).send({
        ok: true,
        msg: 'Cita cancelada'
    })
}




const registerExisteAppoiment = async (req = request, res = response) => {

    const { id, ciPatient } = req.params

    if (!id || !ciPatient) {
        return res.status(401).send({
            ok: false,
            msg: 'Los parámetros son obligatorios'
        })
    }

    const changeAppoiment = await insertExistAppoiment(id, ciPatient)
    const appoiment = await getAppoimentById(id)

    if (changeAppoiment.affectedRows <= 0) {
        return res.status(500).send({
            ok: false,
            msg: 'Ups! un error ha ocurrido al reservar la cita'
        })
    }

    return res.status(200).send({
        ok: true,
        msg: 'Se ha agregado la cita correctamente',
        result: appoiment[0]
    })
}


module.exports = {
    getAppoiments,
    newAppoiment,
    cancelAppoiment,
    registerExisteAppoiment
}