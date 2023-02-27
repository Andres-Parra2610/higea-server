const { response, request } = require('express')



const signUp = (req = request, res = response) => {

    const { name } = req.body

    res.send({
        status: 'Okey',
        name: name
    })
}





module.exports = {
    signUp
}