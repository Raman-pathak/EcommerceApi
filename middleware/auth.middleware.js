const jwt = require('jsonwebtoken')
const { BlacklistModel } = require('../models/user.model')
require('dotenv').config()
const Private_Key="gopesh"
const authenticate = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        if (!token) {
            return res.status(401).json({ msg: "Please Provide Token" })
        }
        const isBlacklistedToken = await BlacklistModel.findOne({ token })
        // check if token is Blacklisted
        if (isBlacklistedToken) {
            return res.status(401).json({ msg: "UnAuthorized !, Login Again", success: false })
        }
        jwt.verify(token, Private_Key, async (err, decoded) => {
            if (err) return res.status(401).json({ msg: "Token is Invalid or Expired" })
            if (decoded) {
                req.userID = decoded.userID
                next()
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            msg: error.message
        })
    }
  }
  
  

module.exports = { authenticate }

  
  