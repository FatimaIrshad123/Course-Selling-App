const { Admin } = require("../db");
const { jwtSecret } = require('../config')
// Middleware for handling auth
var jwt = require('jsonwebtoken');

function adminMiddleware(req, res, next) {
    // Implement admin auth logic

    let token = req.headers.authorization;
    console.log(token)
    // let jwtToken = token.split(' ')[1];
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
        
    
    // const decoded = jwt.verify(token,jwtSecret);
    // console.log(decoded)
    // if (decoded.username){
    //     next()
    // }else {
    //     res.status(403).json({msg:'You are not Authenticated'})
    // }
// }

module.exports = adminMiddleware;