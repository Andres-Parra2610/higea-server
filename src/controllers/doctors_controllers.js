const { response, request } = require('express')
const { getSpecialities } = require('../models/specialities')
const { getMedicalHoursBySpeciality } = require('../models/doctors')


const getAllSpeciality = async (req = request, res = response) => {

    const results = await getSpecialities()

    return res.status(200).send({
        ok: true,
        results: results
    })
}

const getMecialHours = async (req = request, res = response) => {

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



module.exports = {
    getAllSpeciality,
    getMecialHours
}