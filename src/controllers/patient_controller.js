const { response, request } = require('express')
const { selectAllPatient } = require('../models/patient')



const getAllPatient = async (req = request, res = response) => {

    try {
        const patient = await selectAllPatient()

        return res.status(200).send({
            ok: true,
            results: patient
        })

    } catch (error) {
        console.log(error)
        return res.status(200).send({
            ok: false,
            msg: 'Error al consultar la lista de pacientes',
        })
    }
}


module.exports = {
    getAllPatient
}