const app = require("../app");
// const mongoose = require("mongoose");
const request = require("supertest")(app);
const {hashingString} = require("../helpers/bcrypt.helper");

const cleanup = async function () {
  await this.db.dropDatabase();
  await this.db.close();
};

const initDatabase = async function () {
  const { connectDatabase } = require("../helpers/database.helper");
  const db = await connectDatabase();
  this.db = db;
};

const init = async function () {
  beforeAll(async function connectToTestDB() {
    await initDatabase();
    await createDbUsers();
  });
  afterAll(async function disconnectTestDB() {
    await cleanup();
  });
};

const createDbUsers = async function () {
  const password = await hashingString("123456789");
  await this.db.collection("users").insertOne({code: "admin123", password: password, name: "Admin", role: "2"});
  await this.db.collection("users").insertOne({code: "mentor00", password: password, name: "Mentor", role: "1"});
  await this.db.collection("users").insertOne({code: "se000000", password: password, name: "Student", role: "0"});
}

module.exports = {
  request,
  initDatabase,
  cleanup,
  init
};
