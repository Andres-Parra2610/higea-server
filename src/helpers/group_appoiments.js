const moment = require('moment')

const groupAppoimentsByDay = (appoiments = []) => {

    const orderAppoiment = {}

    appoiments.forEach((appoiment) => {

        const date = moment(appoiment.fecha_cita).format('yyyy-MM-DD')


        const response = {
            id_cita: appoiment.id_cita,
            cedula_medico: appoiment.cedula_medico,
            hora_cita: appoiment.hora_cita,
            cita_estado: appoiment.cita_estado,
            fecha_cita: date,
            paciente: {
                cedula_paciente: appoiment.cedula_paciente,
                nombre_paciente: appoiment.nombre_paciente,
                apellido_paciente: appoiment.apellido_paciente,
                correo_paciente: appoiment.correo_paciente,
                telefono_paciente: appoiment.telefono_paciente,
                fecha_nacimiento_paciente: appoiment.fecha_nacimiento_paciente
            },
        }

        if (orderAppoiment[date] == undefined) {
            orderAppoiment[date] = [response]
        } else {
            orderAppoiment[date].push(response)
        }
    })

    return orderAppoiment
}


module.exports = groupAppoimentsByDay