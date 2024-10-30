const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {JWT_SECRET} = require('../config');
const User = require('../models/User');


// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req,res) =>{

    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (user && bcrypt.compareSync(password, user.password)){
        const token = jwt.sign({_id:user._id}, JWT_SECRET);
        return res.json({token});
    }
    return res.status(400).json({message:'Invalid credentials'});
});

// @route  POST /api/auth/register
// @desc   Register User
// @access Public
router.post('/register', async (req, res) => {
    
    const {username , password} = req.body;

    if (!username || !password){
        return res.status(400).json({message:'All fields are required'});
    }

    const existingUser = await User.findOne({username});
    if (existingUser){
        return res.status(400).json('user already registered please login');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password:hashedPassword});
    await user.save();

    const token = jwt.sign({_id:user._id},JWT_SECRET);
    res.status(200).json({token});

})

// @route  GET /api/auth/verify-token
// @desc   Verify JWT token
// @access Public
router.get('/verify-token', (req, res) => {
    const token = req.header('Authorization')?.replace('', '');

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return res.status(200).json({ message: 'Token is valid', userId: decoded._id });
    } catch (error) {
        return res.status(401).json({ message: 'Token is invalid' });
    }
});

module.exports = router;