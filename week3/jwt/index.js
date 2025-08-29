const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());

const PORT = 3000;
const key = 'sudhanshusin90';

const users = [];

app.post('/register',(req,res)=> {
    const { username, password } = req.body;
    const exist = users.find(user => user.username === username);
    if(exist) return res.status(400).json({msg: 'User already exist'});

    const newUser = {id:Date.now(), username, password};
    users.push(newUser);
    res.status(201).json({msg: 'User registered succesfully'});
});

app.post('/login', (req,res)=> {
    const {username, password} = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if(!user) return res.status(401).json({msg: 'Inavalid credentials'});

    const token = jwt.sign({id:user.id , username:user.username},key,{expiresIn: '1h'});

    res.json({msg: 'Login succesful', token});
});


function authenticateToken(req,res,next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if(!token) return res.status(401).json({msg: 'token missing'});

    jwt.verify(token, key, (err,user)=> {
        if(err) return res.status(403).json({msg: 'Invalid or expired'});
        req.user = user;
        next();
    })
}

app.get('/dashboard',authenticateToken,(req,res)=> {
    res.json({ msg: `Welcome ${req.user.username}`, user: req.user });
})

app.get('/', (req, res) => {
  res.send('Welcome to JWT Auth System');
});

// ✅ LOGOUT (Handled on client side by removing token)
app.get('/logout', (req, res) => {
  res.json({ msg: 'Logout by deleting token on client-side' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});