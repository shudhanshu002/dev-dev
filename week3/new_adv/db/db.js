const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Mongo connection error: ', err);
        process.exit(1);
    }
};

const AdminSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    publishedCourses: { type: [mongoose.Schema.Types.ObjectId], ref: 'Course', default: [] },
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    purchasedCourses: { type: [mongoose.Schema.Types.ObjectId], ref: 'Course', default: [] },
}, { timestamps: true });

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: 'No description provided' },
    price: { type: String, default: '0' },
    imageLink: { type: String, default: 'https://unsplash.com/photos/person-holding-pencil-and-stick-note-beside-table-rH8O0FHFpfw' },
}, { timestamps: true });

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = { connectDb, Admin, User, Course };