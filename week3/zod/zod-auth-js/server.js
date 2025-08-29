const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./auth/user.routes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth',userRoutes);

app.get('/go',(req,res)=>{
    res.json({msg: "hi there"});
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));