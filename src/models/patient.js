const pool = require('../config/database')



const loginPatient = async (ci) => {

    const query = 'SELECT * FROM paciente WHERE idpaciente = ?'

    const [results] = await pool.query(query, [ci])

    return results[0]
}

const registerPatient = async (user) => {
    const { ci, name, lastName, email, gender, phone, birthDate } = user

    const query = 'INSERT INTO paciente(idpaciente, nombre_paciente, apellido_paciente, correo_paciente, sexo_paciente, telefono_paciente, fecha_nacimiento_paciente, contrasena_paciente, activo, id_rol) VALUES (?,?,?,?,?,?,?,?,1,3)'

    await pool.query(query, [ci, name, lastName, email, gender, phone, birthDate, ci])

    return user
}


module.exports = {
    loginPatient,
    registerPatient
}