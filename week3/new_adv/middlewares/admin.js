const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function adminMiddleware(req,res,next) {
    console.log(`admin Middleware active`);
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.staus(401).json({msg: 'unauthrozed'});
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token,JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch(err) {
        console.log(`Token verifivcation failed:`,err.message);
        return res.status(401).json({msg: 'Invalid token'});
    }
}

module.exports = adminMiddleware;