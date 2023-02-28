const express = require('express')
const dotenv = require('dotenv')
dotenv.config()


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

/**
 * @routes Rutas principales de la aplicación
 */
app.use('/auth', require('./src/routes/auth'))



app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.SERVER_PORT}`)
})

