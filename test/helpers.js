const app = require("../app");
const mongoose = require("mongoose");
const request = require("supertest")(app);

const cleanup = async function () {
  await this.db.close();
  await this.db.dropDatabase();
};

const initDatabase = async function () {
  const { connectDatabase } = require("../helpers/database.helper");
  const db = await connectDatabase();
  this.db = db;
};

const init = function () {
    beforeAll(async function connectToTestDB() {
    await initDatabase();
  });
  
  afterAll(async function disconnectTestDB() {
    await cleanup();
  });
};

module.exports = {
  request,
  initDatabase,
  cleanup,
  init
};
