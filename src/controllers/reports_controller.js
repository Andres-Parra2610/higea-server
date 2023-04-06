const { response, request } = require('express')
const { selectPatientMostVisit } = require('../models/patient')
const { selectAppoimentByMonth } = require('../models/appoiments')
const { selectDoctorsSpecialities } = require('../models/specialities')
const {
    selectAllDoctors,
    selectMedicalMostPatientTreated,
    selectMedicalMostPatientTreatedByMonth
} = require('../models/doctors')
const initPdf = require('../services/generated_pdf')
const { listDays } = require('../helpers/doctor_day_work')

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


    const pdfBytes = await initPdf(columns, patient, 'Paciente que más visita la fundación')
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBytes);
}


const getAppoimentsByMonth = async (req = request, res = response) => {

    const month = req.params.mes

    const appoiment = await selectAppoimentByMonth(month)

    const columns = [
        { key: 'cedula_paciente', label: 'Cédula Pa.', align: 'left' },
        { key: 'nombre_paciente', label: 'Nombre Pa.', align: 'left' },
        { key: 'apellido_paciente', label: 'Apellido Pa.', align: 'left' },
        { key: 'cedula_medico', label: 'Cédula Me.', align: 'left' },
        { key: 'nombre_medico', label: 'Nombre Me.', align: 'left' },
        { key: 'apellido_medico', label: 'Apellido Me.', align: 'left' },
        { key: 'hora', label: 'Hora', align: 'left' },
        { key: 'fecha', label: 'Fecha', align: 'left' },
    ]

    const pdfBytes = await initPdf(columns, appoiment, 'Citas del mes')
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBytes);
}


const allDoctors = async (req = request, res = response) => {

    const doctors = await selectAllDoctors()
    const daysWork = listDays(doctors)

    const columns = [
        { key: 'cedula_medico', label: 'Cédula', align: 'left' },
        { key: 'nombre_medico', label: 'Nombre', align: 'left' },
        { key: 'apellido_medico', label: 'Apellido', align: 'left' },
        { key: 'telefono_medico', label: 'Teléfono', align: 'left' },
        { key: 'correo_medico', label: 'Email', align: 'left' },
        { key: 'hora_inicio', label: 'Hora ini.', align: 'left' },
        { key: 'hora_fin', label: 'Hora fin.', align: 'left' },
        { key: 'nombre_especialidad', label: 'Espe.', align: 'left' },
        { key: 'fechas', label: 'Dias', align: 'left' },
    ]

    const pdfBytes = await initPdf(columns, daysWork, 'Todos los doctores')
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBytes);
}

const getMedicalMostPatientTreated = async (req = request, res = response) => {

    const month = req.query.month
    let pdfBytes

    if (!month || month.length <= 0) {
        const doctors = await selectMedicalMostPatientTreated()

        const columns = [

            { key: 'cedula_medico', label: 'Cédula', align: 'left' },
            { key: 'nombre_medico', label: 'Nombre', align: 'left' },
            { key: 'apellido_medico', label: 'Apellido', align: 'left' },
            { key: 'telefono_medico', label: 'Teléfono', align: 'left' },
            { key: 'correo_medico', label: 'Email', align: 'left' },
            { key: 'nombre_especialidad', label: 'Especialidad', align: 'left' },
            { key: 'visitas', label: 'Visitas', align: 'left' },
        ]
        pdfBytes = await initPdf(columns, doctors, 'Doctores más visitados de la fundación')

    } else {

        const doctors = await selectMedicalMostPatientTreatedByMonth(month)

        const columns = [

            { key: 'cedula_medico', label: 'Cédula', align: 'left' },
            { key: 'nombre_medico', label: 'Nombre', align: 'left' },
            { key: 'apellido_medico', label: 'Apellido', align: 'left' },
            { key: 'telefono_medico', label: 'Teléfono', align: 'left' },
            { key: 'correo_medico', label: 'Email', align: 'left' },
            { key: 'nombre_especialidad', label: 'Especialidad', align: 'left' },
            { key: 'visitas', label: 'Visitas', align: 'left' },
        ]
        pdfBytes = await initPdf(columns, doctors, 'Doctores más visitados de la fundación en el mes')

    }

    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBytes);
}

const allSpecialities = async (req = request, res = response) => {
    const specialities = await selectDoctorsSpecialities()

    const columns = [
        { key: 'idespecialidad', label: 'ID', align: 'left' },
        { key: 'nombre_especialidad', label: 'Nombre de la especialidad', align: 'left' },
        { key: 'medicos', label: 'Número de médicos', align: 'left' },
    ]

    const pdfBytes = await initPdf(columns, specialities, 'Especialidades activas')
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBytes);
}


module.exports = {
    getPatientMostVisits,
    getAppoimentsByMonth,
    allDoctors,
    getMedicalMostPatientTreated,
    allSpecialities
}