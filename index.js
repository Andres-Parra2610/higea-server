const express = require('express')
const dotenv = require('dotenv')
dotenv.config()


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {

    console.log(req.body, 'Siii')
    res.send({
        status: 'oc',
        result: []
    })
})



app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.SERVER_PORT}`)
})

