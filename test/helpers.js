const app = require("../app");
// const mongoose = require("mongoose");
const request = require("supertest")(app);
const {hashingString} = require("../helpers/bcrypt.helper");
const { User } = require('../models/User.model')
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
  const { Course } = require('../models/Course.model');
  await Course.create({name: "learning c"})
}

const createGroup = async function (db) {
  const password = await hashingString("123456789");
  const { Group } = require('../models/Group.model');
  await Group.create(
    {name: "project c", password: password, course: "learning c", members: ["se000000", "se111111"]}
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
  request,cleanup,setupDatabase,
  getCookie
};
