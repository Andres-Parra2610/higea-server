const { response, request } = require('express')
const {
    getAppoimentByDay,
    getAppoiment,
    insertAppoiment,
    changeAppoimentStatus,
    getAppoimentById,
    insertExistAppoiment,
    getAllAppoimentsByDoc,
    updateAppoimentToFinish,
    findAppoimentIntoHistory,
    updateHistory,
    getHistory
} = require('../models/appoiments')

const avilableAppoiments = require('../helpers/avilable_appoiments')
const groupAppoimentsByDay = require('../helpers/group_appoiments')


const getAppoiments = async (req = request, res = response) => {
    const { doctor } = req.params
    const date = req.query.date ?? ''

    if (!doctor) {
        return res.status(401).send({
            ok: false,
            msg: 'El parametro doctor es obligatorio',
            results: []
        })
    }

    if (doctor && date.length > 0) {
        const appoiments = await getAppoimentByDay(doctor, date)

        const result = avilableAppoiments(appoiments, doctor, date)

        return res.status(200).send({
            ok: true,
            results: result
        })
    }

    const appoiments = await getAllAppoimentsByDoc(doctor)

    const result = groupAppoimentsByDay(appoiments)

    res.status(200).send({
        ok: true,
        results: result,
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



const finishAppoiment = async (req = request, res = response) => {
    const { note, observation, historyId } = req.body
    const appoimentId = req.params.id
    const existAppoiment = await findAppoimentIntoHistory(appoimentId)

    if (existAppoiment.length > 0) {

        if (!historyId) {
            return res.status(400).send({
                ok: false,
                msg: 'Debe enviar el id de la historia médica'
            })
        }

        await updateHistory(historyId, note, observation)


        return res.status(200).send({
            ok: true,
            msg: 'La cita ha sido editada correctamente'
        })
    }

    const result = await updateAppoimentToFinish(appoimentId, note, observation)


    return res.status(200).send({
        ok: true,
        msg: 'Se ha finalizado la cita correctamente',
        id_historial: result[0].insertId
    })

}


const getHistoryById = async (req = request, res = response) => {

    const id = req.query.id


    const result = await getHistory(id)

    if (result.length <= 0) {
        return res.status(400).send({
            ok: false,
            msg: 'Ups, no se pudo encontrar la cita',
            results: {}
        })
    }


    res.status(200).send({
        ok: true,
        results: {
            nota_medica: result[0].nota_medica,
            observaciones: result[0].observaciones,
            idhistorial: result[0].idhistorial
        }

    })
}


module.exports = {
    getAppoiments,
    newAppoiment,
    cancelAppoiment,
    registerExisteAppoiment,
    finishAppoiment,
    getHistoryById
}