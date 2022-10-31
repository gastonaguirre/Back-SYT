const cloudinary = require("cloudinary").v2
const { API_KEY , API_SECRET, CLOUD_NAME} = process.env;

cloudinary.config({
    cloud_name:CLOUD_NAME,
    api_key: API_KEY,
    api_secret:API_SECRET,
    secure:true
})
async function uploadsArchivos(filePath){
    return await cloudinary.uploader.upload(filePath,{
        folder:"pdfs"
    })
}
async function deleteArchivo (publicidID){
    await cloudinary.uploader.destroy(publicidID)
}

module.exports= {uploadsArchivos, deleteArchivo}