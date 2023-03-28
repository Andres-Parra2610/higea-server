const pool = require('../config/database')



const findAdmin = async (ci) => {

    const query = 'SELECT * FROM admin WHERE cedula_admin = ?'

    const [results] = await pool.query(query, [ci])

    return results[0]
}

module.exports = {
    findAdmin
}