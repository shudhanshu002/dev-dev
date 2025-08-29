const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'fallbacksecret';

function userMiddleware(req, res, next) {
  console.log('user middleware active');
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log('Token verification failed:', err.message);
    return res.status(401).json({ msg: 'Invalid token' });
  }
}

module.exports = userMiddleware;
