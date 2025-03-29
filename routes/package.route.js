import express from 'express'
import multer from 'multer'
import storage from '../config/multerConfig.js'
import { deleteImage, uploadImage } from '../config/cloudinary.js'
import { Package } from '../models/package.model.js'


const upload = multer({storage})

const packageRoute = express.Router()


packageRoute.post('/regular-package',upload.single('image'), async (req, res)=>{
    const filePath = req.file.path
    const to = req.body.to 
    const noDay = req.body.noDay 
    const noNight = req.body.noNight 
    const currPrice = req.body.currPrice 
    const date = req.body.date
    const totalTickets = req.body.totalTickets

    if(!filePath || !to || !noDay || !noNight || !currPrice || !date || !totalTickets){
        return res.json({success: false, msg: "Please fill required data."})
    }

    try {
        const {url: imageUrl, public_id: imagePublicId } = await uploadImage(filePath)
        if(!imageUrl)
            return res.json({success: false, msg: "Error occurred in uploading file."})
        const data = await Package.create({
            currPrice,
            imageUrl,
            imagePublicId,
            noDay,
            date,
            noNight,
            to,
            totalTickets
        })
        if(!data)
            return res.json({success: false, msg: "Error occurred in DB."})
        return res.json({success: true, msg: data})
    } catch (error) {
        console.log(error);
        return res.json({success: false, msg: "Error occurred."})
    }
})


packageRoute.post('/offer-package',upload.single('image'), async (req, res)=>{
    const filePath = req.file.path
    const to = req.body.to 
    const noDay = req.body.noDay 
    const noNight = req.body.noNight 
    const currPrice = req.body.currPrice
    const prevPrice = req.body.prevPrice 
    const offerName = req.body.offerName 
    const date = req.body.date 
    const totalTickets = req.body.totalTickets

    if(!filePath || !to || !noDay || !noNight || !currPrice || !prevPrice || !offerName || !date || !totalTickets){
        return res.json({success: false, msg: "Please fill required data."})
    }

    try {
        const {url: imageUrl, public_id: imagePublicId } = await uploadImage(filePath)
        if(!imageUrl)
            return res.json({success: false, msg: "Error occurred in uploading file."})
        const data = await Package.create({
            currPrice,
            imageUrl,
            imagePublicId,
            noDay,
            noNight,
            to,
            offerName,
            prevPrice,
            date,
            packageType: 'o',
            totalTickets
        })
        if(!data)
            return res.json({success: false, msg: "Error occurred in DB."})
        return res.json({success: true, msg: data})
    } catch (error) {
        console.log(error);
        return res.json({success: false, msg: "Error occurred."})
    }
})

packageRoute.get('/list', async (req, res) => {
    try {
        const regular = await Package.find({packageType: 'r'})
        const offer = await Package.find({packageType: 'o'})
        return res.json({success: true, regular, offer})
    } catch (error) {
        console.log(error);
        return res.json({success: true, msg: "Some error occurred."})
    }
})

packageRoute.get('/list-all', async (req, res) => {
    try {
        const data = await Package.find({})
        return res.json({success: true, msg: data})
    } catch (error) {
        console.log(error);
        return res.json({success: true, msg: "Some error occurred."})
    }
})

packageRoute.post('/delete-package', async (req, res) => {
    const packageId = req.body.packageId 
    // console.log(packageId);
    if(!packageId)
        return res.json({success: false, msg: "Please provide ID."})
    try {
        const data = await Package.findById(packageId)
        if(!data)
            return res.json({success: false, msg: "No user found."})
        // console.log(data);
        const result = deleteImage(data.imagePublicId)
        if(!result)
            return res.json({success: false, msg: "Some error occurred in deleting file."})
        await Package.findByIdAndDelete(packageId)
        return res.json({success: true, msg: "Deleted successfully"})
    } catch (error) {
        console.log(error);
        return res.json({success: false, msg: "Error"})
    }
})

packageRoute.post('/package-details', async(req, res) => {
    const {packageId} = req.body 
    if(!packageId){
        return res.json({success: false, msg: "Please provide ID."})
    }
    try {
        const data = await Package.findById(packageId)
        if(!data){
            return res.json({success: false, msg: "No data found."})
        }
        return res.json({success: true, msg: data})
    } catch (error) {
        console.log(error);
        return res.json({success: false, msg: error})
    }
})

export default packageRoute