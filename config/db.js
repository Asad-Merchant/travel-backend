import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.DB_URL+'package', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

const conn = mongoose.connection

conn.on('connected', ()=>{
    console.log('DB connected successfully.');
})

conn.on('disconnected', ()=>{
    console.log('DB disconnected.');
})

conn.on('error', (err) => {
    console.log(`Error: ${err}`);
})

export {conn}