const { response, request } = require('express')
const { getSpecialities } = require('../models/specialities')
const { getMedicalHoursBySpeciality, getDoctorsDatesWorking } = require('../models/doctors')
const doctorDayWork = require('../helpers/doctor_day_work')


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
    getAllSpeciality,
    getMedicalHours,
    getDoctorDatesWork
}