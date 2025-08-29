require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { connectDb } = require('./db/db');
const adminRoutes = require('./route/admin.route');
const userRoutes = require('./route/user.route');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ msg: 'Internal server error' });
});

// Connect to MongoDB and start server
connectDb().then(() => {
  const PORT = process.env.PORT || 2000;
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
});
