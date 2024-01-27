const { Admin } = require("../db");
const { jwtSecret } = require('../config')
var jwt = require('jsonwebtoken');

function adminMiddleware(req, res, next) {

    let token = req.headers.authorization;
   
    if (token){
        jwt.verify(token,jwtSecret,(err,user)=>{
            if (err){
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

module.exports = adminMiddleware;
