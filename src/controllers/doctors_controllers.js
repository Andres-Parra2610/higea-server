const { response, request } = require('express')
const { getSpecialities } = require('../models/specialities')
const { getMedicalHoursBySpeciality, getDoctorsDatesWorking, getAllDoctors } = require('../models/doctors')
const { doctorDayWork, listDays } = require('../helpers/doctor_day_work')



const getDoctors = async (req = request, res = response) => {
    const doctors = await getAllDoctors()

    const daysWork = listDays(doctors)


    return res.status(200).send({
        ok: true,
        results: daysWork
    })
}

const getAllSpeciality = async (req = request, res = response) => {

    const results = await getSpecialities()

    return res.status(200).send({
        ok: true,
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
        results: daysDoctorWork
    })
}



module.exports = {
    getDoctors,
    getAllSpeciality,
    getMedicalHours,
    getDoctorDatesWork
}