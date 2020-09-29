const app = require("../app");
// const mongoose = require("mongoose");
const request = require("supertest")(app);
const {hashingString} = require("../helpers/bcrypt.helper");
const { User } = require('../models/User.model')
const { Notification } = require('../models/Notification.model');
const { Course } = require('../models/Course.model');
const { Group } = require('../models/Group.model');
const { getUserToken } = require('../helpers/jwt.helper')

const cleanup = async function (db) {
  await db.dropDatabase();
  await db.close();
};

const setupDatabase = async (postfix) =>{
    const { connectDatabase } = require("../helpers/database.helper");
    return await connectDatabase(postfix);
}

const createUsers = async function (db) {
  const password = await hashingString("123456789");
  await User.create({code: "admin123", password: password, name: "Admin", role: "2"});
  await User.create({code: "mentor00", password: password, name: "Mentor", role: "1"});
  await User.create({code: "se000000", password: password, name: "Student", role: "0"});
}

const createCourse = async function (db) {
  await Course.create({name: "learning c"})
  await Course.create({name: "learning python"})
}

const createGroup = async function (db) {
  const password = await hashingString("123456789");
  await Group.create(
    {name: "project c", password: password, course: "learning c", members: ["se000000", "se111111"]}
  );
}

const createNotification = async function (db) {
  const notification =  await Notification.create({
    content: "Homework: 04/02", course: "learning c"
  })
  const course = await Course.findOne({ name: "learning c" });
  course.notifications.push(notification._id);
  await Course.findOneAndUpdate(
      { _id: course._id },
      { $set: { notifications: course.notifications } }
  );
}

const getCookie = async (code) => {
  const user = await User.findOne({ code: code });
  const token = getUserToken(user);
  const cookie = `token=${token}; Path=/`
  return cookie;
}

module.exports = {
  createUsers,
  createCourse,
  createGroup,
  createNotification,
  request,cleanup,setupDatabase,
  getCookie
};
