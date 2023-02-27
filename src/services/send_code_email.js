const transporter = require('../config/email')



const sendCodeEmail = async (email) => {

    const codeVerification = Date.now().toString().substring(7, 12);
    process.env.VERIFICATION_CODE = codeVerification

    try {

        await transporter.sendMail({
            from: '"Higea" <higea@gmail.com>',
            to: email,
            subject: "Hello ✔",
            html: `
                <h2>Código de verificación</h2>
                <p>${codeVerification}</p>
            `,
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

