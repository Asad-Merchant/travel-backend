import multer from "multer";

const storage = multer.diskStorage({
    destination: "temp",
    filename: function(req, file, cb){
        cb(null, `${Date.now()}${file.originalname}`)
    }
})

export default storage