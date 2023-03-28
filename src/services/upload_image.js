const fetch = require('node-fetch')

const uploadImage = async (imageBase64) => {

    const urlencoded = new URLSearchParams();

    urlencoded.append("file", `data:image/png;base64,${imageBase64}`)

    const reqOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: urlencoded
    }

    const res = await fetch("https://api.cloudinary.com/v1_1/dv9lvda99/image/upload?upload_preset=higea_app", reqOptions)
    const json = await res.json()

    return json.secure_url


}

module.exports = uploadImage