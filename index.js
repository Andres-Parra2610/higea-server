const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()


const app = express()
app.use(express.json({ type: 'application/json' }))
app.use(express.urlencoded({ extended: true }));
app.use(cors())

/**
 * @routes Rutas principales de la aplicación
 */
app.use('/auth', require('./src/routes/auth'))
app.use('/speciality', require('./src/routes/speciality'))
app.use('/doctor', require('./src/routes/doctor'))
app.use('/patient', require('./src/routes/patient'))
app.use('/appoiment', require('./src/routes/appoiments'))
app.use('/recovery-password', require('./src/routes/recovery_password'))
app.use('/reports', require('./src/routes/reports'))



app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.SERVER_PORT}`)
})

