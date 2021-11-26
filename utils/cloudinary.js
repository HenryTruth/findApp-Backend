const cloudinary = require('cloudinary').v2
const dotenv = require('dotenv');

dotenv.config()

cloudinary.config({ 
    cloud_name: "dyojwpsfb", 
    api_key :'561691254166548', 
    api_secret : "k9tjvzXstvMkFIuqlJFm4_t_tcA",
})



exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url:result.url,
                id:result.public_id
            })
        },{
            resource_type:"auto",
            folder:folder
        })
    })
}