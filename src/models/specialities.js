const pool = require('../config/database')


const getSpecialities = async () => {

    const query = 'SELECT * FROM especialidad WHERE activo = 1';

    const [results] = await pool.query(query)

    return results
}


const getSpeciality = async (name, id) => {
    const query = 'SELECT * FROM especialidad WHERE nombre_especialidad = ? OR idespecialidad = ?'

    const [results] = await pool.query(query, [name, id])

    return results
}

const insertSpeciality = async (name, image) => {
    const query = 'INSERT INTO especialidad(nombre_especialidad, imagen_especialidad, activo) VALUES (?, ?, ?)'

    const [results] = await pool.query(query, [name, image, 1])
    return results
}

const removeSpeciality = async (id) => {
    const query = 'UPDATE especialidad SET activo = 0 WHERE idespecialidad = ?'
    const [results] = await pool.query(query, [id])

    return results
}

const updateSpeciality = async (id, name, image) => {
    const query = 'UPDATE especialidad SET nombre_especialidad= ? ,imagen_especialidad= ? WHERE idespecialidad = ?'
    const [results] = await pool.query(query, [name, image, id])

    return results
}

const selectDoctorsSpecialities = async () => {
    const query = 'SELECT e.idespecialidad, e.nombre_especialidad, COUNT(*) as medicos FROM medico INNER JOIN especialidad e ON medico.id_especialidad = e.idespecialidad WHERE medico.activo = 1 GROUP BY medico.id_especialidad'

    const [results] = await pool.query(query)

    return results
}


module.exports = {
    getSpecialities,
    getSpeciality,
    insertSpeciality,
    removeSpeciality,
    updateSpeciality,
    selectDoctorsSpecialities
}