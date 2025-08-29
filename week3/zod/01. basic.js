const express = require("express");
const { z } = require("zod");

const app = express();
app.use(express.json());

const loginSchema = z.object({
    username: z.string(),
    password: z.string().min(6),
});

app.post("/login",(req,res)=> {
    const result = loginSchema.safeParse(req.body);

    if(!result.success) {
        return res.status(400).json({errors: result.error.errors});
    }

    const {username,password} = result.data;
    res.json({msg: "Logged in", user:username});
})

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});