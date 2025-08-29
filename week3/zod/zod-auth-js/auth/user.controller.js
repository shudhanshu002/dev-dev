const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {registerSchema , loginSchema } = require('./user.schema');
const {findUserbyEmail, addUser} = require('./user.model');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

async function register(req,res) {
    const parsed = registerSchema.safeParse(req.body);
    if(!parsed.success) {
        return res.status(400).json(parsed.error.format());
    }

    const { name, email, password } = parsed.data;

    if(findUserbyEmail(email)) {
        return res.status(400).json({message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    addUser({name, email, passwordHash: hashedPassword});

    res.status(201).json({message: 'User registered successfully'});
}


async function login(req, res) {
    const parsed = loginSchema.safeParse(req.body);
    if(!parsed.success) {
        return res.status(400).json(parsed.error.format());
    }

    const { email, password } = parsed.data;
    const user = findUserbyEmail(email);

    if(!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password,user.passwordHash);
    if (!match) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
}

module.exports = { register, login };