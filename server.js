import express from 'express'
import dotenv from 'dotenv'
import { conn } from './config/db.js'
import packageRoute from './routes/package.route.js'
import cors from 'cors'
import { userRoute } from './routes/user.route.js'

dotenv.config()

const app = express()

app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL]
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.use('/api/v1/package', packageRoute)
app.use('/api/v1/user', userRoute)

// app.post('/image', upload.single('image'), async (req, res) => {
//     const result = await uploadImage(req.file.path)
// })

app.listen(process.env.PORT, ()=>{
    console.log(`Listening on ${process.env.PORT}`);
})