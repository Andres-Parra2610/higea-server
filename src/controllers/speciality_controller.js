const { response, request } = require('express')
const { getSpecialityByName, insertSpeciality } = require('../models/specialities')
const uploadImage = require('../services/upload_image')


const addSpeciality = async (req = request, res = response) => {

    const { nombre_especialidad, imagen_especialidad } = req.body

    const findSpeciality = await getSpecialityByName(nombre_especialidad)


    if (findSpeciality.length >= 1) {
        return res.status(200).send({
            ok: false,
            results: [],
            msg: 'La especialidad ya existe'
        })
    }

    if (!imagen_especialidad) {
        const result = await insertSpeciality(nombre_especialidad, imagen_especialidad)

        return res.status(200).send({
            ok: true,
            result: {
                idespecialidad: result.insertId,
                nombre_especialidad,
                imagen_especialidad: null
            }
        })
    }

    const imgUrl = await uploadImage(imagen_especialidad)
    const result = await insertSpeciality(nombre_especialidad, imgUrl)


    return res.status(200).send({
        ok: true,
        results: {
            idespecialidad: result.insertId,
            nombre_especialidad,
            imagen_especialidad: imgUrl,
            activo: 1
        },
    })
}

module.exports = {
    addSpeciality
}