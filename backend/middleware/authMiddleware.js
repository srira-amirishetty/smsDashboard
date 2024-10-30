const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');

exports.authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({message:'No token, authentication denied'});
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.userId;
        next()
    }catch (err) {
        res.status(401).json({message:'Token is not valid'});
    }
}
