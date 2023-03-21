const moment = require('moment')

const groupAppoimentsByDay = (appoiments = []) => {

    const orderAppoiment = {}

    appoiments.forEach((appoiment) => {

        const date = moment(appoiment.fecha_cita).format('yyyy-MM-DD')

        delete appoiment.fecha_cita

        if (orderAppoiment[date] == undefined) {
            orderAppoiment[date] = [{
                ...appoiment,
                fecha_cita: date
            }]
        } else {
            orderAppoiment[date].push({
                ...appoiment,
                fecha_cita: date
            })
        }
    })

    return orderAppoiment
}


module.exports = groupAppoimentsByDay