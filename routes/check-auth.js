const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];//get token without 'Bearer'.
        console.log(token);
        const decoded = jwt.verify(token, 'secret');
        req.adminData = decoded;
        next();
    } catch (arror) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
}