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


module.exports = {
    findPatient,
    registerPatient,
    setNewPassword
}