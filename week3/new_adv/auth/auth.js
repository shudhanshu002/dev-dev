const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY;
const SALT_ROUNDS = 10;

function generateToken(userId) {
    return jwt.sign({userId},JWT_SECRET,{expiresIn: TOKEN_EXPIRY});
}

async function hashPassword(pass) {
    return await bcrypt.hash(pass, SALT_ROUNDS);
}

async function comparePassword(pass,hashedPass) {
    return await bcrypt.compare(pass,hashPassword);
}

module.exports = {
    generateToken,
    hashPassword,
    comparePassword
};