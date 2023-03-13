const moment = require('moment')

const avilableAppoiments = (appoiments, doctor, date) => {

    const resultAppoiment = appoiments[0]
    const workinHour = appoiments[1]

    const avilableHours = [];
    const startHour = moment(workinHour.hora_inicio, 'HH:mm:ss');
    const endHour = moment(workinHour.hora_fin, 'HH:mm:ss');


    if (resultAppoiment.length <= 0) {
        while (startHour.isSameOrBefore(endHour)) {
            const curretnHour = startHour.format('HH:mm:ss');
            avilableHours.push({
                cedula_medico: parseInt(doctor),
                fecha_cita: date,
                hora_cita: curretnHour,
                cita_estado: 'Disponible'
            })
            startHour.add(1, 'hour')
        }

        return avilableHours
    }

    while (startHour.isSameOrBefore(endHour)) {
        const curretnHour = startHour.format('HH:mm:ss');
        const findAviable = resultAppoiment.find(appoiment => appoiment.hora_cita == curretnHour)
        if (findAviable) {
            avilableHours.push({
                cedula_medico: findAviable.cedula_medico,
                fecha_cita: date,
                hora_cita: findAviable.hora_cita,
                cita_estado: 'Ocupada'
            })
        } else {
            avilableHours.push({
                cedula_medico: resultAppoiment[0].cedula_medico,
                fecha_cita: date,
                hora_cita: curretnHour,
                cita_estado: 'Disponible'
            })
        }


        startHour.add(1, 'hour')
    }


    return avilableHours


}


module.exports = avilableAppoiments
