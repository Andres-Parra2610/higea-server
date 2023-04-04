const pool = require('../config/database')



const getAllDoctors = async () => {
    const query = 'SELECT m.cedula_medico, m.nombre_medico, m.apellido_medico, m.telefono_medico, m.sexo_medico, m.correo_medico, m.fecha_nacimiento, md.hora_inicio, md.hora_fin, d.nombre_dia, e.nombre_especialidad FROM medico_horario md INNER JOIN medico m ON m.cedula_medico = md.cedula_medico INNER JOIN dias_semana d ON d.iddias_semana = md.id_dia INNER JOIN especialidad e ON m.id_especialidad = e.idespecialidad WHERE m.activo = 1'

    const [results] = await pool.query(query)

    return results
}

const findDoctor = async (ci) => {

    const query = 'SELECT * FROM medico WHERE cedula_medico = ?'

    const [results] = await pool.query(query, [ci])

    return results
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

const insertDoctor = async (doctor) => {
    const {
        cedula_medico,
        nombre_medico,
        apellido_medico,
        telefono_medico,
        correo_medico,
        sexo_medico,
        fecha_nacimiento,
        nombre_especialidad,
    } = doctor;

    const query = 'INSERT INTO medico (cedula_medico, nombre_medico, apellido_medico, telefono_medico, correo_medico, sexo_medico, fecha_nacimiento, activo, id_especialidad, contrasena_medico, id_rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'

    const [results] = await pool.query(query, [cedula_medico, nombre_medico, apellido_medico, telefono_medico, correo_medico, sexo_medico, fecha_nacimiento, 1, nombre_especialidad, cedula_medico, 2])


    return results
}

const insertDoctorSchedule = async (cedula_medico, dias = [], hora_inicio, hora_fin) => {

    const query = 'INSERT INTO medico_horario (cedula_medico, id_dia, hora_inicio, hora_fin) VALUES (?, ?, ?, ?)'
    const quer2 = 'SELECT iddias_Semana FROM dias_semana WHERE nombre_dia = ?'
    const results = []

    for (const dia of dias) {

        const [[daysResponse]] = await pool.query(quer2, [dia])
        const idDia = daysResponse.iddias_Semana

        const [response] = await pool.query(query, [cedula_medico, idDia, hora_inicio, hora_fin])
        results.push(response)
    }

    return results[results.length - 1]
}

const updateDoctorInfo = async (doctor) => {
    const {
        cedula_medico,
        nombre_medico,
        apellido_medico,
        telefono_medico,
        correo_medico,
        sexo_medico,
        fecha_nacimiento,
    } = doctor;

    const query = 'UPDATE medico SET nombre_medico = ?, apellido_medico = ?, telefono_medico = ?, sexo_medico = ?, correo_medico = ?, fecha_nacimiento = ? WHERE cedula_medico = ?'

    const [results] = await pool.query(query, [nombre_medico, apellido_medico, telefono_medico, sexo_medico, correo_medico, fecha_nacimiento, cedula_medico])

    return results
}

const deleteDoctor = async (doctorCi) => {

    const query = 'UPDATE medico SET activo = ? WHERE cedula_medico = ?'

    const [results] = await pool.query(query, [0, doctorCi])

    return results
}


module.exports = {
    findDoctor,
    getAllDoctors,
    getDoctorsBySpeciality,
    getMedicalHoursBySpeciality,
    getDoctorsDatesWorking,
    insertDoctor,
    insertDoctorSchedule,
    updateDoctorInfo,
    deleteDoctor
}

