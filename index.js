const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

/**
 * @routes Rutas principales de la aplicación
 */
app.use('/auth', require('./src/routes/auth'))
app.use('/speciality', require('./src/routes/doctors'))
app.use('/appoiment', require('./src/routes/appoiments'))



app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.SERVER_PORT}`)
})

