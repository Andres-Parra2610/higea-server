const pool = require('../config/database')


const getSpecialities = async () => {

    const query = 'SELECT * FROM especialidad';

    const [results] = await pool.query(query)

    return results
}


const getSpecialityByName = async (name) => {
    const query = 'SELECT * FROM especialidad WHERE nombre_especialidad = ?'

    const [results] = await pool.query(query, [name])

    return results
}

const insertSpeciality = async (name, image) => {
    const query = 'INSERT INTO especialidad(nombre_especialidad, imagen_especialidad, activo) VALUES (?, ?, ?)'

    const [results] = await pool.query(query, [name, image, 1])
    return results
}

module.exports = {
    getSpecialities,
    getSpecialityByName,
    insertSpeciality
}