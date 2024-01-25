const { User } = require("../db");
const jwt = require('jsonwebtoken');
const secret = require('../index')
const {jwtSecret} = require('../config')

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    let token = req.headers.authorization;
    let jwtToken = token.split(' ')[1];
    const decoded = jwt.verify(jwtToken,jwtSecret);
    if (decoded.username){
        req.username = decoded.username
        next()
    }else {
        res.status(403).json({msg:'You are not Authenticated'})
    }

}

module.exports = userMiddleware;