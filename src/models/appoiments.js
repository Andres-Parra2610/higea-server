const pool = require('../config/database')

const getAppoimentsByDoc = async (doctor, day) => {

    const query1 = 'SELECT * FROM cita WHERE cedula_medico = ? AND fecha_cita = ?'
    const query2 = 'SELECT hora_inicio, hora_fin FROM medico_horario WHERE cedula_medico = ? GROUP BY cedula_medico'

    const [appoiment] = await pool.query(query1, [doctor, day])
    const [workinHour] = await pool.query(query2, [doctor])

    console.log(appoiment)

    return [appoiment, workinHour[0]]
}

const getAppoiment = async (appoiment) => {

    const { doctorCi, appoimentDate, appoimentHour } = appoiment

    const query = 'SELECT * FROM cita WHERE cedula_medico = ? AND fecha_cita = ? AND hora_cita = ?'

    const [results] = await pool.query(query, [doctorCi, appoimentDate, appoimentHour])

    return results
}

const insertAppoiment = async (appoiment) => {

    const { doctorCi, patientCi, appoimentDate, appoimentHour } = appoiment

    const query = 'INSERT INTO cita(cedula_medico, cedula_paciente, fecha_cita, hora_cita, cita_estado) VALUES (?,?,?,?,?)'

    const [results] = await pool.query(query, [doctorCi, patientCi, appoimentDate, appoimentHour, 'ocupada'])

    return results
}

module.exports = {
    getAppoimentsByDoc,
    getAppoiment,
    insertAppoiment
}