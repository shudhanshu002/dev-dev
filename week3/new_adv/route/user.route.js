const { Router } = require('express');
const { User, Course } = require('../db/db');
const userMiddleware = require('../middlewares/user');
const { body, validationResult } = require('express-validator');
const { generateToken, hashPassword, comparePassword } = require('../auth/auth');
const router = Router();

// Signup route
router.post('/signup',
  body('username').isString().trim().notEmpty(),
  body('password').isString().isLength({ min: 4 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { username, password } = req.body;
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ msg: 'Username already exists' });
      }
      const hashedPassword = await hashPassword(password);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      res.status(201).json({ msg: 'User created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  });

// Login route
router.post('/login',
  body('username').isString().trim().notEmpty(),
  body('password').isString().notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) return res.status(403).json({ msg: 'Invalid username or password' });
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) return res.status(403).json({ msg: 'Invalid username or password' });
      const token = generateToken(user._id);
      res.status(200).json({ msg: 'Login successful', token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  });

// Get all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ msg: 'Courses fetched successfully', courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Purchase course (dummy implementation)
router.post('/courses/:courseId', userMiddleware, async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ msg: 'Course not found' });

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    if (user.purchasedCourses.includes(courseId)) {
      return res.status(400).json({ msg: 'Course already purchased' });
    }

    user.purchasedCourses.push(courseId);
    await user.save();

    res.status(200).json({ msg: 'Course purchased successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get purchased courses
router.get('/purchasedCourses', userMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('purchasedCourses');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.status(200).json({ purchasedCourses: user.purchasedCourses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
