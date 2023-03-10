const moment = require('moment')

const doctorDayWork = (doctor = []) => {

    let doc = doctor[0]
    doc = {
        ...doc,
    }

    const fechas = []
    const daysWork = []
    const currentDate = moment().locale('es')

    doctor.forEach(doc => daysWork.push(doc.nombre_dia.toLocaleLowerCase()))

    for (i = 0; i < 60; i++) {

        currentDate.add(1, 'day')

        if (daysWork.includes(currentDate.format('dddd'))) {

            fechas.push(currentDate.format('dddd DD/MM/YY'))

        }
    }

    delete doc.nombre_dia
    docInfo = { ...doc, fechas: fechas }

    return docInfo
}


module.exports = doctorDayWork