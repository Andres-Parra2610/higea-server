const { response, request } = require('express')
const { registerPatient, loginPatient } = require('../models/patient')
const fieldRegister = require('../helpers/field_register')
const sendCodeEmail = require('../services/send_code_email')




const loginUser = async (req = request, res = response) => {

    const ciExist = await fieldRegister('cedula_paciente', 'paciente', req.body.ci)

    if (!ciExist) {
        return res.status(401).send({
            ok: false,
            error: {
                msg: 'Usuario inexistente'
            },
        })
    }

    const user = await loginPatient(req.body.ci)






    if (user.contrasena_paciente != req.body.password) {
        return res.status(401).send({
            ok: false,
            error: {
                mgs: 'El usuario o la contraseña son incorrectos'
            },
        })
    }

    delete user.contrasena_paciente

    return res.status(200).send({
        ok: true,
        error: {},
        user: user
    })
}
//739.20

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
        user: result
    })
}





module.exports = {
    loginUser,
    registerUser,
    verifyCode
}