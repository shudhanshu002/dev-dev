const jwt = require("jsonwebtoken");

function adminMiddleware(req,res,next) {
    console.log("admin middleware active");
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({msg: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token,"passsword123");
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token" });
    }
}

module.exports = adminMiddleware