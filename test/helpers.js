const app = require("../app");
const request = require("supertest")(app);
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

const getCookie = async (code) => {
  const user = await User.findOne({ code: code });
  const token = getUserToken(user);
  const cookie = `token=${token}; Path=/`
  return cookie;
}

module.exports = {
  request,cleanup,setupDatabase,
  getCookie
};
