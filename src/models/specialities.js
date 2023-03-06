const pool = require('../config/database')


const getSpecialities = async () => {

    const query = 'SELECT * FROM especialidad';

    const [results] = await pool.query(query)

    return results
}

module.exports = {
    getSpecialities
}