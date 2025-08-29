const z = require('zod');
const { Router } = require('express');
const { User, Course } = require('../db');
const { userMiddleware } = require('../middleware/user');
const { generateToken } = require('../auth/auth');
const router = Router();

const userSchema = z.object({
    username: z.string(),
    password: z.string().min(4).max(100)
})

//user route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (!user) {
        return res.status(403).json({ msg: "Invalid username or password" });
    }

    const token = generateToken(user._id);
    res.status(200).json({ msg: "Login successful", token });
});


router.post('/signup', async (req, res) => {
    const user = userSchema.safeParse(req.body);
    if (!user.data) {
        res.status(400).send("Invalid input");
    }

    try {
        const response = await User.create(req.body);
        res.status(201).json({ msg: 'User created succesfully' });
    } catch (err) {
        throw new Error(err);
    }
});

router.get('/courses', async (req, res) => {
    try {
        const response = await Course.find();
        res.status(200).json({
            msg: 'Courses fetched succesfully',
            courses: response // <- this sends the course list
        });
    } catch (err) {
        throw new Error(err);
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const { courseId } = req.params;
    console.log(courseId);
    try {
        const response = await Course.findById(courseId);
        res.status(200).json({ msg: `Course found with id ${courseId}` })
    } catch (err) {
        throw new Error(err);
    }
});

router.get('/purchasedCourses', userMiddleware,async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('purchasedCourses');
        res.status(200).json({ courses: user.purchasedCourses });
    } catch (err) {
        res.status(500).json({ error: "Error fetching purchased courses" });
    }
})

module.exports = router