const pool = require('../config/database')

const getAppoimentsByDoc = async (doctor, day, hour) => {

    const query1 = 'SELECT * FROM cita WHERE cedula_medico = ? AND fecha_cita = ? AND hora_cita = ?'
    const query2 = 'SELECT hora_inicio, hora_fin FROM medico_horario WHERE cedula_medico = ? GROUP BY cedula_medico'

    const [appoiment] = await pool.query(query1, [doctor, day, hour])
    const [workinHour] = await pool.query(query2, [doctor])

    console.log(appoiment)
    console.log(workinHour)
}

module.exports = {
    getAppoimentsByDoc
}