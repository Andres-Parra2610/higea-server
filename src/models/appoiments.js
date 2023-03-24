const pool = require('../config/database')

const getAppoimentByDay = async (doctor, day) => {

    const query1 = 'SELECT * FROM cita WHERE cedula_medico = ? AND fecha_cita = ?'
    const query2 = 'SELECT hora_inicio, hora_fin FROM medico_horario WHERE cedula_medico = ? GROUP BY cedula_medico'

    const [appoiment] = await pool.query(query1, [doctor, day])
    const [workinHour] = await pool.query(query2, [doctor])


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


const changeAppoimentStatus = async (appoimentId) => {
    const query = `UPDATE cita SET cita_estado = "cancelada" WHERE id_cita = ?`
    const [results] = await pool.query(query, [appoimentId])
    return results
}

const insertExistAppoiment = async (appoimentId, patientCi) => {
    const query = `UPDATE cita SET cedula_paciente = ?, cita_estado = "ocupada" WHERE id_cita = ?`
    const [results] = await pool.query(query, [patientCi, appoimentId])
    return results
}

const getAppoimentById = async (appoimentId) => {
    const query = 'SELECT * FROM cita WHERE id_cita = ?'

    const [results] = await pool.query(query, [appoimentId])

    return results
}

const getAllAppoimentsByDoc = async (doctorCi) => {
    const query = 'SELECT * FROM cita c  INNER JOIN paciente p ON c.cedula_paciente = p.cedula_paciente WHERE cedula_medico = ?  ORDER BY fecha_cita ASC'
    const [results] = await pool.query(query, [doctorCi])
    return results
}


const updateAppoimentToFinish = async (id, note, observations) => {
    const query = 'UPDATE cita SET cita_estado = "finalizada" WHERE id_cita = ?'
    const query2 = 'INSERT INTO historial(id_cita, nota_medica, observaciones) VALUES (?, ?, ?)'

    const updateAppoiment = pool.query(query, [id])
    const insertHistory = pool.query(query2, [id, note, observations])

    const [update, insert] = await Promise.all([updateAppoiment, insertHistory])

    return insert
}


const findAppoimentIntoHistory = async (id) => {
    const query = 'SELECT * FROM historial WHERE id_cita = ?'
    const [results] = await pool.query(query, [id])
    return results
}

const updateHistory = async (id, note, observations) => {
    const query = 'UPDATE historial SET nota_medica = ?, observaciones = ? WHERE idhistorial = ?'
    const [results] = await pool.query(query, [note, observations, id])
    return results
}


const getHistory = async (id) => {
    const query = 'SELECT historial.*, cita.cita_estado FROM historial INNER JOIN cita ON cita.id_cita = historial.id_cita WHERE historial.id_cita = ?'
    const [results] = await pool.query(query, [id])
    return results
}


module.exports = {
    getAppoimentByDay,
    getAppoiment,
    insertAppoiment,
    changeAppoimentStatus,
    getAppoimentById,
    insertExistAppoiment,
    getAllAppoimentsByDoc,
    updateAppoimentToFinish,
    findAppoimentIntoHistory,
    updateHistory,
    getHistory
}