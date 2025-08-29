const { Router } = require('express');
const adminMiddleware = require('../middlewares/admin');
const { Admin, Course } = require('../db/db');
const { body, validationResult } = require('express-validator');
const { generateToken, hashPassword, comparePassword } = require('../auth/auth');
const router = Router();

// Signup validation and route
router.post('/signup',
  body('username').isString().trim().notEmpty(),
  body('password').isString().isLength({ min: 4 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;

    try {
      const existingAdmin = await Admin.findOne({ username });
      if (existingAdmin) {
        return res.status(409).json({ msg: 'Username already exists' });
      }
      const hashedPassword = await hashPassword(password);
      const admin = new Admin({ username, password: hashedPassword });
      await admin.save();
      res.status(201).json({ msg: 'Admin created successfully' });
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
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    try {
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(403).json({ msg: 'Invalid username or password' });
      }
      const isMatch = await comparePassword(password, admin.password);
      if (!isMatch) {
        return res.status(403).json({ msg: 'Invalid username or password' });
      }
      const token = generateToken(admin._id);
      res.status(200).json({ msg: 'Login successful', token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  });

// Create course route
router.post('/courses', adminMiddleware,
  body('title').isString().trim().notEmpty(),
  body('description').optional().isString(),
  body('price').optional().isString(),
  body('imageLink').optional().isString().isURL(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const course = new Course(req.body);
      await course.save();
      res.status(201).json({ msg: 'Course created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  });

// Get all courses
router.get('/courses', adminMiddleware, async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ msg: 'Courses fetched successfully', courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
