const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const jwt = require('jsonwebtoken')
const { Admin,Course } = require("../db");
const router = Router();
const {jwtSecret} = require('../config')

// Admin Routes
router.post('/signup', async(req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    const admin = await Admin.find({username});

    let x = admin.find(x => x.username = username)
    
    if (typeof(x) == 'undefined'){
        Admin.create({
            username,
            password
        }).then (function (){
            let token = jwt.sign({username},jwtSecret)
            res.json({msg:'Admin created Successfully',token})
        })
        
    }else{
        res.json({msg : 'Admin already exist'})
}
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    var username = req.body.username;
    var password = req.body.password;
    let admin = await Admin.find({
        username : req.body.username,
        password : req.body.password
    })

    let x = admin.find(x => x.username = username)
    
    if (typeof(x) == "object"){
        let token = jwt.sign({username},jwtSecret)
            res.json({msg:'Login successfully',token})
    }
    else{
        res.status(403).json({msg : 'Incorrect Email or password'})
    }
    
});

router.post('/addcourses', adminMiddleware,async (req, res) => {
    // Implement course creation logic
    let title = req.body.title;
    let description = req.body.description;
    let imageLink = req.body.imageLink;
    let price = req.body.price;

    const newCourse = await Course.create({
        title,
        description,
        price
    })
    res.json({msg:'Course created successfully',CourseId : newCourse._id})
});


router.get('/courses', adminMiddleware, async(req, res) => {
    const response = await Course.find({})
    res.json({courses : response})
});

router.get('/',async(req,res) => {
    const response = await Admin.find({})
    console.log(response)
    res.json({Admin : response})
})

router.get('/me',adminMiddleware,async(req,res)=> {
//     let username = req.body.username;
//     let password = req.body.password;
//     const admin = await Admin.find({username});
// console.log(admin)
    // let x = admin.find(x => x.username)
    // console.log(x)
    res.json({
        user : req.user
    })
})
module.exports = router;