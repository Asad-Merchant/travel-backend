import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


async function uploadImage(imagePath){
    try {
        const res = await cloudinary.uploader.upload(imagePath, {
            resource_type: 'auto'
        })
        fs.unlinkSync(imagePath)
        // console.log(res);
        return res
    } catch (error) {
        fs.unlinkSync(imagePath)
        console.log(error);
    }
}

async function deleteImage(publicId){
    try {
        const result = cloudinary.uploader.destroy(publicId)
        // console.log(result);
        return true
    } catch (error) {
        console.log('error: '+error);
        return false
    }
}

export {uploadImage, deleteImage}