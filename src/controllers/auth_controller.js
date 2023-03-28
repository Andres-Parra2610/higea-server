const { response, request } = require('express')
const { registerPatient, findPatient } = require('../models/patient')
const { getDoctorsDatesWorking } = require('../models/doctors')
const { findAdmin } = require('../models/admin')
const fieldRegister = require('../helpers/field_register')
const sendCodeEmail = require('../services/send_code_email')




const loginUser = async (req = request, res = response) => {

    const patietnExist = await fieldRegister('cedula_paciente', 'paciente', req.body.ci)
    const doctorExist = await fieldRegister('cedula_medico', 'medico', req.body.ci)
    const adminExist = await fieldRegister('cedula_admin', 'admin', req.body.ci)

    if (patietnExist) {
        const user = await findPatient(req.body.ci)

        if (user.contrasena_paciente != req.body.password) {
            return res.status(401).send({
                ok: false,
                error: {
                    mgs: 'El usuario o la contraseña son incorrectos'
                },
            })
        }

        const idRol = user.id_rol
        delete user.contrasena_paciente
        delete user.id_rol


        return res.status(200).send({
            ok: true,
            error: {},
            user: user,
            idRol: idRol
        })

    } else if (doctorExist) {

        const user = await getDoctorsDatesWorking(req.body.ci)


        if (user[0].contrasena_medico != req.body.password) {
            return res.status(401).send({
                ok: false,
                error: {
                    mgs: 'El usuario o la contraseña son incorrectos'
                },
            })
        }

        const idRol = user[0].id_rol
        delete user[0].contrasena_medico
        delete user[0].nombre_dia
        delete user[0].id_rol

        return res.status(200).send({
            ok: true,
            error: {},
            user: user[0],
            idRol: idRol
        })

    } else if (adminExist) {
        const user = await findAdmin(req.body.ci)

        if (user.contrasena_admin != req.body.password) {
            return res.status(401).send({
                ok: false,
                error: {
                    mgs: 'El usuario o la contraseña son incorrectos'
                },
            })
        }

        const idRol = user.id_rol
        delete user.contrasena_admin
        delete user.id_rol

        return res.status(400).send({
            ok: true,
            error: {},
            user: user,
            idRol: idRol
        })
    }


    return res.status(400).send({
        ok: false,
        msg: 'Usuario o contraseña incorrectos'
    })
}




const registerUser = async (req = request, res = response) => {
    const ciExist = await fieldRegister('cedula_paciente', 'paciente', req.body.ci)
    const emailExist = await fieldRegister('correo_paciente', 'paciente', req.body.email)

    if (ciExist || emailExist) {
        return res.status(401).send({
            ok: false,
            error: {
                msg: 'El usuario ya existe'
            },
            results: []
        })
    }

    await sendCodeEmail(req.body.email)


    return res.status(200).send({
        ok: true,
        msg: 'Código enviado exisotasmente',
        error: {},
        results: []
    })
}


const verifyCode = async (req = request, res = response) => {
    const user = {
        ...req.body
    }

    delete user.codeVerification

    if (req.body.codeVerification != process.env.VERIFICATION_CODE) {
        return res.status(401).send({
            ok: false,
            error: {
                msg: 'El código de verificación es inválido'
            },
            results: []
        })
    }

    const result = await registerPatient(user)


    return res.status(200).send({
        ok: true,
        msg: 'Se agregó el usuario correctamente',
        error: {},
        user: {
            cedula_paciente: Number(result.ci),
            nombre_paciente: result.name,
            apellido_paciente: result.lastName,
            correo_paciente: result.email,
            telefono_paciente: result.phone,
            fecha_nacimiento_paciente: new Date(new Date(result.birthDate).toISOString()),
            activo: 1,
            id_rol: 3
        }
    })
}



module.exports = {
    loginUser,
    registerUser,
    verifyCode,
}