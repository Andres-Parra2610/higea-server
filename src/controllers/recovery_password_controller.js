const { response, request } = require('express')
const { findPatient, setNewPassword } = require('../models/patient')
const fieldRegister = require('../helpers/field_register')
const sendCodeEmail = require('../services/send_code_email')


const getPatient = async (req = request, res = response) => {
    const ciExist = await fieldRegister('cedula_paciente', 'paciente', req.params.ci)

    if (!ciExist) {
        return res.status(401).send({
            ok: false,
            msg: 'Usuario inexistente'
        })
    }

    const user = await findPatient(req.params.ci)

    await sendCodeEmail(
        user.correo_paciente,
        'Recuperar contraseña',
        'Código de recuperación de contraseña. Ingresa el siguiente código: '
    )

    delete user.contrasena_paciente

    return res.status(200).send({
        ok: true,
        msg: 'Resultado del paciente',
        user: user
    })
}


const verifyRevoceryPasswordCode = async (req = request, res = response) => {

    const codeVerification = req.body.codeVerification


    if (codeVerification != process.env.VERIFICATION_CODE) {
        return res.status(401).send({
            ok: false,
            msg: 'El código de verificación es inválido',
            results: []
        })
    }

    //TODO: LIMPIAR LA VARIABLE DE ENTORNO VERIFICATION_CODE

    return res.status(200).send({
        ok: true,
        msg: 'El código de verificación es correcto',
    })
}

const newPassword = async (req = request, res = response) => {

    const { newPassword, userCi } = req.body

    const result = await setNewPassword(newPassword, userCi)


    if (result.affectedRows <= 0) {
        return res.status(500).send({
            ok: false,
            msg: 'Ocurrió un error, por favor vuelva a intentarlo'
        })
    }

    return res.status(200).send({
        ok: true,
        msg: 'Contraseña cambiada con éxito',
    })

}




module.exports = {
    getPatient,
    verifyRevoceryPasswordCode,
    newPassword
}