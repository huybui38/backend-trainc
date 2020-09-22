const app = require("../app");
// const mongoose = require("mongoose");
const request = require("supertest")(app);
const {hashingString} = require("../helpers/bcrypt.helper");

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
  const {User} = require('../models/User.model')
  await User.create({code: "admin123", password: password, name: "Admin", role: "2"});
  await User.create({code: "mentor00", password: password, name: "Mentor", role: "1"});
  await User.create({code: "se000000", password: password, name: "Student", role: "0"});
}

module.exports = {
  createUsers,
  request,cleanup,setupDatabase
};
