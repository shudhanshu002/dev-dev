const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const key ="123890";

const validUser = {
    username: "admin",
    password: "password123"
};

app.post('/signin',(req,res)=> {
    const {username , password} = req.body;

    if(username && password) {
        if(username === validUser.username && password === validUser.password){
            const token = jwt.sign({username},key,{expiresIn:'1h'});
            res.json({token});
        } else {
            res.status(401).json({error: 'inalid user or pass'});
        }
    } else {
        res.status(400).json({error: 'username and password required'});
    }
});



// app.post('/signin',(req,res)=> {
//     const {username , password} = req.body;

//     if(username && password) {
//         const token = jwt.sign({username},key,{expiresIn: '1h'});
//         res.json({token});
//     } else {
//         res.status(400).json({error: 'username and password required'});
//     }
// });

app.get('/',(req,res)=> {
    res.send("hi there")
})

//Middleware to verify JWT
function verifyToken(req,res,next) {
    const authHeader = req.headers['authorization'];

    if(!authHeader) {
        return res.status(401).json({error: "Authorization header missing"});
    }

    const token = authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).json({error: "Token missing"});
    }

    // try {
    //     const decoded = jwt.verify(token, key);
    //     req.user = decoded; // Optional: store user info
    //     next();
    // } catch (err) {
    //     return res.status(401).json({ error: 'Invalid token' });
    // }

    jwt.verify(token,key,(err,user)=> {
        if(err) return res.status(401).json({ error: 'Invalid token' });
        req.user = user;
        next();
    })
}

//Get users

const users = [
    {id: 1,name: "Alice" },
    { id: 2, name: "Bob" }
]

app.get('/users',verifyToken,(req,res)=> {
    res.json(users);
})

app.listen(3000, ()=> {
    console.log("server runing succesfully: 3000");
});