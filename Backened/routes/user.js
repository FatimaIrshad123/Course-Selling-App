const jwt = require('jsonwebtoken')
const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { jwtSecret } = require('../config')
const {User , Course} = require('../db')

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    let username = req.body.username;
    let password = req.body.password;

    User.create({
        username : username,
        password : password
    }).then(function(){
        res.json({msg:'User created successfully'})
    })
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    let username = req.body.username;
    let password = req.body.password;
    let user = await User.find({
        username,
        password
    })
    console.log(user)
    if (user){
        let token = jwt.sign({username},jwtSecret)
        res.json({token})
    }else{
        res.status(403).json({msg : 'Incorrect Email or password'})
    }

});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({})
    res.json({courses : response})
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.username;
    User.updateOne({
        username : username
    },{
        "$push": {
            PurchasedCourses : courseId
        }
    });
    res.json({msg:'Purchased Complete'})
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username : req.headers.username
    });
    console.log(user.PurchasedCourses)
    const course = await Course.find({
    _id : {
            '$in' : user.PurchasedCourses
        }
    })
    res.json({
       courses : course
    })
});

module.exports = router