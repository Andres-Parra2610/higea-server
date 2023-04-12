const transporter = require('../config/email')
const HTMLTemplate = require('../assets/template')



const sendCodeEmail = async (email, head, body) => {

    const codeVerification = Date.now().toString().substring(7, 12);
    process.env.VERIFICATION_CODE = codeVerification

    try {

        await transporter.sendMail({
            from: '"Higea" <higea@gmail.com>',
            to: email,
            subject: "Código de verificación.",
            html: HTMLTemplate(codeVerification, head, body),
        });


    } catch (error) {
        console.log(`Un error ha ocurrido: ${error}`)
        res.status(500).send({
            ok: false,
            error: 'Un error inesperado a ocurrido',
            result: []
        })
    }
}


module.exports = sendCodeEmail

