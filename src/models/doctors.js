const pool = require('../config/database')



const getAllDoctors = async () => {
    const query = 'SELECT m.cedula_medico, m.nombre_medico, m.apellido_medico, m.telefono_medico, m.sexo_medico, m.correo_medico, m.fecha_nacimiento, md.hora_inicio, md.hora_fin, d.nombre_dia, e.nombre_especialidad FROM medico_horario md INNER JOIN medico m ON m.cedula_medico = md.cedula_medico INNER JOIN dias_semana d ON d.iddias_semana = md.id_dia INNER JOIN especialidad e ON m.id_especialidad = e.idespecialidad WHERE m.activo = 1'

    const [results] = await pool.query(query)

    return results
}

const findDoctor = async (ci) => {

    const query = 'SELECT * FROM medico WHERE cedula_paciente = ?'

    const [results] = await pool.query(query, [ci])

    return results[0]
}

const getDoctorsBySpeciality = async (id) => {

    const query = 'SELECT cedula_medico, nombre_medico, apellido_medico, sexo_medico, id_especialidad FROM medico WHERE id_especialidad = ?'

    const [results] = await pool.query(query, [id])

    return results
}


const getMedicalHoursBySpeciality = async (id) => {

    const query = 'SELECT m.cedula_medico, m.nombre_medico, m.apellido_medico, m.sexo_medico, md.hora_inicio, md.hora_fin FROM medico_horario md INNER JOIN medico m ON md.cedula_medico = m.cedula_medico WHERE m.id_especialidad = ? GROUP BY m.cedula_medico'

    const [results] = await pool.query(query, [id])

    return results
}


const getDoctorsDatesWorking = async (ci) => {

    const query = 'SELECT m.nombre_medico, m.apellido_medico, m.sexo_medico, m.id_rol, m.cedula_medico, m.contrasena_medico, md.hora_inicio, md.hora_fin, d.nombre_dia FROM medico_horario md INNER JOIN medico m ON m.cedula_medico = md.cedula_medico INNER JOIN dias_semana d ON d.iddias_semana = md.id_dia WHERE md.cedula_medico = ?'

    const [results] = await pool.query(query, [ci])

    return results
}

module.exports = {
    getAllDoctors,
    getDoctorsBySpeciality,
    getMedicalHoursBySpeciality,
    getDoctorsDatesWorking
}

