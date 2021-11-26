const multer = require('multer')
const path = require('path');



const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename:function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        cb({message: 'Unsuppored file format'}, false)
    }
}

const uploads = multer({
    storage:storage,
    limits:{fileSize:1024 * 1024},
    fileFilter:fileFilter
})

module.exports = uploads