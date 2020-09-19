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
    await createAdmin();
    await createUser();
  });
  afterAll(async function disconnectTestDB() {
    await cleanup();
  });
};

const createAdmin = async function () {
  const password = await hashingString("123456789");
  await this.db.collection("users").insertOne({code: "admin123", password: password, name: "Admin", role: "2"});
}

const createUser = async function () {
  const password = await hashingString("123456789");
  await this.db.collection("users").insertOne({code: "se000000", password: password, name: "Test", role: "0"});
}

module.exports = {
  createAdmin,
  request,
  initDatabase,
  cleanup,
  init
};
