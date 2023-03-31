const moment = require('moment')

const doctorDayWork = (doctor = []) => {

    let doc = doctor[0]
    doc = {
        ...doc,
    }

    const dates = []
    const daysWork = []
    const currentDate = moment().locale('es')

    doctor.forEach(doc => daysWork.push(doc.nombre_dia.toLocaleLowerCase()))

    for (i = 0; i < 60; i++) {

        currentDate.add(1, 'day')

        if (daysWork.includes(currentDate.format('dddd'))) {

            dates.push(currentDate.format('dddd DD/MM/YY'))

        }
    }

    delete doc.nombre_dia
    delete doc.contrasena_medico
    docInfo = { ...doc, fechas: dates }

    return docInfo
}


const listDays = (doctors = []) => {


    const doctorMap = {};

    doctors.forEach(doctor => {
        const { cedula_medico, nombre_dia } = doctor;
        const key = cedula_medico;
        if (!doctorMap[key]) {
            doctorMap[key] = {
                cedula_medico: doctor.cedula_medico,
                nombre_medico: doctor.nombre_medico,
                apellido_medico: doctor.apellido_medico,
                telefono_medico: doctor.telefono_medico,
                sexo_medico: doctor.sexo_medico,
                correo_medico: doctor.correo_medico,
                fecha_nacimiento: doctor.fecha_nacimiento,
                hora_inicio: doctor.hora_inicio,
                hora_fin: doctor.hora_fin,
                nombre_especialidad: doctor.nombre_especialidad,
                fechas: [nombre_dia],
            };
        } else {
            doctorMap[key].fechas.push(nombre_dia);
        }
    });

    return Object.values(doctorMap);
}


module.exports = {
    doctorDayWork,
    listDays
}