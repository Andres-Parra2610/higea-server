const moment = require('moment')

const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

const doctorDayWork = (doctor = []) => {

    const doc = doctor[0]

    let docInfo = {
        nombre_medico: doc.nombre_medico,
        apellido_medico: doc.apellido_medico,
        cedula_medico: doc.cedula_medico,
    }

    const fechas = {}
    const daysWork = []
    const currentDate = moment().locale('es')

    doctor.forEach(doc => daysWork.push(doc.nombre_dia.toLocaleLowerCase()))

    for (i = 0; i < 30; i++) {

        currentDate.add(1, 'day')

        if (daysWork.includes(currentDate.format('dddd'))) {
            const currentMonth = months[currentDate.month()]

            if (!fechas[currentMonth]) {
                fechas[currentMonth] = []
                fechas[currentMonth].push(currentDate.format('dddd DD/MM/YY'))
            } else {
                fechas[currentMonth].push(currentDate.format('dddd DD/MM/YY'))
            }
        }
    }

    docInfo = { ...docInfo, fechas: { ...fechas } }

    return docInfo
}


module.exports = doctorDayWork