const { response, request } = require('express')
const { getSpecialities } = require('../models/specialities')
const {
    getMedicalHoursBySpeciality,
    getDoctorsDatesWorking,
    getAllDoctors,
    findDoctor,
    insertDoctor,
    insertDoctorSchedule,
    updateDoctorInfo,
    deleteDoctor
} = require('../models/doctors')
const { doctorDayWork, listDays } = require('../helpers/doctor_day_work')



const getDoctors = async (req = request, res = response) => {
    const doctors = await getAllDoctors()

    const daysWork = listDays(doctors)

    return res.status(200).send({
        ok: true,
        msg: 'Resultado de todos los doctores',
        results: daysWork
    })
}

const getAllSpeciality = async (req = request, res = response) => {

    const results = await getSpecialities()

    return res.status(200).send({
        ok: true,
        msg: 'Resultado de todas las especialidades',
        results: results
    })
}

const getMedicalHours = async (req = request, res = response) => {

    const id = req.query.id

    if (id === undefined || id.length <= 0) {
        return res.status(400).send({
            ok: false,
            msg: 'El parámetro id no puede estar vacio',
            results: []
        })
    }

    const results = await getMedicalHoursBySpeciality(id)

    if (results.length <= 0) {
        return res.status(400).send({
            ok: false,
            msg: 'La especialidad no existe',
            results: []
        })
    }

    return res.status(200).send({
        ok: true,
        msg: 'Resultado de los médicos por horario',
        results: results
    })
}

const getDoctorDatesWork = async (req = request, res = response) => {

    const ci = req.params.ci


    if (ci === undefined || ci.length <= 0) {
        return res.status(400).send({
            ok: false,
            msg: 'El parámetro ci no puede estar vacio',
            results: []
        })
    }

    const doctor = await getDoctorsDatesWorking(ci)

    const daysDoctorWork = doctorDayWork(doctor)


    return res.status(200).send({
        ok: true,
        msg: 'Resultado de los días laborales de los doctores',
        results: daysDoctorWork
    })
}


const newDoctor = async (req = request, res = response) => {

    const doctor = await findDoctor(req.body.cedula_medico)
    const { cedula_medico, fechas, hora_inicio, hora_fin } = req.body

    if (doctor.length >= 1) {
        return res.status(400).send({
            ok: false,
            msg: 'El doctor ya está registrado'
        })
    }


    const newDoctorResult = await insertDoctor(req.body)

    if (newDoctorResult.serverStatus != 2) {
        return res.status(500).send({
            ok: false,
            msg: 'Error al registrar el doctor'
        })
    }

    const doctorSchedule = await insertDoctorSchedule(cedula_medico, fechas, hora_inicio, hora_fin)

    if (doctorSchedule.serverStatus !== 2) {
        return res.status(500).send({
            ok: false,
            msg: 'Error al registrar el doctor'
        })
    }

    return res.status(200).send({
        ok: true,
        msg: 'Se ha registrado el doctor de manera correcta'
    })
}



const editDoctor = async (req = request, res = response) => {
    const doctor = await findDoctor(req.body.cedula_medico)

    if (doctor.length <= 0) {
        return res.status(400).send({
            ok: false,
            msg: "Doctor no encontrado"
        })
    }

    const doctorResult = await updateDoctorInfo(req.body)

    if (doctorResult.changedRows <= 0) {
        return res.status(500).send({
            ok: false,
            msg: 'Ocurrió un error editando al doctor'
        })
    }

    return res.status(200).send({
        ok: true,
        msg: 'El doctor se ha editado con éxito'
    })

}

const removeDoctor = async (req = request, res = response) => {

    const doctorCi = req.params.ci

    if (doctorCi == undefined) {
        return res.status(400).send({
            ok: false,
            msg: 'Debe enviar el parámetro id'
        })
    }

    const doctor = await findDoctor(doctorCi)

    if (doctor.length <= 0) {
        return res.status(400).send({
            ok: false,
            msg: 'Doctor no encontrado'
        })
    }

    const doctorResult = await deleteDoctor(doctorCi)

    if (doctorResult.changedRows <= 0) {
        return res.status(500).send({
            ok: false,
            msg: 'Ocurrió un error eliminando al doctor'
        })
    }

    return res.status(200).send({
        ok: true,
        msg: 'El doctor se ha eliminado con éxito'
    })

}



module.exports = {
    getDoctors,
    getAllSpeciality,
    getMedicalHours,
    getDoctorDatesWork,
    newDoctor,
    editDoctor,
    removeDoctor
}