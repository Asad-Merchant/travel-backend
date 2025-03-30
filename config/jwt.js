import jwt from 'jsonwebtoken'


const generateToken = (name) => {
    const token = jwt.sign({
        name: `${name}`
    }, process.env.JWT_SECRET, {expiresIn: "4h"})
    return token
}

const verifyToken = (req, res, next) => {
    const auth = req.headers.authorization 
    if(!auth)
        return res.json({success: false, msg: "Not authorized."})
    const token = auth.split(' ')[1]
    if(!token)
        return res.json({success: false, msg: "Token not found."})
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded.name!==process.env.USER)
            return res.json({success: false, msg: "Invalid token."})
        next()
    } catch (error) {
        console.log(error);
        return res.json({success: false, msg: "Invalid token"})
    }
}

export { generateToken, verifyToken }