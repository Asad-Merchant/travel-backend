import express from 'express'
import { UserDetails } from '../models/user.model.js'
import { transporter } from '../config/nodemailer.js'
import { razorpay } from '../config/razorpay.js'
import crypto from 'crypto'
import { Package } from '../models/package.model.js'
import { OTP_TEMPLATE } from '../config/emailTemplate.js'

const userRoute = express.Router()

const generateOTP = () => {
    let otp = ""
    for(let i=0;i<6;i++){
        otp += Math.floor(Math.random()*10)
    }
    return otp
}

function generatedTranscId() {
    return 'MT' + Date.now();
}

userRoute.post('/generate-otp', async(req, res)=>{
    const {name, email, mobile, noOfTicketsBooked} = req.body
    // console.log(req.body);
    
    if(!name || !email || !mobile || !noOfTicketsBooked)
        return res.json({success: false, msg: "Please fill the required details."})

    try {
        let user = await UserDetails.findOne({email})
        if(!user){
            user = await UserDetails.create({
                email,
                name,
                mobile
            })
        }
        const otp = generateOTP()
        user.otp  = otp
        user.otpExpireAt = Date.now() + 1000 * 60 * 10
        await user.save()
        // console.log('Before email');
        const mailOptions = {
            from: process.env.GMAIL_ACCOUNT,
            to: email,
            subject: "Your OTP",
            // text: `Your OTP is ${otp}`
            html: OTP_TEMPLATE.replace('{{OTP}}', otp)
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email: ", error);
            } else {
              console.log("Email sent: ", info.response);
            }
        })
        return res.json({success: true, msg: "Please check your email for OTP."})
    } catch (error) {
        console.log(error);
        return res.json({success: false, msg: "Error occurred."})
    }
})

userRoute.post('/verify-otp', async(req, res) => {
    const {otp, email} = req.body
    if(!otp)
        return res.json({success: false, msg: "Please provide the OTP."})
    try {
        const user = await UserDetails.findOne({email})
        if(!user) 
            return res.json({success: false, msg: "Please submit the previous form."})
        if(user.otpExpireAt<Date.now())
            return res.json({success: false, msg:"OTP expired. Try it again."})
        if(user.otp!==otp)
            return res.json({success: false, msg:"Invalid OTP."})
        user.otp = ""
        user.otpExpireAt = 0
        await user.save()
        return res.json({success: true, msg: "Success"})
    } catch (error) {
        return res.json({success: false, msg: error})
    }
})

userRoute.post('/payment', async(req, res) => {
    const {amount, currency} = req.body 
    if(!amount || !currency)
        return res.json({success: false, msg: "Please provide amount and currency."})
    try {
        const options = {
            amount: amount * 100,
            currency: currency,
            receipt: `receipt_${Date.now()}`
        }

        const order = await razorpay.orders.create(options)
        return res.json({success: true, msg: order})
    } catch (error) {
        console.log(error.message);
        return res.json({success: false, msg: "Some error occured during payment process"})
    }
})

userRoute.post('/verify-payment', async(req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, name, email, mobile, noOfTicketsBooked, packageId } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        const data = await Package.findById(packageId)
        // console.log(data, data.users, typeof(data.users));
        
        data.users.push({
            name,
            mobile,
            email,
            noOfTicketsBooked
        })
        data.ticketsBooked += noOfTicketsBooked
        await data.save() 
        const mailOptions = {
            from: process.env.GMAIL_ACCOUNT,
            to: email,
            subject: "Confirmation of ticket booking",
            text: `You have booked ${noOfTicketsBooked} tickets for ${data.to}.`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email: ", error);
            } else {
              console.log("Email sent: ", info.response);
            }
        })
        res.json({ success: true, msg: "Payment verified successfully" });
    } else {
        res.status(400).json({ success: false, msg: "Payment verification failed" });
    }
})

export {userRoute}