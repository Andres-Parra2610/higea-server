const pool = require('../config/database')


const getDoctorsBySpeciality = async (id) => {

    const query = 'SELECT * FROM medico WHERE id_especialidad = ?'

    const [results] = await pool.query(query, [id])

    return results
}


module.exports = {
    getDoctorsBySpeciality
}

