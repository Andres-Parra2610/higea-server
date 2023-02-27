const pool = require('../config/database')


const registerPatient = async (user) => {

    const { ci, name, lastName, email, gender, phone, birthDate } = user

    const query = `INSERT INTO paciente(idpaciente, nombre_paciente, apellido_paciente, correo_paciente, sexo_paciente, telefono_paciente, fecha_nacimiento_paciente, contrasena_paciente, activo, id_rol) VALUES (?,?,?,?,?,?,?,?,1,3)`

    await pool.query(query, [ci, name, lastName, email, gender, phone, birthDate, ci])

    return user
}


module.exports = {
    registerPatient
}