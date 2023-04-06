const pool = require('../config/database')



const findPatient = async (ci) => {

    const query = 'SELECT * FROM paciente WHERE cedula_paciente = ?'

    const [results] = await pool.query(query, [ci])

    return results[0]
}

const registerPatient = async (user) => {
    const { ci, name, lastName, email, phone, birthDate, password } = user

    const query = 'INSERT INTO paciente(cedula_paciente, nombre_paciente, apellido_paciente, correo_paciente, telefono_paciente, fecha_nacimiento_paciente, contrasena_paciente, activo, id_rol) VALUES (?,?,?,?,?,?,?,1,3)'

    const [results] = await pool.query(query, [ci, name, lastName, email, phone, birthDate, password])


    return user
}

const setNewPassword = async (newPassword, userCi) => {

    const query = 'UPDATE paciente SET contrasena_paciente = ? WHERE cedula_paciente = ?'

    const [results] = await pool.query(query, [newPassword, userCi])

    return results

}


const selectAllPatient = async () => {
    const query = 'SELECT cedula_paciente, nombre_paciente, apellido_paciente, correo_paciente, telefono_paciente,fecha_nacimiento_paciente FROM paciente'
    const [results] = await pool.query(query)

    return results
}

const selectPatientMostVisit = async () => {
    const query = 'SELECT p.cedula_paciente, p.nombre_paciente, p.apellido_paciente, p.correo_paciente, p.telefono_paciente, cita.cedula_paciente, COUNT(*) as visitas from cita INNER JOIN paciente p ON cita.cedula_paciente = p.cedula_paciente GROUP BY cita.cedula_paciente ORDER BY visitas DESC LIMIT 1'

    const [results] = await pool.query(query)

    return results
}

module.exports = {
    findPatient,
    registerPatient,
    setNewPassword,
    selectPatientMostVisit,
    selectAllPatient
}