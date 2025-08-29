const express = require('express');
const adminRouter = require('./route/admin');
const userRouter = require('./route/user');
const {connectDb} = require('./db');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/admin',adminRouter);
app.use('/user',userRouter);

app.get('/ping',(req,res)=> {
    res.send('pong!');
});

app.use((err,req,res,next)=> {
    res.status(500).json({message: err.message});
})

const PORT = 2000;

app.listen(PORT, () => {
    connectDb();
    console.log(`Server is running on port ${PORT}`);
});