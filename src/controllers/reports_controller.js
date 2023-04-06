const { response, request } = require('express')
const { selectPatientMostVisit } = require('../models/patient')
const initPdf = require('../services/generated_pdf')

const getPatientMostVisits = async (req = request, res = response) => {

    const patient = await selectPatientMostVisit()

    const columns = [
        { key: 'cedula_paciente', label: 'Cédula', align: 'left' },
        { key: 'nombre_paciente', label: 'Nombre', align: 'left' },
        { key: 'apellido_paciente', label: 'Apellido', align: 'left' },
        { key: 'correo_paciente', label: 'Correo', align: 'left' },
        { key: 'telefono_paciente', label: 'Teléfono', align: 'left' },
        { key: 'visitas', label: 'Nro. Visitas', align: 'left' },
    ]


    const pdfBytes = await initPdf(columns, patient)
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBytes);

}


module.exports = {
    getPatientMostVisits
}