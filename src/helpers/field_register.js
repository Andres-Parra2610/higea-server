const pool = require('../config/database')

const fieldRegister = async (field, table, value) => {
    const query = `SELECT ${field} from ${table} WHERE ${field} = ?`

    const [result] = await pool.query(query, [value])

    if (result.length == 0) return false

    return true
}

module.exports = fieldRegister