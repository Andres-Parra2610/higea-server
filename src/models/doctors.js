const pool = require('../config/database')


const getDoctorsBySpeciality = async (id) => {

    const query = 'SELECT cedula_medico, nombre_medico, apellido_medico, sexo_medico, id_especialidad FROM medico WHERE id_especialidad = ?'

    const [results] = await pool.query(query, [id])

    return results
}


const getMedicalHoursBySpeciality = async (id) => {

    const query = 'SELECT m.cedula_medico, m.nombre_medico, m.apellido_medico, m.sexo_medico, m.id_especialidad, md.hora_inicio, md.hora_fin FROM medico_horario md INNER JOIN medico m ON md.cedula_medico = m.cedula_medico WHERE m.id_especialidad = ? GROUP BY m.cedula_medico'

    const [results] = await pool.query(query, [id])

    return results
}


module.exports = {
    getDoctorsBySpeciality,
    getMedicalHoursBySpeciality
}

