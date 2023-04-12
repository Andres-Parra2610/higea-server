const { response, request } = require('express')
const { getSpeciality, insertSpeciality, removeSpeciality, updateSpeciality } = require('../models/specialities')
const uploadImage = require('../services/upload_image')


const addSpeciality = async (req = request, res = response) => {

    const { nombre_especialidad, imagen_especialidad } = req.body

    const findSpeciality = await getSpeciality(nombre_especialidad, '')

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
            msg: 'La especialidad se ha agregado con éxito',
            results: {
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
        msg: 'La especialidad se ha agregado con éxito',
        results: {
            idespecialidad: result.insertId,
            nombre_especialidad,
            imagen_especialidad: imgUrl,
            activo: 1
        },
    })
}


const deleteSpeciality = async (req = request, res = response) => {

    const idSpeciality = req.params.id
    const findSpeciality = await getSpeciality('', idSpeciality)

    if (!idSpeciality) {
        return res.status(400).send({
            ok: false,
            msg: 'Debe enviar el id de la especialidad'
        })
    }

    if (findSpeciality.length <= 0) {
        return res.status(400).send({
            ok: false,
            msg: 'La especialidad no existe'
        })
    }

    const result = await removeSpeciality(idSpeciality)

    if (result.serverStatus != 2) {
        return res.status(500).send({
            ok: false,
            msg: 'Error por parte del servidor'
        })
    }

    return res.status(200).send({
        ok: true,
        msg: 'La especialidad se ha eliminado de manera correcta'
    })

}



const changeSpeciality = async (req = request, res = response) => {

    const { nombre_especialidad, imagen_especialidad } = req.body
    const idSpeciality = req.params.id

    const findSpeciality = await getSpeciality('', idSpeciality)

    if (findSpeciality.length <= 0) {
        return res.status(200).send({
            ok: false,
            msg: 'La especialidad no existe'
        })
    }

    if (!imagen_especialidad) {
        await updateSpeciality(idSpeciality, nombre_especialidad, imagen_especialidad)

        return res.status(200).send({
            ok: true,
            msg: 'La especialidad se ha editado con éxito',
            results: {
                idespecialidad: idSpeciality,
                nombre_especialidad,
                imagen_especialidad: null
            }
        })
    }

    if (findSpeciality[0].imagen_especialidad == imagen_especialidad) {
        await updateSpeciality(idSpeciality, nombre_especialidad, imagen_especialidad)

        return res.status(200).send({
            ok: true,
            msg: 'La especialidad se ha editado con éxito',
            results: {
                idespecialidad: idSpeciality,
                nombre_especialidad,
                imagen_especialidad
            }
        })
    }

    const imgUrl = await uploadImage(imagen_especialidad)
    await updateSpeciality(idSpeciality, nombre_especialidad, imgUrl)


    return res.status(200).send({
        ok: true,
        msg: 'La especialidad se ha editado con éxito',
        results: {
            idespecialidad: idSpeciality,
            nombre_especialidad,
            imagen_especialidad: imgUrl,
        },
    })


}

module.exports = {
    addSpeciality,
    deleteSpeciality,
    changeSpeciality
}