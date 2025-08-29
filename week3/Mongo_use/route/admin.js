const { Router } = require("express");
const adminMiddleware = require('../middleware/admin');
const { Admin, Course} = require("../db"); 
const router = Router();
const z = require("zod");
const { generateToken } = require("../auth/auth");

const adminSchema = z.object({
    username: z.string(),
    password: z.string().min(4).max(100)
});

const courseSchema = z.object({
    title: z.string(),
    description: z.string(),
    price: z.string(),
    imageLink: z.string()
});

//admin Routes
router.post('/login', async(req,res)=> {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username, password });

    if(!admin) {
        return res.status(403).json({msg: "Invalid username or password"});
    }

    const token = generateToken(admin._id);
    res.status(200).json({msg: "Login succesful",token})
})


router.post("/signup",async (req,res)=> {
    const admin = adminSchema.safeParse(req.body);
    if(admin.data) {
        try {
            const response = await Admin.create(req.body);
            res.status(201).json({msg: 'Admin created succesfully'});
        } catch(err) {
            console.log(err);
        }
    } else {
        res.status(400).send("invalid input");
    }
});


router.post("/courses", adminMiddleware,async(req,res) => {
    const course = courseSchema.safeParse(req.body);
    if(course.data) {
        try {
            const response = await Course.create(req.body);
            res.status(201).json({msg: 'Course created succesfully'});
        } catch(err) {
            console.log(err);
        }
    } else {
        res.status(400).send("invalid input");
    }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  try {
    const response = await Course.find();
    res.status(200).json({ message: 'Courses fetched successfully', response })
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;