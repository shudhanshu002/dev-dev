const jwt = require('jsonwebtoken');


let key = "passsword123";

function generateToken(userId) {
    return jwt.sign({userId},key,{expiresIn: '1h'})
}

module.exports = {generateToken}