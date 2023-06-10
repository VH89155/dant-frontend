import axios from 'axios'
const API_URL = "https://project-datn.herokuapp.com"

const cloudinaryUpload = async (fileToUpload) => {
    console.log("fileUploasd",fileToUpload)
    var data ={}
    await axios.post(API_URL + '/api/upload/', fileToUpload)
    .then(res => data= res.data)
    .catch(err => console.log(err))

    return data.secure_url
}



export default cloudinaryUpload