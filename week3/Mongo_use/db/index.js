const mongoose = require('mongoose');

///connect to db;
const connectDb = async () => {
    try {
        await mongoose.connect('mongodb+srv://sudhanshu6073:Sudhanshu002-db@cluster0.haxwwwx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

        console.log("connected to mongodb");
    } catch(err) {
        console.log(err);
    }
};

const AdminSchema = new mongoose.Schema({
    username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 4,
    required: true,
  },
  publishedCourses: {
    type: Array,
    default: [],
  },
})

const UserSchema = new mongoose.Schema({
  // Schema definition here
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 4,
    required: true,
  },
  purchasedCourses: {
    type: Array,
    default: [],
  },
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "No description provided",
  },
  price: {
    type: String,
    default: "0",
  },
  imageLink: {
    type: String,
    default: "https://unsplash.com/photos/person-holding-pencil-and-stick-note-beside-table-rH8O0FHFpfw",
  },
});

const Admin= mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course",CourseSchema);

module.exports = {
    Admin,
    User,
    Course,
    connectDb,
};