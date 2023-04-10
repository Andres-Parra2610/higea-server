const pool = require('../config/database')


const getHistoryByPatient = async (ci) => {
    const query = 'SELECT h.*, c.fecha_cita, c.hora_cita, c.cedula_paciente, c.cedula_medico, p.nombre_paciente, p.apellido_paciente, m.nombre_medico, m.apellido_medico, e.nombre_especialidad FROM historial h INNER JOIN cita c ON c.id_cita = h.id_cita INNER JOIN paciente p ON p.cedula_paciente = c.cedula_paciente INNER JOIN medico m ON m.cedula_medico = c.cedula_medico INNER JOIN especialidad e ON e.idespecialidad = m.id_especialidad WHERE c.cedula_paciente = ?'

    const [results] = await pool.query(query, [ci])

    return results
}

module.exports = {
    getHistoryByPatient
}