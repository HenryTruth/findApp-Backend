const jwt = require('jsonwebtoken')
const User = require('../models/User')
const dotenv = require('dotenv');

dotenv.config()

const auth = async(req, res, next) => {
    
    if(req.header('Authorization')){
        const token = req.header('Authorization').replace('Bearer ', '')
        try {
            const data = jwt.verify(token, process.env.SECRET_KEY,)
            const user = await User.findOne({ id: data.id})
            if (!user) {
                throw new Error()
            }
            req.user = user
            req.token = token
            next()
        } catch (error) {
            res.status(401).send({ error: 'Not authorized to access this resource' })
        }
    }else{
        res.status(401).send({error:"No Jwt token provided"})
    }
}
module.exports = auth